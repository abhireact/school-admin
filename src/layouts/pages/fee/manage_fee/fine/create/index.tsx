import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";

import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDInput from "components/MDInput";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import List from "@mui/material/List";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Tree } from "antd";
import MDBox from "components/MDBox";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import type { TreeDataNode, TreeProps } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  start_date: Yup.date().required("Start Date is required"),
  end_date: Yup.date().required("End Date is required"),
  due_date: Yup.date().required("Due Date is required"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Academic Year is required"),
  fine_name: Yup.string().required(" Fine Name is required"),
});
const token = Cookies.get("token");

function not(a: readonly string[], b: readonly string[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}
interface SectionData {
  section_name: string;
  start_date: string;
  end_date: string;
}

interface Class {
  wing_name: string;
  class_name: string;
  section_data: SectionData[];
}

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
}
const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
export default function Create(props: any) {
  let initialValues = {
    fine_name: "",
    description: "",
    account: "",
    amount: "",
    academic_year: Cacademic_year,
    student_category: "",
    class_name: "",
    section_name: "",
    class_and_section: [] as string[],
    students: [] as string[],
    fine_from: "",
    start_date: "",
    end_date: "",
    due_date: "",
  };
  const { handleClose, fetchData } = props;

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues,
    // Uncomment and ensure createschema is correctly defined
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values, "on submit");
      if (selectedTab === 0) {
        const checkedSectionKeys = checkedKeys
          .filter((key) => key.toString().includes("section:"))
          .map((item) => {
            const [classKey, sectionKey] = item.toString().split(",");
            const classValue = classKey.split(":")[1];
            const sectionValue = sectionKey.split(":")[1];
            return { class_name: classValue, section_name: sectionValue };
          });

        const submitvalue = {
          fine_name: values.fine_name,
          description: values.description,
          user_id: [] as any[],
          classes: checkedSectionKeys,
          academic_year: values.academic_year,
          amount: values.amount,
          student_category: values.student_category,
          account_name: values.account,
          fine_from: values.fine_from,
          start_date: values.start_date,
          end_date: values.end_date,
          due_date: values.due_date,
        };

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/create_fine`, submitvalue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(response.data.message);
            handleClose();
            fetchData();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } else {
        const submitvalue = {
          fine_name: values.fine_name,
          description: values.description,
          user_id: checkedKeys,
          classes: [
            {
              class_name: values.class_name,
              section_name: values.section_name,
            },
          ] as any[],
          academic_year: values.academic_year,
          amount: values.amount,
          student_category: values.student_category,
          account_name: values.account,
          fine_from: values.fine_from,
          start_date: values.start_date,
          end_date: values.end_date,
          due_date: values.due_date,
        };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/create_fine`, submitvalue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(response.data.message);
            handleClose();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      }
    },
  });

  const { classes, account, studentcategory, student } = useSelector((state: any) => state);

  const [studentdata, setStudentdata] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [result, setResult] = useState([]);

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };

  const handleTabChange = (_event: any, newValue: any) => {
    setCheckedKeys([]);
    setExpandedKeys([]);
    setSelectedKeys([]);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const filteredClassData = classes.filter(
      (item: any) => item.academic_year === values.academic_year
    );
    const result: TreeNode[] = [];
    const wingMap: { [key: string]: TreeNode } = {};
    filteredClassData.forEach(({ wing_name, class_name, section_data }: Class, index: number) => {
      if (!wingMap[wing_name]) {
        wingMap[wing_name] = {
          title: wing_name,
          key: `wing-${wing_name}`,
          children: [],
        };
        result.push(wingMap[wing_name]);
      }

      const wing = wingMap[wing_name];

      if (!wing.children?.find((child) => child.title === class_name)) {
        wing.children?.push({
          title: class_name,
          key: `wing-${wing_name},class-${class_name}`,
          children: [],
        });
      }
      const classItem = wing.children?.find((child) => child.title === class_name);
      section_data.forEach((section: any) => {
        if (classItem && classItem.children) {
          classItem.children.push({
            title: `section ${section.section_name}`,
            key: `class:${class_name},section:${section.section_name}`,
          });
        }
      });
    });

    setResult(result);
  }, [values.academic_year]);

  const filteredStudentData = useMemo(() => {
    if (values.academic_year && values.class_name && values.section_name) {
      return student
        .filter(
          (item: any) =>
            item.academic_year === values.academic_year &&
            item.class_name === values.class_name &&
            item.section_name === values.section_name
        )
        .map((item: any) => ({
          title: `${item.first_name} ${item.middle_name} ${item.last_name}`,
          key: item.user_id,
        }));
    }
    return [];
  }, [values.academic_year, values.class_name, values.section_name, student]);
  useEffect(() => {
    setStudentdata(filteredStudentData);
    console.log(filteredStudentData, "Filtered student data");
  }, [filteredStudentData]);

  const treeData: TreeDataNode[] =
    selectedTab === 0 ? result : selectedTab === 1 ? studentdata : [];
  return (
    <form onSubmit={handleSubmit}>
      <Grid xs={12} sm={12} p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Create Fine Particular
            </MDTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={4}>
            <MDInput
              name="fine_name"
              sx={{ width: "100%" }}
              onChange={handleChange}
              value={values.fine_name}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Fine Name
                </MDTypography>
              }
              variant="standard"
              onBlur={handleBlur}
              error={touched.fine_name && Boolean(errors.fine_name)}
              success={values.fine_name.length && !errors.fine_name}
              helperText={touched.fine_name && errors.fine_name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              name="description"
              sx={{ width: "100%" }}
              onChange={handleChange}
              value={values.description}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Description
                </MDTypography>
              }
              variant="standard"
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              success={values.description.length && !errors.description}
              helperText={touched.description && errors.description}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              name="fine_from"
              sx={{ width: "100%" }}
              onChange={handleChange}
              value={values.fine_from}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Fine From
                </MDTypography>
              }
              variant="standard"
              onBlur={handleBlur}
              error={touched.fine_from && Boolean(errors.fine_from)}
              success={values.fine_from.length && !errors.fine_from}
              helperText={touched.fine_from && errors.fine_from}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              type="date"
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
              InputLabelProps={{ shrink: true }}
              sx={{ width: "100%" }}
              variant="standard"
              name="start_date"
              value={values.start_date}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Start Date
                </MDTypography>
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.start_date && Boolean(errors.start_date)}
              helperText={touched.start_date && errors.start_date}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              type="date"
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
              InputLabelProps={{ shrink: true }}
              sx={{ width: "100%" }}
              variant="standard"
              name="end_date"
              value={values.end_date}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  End Date
                </MDTypography>
              }
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{ min: values.start_date }}
              error={touched.end_date && Boolean(errors.end_date)}
              helperText={touched.end_date && errors.end_date}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              type="date"
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
              InputLabelProps={{ shrink: true }}
              sx={{ width: "100%" }}
              variant="standard"
              name="due_date"
              value={values.due_date}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Due Date
                </MDTypography>
              }
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{ max: values.end_date, min: values.start_date }}
              error={touched.due_date && Boolean(errors.due_date)}
              helperText={touched.due_date && errors.due_date}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              disableClearable
              disabled
              defaultValue={Cacademic_year}
              value={values.academic_year}
              onChange={(_event, value) => {
                handleChange({ target: { name: "academic_year", value } });
              }}
              options={
                classes ? Array.from(new Set(classes.map((item: any) => item.academic_year))) : []
              }
              renderInput={(params) => (
                <MDInput
                  name="academic_year"
                  defaultValue={Cacademic_year}
                  onChange={handleChange}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Academic Year
                    </MDTypography>
                  }
                  {...params}
                  variant="standard"
                  onBlur={handleBlur}
                  error={touched.academic_year && Boolean(errors.academic_year)}
                  success={values.academic_year.length && !errors.academic_year}
                  helperText={touched.academic_year && errors.academic_year}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              disableClearable
              sx={{ width: "100%" }}
              onChange={(_event, value) => {
                handleChange({ target: { name: "account", value } });
              }}
              options={account ? account.map((item: any) => item.account_name) : []}
              renderInput={(params) => (
                <MDInput
                  name="account"
                  onChange={handleChange}
                  value={values.account}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Account
                    </MDTypography>
                  }
                  {...params}
                  variant="standard"
                  onBlur={handleBlur}
                  error={touched.account && Boolean(errors.account)}
                  success={values.account.length && !errors.account}
                  helperText={touched.account && errors.account}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Amount
                </MDTypography>
              }
              type="number"
              sx={{ width: "100%" }}
              name="amount"
              value={values.amount}
              placeholder="Enter Amount"
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.amount && Boolean(errors.amount)}
              success={values.amount && !errors.amount}
              helperText={touched.amount && errors.amount}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} p={2} pt={3}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{ display: "flex", width: "100%" }}
          >
            <Tab
              label={
                <MDTypography variant="h6" fontWeight="bold" color="secondary">
                  Section/Category Wise
                </MDTypography>
              }
              sx={{ flex: "50%", color: "blue" }}
            />
            <Tab
              label={
                <MDTypography variant="h6" fontWeight="bold" color="secondary">
                  Student Wise
                </MDTypography>
              }
              sx={{ flex: "50%" }}
            />
          </Tabs>
          {selectedTab === 0 && (
            <>
              <Grid item xs={12} sm={4} mt={2}>
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Select Class & sections
                </MDTypography>
                <Tree
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "100%" }}
                  value={values.student_category}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "student_category", value } });
                  }}
                  options={
                    studentcategory ? studentcategory.map((item: any) => item.category_name) : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      name="student_category"
                      onChange={handleChange}
                      value={values.student_category}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Student Category
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
            </>
          )}
          {selectedTab === 1 && (
            <>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "100%" }}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "class_name", value } });
                  }}
                  options={
                    values.academic_year !== ""
                      ? classes
                          .filter((item: any) => item.academic_year === values.academic_year)
                          .map((item: any) => item.class_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      name="class_name"
                      onChange={handleChange}
                      value={values.class_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Class
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "100%" }}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "section_name", value } });
                  }}
                  options={
                    values.class_name !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.academic_year &&
                              item.class_name === values.class_name
                          )[0]
                          .section_data.map((item: any) => item.section_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      name="section_name"
                      onChange={handleChange}
                      value={values.section_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Section
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Select Students
                </MDTypography>
                <Tree
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={1}>
          <Grid item>
            <MDButton color="dark" variant="contained" onClick={() => handleClose()}>
              Back
            </MDButton>
          </Grid>
          <Grid item ml={2}>
            <MDButton color="info" variant="contained" type="submit">
              Save
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
