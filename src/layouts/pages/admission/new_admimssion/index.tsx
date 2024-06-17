import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik, useFormikContext } from "formik";
import MDInput from "components/MDInput";
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
import { admissionformschema } from "../common_validationschema";
import { useSelector } from "react-redux";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import { initialValues } from "../initialvalues";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
// import DeleteIcon from "@material-ui/icons/Delete";
import DeleteIcon from "@mui/icons-material/Delete";

const AdmissionForm = () => {
  const { classes, account, studentcategory } = useSelector((state: any) => state);
  const [isAlumni, setIsAlumni] = useState(false);
  const [isSiblings, setIsSiblings] = useState(false);
  const [isSameAsCurrentAddress, setIsSameAsCurrentAddress] = useState(false);
  const navigate = useNavigate();
  const handleAlumniChange = (event: any) => {
    handleChange(event);
    setIsAlumni(event.target.value === "yes");
  };
  const handleSiblingsChange = (event: any) => {
    handleChange(event);
    setIsSiblings(event.target.value === "yes");
  };

  const [fields, setFields] = useState([{ id: Date.now(), name: "", className: "" }]);

  const handleAddField = () => {
    setFields([...fields, { id: Date.now(), name: "", className: "" }]);
  };

  const handleRemoveField = (id: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((field) => field.id !== id));
    }
  };

  const handleFieldChange = (id: number, fieldName: any, value: any) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, [fieldName]: value } : field)));
  };

  const handleClearClick = () => {
    // setAutocompleteValue(null);
    resetForm();
  };

  const handleCheckboxChange = (event: any) => {
    setIsSameAsCurrentAddress(event.target.checked);
    if (event.target.checked) {
      handleChange({
        target: { name: "correspondence_line_1", value: values.address_line_1 },
      });
      handleChange({
        target: { name: "correspondence_line_2", value: values.address_line_2 },
      });
      handleChange({
        target: { name: "correspondence_district", value: values.district },
      });
      handleChange({
        target: { name: "correspondence_country", value: values.country },
      });
      handleChange({
        target: { name: "correspondence_pincode", value: values.pin_code },
      });
    }
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: admissionformschema,
    onSubmit: async () => {},
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <MDBox p={3}>
                <MDBox
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Admission Form
                  </MDTypography>
                </MDBox>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "academic_year", value } });
                      }}
                      options={
                        classes
                          ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="academic_year"
                          onChange={handleChange}
                          value={values.academic_year}
                          label="Academic Year"
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "class_name", value } });
                      }}
                      options={
                        values.academic_year !== ""
                          ? classes
                              .filter((item: any) => item.academic_year === values.academic_year)
                              .map((item: any) => item.class_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="class_name"
                          onChange={handleChange}
                          value={values.class_name}
                          label="Class"
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormField
                      label="Form Number"
                      name="form_number"
                      value={values.form_number}
                      onBlur={handleBlur}
                      disabled
                      required
                      // error={errors.first_name && touched.first_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormField
                      type="date"
                      label="Admission Date"
                      name="admission_date"
                      InputLabelProps={{ shrink: true }}
                      value={values.admission_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        {/* Form for candidate details  */}
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
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="First Name"
                    name="candidate_first_name"
                    required
                    value={values.candidate_first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  <FormField
                    label="Middle Name"
                    name="candidate_middle_name"
                    value={values.candidate_middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.candidate_middle_name && touched.candidate_middle_name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Last Name"
                    name="candidate_last_name"
                    value={values.candidate_last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.candidate_last_name && touched.candidate_last_name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    type="date"
                    label="Date of Birth"
                    name="candidate_dob"
                    InputLabelProps={{ shrink: true }}
                    value={values.candidate_dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for deatiled information  */}
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
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        variant="standard"
                        label="Category"
                        name="category"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
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
                        label="Religion"
                        name="religion"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
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
                        label="Gender"
                        name="gender"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
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
                        label="Blood Group"
                        name="blood_group"
                        onBlur={handleBlur}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
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
                        label="Nationality"
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
        {/* Form for fathers information  */}
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
                  <FormField
                    label="First Name"
                    name="father_first_name"
                    required
                    value={values.father_first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  <FormField
                    label="Middle Name"
                    name="father_middle_name"
                    value={values.father_middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Last Name"
                    name="father_last_name"
                    value={values.father_last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Qualification"
                    name="father_qualification"
                    value={values.father_qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.father_qualification && touched.father_qualification}
                    success={values.father_qualification.length && !errors.father_qualification}
                    required
                  />
                  {errors.father_qualification && touched.father_qualification ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.father_qualification}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Occupation"
                    name="father_occupation"
                    value={values.father_occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.father_occupation && touched.father_occupation}
                    success={values.father_occupation.length && !errors.father_occupation}
                    required
                  />
                  {errors.father_occupation && touched.father_occupation ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.father_occupation}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Designation"
                    name="father_designation"
                    value={values.father_designation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Place of Occupation"
                    name="father_place_occupation"
                    value={values.father_place_occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Contact Number"
                    name="father_number"
                    value={values.father_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.father_number && touched.father_number}
                    success={values.father_number.length && !errors.father_number}
                    required
                  />
                  {errors.father_number && touched.father_number ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.father_number}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Email Id"
                    name="father_email_id"
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
        {/* Form for mothers information  */}
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
                  <FormField
                    label="First Name"
                    name="mother_first_name"
                    required
                    value={values.mother_first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                  <FormField
                    label="Middle Name"
                    name="mother_middle_name"
                    value={values.mother_middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Last Name"
                    name="mother_last_name"
                    value={values.mother_last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Qualification"
                    name="mother_qualification"
                    value={values.mother_qualification}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.mother_qualification && touched.mother_qualification}
                    success={values.mother_qualification.length && !errors.mother_qualification}
                    required
                  />
                  {errors.mother_qualification && touched.mother_qualification ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.mother_qualification}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Occupation"
                    name="mother_occupation"
                    value={values.mother_occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.mother_occupation && touched.mother_occupation}
                    success={values.mother_occupation.length && !errors.mother_occupation}
                    required
                  />
                  {errors.mother_occupation && touched.mother_occupation ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.mother_occupation}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Designation"
                    name="mother_designation"
                    value={values.mother_designation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Place of Occupation"
                    name="mother_place_occupation"
                    value={values.mother_place_occupation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Contact Number"
                    name="mother_number"
                    value={values.mother_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.mother_number && touched.mother_number}
                    success={values.mother_number.length && !errors.mother_number}
                    required
                  />
                  {errors.mother_number && touched.mother_number ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.mother_number}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Email Id"
                    name="mother_email_id"
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
        {/* Form for guardian information  */}
        <MDBox style={{ marginTop: "15px" }}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h6" color="secondary">
                    Guardian&apos;s Details
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="First Name"
                    name="guardian_first_name"
                    value={values.guardian_first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.guardian_first_name && touched.guardian_first_name}
                    success={values.guardian_first_name.length && !errors.guardian_first_name}
                  />
                  {errors.guardian_first_name && touched.guardian_first_name ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.guardian_first_name}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Middle Name"
                    name="guardian_middle_name"
                    value={values.guardian_middle_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Last Name"
                    name="guardian_last_name"
                    value={values.guardian_last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Relation With Candidate"
                    name="relation_with_candidate"
                    value={values.relation_with_candidate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.relation_with_candidate && touched.relation_with_candidate}
                    success={
                      values.relation_with_candidate.length && !errors.relation_with_candidate
                    }
                  />
                  {errors.relation_with_candidate && touched.relation_with_candidate ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.relation_with_candidate}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Contact Number"
                    name="guardian_number"
                    value={values.guardian_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.guardian_number && touched.guardian_number}
                    success={values.guardian_number.length && !errors.guardian_number}
                  />
                  {errors.guardian_number && touched.guardian_number ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.guardian_number}
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Email Id"
                    name="guardian_email_id"
                    value={values.guardian_email_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.guardian_email_id && touched.guardian_email_id}
                    success={values.guardian_email_id.length && !errors.guardian_email_id}
                  />
                  {errors.guardian_email_id && touched.guardian_email_id ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.guardian_email_id}
                    </MDTypography>
                  ) : null}
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* Form for Domicile  */}
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
                  <FormField
                    label="Address Line 1"
                    name="address_line_1"
                    required
                    value={values.address_line_1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Address Line 2"
                    name="address_line_2"
                    value={values.address_line_2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="District"
                    name="district"
                    value={values.district}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Pin Code"
                    name="pin_code"
                    value={values.pin_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.pin_code && touched.pin_code}
                    success={values.pin_code.length && !errors.pin_code}
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
        {/* Form for adress for correspondence  */}
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
                    name="late_fine_discount"
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
                  <FormField
                    label="Correspondence Line 1"
                    name="correspondence_line_1"
                    required
                    value={
                      values.correspondence_line_1
                        ? values.address_line_1
                        : values.correspondence_line_1
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Correspondence Line 2"
                    name="correspondence_line_2"
                    value={
                      values.correspondence_line_2
                        ? values.address_line_2
                        : values.correspondence_line_2
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormField
                    label="Correspondence District"
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
                  <FormField
                    label="Correspondence Country"
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
                  <FormField
                    label="Correspondence Pin Code"
                    name="correspondence_pincode"
                    value={
                      values.correspondence_pincode
                        ? values.pin_code
                        : values.correspondence_pincode
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    error={errors.correspondence_pincode && touched.correspondence_pincode}
                    success={values.correspondence_pincode.length && !errors.correspondence_pincode}
                  />
                  {errors.correspondence_pincode && touched.correspondence_pincode ? (
                    <MDTypography variant="caption" fontWeight="regular" color="error">
                      {errors.correspondence_pincode}
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
                      value={values.alumni}
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
                    <FormField
                      label="From Year"
                      name="from_year"
                      value={values.from_year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      error={errors.from_year && touched.from_year}
                      success={values.from_year.length && !errors.from_year}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormField
                      label="To Year"
                      name="to_year"
                      value={values.to_year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      error={errors.to_year && touched.to_year}
                      success={values.to_year.length && !errors.to_year}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormField
                      label="From Class"
                      name="from_class"
                      value={values.from_class}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      error={errors.from_class && touched.from_class}
                      success={values.from_class.length && !errors.from_class}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormField
                      label="To Class"
                      name="to_class"
                      value={values.to_class}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      error={errors.to_class && touched.to_class}
                      success={values.to_class.length && !errors.to_class}
                    />
                  </Grid>
                </Grid>
              )}
            </MDBox>
          </Card>
        </Grid>

        {/* form for Sibling Details  */}
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
                      value={values.siblings}
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
                        <FormField
                          label={`Name ${index + 1}`}
                          name={`name-${field.id}`}
                          // value={field.name}
                          onChange={(e: any) => handleFieldChange(field.id, "name", e.target.value)}
                          // onBlur={handleBlur}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Autocomplete
                          onChange={(_event, value) =>
                            handleFieldChange(field.id, "className", value)
                          }
                          options={
                            values.academic_year !== ""
                              ? classes
                                  .filter(
                                    (item: any) => item.academic_year === values.academic_year
                                  )
                                  .map((item: any) => item.class_name)
                              : []
                          }
                          renderInput={(params) => (
                            <MDInput
                              required
                              name="class_name"
                              onChange={handleChange}
                              value={values.class_name}
                              label="Class"
                              {...params}
                              variant="standard"
                            />
                          )}
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
        {/* Form for Upload information  */}
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
                    name="candidate_photo"
                    // onChange={handleImage}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Father Photo"
                    accept="image/*"
                    name="father_photo"
                    // onChange={handleImage}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Mother Photo"
                    accept="image/*"
                    name="mother_photo"
                    // onChange={handleImage}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Father Aadhar"
                    accept="image/*"
                    name="father_aadhar"
                    // onChange={handleImage}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Mother Aadhar"
                    accept="image/*"
                    name="mother_aadhar"
                    // onChange={handleImage}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload Candidate Aadhar"
                    accept="image/*"
                    name="candidate_aadhar"
                    // onChange={handleImage}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={4} mt={2}>
                  <MDInput
                    sx={{ width: "80%" }}
                    type="file"
                    label="Upload DOB Certficate"
                    accept="image/*"
                    name="dob_certificate"
                    // onChange={handleImage}
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        {/* instruction  */}
        <MDTypography variant="overline">
          <b>Instruction:</b> Please check the information carefully before submitting. Once
          submitted, the information cannot be changed. Once you are sure about the correctness of
          the information, please click the “Submit” button.
        </MDTypography>
        {/* button for submit the form  */}
        <MDBox p={2}>
          <MDButton variant="gradient" color="info" style={{ marginRight: "10px" }} type="submit">
            Submit
          </MDButton>
          <MDButton
            variant="gradient"
            color="info"
            style={{ marginRight: "10px" }}
            onClick={handleClearClick}
          >
            Cancel
          </MDButton>
          <MDButton
            variant="gradient"
            color="info"
            type="submit"
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/pages/admission/Fee")}
          >
            Proceed To Fee
          </MDButton>
        </MDBox>
      </form>
    </DashboardLayout>
  );
};

export default AdmissionForm;
