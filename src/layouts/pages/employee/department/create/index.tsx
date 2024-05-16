import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import SaveIcon from "@mui/icons-material/Save";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen, fetchData } = props;
  const handleClose = () => {
    setOpen(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } =
    useFormik({
      initialValues: {
        dept_name: "",
        dept_code: "",
        status: "",
      },
      // validationSchema: validationSchema,
      onSubmit: (values, action) => {
        const sendValues = { ...values, status: values.status === "Active" ? true : false };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/employee_department`, sendValues, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            handleClose();
            fetchData();
            action.resetForm();
            message.success(" Created successfully!");
          })
          .catch(() => {
            message.error("Error on creating  !");
          });
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Department Name
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              required
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="dept_name"
              value={values.dept_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dept_name && Boolean(errors.dept_name)}
              success={values.dept_name.length && !errors.dept_name}
              helperText={touched.dept_name && errors.dept_name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Department Code
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              required
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="dept_code"
              value={values.dept_code}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dept_code && Boolean(errors.dept_code)}
              success={values.dept_code.length && !errors.dept_code}
              helperText={touched.dept_code && errors.dept_code}
            />
          </Grid>
          <Grid item xs={12} sm={4} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Status
            </MDTypography>
          </Grid>
          <Grid sm={7} item mt={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                row
                name="status"
                value={values.status}
                onChange={(event) => {
                  setFieldValue("status", event.target.value);
                }}
              >
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Active
                    </MDTypography>
                  }
                  value="Active"
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      InActive
                    </MDTypography>
                  }
                  value="InActive"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid
            item
            container
            xs={12}
            sm={12}
            mt={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item>
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
            <Grid item ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save&nbsp; <SaveIcon />
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Create;
