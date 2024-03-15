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

const Editrole = (props: any) => {
  const { setOpenupdate, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit data ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: editData.username,
      email: editData.email,
      hashed_password: editData.hashed_password,
      user_role_name: editData.user_role_name,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendData = {
        old_username: editData.username,
        username: values.username,
        location_name: editData.location_name,
      };

      axios
        .put("http://10.0.20.133:8000/mg_roles", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Role created successfully!");
        })
        .catch(() => {
          message.error("Error on creating role !");
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
              User Name
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Email ID
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Password
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="hashed_password"
              value={values.hashed_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Role Name
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="user_role_name"
              value={values.user_role_name}
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

export default Editrole;
