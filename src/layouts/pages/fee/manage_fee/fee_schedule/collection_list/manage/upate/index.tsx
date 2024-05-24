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
const Update = (props: any) => {
  const token = Cookies.get("token");

  const { handleClose, editData } = props;

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: editData.name,
      particular_id: editData.particular_id,
      academic_year: editData.academic_year,
      class_name: editData.class_name,
      section_name: editData.section_name,
      user_name: editData.user_name,
      amount: editData.amount,
    },

    onSubmit: (values, action) => {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_fee_schedule/students`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          window.location.reload();
          message.success("Updated Successfully!");

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
              name="academic_year"
              value={values.academic_year}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Academic Year
                </MDTypography>
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.academic_year && Boolean(errors.academic_year)}
              helperText={touched.academic_year && errors.academic_year}
              success={values.academic_year.length && !errors.academic_year}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDInput
              sx={{ width: "80%" }}
              variant="standard"
              name="amount"
              type="number"
              value={values.amount}
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Amount
                </MDTypography>
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.amount && Boolean(errors.amount)}
              helperText={touched.amount && errors.amount}
              success={values.amount.length && !errors.amount}
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
