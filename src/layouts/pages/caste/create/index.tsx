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
  caste: Yup.string().required("Required *"),
});

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen, fetchData } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      caste: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.121:8000/mg_castes", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Created successfully!");
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
              CASTE
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="caste"
              value={values.caste}
              onChange={handleChange}
              error={touched.caste && Boolean(errors.caste)}
              helperText={touched.caste && errors.caste}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="button" fontWeight="bold" color="secondary">
              DESCRIPTION .:
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              multiline
              mb={2}
              sx={{ width: "65%" }}
              rows={3}
              variant="standard"
              placeholder="write something here..."
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
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
