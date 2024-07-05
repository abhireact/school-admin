import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { message } from "antd";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik, useFormikContext } from "formik";
import MDInput from "components/MDInput";
import { format } from "date-fns";
import axios from "axios";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Autocomplete,
} from "@mui/material";
import { useSelector } from "react-redux";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
// import DeleteIcon from "@material-ui/icons/Delete";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { admissionformschema } from "./common_validationschema";

const EditAdmission = (props: any) => {
  const { username, setOpenupdate, fetchStudentInfo, dialogNumber, templateData } = props;
  const token = Cookies.get("token");
  const location = useLocation();
  const { classes, account, studentcategory } = useSelector((state: any) => state);
  const [isAlumni, setIsAlumni] = useState(false);
  const [isSiblings, setIsSiblings] = useState(false);
  const [isSameAsCurrentAddress, setIsSameAsCurrentAddress] = useState(false);
  const navigate = useNavigate();
  const handleAlumniChange = (event: any) => {
    handleChange(event);
    // setIsAlumni(event.target.value === "yes");
    const value = event.target.value === "yes";
    setFieldValue("alumni", value);
    setIsAlumni(value);
  };
  const handleSiblingsChange = (event: any) => {
    handleChange(event);
    const value = event.target.value === "yes";
    setFieldValue("siblings", value);
    setIsSiblings(value);
  };
  //display the current date
  const [currentDate, setCurrentDate] = useState(format(new Date(), "yyyy-MM-dd"));
  // const [fields, setFields] = useState([{ id: Date.now(), sibling_name: "", sibling_class: "" }]);
  const [fields, setFields] = useState([{ id: uuidv4(), sibling_name: "", sibling_class: "" }]);
  const handleAddField = () => {
    // setFields([...fields, { id: Date.now(), sibling_name: "", sibling_class: "" }]);
    setFields([...fields, { id: uuidv4(), sibling_name: "", sibling_class: "" }]);
  };

  const handleRemoveField = (id: any) => {
    if (fields.length > 1) {
      setFields(fields.filter((field) => field.id !== id));
    }
  };

  const handleFieldChange = (id: string, fieldName: string, value: any) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, [fieldName]: value } : field
    );
    setFields(updatedFields);
  };

  const handleCheckboxChange = (event: any) => {
    // const isChecked = event.target.checked;
    setIsSameAsCurrentAddress(event.target.checked);
    if (event.target.checked) {
      handleChange({
        target: { name: "correspondence_address_line_1", value: values.address_line_1 },
      });
      handleChange({
        target: { name: "correspondence_address_line_2", value: values.address_line_2 },
      });
      handleChange({
        target: { name: "correspondence_district", value: values.district },
      });
      handleChange({
        target: { name: "correspondence_country", value: values.country },
      });
      handleChange({
        target: { name: "correspondence_pin_code", value: values.pin_code },
      });
    }
  };

  //for converting the image in base 64 and check the filetype
  const handleImage = (event: any, fieldName: string) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "application/pdf"
      ) {
        message.error("Please select a valid PNG, JPEG, JPG, or PDF file.");
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue(fieldName, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const initialValues = {
    academic_year: templateData?.academic_year || "",
    class_name: templateData?.class_name || "",
    admission_date: templateData?.admission_date || "",
    form_number: templateData?.form_number || "",
    candidate_first_name: templateData?.candidate_first_name || "",
    candidate_middle_name: templateData?.candidate_middle_name || "",
    candidate_last_name: templateData?.candidate_last_name || "",
    candidate_dob: templateData?.candidate_dob || "",
    category: templateData?.category || "",
    religion: templateData?.religion || "",
    gender: templateData?.gender || "",
    nationality: templateData?.nationality || "",
    blood_group: templateData?.blood_group || "",
    father_first_name: templateData?.father_first_name || "",
    father_middle_name: templateData?.father_middle_name || "",
    father_last_name: templateData?.father_last_name || "",
    father_qualification: templateData?.father_qualification || "",
    father_occupation: templateData?.father_occupation || "",
    father_designation: templateData?.father_designation || "",
    father_place_occupation: templateData?.father_place_occupation || "",
    father_number: templateData?.father_number || "",
    father_email_id: templateData?.father_email_id || "",
    mother_first_name: templateData?.mother_first_name || "",
    mother_middle_name: templateData?.mother_middle_name || "",
    mother_last_name: templateData?.mother_last_name || "",

    mother_qualification: templateData?.academic_year || "",
    mother_occupation: templateData?.mother_occupation || "",
    mother_designation: templateData?.mother_designation || "",
    mother_place_occupation: templateData?.mother_place_occupation || "",
    mother_number: templateData?.mother_number || "",
    mother_email_id: templateData?.mother_email_id || "",
    address_line_1: templateData?.address_line_1 || "",
    address_line_2: templateData?.address_line_2 || "",

    district: templateData?.district || "",
    country: templateData?.country || "",
    pin_code: templateData?.pin_code || "",
    correspondence_address_line_1: templateData?.correspondence_address_line_1 || "",
    correspondence_address_line_2: templateData?.correspondence_address_line_2 || "",
    correspondence_district: templateData?.correspondence_district || "",
    correspondence_country: templateData?.correspondence_country || "",

    correspondence_pin_code: templateData?.correspondence_pin_code || "",
    alumni: templateData?.alumni || false,
    from_year: templateData?.from_year || "",
    to_year: templateData?.to_year || "",
    from_class: templateData?.from_class || "",
    to_class: templateData?.to_class || "",
    siblings: templateData?.siblings || false,

    upload_father_photo: templateData?.upload_father_photo || "",
    upload_mother_photo: templateData?.upload_mother_photo || "",

    upload_father_aadhar: templateData?.upload_father_aadhar || "",
    upload_mother_aadhar: templateData?.upload_mother_aadhar || "",

    upload_candidate_aadhar: templateData?.upload_candidate_aadhar || "",
    upload_dob_certificate: templateData?.upload_dob_certificate || "",
    upload_candidate_photo: templateData?.upload_candidate_photo || "",
    id: templateData?.id,
  };

  const handleFormSubmit = async () => {
    try {
      const allValues = {
        ...values,
        sibling_data: values.siblings
          ? fields.map((field) => ({
              sibling_name: field.sibling_name,
              sibling_class: field.sibling_class,
            }))
          : [],
      };

      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/admissions`, allValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Updated successfully!");
      props.handleClose();
      // navigate("/pages/admission/studentAdmission");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: admissionformschema,
      onSubmit: (values, action) => {
        handleFormSubmit();
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Form for candidate details */}
        {dialogNumber == 1 && (
          <Grid item sm={12}>
            <MDBox p={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <MDTypography color="secondary" variant="body2" fontWeight="bold" fontSize="18px">
                    STUDENT DETAILS
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="class_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Class Name
                      </MDTypography>
                    }
                    value={templateData?.class_name}
                    onBlur={handleBlur}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="form_number"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Form Number
                      </MDTypography>
                    }
                    value={values.form_number}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="admission_date"
                    value={currentDate}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Admission Date
                      </MDTypography>
                    }
                    onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                    disabled
                    error={touched.admission_date && Boolean(errors.admission_date)}
                    helperText={touched.admission_date && errors.admission_date}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="candidate_first_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        First Name
                      </MDTypography>
                    }
                    value={values.candidate_first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.candidate_first_name && touched.candidate_first_name}
                    success={values.candidate_first_name.length && !errors.candidate_first_name}
                  />
                  {errors.candidate_first_name && touched.candidate_first_name ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.candidate_first_name}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="candidate_middle_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Middle Name
                      </MDTypography>
                    }
                    value={values.candidate_middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="candidate_last_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Last Name
                      </MDTypography>
                    }
                    value={values.candidate_last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="candidate_dob"
                    value={values.candidate_dob}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Date of Birth
                      </MDTypography>
                    }
                    onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={touched.candidate_dob && Boolean(errors.candidate_dob)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={["General", "OBC", "SC", "ST"]}
                    getOptionLabel={(option) => option}
                    value={values.category}
                    onChange={(event: any, newValue) => {
                      handleChange({
                        target: {
                          name: "category",
                          value: newValue,
                        },
                      });
                    }}
                    renderInput={(params: any) => (
                      <MDInput
                        {...params}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Category
                          </MDTypography>
                        }
                        name="category"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={["Hindu", "Muslim", "Christian", "Sikh"]}
                    getOptionLabel={(option) => option}
                    value={values.religion}
                    onChange={(event: any, newValue) => {
                      handleChange({
                        target: {
                          name: "religion",
                          value: newValue,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Religion
                          </MDTypography>
                        }
                        name="religion"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={["Male", "Female", "Others"]}
                    getOptionLabel={(option) => option}
                    value={values.gender}
                    onChange={(event: any, newValue) => {
                      handleChange({
                        target: {
                          name: "gender",
                          value: newValue,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Gender
                          </MDTypography>
                        }
                        name="gender"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                    getOptionLabel={(option) => option}
                    value={values.blood_group}
                    onChange={(event: any, newValue) => {
                      handleChange({
                        target: {
                          name: "blood_group",
                          value: newValue,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Blood Group
                          </MDTypography>
                        }
                        name="blood_group"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={["Indian"]}
                    getOptionLabel={(option) => option}
                    value={values.nationality}
                    onChange={(event: any, newValue) => {
                      handleChange({
                        target: {
                          name: "nationality",
                          value: newValue,
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Nationality
                          </MDTypography>
                        }
                        name="nationality"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Upload Candidate Photo
                      </MDTypography>
                    }
                    accept="image/*"
                    name="upload_candidate_photo"
                    onChange={(event: any) => handleImage(event, "upload_candidate_photo")}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        )}
        {/* Form for father information */}
        {dialogNumber == 2 && (
          <Grid item sm={12}>
            <MDBox p={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h6" color="secondary">
                    Father&apos;s Information
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_first_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        First Name
                      </MDTypography>
                    }
                    value={values.father_first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.father_first_name && touched.father_first_name}
                    success={values.father_first_name.length && !errors.father_first_name}
                  />
                  {errors.father_first_name && touched.father_first_name ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.father_first_name}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_middle_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Middle Name
                      </MDTypography>
                    }
                    value={values.father_middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_last_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Last Name
                      </MDTypography>
                    }
                    value={values.father_last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_qualification"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Qualification
                      </MDTypography>
                    }
                    value={values.father_qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.father_qualification && touched.father_qualification}
                    success={values.father_qualification.length && !errors.father_qualification}
                  />
                  {errors.father_qualification && touched.father_qualification ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.father_qualification}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_occupation"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Occupation
                      </MDTypography>
                    }
                    value={values.father_occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.father_occupation && touched.father_occupation}
                    success={values.father_occupation.length && !errors.father_occupation}
                  />
                  {errors.father_occupation && touched.father_occupation ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.father_occupation}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_designation"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Designation
                      </MDTypography>
                    }
                    value={values.father_designation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_place_occupation"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Place of Occupation
                      </MDTypography>
                    }
                    value={values.father_place_occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_number"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Contact Number
                      </MDTypography>
                    }
                    value={values.father_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.father_number && touched.father_number}
                    success={values.father_number.length && !errors.father_number}
                  />
                  {errors.father_number && touched.father_number ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.father_number}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="father_email_id"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Email ID
                      </MDTypography>
                    }
                    value={values.father_email_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.father_email_id && touched.father_email_id}
                    success={values.father_email_id.length && !errors.father_email_id}
                  />
                  {errors.father_email_id && touched.father_email_id ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.father_email_id}
                    </MDTypography>
                  ) : null}
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        )}
        {/* Form for mother information */}
        {dialogNumber == 3 && (
          <Grid item sm={12}>
            <MDBox p={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h6" color="secondary">
                    Mother&apos;s Information
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        First Name
                      </MDTypography>
                    }
                    name="mother_first_name"
                    value={values.mother_first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.mother_first_name && touched.mother_first_name}
                    success={values.mother_first_name.length && !errors.mother_first_name}
                  />
                  {errors.mother_first_name && touched.mother_first_name ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.mother_first_name}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Middle Name
                      </MDTypography>
                    }
                    name="mother_middle_name"
                    value={values.mother_middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Last Name
                      </MDTypography>
                    }
                    name="mother_last_name"
                    value={values.mother_last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Qualification
                      </MDTypography>
                    }
                    name="mother_qualification"
                    value={values.mother_qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.mother_qualification && touched.mother_qualification}
                    success={values.mother_qualification.length && !errors.mother_qualification}
                  />
                  {errors.mother_qualification && touched.mother_qualification ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.mother_qualification}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Occupation
                      </MDTypography>
                    }
                    name="mother_occupation"
                    value={values.mother_occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.mother_occupation && touched.mother_occupation}
                    success={values.mother_occupation.length && !errors.mother_occupation}
                  />
                  {errors.mother_occupation && touched.mother_occupation ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.mother_occupation}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Designation
                      </MDTypography>
                    }
                    name="mother_designation"
                    value={values.mother_designation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Place of Occupation
                      </MDTypography>
                    }
                    name="mother_place_occupation"
                    value={values.mother_place_occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Contact Number
                      </MDTypography>
                    }
                    name="mother_number"
                    value={values.mother_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.mother_number && touched.mother_number}
                    success={values.mother_number.length && !errors.mother_number}
                  />
                  {errors.mother_number && touched.mother_number ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.mother_number}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="mother_email_id"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Email ID
                      </MDTypography>
                    }
                    value={values.mother_email_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.mother_email_id && touched.mother_email_id}
                    success={values.mother_email_id.length && !errors.mother_email_id}
                  />
                  {errors.mother_email_id && touched.mother_email_id ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.mother_email_id}
                    </MDTypography>
                  ) : null}
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        )}
        {/* Form for address information */}
        {dialogNumber == 4 && (
          <Grid item sm={12}>
            <MDBox p={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h6" color="secondary">
                    Address
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Address Line 1
                      </MDTypography>
                    }
                    name="address_line_1"
                    value={values.address_line_1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Address Line 2
                      </MDTypography>
                    }
                    name="address_line_2"
                    value={values.address_line_2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        District
                      </MDTypography>
                    }
                    name="district"
                    value={values.district}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Country
                      </MDTypography>
                    }
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Pin Code
                      </MDTypography>
                    }
                    name="pin_code"
                    value={values.pin_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.pin_code && touched.pin_code}
                    success={values.pin_code.length && !errors.pin_code}
                    required
                  />
                  {errors.pin_code && touched.pin_code ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.pin_code}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h6" color="secondary">
                    PERMANENT ADDRESS
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Checkbox
                    name="same_as_current_address"
                    // checked={isSameAsCurrentAddress}
                    value="true"
                    onChange={handleCheckboxChange}
                  />
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Same As Current Address
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Correspondence Line 1
                      </MDTypography>
                    }
                    name="correspondence_address_line_1"
                    value={
                      values.correspondence_address_line_1
                        ? values.address_line_1
                        : values.correspondence_address_line_1
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Correspondence Line 2
                      </MDTypography>
                    }
                    name="correspondence_address_line_2"
                    value={
                      values.correspondence_address_line_2
                        ? values.address_line_2
                        : values.correspondence_address_line_2
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Correspondence District
                      </MDTypography>
                    }
                    name="correspondence_district"
                    value={
                      values.correspondence_district
                        ? values.district
                        : values.correspondence_district
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Correspondence Country
                      </MDTypography>
                    }
                    name="correspondence_country"
                    value={
                      values.correspondence_country ? values.country : values.correspondence_country
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Correspondence Pin Code
                      </MDTypography>
                    }
                    name="correspondence_pin_code"
                    value={
                      values.correspondence_pin_code
                        ? values.pin_code
                        : values.correspondence_pin_code
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.correspondence_pin_code && touched.correspondence_pin_code}
                    success={
                      values.correspondence_pin_code.length && !errors.correspondence_pin_code
                    }
                  />
                  {errors.correspondence_pin_code && touched.correspondence_pin_code ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.correspondence_pin_code}
                    </MDTypography>
                  ) : null}
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        )}
        {/* Form for siblings */}
        {dialogNumber == 5 && (
          <Grid item sm={12}>
            <MDBox p={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={10}>
                  <MDTypography variant="h6" color="secondary">
                    Sibling Details
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <MDButton variant="contained" color="secondary" onClick={handleAddField}>
                    ADD
                  </MDButton>
                </Grid>
                {fields.map((field, index) => (
                  <React.Fragment key={field.id}>
                    <Grid item xs={12} sm={5}>
                      <MDInput
                        sx={{ width: "100%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {`Name ${index + 1}`}
                          </MDTypography>
                        }
                        name={`sibling_name-${field.id}`}
                        value={field.sibling_name}
                        onChange={(e: any) =>
                          handleFieldChange(field.id, "sibling_name", e.target.value)
                        }
                        onBlur={handleBlur}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <MDInput
                        sx={{ width: "100%" }}
                        variant="standard"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {`Class ${index + 1}`}
                          </MDTypography>
                        }
                        name={`sibling_class-${field.id}`}
                        value={field.sibling_class}
                        onChange={(e: any) =>
                          handleFieldChange(field.id, "sibling_class", e.target.value)
                        }
                        onBlur={handleBlur}
                        required
                      />
                    </Grid>
                    {index > 0 && (
                      <MDBox style={{ marginTop: "35px", marginLeft: "15px" }}>
                        <DeleteIcon fontSize="medium" onClick={() => handleRemoveField(field.id)} />
                      </MDBox>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </MDBox>
          </Grid>
        )}
        {/* Form for upload photo */}
        {dialogNumber == 6 && (
          <Grid item sm={12}>
            <MDBox p={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={10}>
                  <MDTypography variant="h6" color="secondary">
                    Upload Documents
                  </MDTypography>
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Father Photo"
                    accept="image/*"
                    name="upload_father_photo"
                    onChange={(event: any) => handleImage(event, "upload_father_photo")}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Mother Photo"
                    accept="image/*"
                    name="upload_mother_photo"
                    onChange={(event: any) => handleImage(event, "upload_mother_photo")}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                  {values.upload_mother_photo && (
                    <img
                      src={values.upload_mother_photo}
                      style={{ width: "80%", marginTop: "16px" }}
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Father Aadhar"
                    accept="image/*"
                    name="upload_father_aadhar"
                    onChange={(event: any) => handleImage(event, "upload_father_aadhar")}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                  {values.upload_father_aadhar && (
                    <img
                      src={values.upload_father_aadhar}
                      style={{ width: "80%", marginTop: "16px" }}
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Mother Aadhar"
                    accept="image/*"
                    name="upload_mother_aadhar"
                    onChange={(event: any) => handleImage(event, "upload_mother_aadhar")}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                  {values.upload_mother_aadhar && (
                    <img
                      src={values.upload_mother_aadhar}
                      style={{ width: "80%", marginTop: "16px" }}
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Candidate Aadhar"
                    accept="image/*"
                    name="upload_candidate_aadhar"
                    onChange={(event: any) => handleImage(event, "upload_candidate_aadhar")}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                  {values.upload_candidate_aadhar && (
                    <img
                      src={values.upload_candidate_aadhar}
                      style={{ width: "80%", marginTop: "16px" }}
                    />
                  )}
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload DOB Certficate"
                    accept="image/*"
                    name="upload_dob_certificate"
                    onChange={(event: any) => handleImage(event, "upload_dob_certificate")}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                  {values.upload_dob_certificate && (
                    <img
                      src={values.upload_dob_certificate}
                      style={{ width: "80%", marginTop: "16px" }}
                    />
                  )}
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        )}

        {/* button for submit the form */}
        <Grid
          item
          mb={1}
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          mr={5}
        >
          <Grid item mr={2}>
            <MDButton
              color="dark"
              variant="contained"
              onClick={() => {
                props.handleClose();
              }}
            >
              Back
            </MDButton>
          </Grid>
          <Grid item>
            <MDButton color="info" variant="contained" type="submit" onClick={handleFormSubmit}>
              Submit
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditAdmission;
