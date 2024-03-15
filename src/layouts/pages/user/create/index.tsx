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

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      hashed_password: "",
      user_role_name: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.128:8000/mg_users", values, {
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
                  handleClose();
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
                  handleClose();
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

export default Create;
