import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
export default function StudentPromotion() {
  const initialValues = {
    academic_year: "",
    class_name: "",
    section_name: "",
    to_academic_year: "",
    to_class_name: "",
    to_section_name: "",
    student_id: [] as string[], // Array to store particulars
  };

  const { classes, account, studentcategory } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(values);
      },
    });
  return (
    <DashboardLayout>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}></Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Student Promotion
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                onChange={(_event, value) => {
                  handleChange({ target: { name: "academic_year", value } });
                }}
                options={
                  classes ? Array.from(new Set(classes.map((item: any) => item.academic_year))) : []
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
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                onChange={(_event, value) => {
                  handleChange({ target: { name: "to_academic_year", value } });
                }}
                options={
                  classes ? Array.from(new Set(classes.map((item: any) => item.academic_year))) : []
                }
                renderInput={(params) => (
                  <MDInput
                    required
                    name="to_academic_year"
                    onChange={handleChange}
                    value={values.to_academic_year}
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
                  handleChange({ target: { name: "to_class_name", value } });
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
                    name="to_class_name"
                    onChange={handleChange}
                    value={values.to_class_name}
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
                  handleChange({ target: { name: "to_section_name", value } });
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
                    name="to_section_name"
                    onChange={handleChange}
                    value={values.to_section_name}
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
          </Grid>
        </Card>
      </form>
    </DashboardLayout>
  );
}
