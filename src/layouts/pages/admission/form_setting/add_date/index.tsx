import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import axios from "axios";
import { message } from "antd";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import { Grid, Card, Autocomplete } from "@mui/material";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

// Set token outside the component
const token = Cookies.get("token");

const initialValues = {
  academic_year: "",
  start_date: "",
  end_date: "",
  details: [
    {
      select: true,
      class_name: "",
      max_form_per_day: 0,
      max_form: 0,
      date_of_calculating_age: "",
      min_age: 0,
      max_age: 0,
      min_age_month: 0,
      max_age_month: 0,
      min_age_day: 0,
      max_age_day: 0,
      amount: 0,
      status: "",
    },
  ],
};

const validationSchema = Yup.object().shape({
  start_date: Yup.date()
    .required("Start is Required *")
    .test("year-range", "Incorrect format", function (value) {
      if (value) {
        const year = new Date(value).getFullYear();
        return year >= 2000 && year <= 3000;
      }
      return true;
    }),
  end_date: Yup.date()
    .required("Required *")
    .test(
      "endDateGreaterThanOrEqualToStartDate",
      "End date should be greater than or equal to start date",
      function (value) {
        const { start_date } = this.parent;
        return !start_date || new Date(value) >= new Date(start_date);
      }
    ),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});

const AddDate = () => {
  const { classes } = useSelector((state: any) => state);
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/admissions/settings`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Created successfully!");
            action.resetForm();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid item xs={12} sm={6} mt={2}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Admission Date
              </MDTypography>
            </Grid>

            <Grid container spacing={3} p={3}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  onChange={(_event, value) => {
                    setFieldValue("academic_year", value);
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
              <Grid item xs={12} sm={4}>
                <MDInput
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "100%" }}
                  required
                  variant="standard"
                  name="start_date"
                  value={values.start_date}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Start Date
                    </MDTypography>
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e: any) => e.preventDefault()}
                  inputProps={{ min: values.academic_year }}
                  error={touched.start_date && Boolean(errors.start_date)}
                  helperText={touched.start_date && errors.start_date}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "100%" }}
                  required
                  variant="standard"
                  name="end_date"
                  value={values.end_date}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      End Date
                    </MDTypography>
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e: any) => e.preventDefault()}
                  inputProps={{ min: values.start_date }}
                  error={touched.end_date && Boolean(errors.end_date)}
                  helperText={touched.end_date && errors.end_date}
                />
              </Grid>
              <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                <Grid item>
                  <MDButton
                    color="dark"
                    variant="contained"
                    onClick={() => navigate("/pages/admission/formsetting")}
                  >
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
      </form>
    </DashboardLayout>
  );
};

export default AddDate;
