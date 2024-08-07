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
        old_employee_type: editData.employee_type,
        employee_type: editData.employee_type,
      },
      // validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_emptype`, values, {
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
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              EMPLOYEE TYPE NAME *
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7}>
            <MDInput
              required
              sx={{ width: "65%" }}
              variant="standard"
              name="employee_type"
              placeholder="Enter Employee Type Name"
              value={values.employee_type}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.employee_type && Boolean(errors.employee_type)}
              success={values.employee_type.length && !errors.employee_type}
              helperText={touched.employee_type && errors.employee_type}
            />
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
