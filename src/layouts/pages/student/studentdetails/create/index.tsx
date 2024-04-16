import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  FormControlLabel,
  Autocomplete,
  FormControl,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),

  admission_date: Yup.date().required("Required *"),
  dob: Yup.date().required("Required *"),
  admission_number: Yup.string().required("Required *"),
  first_name: Yup.string().required("Required *"),
  last_name: Yup.string().required("Required *"),
  mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Incorrect Format *")
    .required("Required *"),
  alt_mobile_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Incorrect Format *")
    .required("Required *"),
  aadhaar_number: Yup.string().matches(/^[0-9]{12}$/, "Incorrect Format *"),
  email: Yup.string().email("Incorrect Format *").required("Required *"),
});

const Create = (props: any) => {
  const { setFirstName, setMiddleName, setLastName, setdob } = props;
  const token = Cookies.get("token");
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);
  function filterSectionData(data: any, class_name: any) {
    let filtereddata = data
      .filter((item: any) => item.class_name === class_name)
      .map((item: any) => item.section_name);
    setFilteredSection(filtereddata);
  }

  useEffect(() => {
    axios
      .get("http://10.0.20.121:8000/mg_accademic_year", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("http://10.0.20.121:8000/mg_section", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setsectiondata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("http://10.0.20.121:8000/mg_class", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClassdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //formik
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        admission_date: "",
        admission_number: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        academic_year: "",
        class_name: "",
        section_name: "",
        dob: "",
        gender: "",
        birth_place: "",
        blood_group: "",
        aadhaar_number: "",
        religion: "",
        mother_tongue: "",
        caste_category: "",
        pen_number: "",
        address_line: "",
        pin_code: "",
        city: "",
        state: "",
        country: "",

        pr_address_line: "",

        pr_pin_code: "",
        pr_city: "",
        pr_state: "",
        pr_country: "",
        quota: "",
        mobile_number: "",
        alt_mobile_number: "",
        email: "",
        hobby: "",
        prev_school_name: "",
        prev_class_name: "",
        year: "",
        marks_obtained: "",
        total_marks: "",
        grade_percentage: "",

        sibling: false,

        birth_certificate: false,
        character_certificate: false,
        transfer_certificate: false,
        stud_img: null,
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        // action.resetForm();
        axios
          .post("http://10.0.20.121:8000/mg_student", values, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success(" Student Created successfully!");
            setFirstName(values.first_name);
            setMiddleName(values.middle_name);
            setLastName(values.last_name);
            setdob(values.dob);
          })
          .catch(() => {
            message.error("Error on creating Student !");
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
              label={<MDTypography variant="body2">Admission Date </MDTypography>}
              name="admission_date"
              value={values.admission_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.admission_date && Boolean(errors.admission_date)}
              helperText={touched.admission_date && errors.admission_date}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Admission Number </MDTypography>}
              name="admission_number"
              value={values.admission_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.admission_number && Boolean(errors.admission_number)}
              helperText={touched.admission_number && errors.admission_number}
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
              onChange={(event: { target: { value: any } }) => {
                handleChange({
                  target: { name: "first_name", value: event.target.value },
                });
              }}
              onBlur={handleBlur}
              error={touched.first_name && Boolean(errors.first_name)}
              helperText={touched.first_name && errors.first_name}
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
              onChange={(event: { target: { value: any } }) => {
                handleChange({
                  target: { name: "middle_name", value: event.target.value },
                });
              }}
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
              onChange={(event: { target: { value: any } }) => {
                handleChange({
                  target: { name: "last_name", value: event.target.value },
                });
              }}
              onBlur={handleBlur}
              error={touched.last_name && Boolean(errors.last_name)}
              helperText={touched.last_name && errors.last_name}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Autocomplete
              sx={{ width: "80%" }}
              value={values.academic_year}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "academic_year", value },
                });
                filterDataByAcdName(classdata, value);
              }}
              options={academicdata.map((acd) => acd.academic_year)}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="academic_year"
                  placeholder="2022-23"
                  label={<MDTypography variant="body2">Academic Year</MDTypography>}
                  onChange={handleChange}
                  value={values.academic_year}
                  {...params}
                  variant="standard"
                  error={touched.academic_year && Boolean(errors.academic_year)}
                  helperText={touched.academic_year && errors.academic_year}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <Autocomplete
              sx={{ width: "80%" }}
              value={values.class_name}
              onChange={
                filteredClass.length >= 1
                  ? (event, value) => {
                      handleChange({
                        target: { name: "class_name", value },
                      });
                      filterSectionData(sectiondata, value);
                    }
                  : undefined
              }
              options={filteredClass}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="class_name"
                  label={<MDTypography variant="body2">Class Name</MDTypography>}
                  onChange={handleChange}
                  value={values.class_name}
                  {...params}
                  variant="standard"
                  error={touched.class_name && Boolean(errors.class_name)}
                  helperText={touched.class_name && errors.class_name}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              sx={{ width: "80%" }}
              value={values.section_name}
              onChange={
                filteredSection.length >= 1
                  ? (event, value) => {
                      handleChange({
                        target: { name: "section_name", value },
                      });
                    }
                  : undefined
              }
              options={filteredSection}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="section_name"
                  label={<MDTypography variant="body2">Section Name</MDTypography>}
                  onChange={handleChange}
                  value={values.section_name}
                  {...params}
                  variant="standard"
                  error={touched.section_name && Boolean(errors.section_name)}
                  helperText={touched.section_name && errors.section_name}
                />
              )}
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
              error={touched.dob && Boolean(errors.dob)}
              helperText={touched.dob && errors.dob}
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
              error={touched.birth_place && Boolean(errors.birth_place)}
              helperText={touched.birth_place && errors.birth_place}
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
              error={touched.blood_group && Boolean(errors.blood_group)}
              helperText={touched.blood_group && errors.blood_group}
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
              error={touched.aadhaar_number && Boolean(errors.aadhaar_number)}
              helperText={touched.aadhaar_number && errors.aadhaar_number}
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
              error={touched.mother_tongue && Boolean(errors.mother_tongue)}
              helperText={touched.mother_tongue && errors.mother_tongue}
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
              error={touched.hobby && Boolean(errors.hobby)}
              helperText={touched.hobby && errors.hobby}
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
              error={touched.religion && Boolean(errors.religion)}
              helperText={touched.religion && errors.religion}
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
              error={touched.quota && Boolean(errors.quota)}
              helperText={touched.quota && errors.quota}
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
              error={touched.pen_number && Boolean(errors.pen_number)}
              helperText={touched.pen_number && errors.pen_number}
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
              Upload Image *
            </MDTypography>
          </Grid>
          <Grid item xs={6} sm={8} mt={2}>
            <MDInput
              required
              type="file"
              accept="image/*"
              name="stud_img"
              onChange={handleImage}
              sx={{ width: "90%" }}
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
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Mobile Number *</MDTypography>}
              name="mobile_number"
              value={values.mobile_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.mobile_number && Boolean(errors.mobile_number)}
              helperText={touched.mobile_number && errors.mobile_number}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Alternate Number</MDTypography>}
              name="alt_mobile_number"
              value={values.alt_mobile_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.alt_mobile_number && Boolean(errors.alt_mobile_number)}
              helperText={touched.alt_mobile_number && errors.alt_mobile_number}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <MDInput
              mb={2}
              sx={{ width: "80%" }}
              variant="standard"
              label={<MDTypography variant="body2">Email ID *</MDTypography>}
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
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
              error={touched.address_line && Boolean(errors.address_line)}
              helperText={touched.address_line && errors.address_line}
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
              error={touched.pin_code && Boolean(errors.pin_code)}
              helperText={touched.pin_code && errors.pin_code}
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
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
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
              error={touched.state && Boolean(errors.state)}
              helperText={touched.state && errors.state}
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
              error={touched.country && Boolean(errors.country)}
              helperText={touched.country && errors.country}
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
                  type="number"
                  variant="standard"
                  label={<MDTypography variant="body2">Percentage</MDTypography>}
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
              Save &nbsp;
              <SaveIcon />
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Create;
