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
import { FormControlLabel, FormControl, Radio, RadioGroup } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Icon from "@mui/material/Icon";
import React from "react";
const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen } = props;
  const [fullnames, setFullnames] = useState({ first_name: "", middle_name: "", last_name: "" });
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
      guardian: [{ first_name: "", middle_name: "", last_name: "" }],
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
  const handleAddName = () => {
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
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <MDTypography variant="h6">Student Details</MDTypography>
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
            <MDTypography variant="h6">Personal Details</MDTypography>
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
          </Grid>{" "}
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
          </Grid>{" "}
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
            <MDTypography variant="h6">Upload Image</MDTypography>
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
            <MDTypography variant="h6">Contact Details</MDTypography>
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
                <MDTypography variant="h6">Guardian {index + 1} Details: &nbsp;</MDTypography>
                <Icon onClick={() => handleDeleteGuardian(index)} fontSize="medium">
                  <CancelIcon color="info" />
                </Icon>
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
            </React.Fragment>
          ))}
          <Grid item xs={6} sm={4} py={4}>
            {" "}
            <MDButton color="info" variant="contained" onClick={handleAddName}>
              Add +
            </MDButton>
          </Grid>
          <Grid item xs={6} sm={4} py={4}>
            {" "}
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
