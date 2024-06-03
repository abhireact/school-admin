// import FormControl from "@mui/material/FormControl";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";

import axios from "axios";
import Cookies from "js-cookie";
import * as Yup from "yup";
// import { useEffect, useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
const validationSchema = Yup.object().shape({
  start_date: Yup.date().required(),
  end_date: Yup.date().required("End date is required"),
});
const Update = (props: any) => {
  const { setOpenupdate, fetchData, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit data ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      academic_year: editData.academic_year,
      start_date: editData.start_date,
      end_date: editData.end_date,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      let sendData = {
        academic_year: values.academic_year,
        old_academic_year: editData.academic_year,
        start_date: values.start_date,
        end_date: values.end_date,
      };
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Updated  successfully!");
          fetchData();
          handleCloseupdate();
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              ACADEMIC YEAR
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              placeholder="eg. 2023-2024"
              sx={{ width: "65%" }}
              variant="standard"
              name="academic_year"
              value={values.academic_year}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.academic_year && Boolean(errors.academic_year)}
              success={values.academic_year.length && !errors.academic_year}
              helperText={touched.academic_year && errors.academic_year}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              START DATE
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              type="date"
              sx={{ width: "65%" }}
              variant="standard"
              name="start_date"
              value={values.start_date}
              onChange={handleChange}
              error={touched.start_date && Boolean(errors.start_date)}
              helperText={touched.start_date && errors.start_date}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              END DATE
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7}>
            <MDInput
              type="date"
              sx={{ width: "65%" }}
              variant="standard"
              name="end_date"
              value={values.end_date}
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
                  handleCloseupdate();
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
