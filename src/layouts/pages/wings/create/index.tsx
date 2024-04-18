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
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.121:8000/mg_wing", values, {
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
        .catch(() => {
          message.error("Error on creating  !");
        });

      action.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="button" fontWeight="bold" color="secondary">
              Wing Name
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="wing_name"
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
