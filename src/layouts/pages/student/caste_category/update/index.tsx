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
  caste_category: Yup.string().required("Required *"),
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
      caste_category: editData.caste_category,

      description: editData.description,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      let sendData = {
        old_caste_category: editData.caste_category,
        caste_category: values.caste_category,

        description: values.description,
      };
      axios
        .put("http://10.0.20.200:8000/mg_caste_category", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Updated  successfully!");
          fetchData();
          handleCloseupdate();
        })
        .catch(() => {
          message.error("Error on updating !");
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
              CASTE CATEGORY
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="caste_category"
              value={values.caste_category}
              onChange={handleChange}
              error={touched.caste_category && Boolean(errors.caste_category)}
              helperText={touched.caste_category && errors.caste_category}
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
