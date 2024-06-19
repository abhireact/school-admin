import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

const Update = (props: any) => {
  const token = Cookies.get("token");
  const categories = ["None", "Single", "Married", "Divorced", "Widowed"];
  const Employeecategories = ["None", "Teaching Staff", "Non-Teaching Staff"];
  const Employeegrades = ["None", "A+", "A", "B+", "B", "C+", "C", "D+", "D", "E+", "E"];
  const genders = ["None", "Male", "Female"];
  const { setOpenupdate, editData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      joining_date: editData.joining_date,
      email: editData.email,
      first_name: editData.first_name,
      middle_name: editData.middle_name,
      last_name: editData.last_name,
      gender: editData.gender,
      date_of_birth: editData.date_of_birth,
      employee_profile: editData.employee_profile,
      employee_category: editData.employee_category,
      employee_department: editData.employee_department,
      job_title: editData.job_title,
      qualification: editData.qualification,
      total_year_experience: editData.total_year_experience,
      total_month_experience: editData.total_month_experience,
      employee_type: editData.employee_type,
      mother_tongue: editData.mother_tongue,
      ltc_applicable: editData.ltc_applicable,
      max_class_per_day: editData.max_class_per_day,
      employee_grade: editData.employee_grade,
      status: editData.status,
      aadhar_number: editData.aadhar_number,
      bank_name: editData.bank_name,
      account_number: editData.account_number,
      branch_name: editData.branch_name,
      ifsc_code: editData.ifsc_code,
      marital_status: editData.marital_status,
      mother_name: editData.mother_name,
      father_name: editData.father_name,
      blood_group: editData.blood_group,
      referred: editData.referred,
      referred_by: editData.referred_by,
      designation: editData.designation,
      address_line: editData.address_line,
      pin_code: editData.pin_code,
      city: editData.city,
      state: editData.state,
      country: editData.country,
      pr_address_line: editData.pr_address_line,
      pr_pin_code: editData.pr_pin_code,
      pr_city: editData.pr_city,
      pr_state: editData.pr_state,
      pr_country: editData.pr_country,
      mob_no: editData.mob_no,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_emp`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Updated successfully!");
          handleClose();
          action.resetForm();
        })
        .catch(() => {
          message.error("Error on updating  !");
        });
    },
  });
  const [checkAddress, setCheckedAddress] = useState(false);
  const handleCheckAddress = () => {
    setCheckedAddress(!checkAddress);
    if (!checkAddress) {
      setFieldValue("pr_address_line", values.address_line);

      setFieldValue("pr_pin_code", values.pin_code);
      setFieldValue("pr_city", values.city);
      setFieldValue("pr_state", values.state);
      setFieldValue("pr_country", values.country);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <MDTypography fontWeight="bold" fontSize="18px">
                Employee Details
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
                variant="standard"
                name="last_name"
                label={<MDTypography variant="body2">Last Name</MDTypography>}
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                type="date"
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                sx={{ width: "70%" }}
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
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                sx={{ width: "70%" }}
                variant="standard"
                name="date_of_birth"
                label={<MDTypography variant="body2">Date of Birth</MDTypography>}
                value={values.date_of_birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
                variant="standard"
                name="employee_profile"
                label={<MDTypography variant="body2">Profession *</MDTypography>}
                value={values.employee_profile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
                variant="standard"
                label={<MDTypography variant="body2">Mobile Number</MDTypography>}
                name="mob_no"
                value={values.mob_no}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "70%" }}
                variant="standard"
                label={<MDTypography variant="body2">Email</MDTypography>}
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="total_year_experience"
                label={<MDTypography variant="body2">Total Year Experience</MDTypography>}
                value={values.total_year_experience}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
                variant="standard"
                name="mother_tongue"
                label={<MDTypography variant="body2">Mother Tongue</MDTypography>}
                value={values.mother_tongue}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                type="number"
                sx={{ width: "70%" }}
                variant="standard"
                name="max_class_per_day"
                label={<MDTypography variant="body2">Max. Classes Per Day</MDTypography>}
                value={values.max_class_per_day}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
                variant="standard"
                name="aadhar_number"
                label={<MDTypography variant="body2">Aadhar Number</MDTypography>}
                value={values.aadhar_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
                variant="standard"
                name="account_number"
                label={<MDTypography variant="body2">Account Number</MDTypography>}
                value={values.account_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
                variant="standard"
                name="ifsc_code"
                label={<MDTypography variant="body2">IFSC Code</MDTypography>}
                value={values.ifsc_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
              <Checkbox checked={values.referred} onChange={handleChange} name="referred" />
            </Grid>
            {values.referred ? (
              <Grid item xs={12} sm={4}>
                <MDInput
                  sx={{ width: "70%" }}
                  variant="standard"
                  name="referred_by"
                  label={<MDTypography variant="body2">Referred By</MDTypography>}
                  value={values.referred_by}
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
                sx={{ width: "70%" }}
                variant="standard"
                label={<MDTypography variant="body2">Address Line</MDTypography>}
                name="address_line"
                value={values.address_line}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                type="number"
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
                variant="standard"
                label={<MDTypography variant="body2">Address Line</MDTypography>}
                name="pr_address_line"
                value={values.pr_address_line}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
                sx={{ width: "70%" }}
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
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Grid item mt={4}>
                <MDButton
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item ml={2} mt={4}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Update;
