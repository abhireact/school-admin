import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
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
  category_name: Yup.string().required("Category Name is required"),
  fee_particular_name: Yup.string().required("Fee Particular Name is required"),
  name: Yup.string().required(" Collection Name is required"),
  fine_name: Yup.string().required("Late Fine Name is required"),
});

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { handleClose, editData, fetchData } = props;
  let fetchdata = {
    academic_year: editData.academic_year,
    class_name: editData.class_name,
    section_name: editData.section_name,
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: editData.name,
      start_date: editData.start_date,
      end_date: editData.end_date,
      category_name: editData.category_name,
      fine_name: editData.fine_name,
      due_date: editData.due_date,
      fee_particular_name: editData.fee_particular_name,
      academic_year: editData.academic_year,
      class_name: editData.class_name,
      section_name: editData.section_name,
      old_name: editData.name,
      particular_id: editData.particular_id,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Updated Successfully!");
          fetchData(fetchdata);

          handleClose();
        })
        .catch((error: any) => {
          message.error(error.response.data.detail);
        });

      action.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Grid container p={3}>
        <Grid item xs={12} sm={6}>
          <MDTypography variant="h4" fontWeight="bold" color="secondary">
            Edit Fee Schedule
          </MDTypography>
        </Grid>
      </Grid>
      <MDBox p={4}>
        {" "}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MDInput
              disabled
              sx={{ width: "100%" }}
              variant="standard"
              name="category_name"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Fee Category
                </MDTypography>
              }
              value={values.category_name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              disabled
              sx={{ width: "100%" }}
              variant="standard"
              name="class_name"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Class Name
                </MDTypography>
              }
              value={values.class_name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              disabled
              sx={{ width: "100%" }}
              variant="standard"
              name="section_name"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Section Name
                </MDTypography>
              }
              value={values.section_name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              sx={{ width: "100%" }}
              variant="standard"
              name="name"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Fee Collection Name
                </MDTypography>
              }
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              success={values.name.length && !errors.name}
              helperText={touched.name && errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <MDInput
              type="date"
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
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
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
              sx={{ width: "80%" }}
              InputLabelProps={{ shrink: true }}
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
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
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

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item mt={2}>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Back
              </MDButton>
            </Grid>
            <Grid item mt={2} ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
