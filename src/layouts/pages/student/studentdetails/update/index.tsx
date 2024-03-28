import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

const Update = (props: any) => {
  const { editData } = props;
  const token = Cookies.get("token");

  //formik
  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      admission_date: editData.admission_date,
      admission_number: editData.admission_number,
      first_name: editData.first_name,
      middle_name: editData.middle_name,
      last_name: editData.last_name,
      acd_name: editData.acd_name,
      cls_name: editData.cls_name,
      sec_name: editData.sec_name,
      dob: editData.dob,
      gender: editData.gender,
      birth_place: editData.birth_place,
      blood_group: editData.blood_group,
      aadhaar_number: editData.aadhaar_number,
      religion: editData.religion,
      mother_tongue: editData.mother_tongue,
      caste_category: editData.caste_category,
      pen_number: editData.pen_number,
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
      quota: editData.quota,
      mobile_number: editData.mobile_number,
      alt_mobile_number: editData.alt_mobile_number,
      email: editData.email,
      hobby: editData.hobby,
      prev_school_name: editData.prev_school_name,
      prev_class_name: editData.prev_class_name,
      year: editData.year,
      marks_obtained: editData.marks_obtained,
      total_marks: editData.total_marks,
      grade_percentage: editData.grade_percentage,
      sibling: editData.sibling,
      birth_certificate: editData.birth_certificate,
      character_certificate: editData.character_certificate,
      transfer_certificate: editData.transfer_certificate,
      stud_img: null,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      // action.resetForm();
      axios
        .put("http://10.0.20.128:8000/mg_student", values, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Student Updated successfully!");
        })
        .catch(() => {
          message.error("Error on Updating Student !");
        });
    },
  });
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
        setFieldValue("stud_img", e.target.files[0]);
      } else {
        message.error("Please select a valid PNG, JPEG, or HEIC image.");
      }
    }
  };

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
  const [previousEducation, setPreviousEducation] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <MDBox pt={4} px={4}>
        <Grid container>
          <Grid item xs={12} sm={12} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Student Details
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Admission Date</MDTypography>}
              name="admission_date"
              value={values.admission_date}
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
              label={<MDTypography variant="body2">Admission Number</MDTypography>}
              name="admission_number"
              value={values.admission_number}
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
              name="middle_name"
              value={values.middle_name}
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
              label={<MDTypography variant="body2">Academic Year</MDTypography>}
              name="acd_name"
              placeholder="eg. 2020-21"
              value={values.acd_name}
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
              name="cls_name"
              value={values.cls_name}
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
              name="sec_name"
              value={values.sec_name}
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
              name="dob"
              value={values.dob}
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
              name="birth_place"
              value={values.birth_place}
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
              name="blood_group"
              value={values.blood_group}
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
              label={<MDTypography variant="body2">Mother Tongue</MDTypography>}
              name="mother_tongue"
              value={values.mother_tongue}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Hobby</MDTypography>}
              name="hobby"
              value={values.hobby}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>{" "}
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Religion</MDTypography>}
              name="religion"
              value={values.religion}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Quota</MDTypography>}
              name="quota"
              value={values.quota}
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
              name="pen_number"
              value={values.pen_number}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
                      checked={values.caste_category.includes("SC")}
                      onChange={handleChange}
                      name="caste_category"
                      value="SC"
                    />
                  }
                  label={<MDTypography variant="body2">SC</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.caste_category.includes("ST")}
                      onChange={handleChange}
                      name="caste_category"
                      value="ST"
                    />
                  }
                  label={<MDTypography variant="body2">ST</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.caste_category.includes("Female")}
                      onChange={handleChange}
                      name="caste_category"
                      value="Female"
                    />
                  }
                  label={<MDTypography variant="body2">OBC</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.caste_category.includes("EWS")}
                      onChange={handleChange}
                      name="caste_category"
                      value="EWS"
                    />
                  }
                  label={<MDTypography variant="body2">EWS</MDTypography>}
                />
                <FormControlLabel
                  // value="male"
                  control={
                    <Radio
                      checked={values.caste_category.includes("General")}
                      onChange={handleChange}
                      name="caste_category"
                      value="General"
                    />
                  }
                  label={<MDTypography variant="body2">General</MDTypography>}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2} mt={3}>
            <MDTypography variant="body2">Gender .:</MDTypography>
          </Grid>
          <Grid item xs={6} sm={4} mt={2}>
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
            <MDTypography variant="body2">Sibling .:</MDTypography>
          </Grid>
          <Grid item xs={6} sm={4} mt={2}>
            <Checkbox checked={values.sibling} onChange={handleChange} name="sibling" />
          </Grid>
          <Grid item xs={12} sm={4} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Upload Image
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={8} mt={2}>
            <MDInput
              type="file"
              accept="image/*"
              name="stud_img"
              onChange={handleImage}
              sx={{ width: "84%" }}
              variant="standard"
              InputLabelProps={{ shrink: true }}
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
              name="mobile_number"
              value={values.mobile_number}
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
              name="alt_mobile_number"
              value={values.alt_mobile_number}
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
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
          <Grid item xs={6} sm={4.1} mt={2}>
            <MDTypography variant="body2">Same as Current Address</MDTypography>
          </Grid>
          <Grid item xs={6} sm={6} mt={1}>
            <Checkbox checked={checkAddress} onChange={handleCheckAddress} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Address Line</MDTypography>}
              name="pr_address_line"
              value={values.pr_address_line}
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
              name="pr_pin_code"
              value={values.pr_pin_code}
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
              name="pr_city"
              value={values.pr_city}
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
              name="pr_state"
              value={values.pr_state}
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
              name="pr_country"
              value={values.pr_country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6} sm={4.1} mt={2}>
            <MDTypography variant="body2" fontWeight="bold" fontSize="18px">
              Previous Education
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={6} mt={1}>
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
                  name="prev_class_name"
                  value={values.prev_class_name}
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
                  name="year"
                  value={values.year}
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
                  name="marks_obtained"
                  value={values.marks_obtained}
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
                  name="total_marks"
                  value={values.total_marks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <MDInput
                  mb={2}
                  sx={{ width: "80%" }}
                  type="numbers"
                  variant="standard"
                  label={<MDTypography variant="body2">Grade / Percentage</MDTypography>}
                  name="grade_percentage"
                  value={values.grade_percentage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }} mt={2}>
                <MDTypography variant="caption" fontWeight="bold">
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
                        <Checkbox
                          checked={values.transfer_certificate}
                          onChange={handleChange}
                          name="transfer_certificate"
                        />
                      }
                      label={
                        <MDTypography variant="caption" fontWeight="bold">
                          Yes
                        </MDTypography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }} mt={2}>
                <MDTypography variant="caption" fontWeight="bold">
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
                        <Checkbox
                          checked={values.character_certificate}
                          onChange={handleChange}
                          name="character_certificate"
                        />
                      }
                      label={
                        <MDTypography variant="caption" fontWeight="bold">
                          Yes
                        </MDTypography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} style={{ display: "flex", flexDirection: "column" }} mt={2}>
                <MDTypography variant="caption" fontWeight="bold">
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
                        <Checkbox
                          checked={values.birth_certificate}
                          onChange={handleChange}
                          name="birth_certificate"
                        />
                      }
                      label={
                        <MDTypography variant="caption" fontWeight="bold">
                          Yes
                        </MDTypography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            py={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
            mr={5}
          >
            <MDButton color="info" variant="contained" type="submit">
              Update &nbsp;
              <SaveIcon />
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
