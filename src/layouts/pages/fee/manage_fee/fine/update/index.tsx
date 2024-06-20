import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";

import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  start_date: Yup.date()
    .required("Start Date is required")
    .test("dateFormat", "Invalid date format. Please use dd/mm/yyyy", (value) => {
      if (value) {
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        return dateRegex.test(value.toLocaleDateString());
      }
      return true;
    }),
  end_date: Yup.date()
    .required("End Date is required")
    .test("dateFormat", "Invalid date format. Please use dd/mm/yyyy", (value) => {
      if (value) {
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        return dateRegex.test(value.toLocaleDateString());
      }
      return true;
    })
    .test(
      "endDateGreaterThanOrEqualToStartDate",
      "End date should be greater than or equal to start date",
      function (value) {
        const { start_date } = this.parent;
        return start_date ? value.getTime() >= start_date.getTime() : true;
      }
    ),
  due_date: Yup.date()
    .required("Due Date is required")
    .test("dateFormat", "Invalid date format. Please use dd/mm/yyyy", (value) => {
      if (value) {
        const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        return dateRegex.test(value.toLocaleDateString());
      }
      return true;
    })
    .test(
      "dueDateValidation",
      "Due date should be equal to or between start date and end date",
      function (value) {
        const { start_date, end_date } = this.parent;
        return (
          start_date &&
          value.getTime() >= start_date.getTime() &&
          end_date &&
          value.getTime() <= end_date.getTime()
        );
      }
    ),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Academic Year is required"),
  fine_name: Yup.string().required(" Fine Name is required"),
});
export default function Update(props: any) {
  const { editData, handleClose } = props;

  console.log(editData, "editData");

  const initialValues = {
    fine_name: editData.fine_name,
    description: editData.description,
    fine_from: editData.fine_from,
    start_date: editData.start_date,
    end_date: editData.end_date,
    due_date: editData.due_date,
    user_id: editData.user_id,
    class_name: editData.class_name,
    section_name: editData.section_name,
    academic_year: editData.academic_year,
    amount: editData.amount,
    student_category: editData.student_category,
    account_name: editData.account_name,
    student_name: editData.student_name,
    old_fine_name: editData.fine_name,
    old_fine_from: editData.fine_from,
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const sendValues = {
          ...editData,
          fine_from: values.fine_from,
          fine_name: values.fine_name,
          description: values.description,
          amount: values.amount,
          due_date: values.due_date,
          start_date: values.start_date,
          end_date: values.end_date,
          old_fine_name: editData.fine_name,
          old_fine_from: editData.fine_from,
        };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/create_fine`, sendValues, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // console.log(response, "responseeeeeeeeeeeeeee");
            message.success(response.data.message);
            handleClose();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Update Fine Name
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                required
                sx={{ width: "80%" }}
                InputLabelProps={{ shrink: true }}
                name="fine_name"
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
                success={values.fine_name && !errors.fine_name}
                helperText={touched.fine_name && errors.fine_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                InputLabelProps={{ shrink: true }}
                name="description"
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
                success={values.description && !errors.description}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                required
                sx={{ width: "80%" }}
                InputLabelProps={{ shrink: true }}
                name="fine_from"
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
                success={values.fine_from && !errors.fine_from}
                helperText={touched.fine_from && errors.fine_from}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                required
                sx={{ width: "80%" }}
                InputLabelProps={{ shrink: true }}
                name="account_name"
                disabled
                onChange={handleChange}
                value={values.account_name}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Account Name
                  </MDTypography>
                }
                variant="standard"
                onBlur={handleBlur}
                error={touched.account_name && Boolean(errors.account_name)}
                success={values.account_name && !errors.account_name}
                helperText={touched.account_name && errors.account_name}
              />
            </Grid>
            {values.student_category == null || values.student_category == "" ? (
              <>
                {" "}
                <Grid item xs={12} sm={4}>
                  <MDInput
                    required
                    sx={{ width: "80%" }}
                    InputLabelProps={{ shrink: true }}
                    name="user_id"
                    disabled
                    onChange={handleChange}
                    value={values.user_id}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Admission No.
                      </MDTypography>
                    }
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.user_id && Boolean(errors.user_id)}
                    success={values.user_id && !errors.user_id}
                    helperText={touched.user_id && errors.user_id}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    required
                    sx={{ width: "80%" }}
                    InputLabelProps={{ shrink: true }}
                    name="student_name"
                    disabled
                    onChange={handleChange}
                    value={values.student_name}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Student Name
                      </MDTypography>
                    }
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.student_name && Boolean(errors.student_name)}
                    success={values.student_name && !errors.student_name}
                    helperText={touched.student_name && errors.student_name}
                  />
                </Grid>
              </>
            ) : (
              <Grid item xs={12} sm={4}>
                <MDInput
                  required
                  sx={{ width: "80%" }}
                  InputLabelProps={{ shrink: true }}
                  name="student_category"
                  disabled
                  onChange={handleChange}
                  value={values.student_category}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Category Name
                    </MDTypography>
                  }
                  variant="standard"
                  onBlur={handleBlur}
                  error={touched.student_category && Boolean(errors.student_category)}
                  success={values.student_category && !errors.student_category}
                  helperText={touched.student_category && errors.student_category}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={4}>
              <MDInput
                required
                sx={{ width: "80%" }}
                InputLabelProps={{ shrink: true }}
                name="user_id"
                disabled
                onChange={handleChange}
                value={`${values.class_name}-${values.section_name}`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Class & Section
                  </MDTypography>
                }
                variant="standard"
                onBlur={handleBlur}
                error={touched.user_id && Boolean(errors.user_id)}
                success={values.user_id && !errors.user_id}
                helperText={touched.user_id && errors.user_id}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDInput
                required
                sx={{ width: "80%" }}
                InputLabelProps={{ shrink: true }}
                name="amount"
                type="number"
                onChange={handleChange}
                value={values.amount}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Amount
                  </MDTypography>
                }
                variant="standard"
                onBlur={handleBlur}
                error={touched.amount && Boolean(errors.amount)}
                success={values.amount && !errors.amount}
                helperText={touched.amount && errors.amount}
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
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={4}>
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
        </MDBox>
      </Card>
    </form>
  );
}
