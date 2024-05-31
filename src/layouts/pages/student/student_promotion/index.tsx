import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
const token = Cookies.get("token");
interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
}
export default function StudentPromotion() {
  const [studentdata, setStudentdata] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const initialValues = {
    from_academic: "",
    from_class: "",
    from_section: "",
    to_academic: "",
    to_class: "",
    to_section: "",
    user_name: selectedKeys, // Array to store particulars
  };

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
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(values, checkedKeys, selectedKeys, "alllakakka");
        console.log(values, "promotion values");
        axios
          .post("http://10.0.20.200:8000/mg_student_promotions/", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(response.data.message);

            // resetForm({ values: newInitialValues });
          })
          .catch((error) => {
            message.error("Error fetching data:", error);
          });
      },
    });
  const filteredStudentData = useMemo(() => {
    if (values.from_academic && values.from_class && values.from_section) {
      return student
        .filter(
          (item: any) =>
            item.academic_year === values.from_academic &&
            item.class_name === values.from_class &&
            item.section_name === values.from_section
        )
        .map((item: any) => ({
          title: `${item.first_name} ${item.middle_name} ${item.last_name}`,
          key: item.user_id,
        }));
    }
    return [];
  }, [values.from_academic, values.from_class, values.from_section, student]);
  useEffect(() => {
    setStudentdata(filteredStudentData);
    console.log(filteredStudentData, "Filtered student data");
  }, [filteredStudentData]);
  const treeData: TreeDataNode[] = studentdata;
  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}></Grid>
          <Grid container spacing={3} px={2}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Student Promotion
              </MDTypography>
            </Grid>
          </Grid>
          <MDBox px={3} py={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "from_academic", value } });
                  }}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="from_academic"
                      onChange={handleChange}
                      value={values.from_academic}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Academic Year
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
                    handleChange({ target: { name: "from_class", value } });
                  }}
                  options={
                    values.from_academic !== ""
                      ? classes
                          .filter((item: any) => item.academic_year === values.from_academic)
                          .map((item: any) => item.class_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="from_class"
                      onChange={handleChange}
                      value={values.from_class}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Class
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
                    handleChange({ target: { name: "from_section", value } });
                  }}
                  options={
                    values.from_class !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.from_academic &&
                              item.class_name === values.from_class
                          )[0]
                          .section_data.map((item: any) => item.section_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="from_section"
                      onChange={handleChange}
                      value={values.from_section}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Section
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
                    handleChange({ target: { name: "to_academic", value } });
                  }}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="to_academic_year"
                      onChange={handleChange}
                      value={values.to_academic}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          To Academic Year
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
                    handleChange({ target: { name: "to_class", value } });
                  }}
                  options={
                    values.to_academic !== ""
                      ? classes
                          .filter((item: any) => item.academic_year === values.to_academic)
                          .map((item: any) => item.class_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="to_class"
                      onChange={handleChange}
                      value={values.to_class}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          TO Class
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
                    handleChange({ target: { name: "to_section", value } });
                  }}
                  options={
                    values.to_class !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.to_academic &&
                              item.class_name === values.to_class
                          )[0]
                          .section_data.map((item: any) => item.section_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="to_section"
                      onChange={handleChange}
                      value={values.to_section}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          To Section
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              {values.from_academic && values.from_class && values.from_section ? (
                <Grid item xs={12} sm={4} p={3} style={{ maxHeight: "250px", overflowY: "auto" }}>
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Select Sudents
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
              ) : null}
            </Grid>
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={4}>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
