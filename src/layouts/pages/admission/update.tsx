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

const EditAdmission = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const { editData } = location.state;
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
    academic_year: editData?.academic_year || "",
    class_name: editData?.class_name || "",
    admission_date: editData?.admission_date || "",
    form_number: editData?.form_number || "",
    candidate_first_name: editData?.candidate_first_name || "",
    candidate_middle_name: editData?.candidate_middle_name || "",
    candidate_last_name: editData?.candidate_last_name || "",
    candidate_dob: editData?.candidate_dob || "",
    category: editData?.category || "",
    religion: editData?.religion || "",
    gender: editData?.gender || "",
    nationality: editData?.nationality || "",
    blood_group: editData?.blood_group || "",
    father_first_name: editData?.father_first_name || "",
    father_middle_name: editData?.father_middle_name || "",
    father_last_name: editData?.father_last_name || "",
    father_qualification: editData?.father_qualification || "",
    father_occupation: editData?.father_occupation || "",
    father_designation: editData?.father_designation || "",
    father_place_occupation: editData?.father_place_occupation || "",
    father_number: editData?.father_number || "",
    father_email_id: editData?.father_email_id || "",
    mother_first_name: editData?.mother_first_name || "",
    mother_middle_name: editData?.mother_middle_name || "",
    mother_last_name: editData?.mother_last_name || "",

    mother_qualification: editData?.academic_year || "",
    mother_occupation: editData?.mother_occupation || "",
    mother_designation: editData?.mother_designation || "",
    mother_place_occupation: editData?.mother_place_occupation || "",
    mother_number: editData?.mother_number || "",
    mother_email_id: editData?.mother_email_id || "",
    address_line_1: editData?.address_line_1 || "",
    address_line_2: editData?.address_line_2 || "",

    district: editData?.district || "",
    country: editData?.country || "",
    pin_code: editData?.pin_code || "",
    correspondence_address_line_1: editData?.correspondence_address_line_1 || "",
    correspondence_address_line_2: editData?.correspondence_address_line_2 || "",
    correspondence_district: editData?.correspondence_district || "",
    correspondence_country: editData?.correspondence_country || "",

    correspondence_pin_code: editData?.correspondence_pin_code || "",
    alumni: editData?.alumni || false,
    from_year: editData?.from_year || "",
    to_year: editData?.to_year || "",
    from_class: editData?.from_class || "",
    to_class: editData?.to_class || "",
    siblings: editData?.siblings || false,

    upload_father_photo: editData?.upload_father_photo || "",
    upload_mother_photo: editData?.upload_mother_photo || "",

    upload_father_aadhar: editData?.upload_father_aadhar || "",
    upload_mother_aadhar: editData?.upload_mother_aadhar || "",

    upload_candidate_aadhar: editData?.upload_candidate_aadhar || "",
    upload_dob_certificate: editData?.upload_dob_certificate || "",
    upload_candidate_photo: editData?.upload_candidate_photo || "",
    id: editData?.id,
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
      navigate("/pages/admission/studentAdmission");
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
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <MDBox p={4}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Admission Form
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={3}>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="class_name"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Class Name
                        </MDTypography>
                      }
                      value={editData?.class_name}
                      // onChange={handleChange}
                      onBlur={handleBlur}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.admission_date && Boolean(errors.admission_date)}
                      helperText={touched.admission_date && errors.admission_date}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        {/* Form for candidate details */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Candidate Details
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for deatiled information */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Detailed Infromation
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
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
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for fathers information */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Father&apos;s Information
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
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
          </Card>
        </MDBox>
        {/* Form for mothers information */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Mother&apos;s Information
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
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
          </Card>
        </MDBox>
        {/* Form for Domicile */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Domicile
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
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
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for adress for correspondence */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <MDTypography variant="h6" color="secondary">
                    Address For Correspondence
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Checkbox
                    // checked={values.late_fine_discount}
                    name="same_as_current_address"
                    //  checked={isSameAsCurrentAddress}
                    value="true"
                    onChange={handleCheckboxChange}
                  />
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Same As Current Address
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
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
          </Card>
        </MDBox>
        {/* Alumni Section */}
        <Grid item xs={12}>
          <Card style={{ marginTop: "15px" }}>
            <MDBox style={{ padding: "16px" }}>
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <MDTypography variant="h6" color="secondary">
                    Alumni
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <MDTypography variant="overline" color="secondary">
                    Father/Mother was a student of this Institution
                  </MDTypography>
                  <FormControl
                    component="fieldset"
                    style={{ marginLeft: "16px" }}
                    error={touched.alumni && Boolean(errors.alumni)}
                  >
                    <FormLabel component="legend"></FormLabel>
                    <RadioGroup
                      row
                      aria-label="parent-student"
                      name="alumni"
                      value={values.alumni ? "yes" : "no"}
                      onChange={handleAlumniChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              {isAlumni && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Year
                        </MDTypography>
                      }
                      name="from_year"
                      value={values.from_year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.from_year && touched.from_year}
                      success={values.from_year.length && !errors.from_year}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          To Year
                        </MDTypography>
                      }
                      name="to_year"
                      value={values.to_year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.to_year && touched.to_year}
                      success={values.to_year.length && !errors.to_year}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Class
                        </MDTypography>
                      }
                      name="from_class"
                      value={values.from_class}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.from_class && touched.from_class}
                      success={values.from_class.length && !errors.from_class}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      sx={{ width: "100%" }}
                      variant="standard"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          To Class
                        </MDTypography>
                      }
                      name="to_class"
                      value={values.to_class}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.to_class && touched.to_class}
                      success={values.to_class.length && !errors.to_class}
                      required
                    />
                  </Grid>
                </Grid>
              )}
            </MDBox>
          </Card>
        </Grid>

        {/* form for Sibling Details */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <MDTypography variant="h6" color="secondary">
                    Sibling Details
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <MDTypography variant="overline" color="secondary">
                    Applicant’s elder brother/sister is studying in this institution
                  </MDTypography>
                  <FormControl component="fieldset" style={{ marginLeft: "16px" }}>
                    <FormLabel component="legend"></FormLabel>
                    <RadioGroup
                      row
                      aria-label="parent-student"
                      name="siblings"
                      value={values.siblings ? "yes" : "no"}
                      onChange={handleSiblingsChange}
                      onBlur={handleBlur}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              {isSiblings && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
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
                          <DeleteIcon
                            fontSize="medium"
                            onClick={() => handleRemoveField(field.id)}
                          />
                        </MDBox>
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              )}
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for Upload information */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <MDTypography variant="h6" color="secondary">
                    Upload Information
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Candidate Photo"
                    accept="image/*"
                    name="upload_candidate_photo"
                    onChange={(event: any) => handleImage(event, "upload_candidate_photo")}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                  />
                  {values.upload_candidate_photo && (
                    <img
                      src={values.upload_candidate_photo}
                      style={{ width: "80%", marginTop: "16px" }}
                    />
                  )}
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
                  {values.upload_father_photo && (
                    <img
                      src={values.upload_father_photo}
                      style={{ width: "80%", marginTop: "16px" }}
                    />
                  )}
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
          </Card>
        </MDBox>
        {/* instruction */}
        <MDTypography variant="overline">
          <b>Instruction:</b> Please check the information carefully before submitting. Once
          submitted, the information cannot be changed. Once you are sure about the correctness of
          the information, please click the “Submit” button.
        </MDTypography>
        {/* button for submit the form */}
        <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Grid item mt={2}>
            <MDButton color="info" variant="contained" type="submit" onClick={handleFormSubmit}>
              Submit
            </MDButton>
          </Grid>
          <Grid item mt={2} ml={2}>
            <MDButton
              color="dark"
              variant="contained"
              type="submit"
              // onClick={() => navigate("/pages/admission/Fee")}
              onClick={() => navigate("/pages/admission/studentAdmission")}
              // navigate("/pages/admission/Fee");
            >
              Back
            </MDButton>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default EditAdmission;
