import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect, Key, ChangeEvent } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox, Card } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ClearIcon from "@mui/icons-material/Clear";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import DataTable from "examples/Tables/DataTable";
import Dialog from "@mui/material/Dialog";
const token = Cookies.get("token");

const Create = (props: any) => {
  const { username, guardianData, setCreateOpen, fetchGuardian } = props;

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      relation: "",
      email_id: "",
      date_of_birth: "",
      qualification: "",
      occupation: "",
      designation: "",
      income: "",
      education: "",
      aadhar_number: "",
      mobile_number: "",
      notification: false,
      subscription: false,
    },

    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      const guardianDetails = {
        student_data: {
          user_name: username,
        },
        guardian_data: [values],
      };
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_guardian`, guardianDetails, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("guardian created for this student ");
          message.success("Guardian Added SuccessFully");
          fetchGuardian();
          action.resetForm();
          setCreateOpen(false);
        })
        .catch((error: any) => {
          message.error(error.response.data.detail);
        });
    },
  });

  //formik

  const handleImage = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        setFieldValue("guardian_img", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card id="guardian-info">
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4">Add Guardian </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                required
                sx={{ width: "80%" }}
                variant="standard"
                name={`first_name`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    First Name
                  </MDTypography>
                }
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"middle_name"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`middle_name`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Middle Name
                  </MDTypography>
                }
                value={values.middle_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"last_name"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`last_name`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Last Name
                  </MDTypography>
                }
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"relation"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`relation`}
                required
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Relation
                  </MDTypography>
                }
                value={values.relation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"email_id"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`email_id`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Email
                  </MDTypography>
                }
                value={values.email_id}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"date_of_birth"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="standard"
                name={`date_of_birth`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Date Of Birth
                  </MDTypography>
                }
                value={values.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"qualification"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`qualification`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Qualification
                  </MDTypography>
                }
                value={values.qualification}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"occupation"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`occupation`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Occupation
                  </MDTypography>
                }
                value={values.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"designation"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`designation`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Designation
                  </MDTypography>
                }
                value={values.designation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"income"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`income`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Income
                  </MDTypography>
                }
                value={values.income}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"education"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`education`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Education
                  </MDTypography>
                }
                value={values.education}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"aadhar_number"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`aadhar_number`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Aadhar Number
                  </MDTypography>
                }
                value={values.aadhar_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"mobile_number"}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                name={`mobile_number`}
                required
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Mobile Number
                  </MDTypography>
                }
                value={values.mobile_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} pt={2} sm={4} key={"notification"}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.notification}
                        name={`notification`}
                        onChange={handleChange}
                      />
                    }
                    label={
                      <MDTypography variant="button" fontWeight="bold">
                        Notification
                      </MDTypography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} pt={2} sm={4} key={"subscription"}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.subscription}
                        name={`subscription`}
                        onChange={handleChange}
                      />
                    }
                    label={
                      <MDTypography variant="button" fontWeight="bold">
                        Subscription
                      </MDTypography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
            py={2}
          >
            <Grid item mt={2}>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  setCreateOpen(false);
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
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
