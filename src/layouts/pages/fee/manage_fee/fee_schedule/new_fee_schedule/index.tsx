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
  start_date: Yup.date().required("Required *"),
  end_date: Yup.date().required("Required *"),
  due_date: Yup.date().required("Required *"),
});

const NewFeeSchedule = (props: any) => {
  const token = Cookies.get("token");

  const { handleClose } = props;

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      start_date: Date(),
      end_date: Date(),
      category_name: "",
      fine_name: "",
      due_date: Date(),
      fee_particular_name: "",
      academic_year: "",
      class_name: "",
      section_name: "",
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
          message.success("Created Successfully!");

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
      <MDBox p={4}>
        {" "}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MDInput
              sx={{ width: "80%" }}
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
              sx={{ width: "80%" }}
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
              sx={{ width: "80%" }}
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
              sx={{ width: "80%" }}
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
              sx={{ width: "80%" }}
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
              sx={{ width: "80%" }}
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
              error={touched.end_date && Boolean(errors.end_date)}
              helperText={touched.end_date && errors.end_date}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              type="date"
              sx={{ width: "80%" }}
              variant="standard"
              name="end_date"
              value={values.end_date}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Due Date
                </MDTypography>
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.end_date && Boolean(errors.end_date)}
              helperText={touched.end_date && errors.end_date}
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

export default NewFeeSchedule;
