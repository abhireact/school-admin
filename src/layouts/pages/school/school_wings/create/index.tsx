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

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen, fetchData } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = Yup.object().shape({
    wing_name: Yup.string().required("Required *"),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      wing_name: "",
      status: true,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_wing`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchData();
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
        <Grid container>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              WING NAME
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              sx={{ width: "65%" }}
              variant="standard"
              name="wing_name"
              placeholder="Enter Wing Name"
              value={values.wing_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.wing_name && Boolean(errors.wing_name)}
              helperText={touched.wing_name && errors.wing_name}
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

export default Create;
