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
import SaveIcon from "@mui/icons-material/Save";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, editData, fetchData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        old_dept_name: editData.dept_name,
        dept_name: editData.dept_name,
        dept_code: editData.dept_code,
        status: editData.status ? "Active" : "InActive",
      },
      // validationSchema: validationSchema,
      onSubmit: (values, action) => {
        const sendValues = { ...values, status: values.status === "Active" ? true : false };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/employee_department`, sendValues, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            fetchData();
            handleClose();
            message.success("Updated Successfully!");
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
          <Grid item xs={12} sm={4}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              DEPARTMENT NAME *
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7}>
            <MDInput
              required
              sx={{ width: "65%" }}
              variant="standard"
              name="dept_name"
              value={values.dept_name}
              placeholder="Enter Department Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dept_name && Boolean(errors.dept_name)}
              success={values.dept_name.length && !errors.dept_name}
              helperText={touched.dept_name && errors.dept_name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              DEPARTMENT CODE *
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7}>
            <MDInput
              required
              sx={{ width: "65%" }}
              variant="standard"
              name="dept_code"
              placeholder="Enter Department Code"
              value={values.dept_code}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dept_code && Boolean(errors.dept_code)}
              success={values.dept_code.length && !errors.dept_code}
              helperText={touched.dept_code && errors.dept_code}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              STATUS
            </MDTypography>
          </Grid>
          <Grid sm={7} item>
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
                      ACTIVE
                    </MDTypography>
                  }
                  value="Active"
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      INACTIVE
                    </MDTypography>
                  }
                  value="InActive"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
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

export default Update;
