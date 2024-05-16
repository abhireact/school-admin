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
import * as Yup from "yup";

import axios from "axios";
import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";
const validationSchema = Yup.object().shape({
  wing_name: Yup.string().required("Required *"),
});
const Update = (props: any) => {
  const { setOpenupdate, fetchData, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit data ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      wing_name: editData.wing_name,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      let sendData = {
        old_wing_name: editData.wing_name,
        wing_name: values.wing_name,
        status: true,
      };
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_wing/`, sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          action.resetForm();
          handleCloseupdate();
          message.success("Updated  successfully!");
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
              onBlur={handleBlur}
              onChange={handleChange}
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
