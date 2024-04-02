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
  const categories = ["Single", "Married", "Divorced", "Widowed"];
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
      gender: "",
      marital_status: "",
      leave_not_deducted: false,
      accumulation: "",
      accumulation_period: "",
      accumulation_count: 0,
      is_auto_reset: false,
      reset_period: "",
      reset_start_date: "",
      is_carry_forward: false,
      carry_forward_limit: "",
      is_showable: false,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.128:8000/mg_emptype", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
        })
        .catch(() => {
          message.error("Error on creating  !");
        });

      action.resetForm();
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
                label={<MDTypography variant="body2">Employee Type</MDTypography>}
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
            <Grid item xs={6} sm={1.5} mt={3}>
              <MDTypography variant="body2">Gender .:</MDTypography>
            </Grid>
            <Grid item xs={6} sm={2.5} mt={2}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.gender.includes("Male")}
                        onChange={handleChange}
                        name="gender"
                        value="Male"
                      />
                    }
                    label={<MDTypography variant="body2">Male</MDTypography>}
                  />
                  <FormControlLabel
                    // value="male"
                    control={
                      <Radio
                        checked={values.gender.includes("Female")}
                        onChange={handleChange}
                        name="gender"
                        value="Female"
                      />
                    }
                    label={<MDTypography variant="body2">Female</MDTypography>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="accumulation"
                label={<MDTypography variant="body2">Accumulation</MDTypography>}
                value={values.accumulation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="accumulation_period"
                label={<MDTypography variant="body2">Accumulation Period</MDTypography>}
                value={values.accumulation_period}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="accumulation_count"
                label={<MDTypography variant="body2">Accumulation Count</MDTypography>}
                value={values.accumulation_count}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={2.5} mt={4}>
              <MDTypography variant="body2">Is Auto Reset ?</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={3}>
              <Checkbox
                checked={values.is_auto_reset}
                onChange={handleChange}
                name="is_auto_reset"
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="date"
                variant="standard"
                name="reset_start_date"
                InputLabelProps={{ shrink: true }}
                label={<MDTypography variant="body2">Reset Start Date</MDTypography>}
                value={values.reset_start_date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={2.5} mt={4}>
              <MDTypography variant="body2">Is Carry Forward ?</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={3}>
              <Checkbox
                checked={values.is_carry_forward}
                onChange={handleChange}
                name="is_carry_forward"
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="carry_forward_limit"
                label={<MDTypography variant="body2">Carry Forward Limit</MDTypography>}
                value={values.carry_forward_limit}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={2.5} mt={4}>
              <MDTypography variant="body2">Is Showable ?</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={3}>
              <Checkbox checked={values.is_showable} onChange={handleChange} name="is_showable" />
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
