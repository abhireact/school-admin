import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect, Key } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ClearIcon from "@mui/icons-material/Clear";
import Icon from "@mui/material/Icon";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };
  //end

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      acd_name: "",
      cls_name: "",
      sec_name: "",
      dob: "",
      mob_no: "",
      address: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "",
      category: "",
      image: "",
      guardian: [
        {
          first_name: "",
          middle_name: "",
          last_name: "",
          relation: "",
          dob: "",
          occupation: "",
          image: "",
        },
      ],
      address_line: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      country: "",

      permanent_address_line: "",
      permanent_landmark: "",
      permanent_pincode: "",
      permanent_city: "",
      permanent_state: "",
      permanent_country: "",

      prev_school_name: "",
      prev_class: "",
      prev_year: "",
      prev_marks_obtained: "",
      prev_total_marks: "",
      prev_grade_percentage: "",

      transfer_certificate: "",
      birth_certificate: "",
      character_certificate: "",
      sibling: false,

      hobby: "",
      sport_activities: [{ name: "", file: "" }],
      extra_curricular: [{ name: "", file: "" }],
      health_record: [{ name: "", file: "" }],
      class_record: [{ name: "", file: "" }],
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.128:8000/create_student", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
        })
        .catch(() => {
          message.error("Error on creating  !");
        });

      action.resetForm();
    },
  });
  const handleAddGuardian = () => {
    setFieldValue("guardian", [
      ...values.guardian,
      { first_name: "", middle_name: "", last_name: "" },
    ]);
  };
  const handleDeleteGuardian = (indexToDelete: number) => {
    // guardian field will atleast have one object i.e. values.guardian.length > 1
    if (values.guardian.length > 1) {
      setFieldValue(
        "guardian",
        values.guardian.filter((_, index) => index !== indexToDelete)
      );
    }
  };
  const [checkAddress, setCheckedAddress] = useState(false);
  const handleCheckAddress = () => {
    setCheckedAddress(!checkAddress);
    if (!checkAddress) {
      setFieldValue("permanent_address_line", values.address_line);
      setFieldValue("permanent_landmark", values.landmark);
      setFieldValue("permanent_pincode", values.pincode);
      setFieldValue("permanent_city", values.city);
      setFieldValue("permanent_state", values.state);
      setFieldValue("permanent_country", values.country);
    }
  };
  const [previousEducation, setPreviousEducation] = useState(false);
  const [activities, setActivities] = useState(false);
  const handleAddSports = () => {
    setFieldValue("sport_activities", [...values.sport_activities, { name: "", file: "" }]);
  };
  const handleDeleteSports = (indexToDelete: number) => {
    if (values.sport_activities.length > 1) {
      setFieldValue(
        "sport_activities",
        values.sport_activities.filter((_, index) => index !== indexToDelete)
      );
    }
  };
  const handleAddExtra = () => {
    setFieldValue("extra_curricular", [...values.extra_curricular, { name: "", file: "" }]);
  };
  const handleDeleteExtra = (indexToDelete: number) => {
    if (values.extra_curricular.length > 1) {
      setFieldValue(
        "extra_curricular",
        values.extra_curricular.filter((_, index) => index !== indexToDelete)
      );
    }
  };
  const handleAddHealth = () => {
    setFieldValue("health_record", [...values.health_record, { name: "", file: "" }]);
  };
  const handleDeleteHealth = (indexToDelete: number) => {
    if (values.health_record.length > 1) {
      setFieldValue(
        "health_record",
        values.health_record.filter((_, index) => index !== indexToDelete)
      );
    }
  };
  const handleAddClass = () => {
    setFieldValue("class_record", [...values.class_record, { name: "", file: "" }]);
  };
  const handleDeleteClass = (indexToDelete: number) => {
    if (values.class_record.length > 1) {
      setFieldValue(
        "class_record",
        values.class_record.filter((_, index) => index !== indexToDelete)
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Student Details
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">User ID</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Admission Date</MDTypography>}
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
              label={<MDTypography variant="body2">Admission Number</MDTypography>}
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
              label={<MDTypography variant="body2">Fee Code</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={12} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Personal Details
            </MDTypography>
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
          </Grid>{" "}
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Middle Name</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>{" "}
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Last Name</MDTypography>}
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
              label={<MDTypography variant="body2">Academic Year</MDTypography>}
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
              label={<MDTypography variant="body2">Class</MDTypography>}
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
              label={<MDTypography variant="body2">Section</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Date of Birth</MDTypography>}
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
              label={<MDTypography variant="body2">Birth Place</MDTypography>}
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
              label={<MDTypography variant="body2">Blood Group</MDTypography>}
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
              label={<MDTypography variant="body2">Mother Tongue</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={2} mt={3}>
            <MDTypography variant="body2">Gender .:</MDTypography>
          </Grid>
          <Grid item xs={6} sm={4.1} mt={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                row
                name="radio-buttons-group"
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={values.gender.includes("Male")}
                      onChange={handleChange}
                      name="gender"
                      value="Male"
                    />
                  }
                  label={<MDTypography variant="body2">Male</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.gender.includes("Female")}
                      onChange={handleChange}
                      name="gender"
                      value="Female"
                    />
                  }
                  label={<MDTypography variant="body2">Female</MDTypography>}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2} mt={3}>
            <MDTypography variant="body2">Category .:</MDTypography>
          </Grid>
          <Grid item xs={6} sm={10} mt={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                row
                name="radio-buttons-group"
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={values.category.includes("SC")}
                      onChange={handleChange}
                      name="category"
                      value="SC"
                    />
                  }
                  label={<MDTypography variant="body2">SC</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.category.includes("ST")}
                      onChange={handleChange}
                      name="category"
                      value="ST"
                    />
                  }
                  label={<MDTypography variant="body2">ST</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.category.includes("Female")}
                      onChange={handleChange}
                      name="category"
                      value="Female"
                    />
                  }
                  label={<MDTypography variant="body2">OBC</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.category.includes("EWS")}
                      onChange={handleChange}
                      name="category"
                      value="EWS"
                    />
                  }
                  label={<MDTypography variant="body2">EWS</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.category.includes("General")}
                      onChange={handleChange}
                      name="category"
                      value="General"
                    />
                  }
                  label={<MDTypography variant="body2">General</MDTypography>}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Religion</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              type="number"
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Quota</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              type="number"
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">PEN Number</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={4} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Upload Image
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={8} mt={2}>
            <MDInput
              mb={2}
              type="file"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "90%" }}
              variant="standard"
              //label={<MDTypography variant="body2">Image</MDTypography>}
              name="image"
              value={values.image}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={12} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Contact Details
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              type="number"
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Mobile Number</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              type="number"
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Alternate Number</MDTypography>}
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
              label={<MDTypography variant="body2">Email ID</MDTypography>}
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          {values.guardian.map((name: any, index: number) => (
            <React.Fragment key={index}>
              <Grid
                item
                xs={6}
                sm={12}
                mt={3}
                sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
              >
                <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                  Guardian {index + 1} Details: &nbsp;
                </MDTypography>
                {values.guardian.length > 1 ? (
                  <Icon onClick={() => handleDeleteGuardian(index)} fontSize="medium">
                    <DeleteOutlineIcon color="error" />
                  </Icon>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">First Name</MDTypography>}
                  name={`guardian[${index}].first_name`}
                  value={values.guardian[index].first_name}
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
                  name={`guardian[${index}].middle_name`}
                  value={values.guardian[index].middle_name}
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
                  name={`guardian[${index}].last_name`}
                  value={values.guardian[index].last_name}
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
                  name={`guardian[${index}].relation`}
                  value={values.guardian[index].relation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">Date Of Birth</MDTypography>}
                  name={`guardian[${index}].dob`}
                  value={values.guardian[index].dob}
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
                  name={`guardian[${index}].occupation`}
                  value={values.guardian[index].occupation}
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
                  name={`guardian[${index}].occupation`}
                  value={values.guardian[index].occupation}
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
                  name={`guardian[${index}].occupation`}
                  value={values.guardian[index].occupation}
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
                  name={`guardian[${index}].occupation`}
                  value={values.guardian[index].occupation}
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
                  name={`guardian[${index}].occupation`}
                  value={values.guardian[index].occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">Email ID </MDTypography>}
                  name={`guardian[${index}].occupation`}
                  value={values.guardian[index].occupation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  type="file"
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">Upload Photo</MDTypography>}
                  name={`guardian[${index}].image`}
                  value={values.guardian[index].image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12} sm={12} py={4}>
            {" "}
            <MDButton color="info" variant="contained" onClick={handleAddGuardian}>
              Add +
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Current Address
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Address Line</MDTypography>}
              name="address_line"
              value={values.address_line}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Landmark</MDTypography>}
              name="landmark"
              value={values.landmark}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              type="number"
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Pincode</MDTypography>}
              name="pincode"
              value={values.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">City</MDTypography>}
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">State</MDTypography>}
              name="state"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Country</MDTypography>}
              name="country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={12} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Permanent Address
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={4} mt={2}>
            <MDTypography variant="body2">Same as Current Address</MDTypography>
          </Grid>
          <Grid item xs={6} sm={8} mt={1}>
            <Checkbox checked={checkAddress} onChange={handleCheckAddress} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Address Line</MDTypography>}
              name="permanent_address_line"
              value={values.permanent_address_line}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Landmark</MDTypography>}
              name="permanent_landmark"
              value={values.permanent_landmark}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Pincode</MDTypography>}
              name="permanent_pincode"
              value={values.permanent_pincode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">City</MDTypography>}
              name="permanent_city"
              value={values.permanent_city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">State</MDTypography>}
              name="permanent_state"
              value={values.permanent_state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Country</MDTypography>}
              name="permanent_country"
              value={values.permanent_country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Previous Education
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={8} mt={1}>
            <Checkbox
              checked={previousEducation}
              onChange={() => setPreviousEducation(!previousEducation)}
            />
          </Grid>
          {previousEducation && (
            <>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">School Name </MDTypography>}
                  name="prev_school_name"
                  value={values.prev_school_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">Class</MDTypography>}
                  name="prev_class"
                  value={values.prev_class}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">Year</MDTypography>}
                  name="prev_year"
                  value={values.prev_year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">Marks Obtained </MDTypography>}
                  name="prev_marks_obtained"
                  value={values.prev_marks_obtained}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">Total Marks</MDTypography>}
                  name="prev_total_marks"
                  value={values.prev_total_marks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  variant="standard"
                  label={<MDTypography variant="body2">Grade / Percentage</MDTypography>}
                  name="prev_grade_percentage"
                  value={values.prev_grade_percentage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }} mt={2}>
                <MDTypography variant="caption" fontWeight="semibold">
                  Is Transfer Certificate Produced ?
                </MDTypography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={values.category.includes("SC")}
                          onChange={handleChange}
                          name="category"
                          value="SC"
                        />
                      }
                      label={<MDTypography variant="caption">Yes</MDTypography>}
                    />
                    <FormControlLabel
                      // value="male"
                      control={
                        <Radio
                          checked={values.category.includes("ST")}
                          onChange={handleChange}
                          name="category"
                          value="ST"
                        />
                      }
                      label={<MDTypography variant="caption">No</MDTypography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }} mt={2}>
                <MDTypography variant="caption" fontWeight="semibold">
                  Is Character Certificate Produced ?
                </MDTypography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={values.category.includes("SC")}
                          onChange={handleChange}
                          name="category"
                          value="SC"
                        />
                      }
                      label={<MDTypography variant="caption">Yes</MDTypography>}
                    />
                    <FormControlLabel
                      // value="male"
                      control={
                        <Radio
                          checked={values.category.includes("ST")}
                          onChange={handleChange}
                          name="category"
                          value="ST"
                        />
                      }
                      label={<MDTypography variant="caption">No</MDTypography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }} mt={2}>
                <MDTypography variant="caption" fontWeight="semibold">
                  Is Birth Certificate Produced ?
                </MDTypography>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={values.category.includes("SC")}
                          onChange={handleChange}
                          name="category"
                          value="SC"
                        />
                      }
                      label={<MDTypography variant="caption">Yes</MDTypography>}
                    />
                    <FormControlLabel
                      // value="male"
                      control={
                        <Radio
                          checked={values.category.includes("ST")}
                          onChange={handleChange}
                          name="category"
                          value="ST"
                        />
                      }
                      label={<MDTypography variant="caption">No</MDTypography>}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
          )}
          <Grid item xs={6} sm={4} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Sibling
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={8} mt={1}>
            <Checkbox checked={values.sibling} onChange={handleChange} name="sibling" />
          </Grid>
          <Grid item xs={6} sm={4} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Activities
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={8} mt={1}>
            <Checkbox checked={activities} onChange={() => setActivities(!activities)} />
          </Grid>
          {activities && (
            <>
              <Grid item xs={12} sm={12} mt={2}>
                <MDTypography variant="body2">Sport Activity .:</MDTypography>
              </Grid>
              {values.sport_activities.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      mb={2}
                      sx={{ width: "80%" }}
                      variant="standard"
                      label={<MDTypography variant="body2">Name</MDTypography>}
                      name={`sport_activities[${index}].name`}
                      value={values.sport_activities[index].name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      mb={2}
                      sx={{ width: "80%" }}
                      variant="standard"
                      label={<MDTypography variant="body2">Upload Certificate</MDTypography>}
                      name={`sport_activities[${index}].file`}
                      value={values.sport_activities[index].file}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  {values.sport_activities.length > 1 ? (
                    <Grid item xs={6} sm={2} mt={2}>
                      <Icon onClick={() => handleDeleteSports(index)} fontSize="medium">
                        <DeleteOutlineIcon color="error" />
                      </Icon>
                    </Grid>
                  ) : (
                    <Grid item xs={6} sm={2} mt={2}></Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item xs={6} sm={2} mt={1}>
                <MDButton color="info" variant="outlined" onClick={handleAddSports}>
                  ADD &nbsp;+
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} mt={2}>
                <MDTypography variant="body2">Extra-Curricular .:</MDTypography>
              </Grid>
              {values.extra_curricular.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      mb={2}
                      sx={{ width: "80%" }}
                      variant="standard"
                      label={<MDTypography variant="body2">Name</MDTypography>}
                      name={`extra_curricular[${index}].name`}
                      value={values.extra_curricular[index].name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      mb={2}
                      sx={{ width: "80%" }}
                      variant="standard"
                      label={<MDTypography variant="body2">Upload Certificate</MDTypography>}
                      name={`extra_curricular[${index}].file`}
                      value={values.extra_curricular[index].file}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  {values.extra_curricular.length > 1 ? (
                    <Grid item xs={6} sm={2} mt={2}>
                      <Icon onClick={() => handleDeleteExtra(index)} fontSize="medium">
                        <DeleteOutlineIcon color="error" />
                      </Icon>
                    </Grid>
                  ) : (
                    <Grid item xs={6} sm={2} mt={2}></Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item xs={6} sm={2} mt={1}>
                <MDButton color="info" variant="outlined" onClick={handleAddExtra}>
                  ADD &nbsp;+
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} mt={2}>
                <MDTypography variant="body2">Health Record .:</MDTypography>
              </Grid>
              {values.health_record.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      mb={2}
                      sx={{ width: "80%" }}
                      variant="standard"
                      label={<MDTypography variant="body2">Name</MDTypography>}
                      name={`health_record[${index}].name`}
                      value={values.health_record[index].name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      mb={2}
                      sx={{ width: "80%" }}
                      variant="standard"
                      label={<MDTypography variant="body2">Upload Certificate</MDTypography>}
                      name={`health_record[${index}].file`}
                      value={values.health_record[index].file}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  {values.health_record.length > 1 ? (
                    <Grid item xs={6} sm={2} mt={2}>
                      <Icon onClick={() => handleDeleteHealth(index)} fontSize="medium">
                        <DeleteOutlineIcon color="error" />
                      </Icon>
                    </Grid>
                  ) : (
                    <Grid item xs={6} sm={2} mt={2}></Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item xs={6} sm={2} mt={1}>
                <MDButton color="info" variant="outlined" onClick={handleAddHealth}>
                  ADD &nbsp;+
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} mt={2}>
                <MDTypography variant="body2">Class Record .:</MDTypography>
              </Grid>
              {values.class_record.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      mb={2}
                      sx={{ width: "80%" }}
                      variant="standard"
                      label={<MDTypography variant="body2">Name</MDTypography>}
                      name={`class_record[${index}].name`}
                      value={values.class_record[index].name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      mb={2}
                      sx={{ width: "80%" }}
                      variant="standard"
                      label={<MDTypography variant="body2">Upload Certificate</MDTypography>}
                      name={`class_record[${index}].file`}
                      value={values.class_record[index].file}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  {values.class_record.length > 1 ? (
                    <Grid item xs={6} sm={2} mt={2}>
                      <Icon onClick={() => handleDeleteClass(index)} fontSize="medium">
                        <DeleteOutlineIcon color="error" />
                      </Icon>
                    </Grid>
                  ) : (
                    <Grid item xs={6} sm={2} mt={2}></Grid>
                  )}
                </React.Fragment>
              ))}
              <Grid item xs={6} sm={2} mt={1}>
                <MDButton color="info" variant="outlined" onClick={handleAddClass}>
                  ADD &nbsp;+
                </MDButton>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} py={4}>
            <MDButton color="info" variant="outlined" type="submit">
              Submit
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Create;
