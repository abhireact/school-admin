import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

const Create = (props: any) => {
  const token = Cookies.get("token");
  const categories = ["None", "Single", "Married", "Divorced", "Widowed"];
  const genders = ["None", "Male", "Female"];
  const { handleShowPage } = props;

  //end

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      leave_type: "",
      leave_code: "",
      employee_type: "",
      min_leave_count: 0,
      max_no_of_leaves: 0,
      min_year_experience: 0,
      min_month_experience: 0,
      gender: "None",
      marital_status: "None",
      leave_not_deducted: false,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_leaves`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          action.resetForm();
        })
        .catch(() => {
          message.error("Error on creating  !");
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="leave_type"
                label={<MDTypography variant="body2">Leave Type</MDTypography>}
                value={values.leave_type}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="leave_code"
                label={<MDTypography variant="body2">Leave Code</MDTypography>}
                value={values.leave_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="employee_type"
                label={<MDTypography variant="body2">Employment Type</MDTypography>}
                value={values.employee_type}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="min_leave_count"
                label={<MDTypography variant="body2">Minimum Leave Count </MDTypography>}
                value={values.min_leave_count}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="max_no_of_leaves"
                label={<MDTypography variant="body2">Maximum No. of Leaves </MDTypography>}
                value={values.max_no_of_leaves}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="min_year_experience"
                label={<MDTypography variant="body2">Minimum Year of Experience </MDTypography>}
                value={values.min_year_experience}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="min_month_experience"
                label={<MDTypography variant="body2">Minimum Month of Experience </MDTypography>}
                value={values.min_month_experience}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.marital_status}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "marital_status", value },
                  });
                }}
                options={categories}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    label={<MDTypography variant="body2">Marital Status</MDTypography>}
                    name="marital_status"
                    onChange={handleChange}
                    value={values.marital_status}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.gender}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "gender", value },
                  });
                }}
                options={genders}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    label={<MDTypography variant="body2">Gender</MDTypography>}
                    name="gender"
                    onChange={handleChange}
                    value={values.gender}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} sm={2.5} mt={4}>
              <MDTypography variant="body2">Is leave not deducted ?</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={3}>
              <Checkbox
                checked={values.leave_not_deducted}
                onChange={handleChange}
                name="leave_not_deducted"
              />
            </Grid>

            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Grid item mt={4}>
                <MDButton
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleShowPage();
                  }}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item ml={2} mt={4}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
