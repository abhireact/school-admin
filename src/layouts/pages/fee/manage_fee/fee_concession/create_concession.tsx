import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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
export default function CreateConcession(props: any) {
  const initialValues = {
    concession_type: "",
    concession_name: "",
    class_section: "",
    fee_category: "",
    student_category: "",
    admission_number: 0,
    concession_amount: 0,
    academic_year: "",
    class: "",
    section: "",
    account: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        props.onSuccess();
      },
    });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={3}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Create Fee Concession
                </MDTypography>
              </Grid>
            </Grid>
            <MDBox>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "concession_type", value } });
                    }}
                    options={["student", "section", "student_category"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="concession_type"
                        onChange={handleChange}
                        value={values.concession_type}
                        label="Concession Type"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </MDBox>
            {values.concession_type == "student" ? (
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Concession Name"
                    name="concession_name"
                    value={values.concession_name}
                    onchange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "academic_year", value } });
                    }}
                    options={["2023-24", "fee", "2024-25"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="academic_year"
                        onChange={handleChange}
                        value={values.academic_year}
                        label="Academic Year"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "class", value } });
                    }}
                    options={["1st", "2nd", "3rd"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="class"
                        onChange={handleChange}
                        value={values.class}
                        label="Class"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "section", value } });
                    }}
                    options={["1st", "2nd", "3rd"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="section"
                        onChange={handleChange}
                        value={values.class}
                        label="Section"
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
                    options={["PUNJAB", "KOTAK", "SBI"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="account"
                        onChange={handleChange}
                        value={values.class}
                        label="Account"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "fee_category", value } });
                    }}
                    options={["PUNJAB", "KOTAK", "SBI"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="fee_category"
                        onChange={handleChange}
                        value={values.class}
                        label="Fee Category"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Concession Amount"
                    name="concession_amount"
                    value={values.concession_name}
                    onchange={handleChange}
                  />
                </Grid>
              </Grid>
            ) : values.concession_type == "section" ? (
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Concession Name"
                    name="concession_name"
                    value={values.concession_name}
                    onchange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "academic_year", value } });
                    }}
                    options={["2023-24", "fee", "2024-25"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="academic_year"
                        onChange={handleChange}
                        value={values.academic_year}
                        label="Academic Year"
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
                    options={["PUNJAB", "KOTAK", "SBI"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="account"
                        onChange={handleChange}
                        value={values.class}
                        label="Account"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "fee_category", value } });
                    }}
                    options={["PUNJAB", "KOTAK", "SBI"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="fee_category"
                        onChange={handleChange}
                        value={values.class}
                        label="Fee Category"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Concession Amount"
                    name="concession_amount"
                    value={values.concession_name}
                    onchange={handleChange}
                  />
                </Grid>
              </Grid>
            ) : values.concession_type == "student_category" ? (
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Concession Name"
                    name="concession_name"
                    value={values.concession_name}
                    onchange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "student_category", value } });
                    }}
                    options={["General", "AC", "ST"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="student_category"
                        onChange={handleChange}
                        value={values.academic_year}
                        label="Student Category"
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
                    options={["2023-24", "fee", "2024-25"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="academic_year"
                        onChange={handleChange}
                        value={values.academic_year}
                        label="Academic Year"
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
                    options={["PUNJAB", "KOTAK", "SBI"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="account"
                        onChange={handleChange}
                        value={values.class}
                        label="Account"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "fee_category", value } });
                    }}
                    options={["PUNJAB", "KOTAK", "SBI"]}
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="fee_category"
                        onChange={handleChange}
                        value={values.class}
                        label="Fee Category"
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Concession Amount"
                    name="concession_amount"
                    value={values.concession_name}
                    onchange={handleChange}
                  />
                </Grid>
              </Grid>
            ) : null}
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
              <Grid item>
                <Link href="fee_concession" variant="body2">
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
          </form>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
