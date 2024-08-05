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

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors } =
    useFormik({
      initialValues: {
        category_name: "",
        status: "InActive",
      },
      // validationSchema: validationSchema,
      onSubmit: (values, action) => {
        const sendValues = { ...values, status: values.status === "Active" ? true : false };
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_employee_category`, sendValues, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            handleClose();
            fetchData();
            message.success("Created Successfully!");
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
              CATEGORY NAME *
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7}>
            <MDInput
              required
              sx={{ width: "65%" }}
              variant="standard"
              name="category_name"
              value={values.category_name}
              placeholder="Enter Category Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.category_name && Boolean(errors.category_name)}
              success={values.category_name && !errors.category_name}
              helperText={touched.category_name && errors.category_name}
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

export default Create;
