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
        employee_type: "",
      },
      // validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_emptype`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            handleClose();
            fetchData();
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
      <MDBox p={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              EMPLOYEE TYPE NAME
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

          <Grid
            item
            container
            xs={12}
            sm={12}
            mt={4}
            sx={{ display: "flex", justifyContent: "flex-end" }}
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
