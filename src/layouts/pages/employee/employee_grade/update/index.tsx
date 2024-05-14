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
import SaveIcon from "@mui/icons-material/Save";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, editData, fetchData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        old_grade_name: editData.grade_name,
        grade_name: editData.grade_name,
        priority: editData.priority,
        status: editData.status ? "Active" : "InActive",
      },
      // validationSchema: validationSchema,
      onSubmit: (values, action) => {
        const sendValues = { ...values, status: values.status === "Active" ? true : false };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_Egrade`, sendValues, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            fetchData();
            handleClose();
            message.success(" Updated Successfully!");
          })
          .catch(() => {
            message.error("Error on  Updating  !");
          });

        action.resetForm();
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Grade Name
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="grade_name"
              value={values.grade_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.grade_name && Boolean(errors.grade_name)}
              success={values.grade_name.length && !errors.grade_name}
              helperText={touched.grade_name && errors.grade_name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Priority
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.priority && Boolean(errors.priority)}
              success={values.priority.length && !errors.priority}
              helperText={touched.priority && errors.priority}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Status
            </MDTypography>
          </Grid>
          <Grid sm={7} item>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                row
                name="status"
                value={values.status}
                onChange={(event) => {
                  setFieldValue("status", event.target.value);
                }}
              >
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Active
                    </MDTypography>
                  }
                  value="Active"
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      InActive
                    </MDTypography>
                  }
                  value="InActive"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={12}
            mt={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item>
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
            <Grid item ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save&nbsp; <SaveIcon />
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
