import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
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

const Addrole = (props: any) => {
  // autcomplete location  start

  const token = Cookies.get("token");

  const { setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      role_name: "",
      role_display_name: "",
      role_short_code: "",
      status: "",
      description: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.200:8000/mg_role", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Role created successfully!");
          handleClose();
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
              Role Name
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
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
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Role Display Name
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="role_display_name"
              value={values.role_display_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Role Short Code
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="role_short_code"
              value={values.role_short_code}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item container>
            <Grid item xs={12} sm={5}>
              <MDTypography mb={2} variant="body2">
                Status
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <FormControl>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" row>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.status === "active"}
                        onChange={handleChange}
                        name="status"
                        value="active"
                      />
                    }
                    label={<MDTypography variant="body2">Active </MDTypography>}
                  />

                  <FormControlLabel
                    control={
                      <Radio
                        checked={values.status === "inactive"}
                        onChange={handleChange}
                        name="status"
                        value="inactive"
                      />
                    }
                    label={<MDTypography variant="body2">Inactive </MDTypography>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Description
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="description"
              value={values.description}
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

export default Addrole;
