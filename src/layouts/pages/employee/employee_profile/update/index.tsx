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

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        old_position_name: editData.position_name,
        position_name: editData.position_name,
        category_name: editData.category_name || "",
        status: editData.satus ? "Active" : "InActive",
      },
      // validationSchema: validationSchema,
      onSubmit: (values, action) => {
        const sendValues = { ...values, status: values.status === "Active" ? true : false };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_employee_positions`, sendValues, {
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
          <Grid item xs={12} sm={4} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              CATEGORY NAME
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7} mt={2}>
            <Autocomplete
              sx={{ width: "65%" }}
              disableClearable
              value={values.category_name}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "category_name", value },
                });
              }}
              options={["Teaching Staff", "Non-Teaching Staff"]}
              renderInput={(params: any) => (
                <MDInput
                  required
                  InputLabelProps={{ shrink: true }}
                  name="category_name"
                  placeholder="Choose Category Name"
                  onChange={handleChange}
                  value={values.category_name}
                  {...params}
                  variant="standard"
                  onBlur={handleBlur}
                  error={touched.category_name && Boolean(errors.category_name)}
                  success={values.category_name.length && !errors.category_name}
                  helperText={touched.category_name && errors.category_name}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              POSITION NAME
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mt={2}>
            <MDInput
              sx={{ width: "65%" }}
              variant="standard"
              required
              placeholder="Enter Position Name"
              name="position_name"
              value={values.position_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.position_name && Boolean(errors.position_name)}
              success={values.position_name.length && !errors.position_name}
              helperText={touched.position_name && errors.position_name}
            />
          </Grid>

          <Grid item xs={12} sm={4} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              STATUS
            </MDTypography>
          </Grid>
          <Grid sm={7} item mt={2}>
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
                      ACTIVE
                    </MDTypography>
                  }
                  value="Active"
                />
                <FormControlLabel
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      INACTIVE
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
            sx={{ display: "flex", justifyContent: "flex-end" }}
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
