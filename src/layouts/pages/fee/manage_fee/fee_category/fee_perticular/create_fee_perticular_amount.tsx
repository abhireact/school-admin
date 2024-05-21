import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { createschema } from "../createschema";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDInput from "components/MDInput";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Demopage from "../create";
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

export default function CreateFeeParicularAmount() {
  let initialValues = {
    fee_category: "",
    fee_perticular: "",
    account: "",
    amount: "",
    academic_year: "",
    student_category: "",
    class_name: "",
    section_name: "",
    class_and_section: [] as string[],
    students: [] as string[],
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    // Uncomment and ensure createschema is correctly defined
    // validationSchema: createschema,
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
        setChecked(checkedSectionKeys);
        const submitvalue = {
          fee_category: values.fee_category,
          fee_particular: values.fee_perticular,
          user_id: [] as any[],
          classes: checked,
          academic_year: values.academic_year,
          amount: values.amount,
          student_category: values.student_category,
          account_name: values.account,
        };

        axios
          .post("http://10.0.20.200:8000/fee_particular", submitvalue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(response.data.message);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      } else {
        const submitvalue = {
          fee_category: values.fee_category,
          fee_particular: values.fee_perticular,
          user_id: checkedKeys,
          classes: [] as any[],
          academic_year: values.academic_year,
          amount: values.amount,
          student_category: values.student_category,
          account_name: values.account,
        };
        axios
          .post("http://10.0.20.200:8000/fee_particular", submitvalue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(response.data.message);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    },
  });

  const { classes, account, studentcategory, student } = useSelector((state: any) => state);

  const [feeCategory, setFeecategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [studentdata, setStudentdata] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [result, setResult] = useState([]);
  console.log(checked, "kkkkkkkkkkkkkkkkksss");
  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/fee_category", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFeecategory(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Create Fee Amount Perticular
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "fee_category", value } });
                  }}
                  options={feeCategory ? feeCategory.map((item) => item.name) : []}
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="fee_category"
                      value={values.fee_category}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Category Name
                        </MDTypography>
                      }
                      onChange={handleChange}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "fee_perticular", value } });
                  }}
                  options={
                    values.fee_category !== ""
                      ? feeCategory
                          .find((item) => item.name === values.fee_category)
                          .particular_types.map((item: any) => item.particular_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="fee_perticular"
                      onChange={handleChange}
                      value={values.fee_perticular}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Fee Perticular
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
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "academic_year", value } });
                  }}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="academic_year"
                      onChange={handleChange}
                      value={values.academic_year}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Academic Year
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
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "account", value } });
                  }}
                  options={account ? account.map((item: any) => item.account_name) : []}
                  renderInput={(params) => (
                    <MDInput
                      required
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
                  sx={{ width: "100%" }}
                  name="amount"
                  value={values.amount}
                  placeholder="Enter Amount"
                  variant="standard"
                  onChange={handleChange}
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
                <Grid container spacing={2} pt={3} p={4}>
                  <Grid item xs={12} sm={4} p={3} style={{ maxHeight: "250px", overflowY: "auto" }}>
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
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "student_category", value } });
                      }}
                      options={
                        studentcategory
                          ? studentcategory.map((item: any) => item.category_name)
                          : []
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
                </Grid>
              )}
              {selectedTab === 1 && (
                <>
                  <Grid container spacing={3} px={4} pt={4}>
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
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
                            required
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
                            required
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
                    <Grid item xs={12} sm={4} style={{ maxHeight: "250px", overflowY: "auto" }}>
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
                  </Grid>
                </>
              )}
            </Grid>
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={1}>
              <Grid item>
                <Link href="fee_category" variant="body2">
                  <MDButton color="dark" variant="contained">
                    Back
                  </MDButton>
                </Link>
              </Grid>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </form>
    </DashboardLayout>
  );
}
