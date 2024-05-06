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

const Guardian = (props: any) => {
  const { guardianData, fetchData, setOpen } = props;
  const [guardianInfo, setGuardianInfo] = useState({});
  useEffect(() => {
    axios
      .post(
        "http://10.0.20.200:8000/mg_guardian/retrive",
        {
          guardian_user_name: guardianData.user_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setGuardianInfo(response.data);
        console.log(response.data, "edit guardian data ");
      })
      .catch(() => {
        message.error("Error on adding Guardian!");
      });
  }, []);

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      user_name: guardianData.user_name,
      first_name: guardianData.first_name,
      middle_name: guardianData.middle_name,
      last_name: guardianData.last_name,
      relation: "",
      date_of_birth: "",
      occupation: "",
      annual_income: "",
      education: "",
      aadhaar_number: "",
      mobile_number: "",
      email: "",
      img: "",
    },

    // validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      axios
        .put("http://10.0.20.200:8000/mg_guardian", values, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("gettting guardian info ");
          setOpen(false);
        })
        .catch(() => {
          message.error("Error on updating Guardian!");
        });

      action.resetForm();
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
        setFieldValue("img", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card id="guardian-info">
        <MDBox px={4}>
          <Grid container>
            <Grid item xs={12} sm={12} py={2}>
              <MDTypography variant="h5">Update Guardian Information</MDTypography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">First Name</MDTypography>}
                name="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Middle Name</MDTypography>}
                name="middle_name"
                value={values.middle_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Last Name</MDTypography>}
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Relation</MDTypography>}
                name="relation"
                value={values.relation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Occupation</MDTypography>}
                name="occupation"
                value={values.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Annual Income</MDTypography>}
                name="annual_income"
                value={values.annual_income}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Education</MDTypography>}
                name="education"
                value={values.education}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Aadhaar Number</MDTypography>}
                name="aadhaar_number"
                value={values.aadhaar_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Mobile Number</MDTypography>}
                name="mobile_number"
                value={values.mobile_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Email</MDTypography>}
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <MDInput
                mb={2}
                type="date"
                sx={{ width: "80%" }}
                variant="standard"
                InputLabelProps={{ shrink: true }}
                label={<MDTypography variant="body2">Date Of Birth</MDTypography>}
                name="date_of_birth"
                value={values.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={4} mt={2}>
              <MDInput
                mb={2}
                type="file"
                accept="image/*"
                name="img"
                onChange={handleImage}
                sx={{ width: "80%" }}
                variant="standard"
                onBlur={handleBlur}
              />
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
                  setOpen(false);
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

export default Guardian;
