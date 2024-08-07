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
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required *"),
});

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen, fetchData } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_castes`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          action.resetForm();

          message.success("Created Successfully!");
          fetchData();
        })
        .catch((error: any) => {
          message.error(error.response.data.detail);
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox pt={4} px={4} pb={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              CASTE *
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              sx={{ width: "65%" }}
              variant="standard"
              name="name"
              placeholder="Enter Caste"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              success={values.name.length && !errors.name}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              DESCRIPTION
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7}>
            <MDInput
              sx={{ width: "65%" }}
              rows={3}
              variant="standard"
              placeholder="Enter Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              success={values.description.length && !errors.description}
              helperText={touched.description && errors.description}
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
