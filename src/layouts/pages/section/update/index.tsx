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
// import { useEffect, useState } from "react";
// import Autocomplete from "@mui/material/Autocomplete";

const Update = (props: any) => {
  const { setOpenupdate, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit data ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      acd_name: editData.acd_name,

      sec_name: editData.sec_name,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .put("http://10.0.20.128:8000/mg_update_section", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Updated  successfully!");
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
            <MDTypography mb={2} variant="body2">
              Academic Year
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="acd_name"
              value={values.acd_name}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Section Name
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="sec_name"
              value={values.sec_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid
            item
            container
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Grid item mt={4}>
              <MDButton
                color="info"
                variant="contained"
                type="submit"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Save
              </MDButton>
            </Grid>
            <Grid item ml={2} mt={4}>
              <MDButton
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleCloseupdate();
                }}
              >
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
