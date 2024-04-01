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

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, editData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      acd_name: editData.acd_name,
      wing_name: editData.wing_name,
      code: editData.code,

      cls_name: editData.cls_name,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendValues = { ...values, old_cls_name: editData.cls_name };
      axios
        .put("http://10.0.20.128:8000/mg_class", sendValues, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          action.resetForm();
          message.success(" Updated successfully!");
        })
        .catch(() => {
          message.error("Error on updating  !");
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Class Name
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="cls_name"
              value={values.cls_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Wing Name
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="wing_name"
              value={values.wing_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Code
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="code"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Academic Year
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              placeholder="eg. 2023-24"
              sx={{ width: "65%" }}
              variant="standard"
              name="acd_name"
              value={values.acd_name}
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

export default Update;
