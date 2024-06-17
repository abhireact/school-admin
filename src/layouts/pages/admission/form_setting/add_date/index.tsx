import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import { Grid, Card, Autocomplete } from "@mui/material";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { commonacademicyear } from "layouts/pages/fee/common_validationschema";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
const initialValues = {
  academic_year: "",
  class_name: "",
  section_name: "",
};

const AddDate = () => {
  const { classes, account, studentcategory } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: commonacademicyear,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log("inside onsubmitr");
      },
    });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Admission Dates
            </MDTypography>
          </Grid>
          <Grid container spacing={3} p={3}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                onChange={(_event, value) => {
                  handleChange({ target: { name: "academic_year", value } });
                }}
                options={
                  classes ? Array.from(new Set(classes.map((item: any) => item.academic_year))) : []
                }
                renderInput={(params) => (
                  <MDInput
                    required
                    name="academic_year"
                    onChange={handleChange}
                    value={values.academic_year}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    }
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
              <Grid item>
                <MDButton color="dark" variant="contained">
                  Back
                </MDButton>
              </Grid>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default AddDate;
