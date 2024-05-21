import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import SaveIcon from "@mui/icons-material/Save";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

const Create = (props: any) => {
  const [referred, setReferred] = useState(false);
  const token = Cookies.get("token");
  const categories = ["None", "Single", "Married", "Divorced", "Widowed"];
  const Employeecategories = ["None", "Teaching Staff", "Non-Teaching Staff"];
  const Employeegrades = ["None", "A+", "A", "B+", "B", "C+", "C", "D+", "D", "E+", "E"];
  const genders = ["None", "Male", "Female"];
  const { handleShowPage, fetchData } = props;

  //end

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      joining_date: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "None",
      employee_dob: "",
      empoy_profile: "",
      employee_category: "",
      employee_department: "",
      job_title: "",
      qualification: "",
      total_yrs_experience: 0,
      total_month_experience: 0,
      employee_type: "",
      ltc_applicable: false,
      employee_grade: "None",
      status: "",
      aadhar_number: "",

      last_working_day: "",
      esi_number: "",
      una_number: "",
      phone_number: "",
      employee_notification: "",
      employee_subscription: "",
      employee_email_notificaton: "",
      employee_email_subscription: "",
      emergency_contact_name: "",
      emergency_contact_number: "",
      hobby: "",
      sport_activity: "",
      sport_activity_files: [],
      extra_curricular: "",
      extra_curricular_files: [],

      bank_name: "",
      account_name: "",
      branch_name: "",
      ifsc_number: "",
      marital_status: "None",
      mother_name: "",
      father_name: "",
      blood_group: "",
      refered_by: "",
      designation: "",
      address_line1: "",
      address_line2: "",
      pin_code: "",
      city: "",
      state: "",
      country: "",
      landmark: "",
      pr_landmark: "",
      pr_address_line1: "",
      pr_address_line2: "",
      pr_pin_code: "",
      pr_city: "",
      pr_state: "",
      pr_country: "",
      mobile_number: "",
      email: "",
      employee_img: null,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_employees`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          fetchData();
          message.success("Created Successfully!");
          action.resetForm();
        })
        .catch(() => {
          message.error("Error on Creating!");
        });
    },
  });
  const [checkAddress, setCheckedAddress] = useState(false);
  const handleCheckAddress = () => {
    setCheckedAddress(!checkAddress);
    if (!checkAddress) {
      setFieldValue("pr_landmark", values.landmark);
      setFieldValue("pr_address_line1", values.address_line1);
      setFieldValue("pr_address_line2", values.address_line2);
      setFieldValue("pr_pin_code", values.pin_code);
      setFieldValue("pr_city", values.city);
      setFieldValue("pr_state", values.state);
      setFieldValue("pr_country", values.country);
    }
  };
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
        setFieldValue("employee_img", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleSportActivity = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.sport_activity_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  const handleExtraCurricular = (e: { target: { files: any[] } }) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        message.error("File size exceeds 5 MB limit.");
        return;
      }

      // Check file type
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        // setFieldValue("stud_img", e.target.files[0]);
        values.extra_curricular_files.push(e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography fontWeight="bold" fontSize="18px">
                Employee Details
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="first_name"
                label={<MDTypography variant="body2">First Name</MDTypography>}
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="middle_name"
                label={<MDTypography variant="body2">Middle Name</MDTypography>}
                value={values.middle_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="last_name"
                label={<MDTypography variant="body2">Last Name</MDTypography>}
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} my={2}>
              <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                Upload Image *
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={8} my={2}>
              <MDInput
                type="file"
                accept="image/*"
                name="employee_img"
                onChange={handleImage}
                sx={{ width: "90%" }}
                variant="standard"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ width: "80%" }}
                variant="standard"
                name="joining_date"
                label={<MDTypography variant="body2">Joining Date</MDTypography>}
                value={values.joining_date}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                type="date"
                InputLabelProps={{ shrink: true }}
                sx={{ width: "80%" }}
                variant="standard"
                name="employee_dob"
                label={<MDTypography variant="body2">Date of Birth</MDTypography>}
                value={values.employee_dob}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "80%" }}
                value={values.gender}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "gender", value },
                  });
                }}
                options={genders}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    label={<MDTypography variant="body2">Gender</MDTypography>}
                    name="gender"
                    onChange={handleChange}
                    value={values.gender}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="empoy_profile"
                label={<MDTypography variant="body2">Profile *</MDTypography>}
                value={values.empoy_profile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "80%" }}
                value={values.employee_category}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "employee_category", value },
                  });
                }}
                options={Employeecategories}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    label={<MDTypography variant="body2">Category *</MDTypography>}
                    name="employee_category"
                    onChange={handleChange}
                    value={values.employee_category}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="employee_department"
                label={<MDTypography variant="body2">Department *</MDTypography>}
                value={values.employee_department}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="job_title"
                label={<MDTypography variant="body2">Job Title *</MDTypography>}
                value={values.job_title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="qualification"
                label={<MDTypography variant="body2">Qualification</MDTypography>}
                value={values.qualification}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                type="number"
                variant="standard"
                name="total_yrs_experience"
                label={<MDTypography variant="body2">Total Year Experience</MDTypography>}
                value={values.total_yrs_experience}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                type="number"
                variant="standard"
                name="total_month_experience"
                label={<MDTypography variant="body2">Total Month Experience</MDTypography>}
                value={values.total_month_experience}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="employee_type"
                label={<MDTypography variant="body2">Employement Type *</MDTypography>}
                value={values.employee_type}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Email</MDTypography>}
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "80%" }}
                value={values.employee_grade}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "employee_grade", value },
                  });
                }}
                options={Employeegrades}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    label={<MDTypography variant="body2">Employee Grade</MDTypography>}
                    name="employee_grade"
                    onChange={handleChange}
                    value={values.employee_grade}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="status"
                label={<MDTypography variant="body2">Status</MDTypography>}
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="aadhar_number"
                label={<MDTypography variant="body2">Aadhar Number</MDTypography>}
                value={values.aadhar_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="last_working_day"
                label={<MDTypography variant="body2">Last Working Day</MDTypography>}
                value={values.last_working_day}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="bank_name"
                label={<MDTypography variant="body2">Bank Name</MDTypography>}
                value={values.bank_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="account_name"
                label={<MDTypography variant="body2">Account Number</MDTypography>}
                value={values.account_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="branch_name"
                label={<MDTypography variant="body2">Branch Name</MDTypography>}
                value={values.branch_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="ifsc_number"
                label={<MDTypography variant="body2">IFSC Code</MDTypography>}
                value={values.ifsc_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "80%" }}
                value={values.marital_status}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "marital_status", value },
                  });
                }}
                options={categories}
                renderInput={(params: any) => (
                  <MDInput
                    label={<MDTypography variant="body2">Marital Status</MDTypography>}
                    name="marital_status"
                    onChange={handleChange}
                    value={values.marital_status}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="mother_name"
                label={<MDTypography variant="body2">Mother&apos;s Name</MDTypography>}
                value={values.mother_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="father_name"
                label={<MDTypography variant="body2">Father&apos;s Name</MDTypography>}
                value={values.father_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="blood_group"
                label={<MDTypography variant="body2">Blood Group</MDTypography>}
                value={values.blood_group}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                variant="standard"
                name="designation"
                label={<MDTypography variant="body2">Designation</MDTypography>}
                value={values.designation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={2.5} mt={3}>
              <MDTypography variant="body2">Is LTC Applicable ?</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={2}>
              <Checkbox
                checked={values.ltc_applicable}
                onChange={handleChange}
                name="ltc_applicable"
              />
            </Grid>
            <Grid item xs={6} sm={2.5} mt={3}>
              <MDTypography variant="body2">Was referred ?</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={2}>
              <Checkbox checked={referred} onChange={() => setReferred(!referred)} />
            </Grid>
            {referred ? (
              <Grid item xs={12} sm={4}>
                <MDInput
                  sx={{ width: "80%" }}
                  variant="standard"
                  name="refered_by"
                  label={<MDTypography variant="body2">Referred By</MDTypography>}
                  value={values.refered_by}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={12} sm={12} mt={2}>
              <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
                Current Address
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Address Line 1</MDTypography>}
                name="address_line1"
                value={values.address_line1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Address Line 2</MDTypography>}
                name="address_line2"
                value={values.address_line2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                type="number"
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Pincode</MDTypography>}
                name="pin_code"
                value={values.pin_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={6} sm={4.1} mt={2}>
              <MDTypography variant="body2">Same as Current Address</MDTypography>
            </Grid>
            <Grid item xs={6} sm={6} mt={1}>
              <Checkbox checked={checkAddress} onChange={handleCheckAddress} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Address Line 1</MDTypography>}
                name="pr_address_line1"
                value={values.pr_address_line1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Address Line 2</MDTypography>}
                name="pr_address_line2"
                value={values.pr_address_line2}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                type="number"
                variant="standard"
                label={<MDTypography variant="body2">Pincode</MDTypography>}
                name="pr_pin_code"
                value={values.pr_pin_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Landmark</MDTypography>}
                name="pr_landmark"
                value={values.pr_landmark}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">City</MDTypography>}
                name="pr_city"
                value={values.pr_city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">State</MDTypography>}
                name="pr_state"
                value={values.pr_state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                variant="standard"
                label={<MDTypography variant="body2">Country</MDTypography>}
                name="pr_country"
                value={values.pr_country}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
                    handleShowPage();
                  }}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item mr={6}>
                <MDButton color="info" variant="contained" type="submit">
                  Save&nbsp;
                  <SaveIcon />
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
