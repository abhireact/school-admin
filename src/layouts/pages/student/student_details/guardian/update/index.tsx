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
import * as Yup from "yup";
const token = Cookies.get("token");
const validationSchema = Yup.object().shape({
  date_of_birth: Yup.date().test("year-range", "Incorrect format", function (value: any) {
    if (value) {
      const year = value.getFullYear();
      return year >= 2000 && year <= 3000;
    }
    return true;
  }),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Incorrect Format *")
    .required("Required *"),
  first_name: Yup.string(),
  relation: Yup.string(),
});
const UpdateGuardian = (props: any) => {
  const { guardianData, fetchData, setOpen, fetchGuardian } = props;
  const [guardianInfo, setGuardianInfo] = useState({});
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_guardian/retrive`,
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
      relation: guardianData.relationship,
      dob: guardianData.dob,
      occupation: guardianData.occupation,
      income: guardianData.income,
      education: guardianData.education,
      adharnumber: guardianData.adhar_number,
      mobile_number: guardianData.mobile_number,
      _number: guardianData._number,
      email_id: guardianData.email,
      address_line1: guardianData.address_line1,
      address_line2: guardianData.address_line2,
      street: guardianData.street,
      landmark: guardianData.landmark,
      city: guardianData.city,
      state: guardianData.state,
      country: guardianData.country,
      pin_code: guardianData.pin_code,
      guardian_img: null,
      mobile_subscription: guardianData.subscription,
      mobile_notification: guardianData.notification,
      email_subscription: guardianData.subscription,
      email_notification: guardianData.notification,
      login_access: guardianData.login_access,
      primary_contact: guardianData.primary_contact,
    },

    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      const { login_access, primary_contact, ...sendValues } = values;
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_guardian/retrive`, sendValues, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("gettting guardian info ");
          fetchGuardian();
          message.success("Guardian Info Updated ");
          setOpen(false);
        })
        .catch((error) => {
          message.error("Error on updating Guardian!");
        });
      let guardianaccess = {
        user_name: guardianData.user_name,
        login_access: login_access,
        primary_contact: primary_contact,
      };
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_guardian/manage`, [guardianaccess], {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("Updating Guardian Access");
          // message.success("Updated Guardian Access");
        })
        .catch((error) => {
          console.error("Error while granting Guardian Access");
        });

     // action.resetForm();
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
        <MDBox p={4} pb={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4">Update Guardian </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                required
                sx={{ width: "90%" }}
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
                sx={{ width: "90%" }}
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
                sx={{ width: "90%" }}
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
                required
                sx={{ width: "90%" }}
                variant="standard"
                name={`relation`}
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
                sx={{ width: "90%" }}
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
            <Grid item xs={12} sm={4} key={"dob"}>
              <MDInput
                sx={{ width: "90%" }}
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                name={`dob`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Date Of Birth
                  </MDTypography>
                }
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            {/* <Grid item xs={12} sm={4} key={"qualification"}>
              <MDInput
                sx={{ width: "90%" }}
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

            <Grid item xs={12} sm={4} key={"designation"}>
              <MDInput
                sx={{ width: "90%" }}
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
            </Grid> */}
            <Grid item xs={12} sm={4} key={"occupation"}>
              <MDInput
                sx={{ width: "90%" }}
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
            <Grid item xs={12} sm={4} key={"income"}>
              <MDInput
                sx={{ width: "90%" }}
                variant="standard"
                name={`income`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Annual Income
                  </MDTypography>
                }
                value={values.income}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"education"}>
              <MDInput
                sx={{ width: "90%" }}
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
            <Grid item xs={12} sm={4} key={"adharnumber"}>
              <MDInput
                sx={{ width: "90%" }}
                variant="standard"
                name={`adharnumber`}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Aadhar Number
                  </MDTypography>
                }
                value={values.adharnumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} key={"mobile_number"}>
              <MDInput
                sx={{ width: "90%" }}
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
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={3} mt={2}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.email_notification}
                        name={`email_notification`}
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
            <Grid item xs={12} sm={3} mt={2}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.email_subscription}
                        name={`email_subscription`}
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
            <Grid item xs={12} sm={3} mt={2}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.login_access}
                        name={`login_access`}
                        onChange={handleChange}
                      />
                    }
                    label={
                      <MDTypography variant="button" fontWeight="bold">
                        Login Access
                      </MDTypography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} mt={2}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  row
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.primary_contact}
                        name={`primary_contact`}
                        onChange={handleChange}
                      />
                    }
                    label={
                      <MDTypography variant="button" fontWeight="bold">
                        Primary Contact
                      </MDTypography>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container></Grid>
          <Grid container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                Save&nbsp;
                <SaveIcon />
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default UpdateGuardian;
