// import FormControl from "@mui/material/FormControl";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";

import axios from "axios";
import Cookies from "js-cookie";
import * as Yup from "yup";
// import { useEffect, useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required *"),
});
const Update = (props: any) => {
  const { setOpenupdate, fetchData, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit data ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      name: editData.name,

      description: editData.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      let sendData = {
        old_caste_name: editData.name,
        name: values.name,

        description: values.description,
      };
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_castes`, sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          action.resetForm();
          handleCloseupdate();
          message.success("Updated  Successfully!");
          fetchData();
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
              CASTE
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
                  handleCloseupdate();
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

export default Update;
