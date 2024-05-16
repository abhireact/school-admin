import React, { useState } from "react";
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
export default function EditConcession(props: any) {
  const initialValues = props.data;
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
    <Card>
      <MDBox p={3}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Edit Fee Concession
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Concession Type"
                name="concession_type"
                value={values.concession_type}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Concession Name"
                name="concession_name"
                value={values.concession_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Class Section"
                name="class_section"
                value={values.class_section}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Fee Category"
                name="fee_category"
                value={values.fee_category}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Student Category"
                name="student_category"
                value={values.student_category}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Admission Number"
                name="admission_number"
                value={values.admission_number}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Concession Amount"
                name="concession_amount"
                value={values.concession_amount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormField label="Account" name="account" value={values.account} disabled />
            </Grid>
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
            <Grid item>
              <MDButton color="dark" variant="contained" onClick={() => props.onSuccess()}>
                Back
              </MDButton>
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
  );
}
