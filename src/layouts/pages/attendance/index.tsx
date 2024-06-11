import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import { useFormik } from "formik";
import MDInput from "components/MDInput";
import { Grid, Card, Autocomplete } from "@mui/material";
import { admissionformschema } from "./common_validationschema";
import { useSelector } from "react-redux";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

const initialValues = {
  academic_year: "",
  class_name: "",
  section_name: "",
  first_name: "",
  last_name: "",
};

const AdmissionForm = () => {
  const { classes, account, studentcategory } = useSelector((state: any) => state);
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
      <form>
        {/* onSubmit={handleSubmit} */}
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <MDBox p={3}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Admission Form
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                </Grid>
              </MDBox>
              <MDBox p={3}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Candidate Details
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <FormField
                      label="First Name"
                      name="first_name"
                      required
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.first_name && touched.first_name}
                      success={values.first_name.length && !errors.first_name}
                    />
                    {errors.first_name && touched.first_name ? (
                      <MDTypography variant="caption" fontWeight="regular" color="error">
                        {errors.first_name}
                      </MDTypography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormField
                      label="Last Name"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.first_name && touched.first_name}
                      success={values.first_name.length && !errors.first_name}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default AdmissionForm;
