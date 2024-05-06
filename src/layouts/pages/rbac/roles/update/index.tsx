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
  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const { setOpenupdate, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit date ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  // editData to give intial values
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      role_name: editData.role_name,
      // role_short_code: editData.role_short_code,
      // role_access: editData.seeded,
      // status: editData.status,
      // description: editData.description,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendData = {
        old_role_name: editData.role_name,
        role_name: values.role_name,
        role_short_code: editData.role_short_code,
        description: editData.description,
        status: editData.status,
        seeded: editData.seeded,
      };

      axios
        .put("http://10.0.20.200:8000/mg_role", sendData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          handleCloseupdate();
          message.success("Role updated successfully!");
        })
        .catch(() => {
          message.error("Error on updating role !");
        });

      action.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item sm={5}>
            <MDTypography mb={2} variant="body2">
              Role Display Name
            </MDTypography>
          </Grid>
          <Grid item sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="role_name"
              value={values.role_name}
              onChange={handleChange}
              onBlur={handleBlur}
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
                update
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Editrole;
