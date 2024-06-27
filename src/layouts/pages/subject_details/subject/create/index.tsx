import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Icon from "@mui/material/Icon";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup } from "@mui/material";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  subject_name: Yup.string().required("Required *"),
  subject_code: Yup.string().required("Required *"),
  scoring_type: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
  max_weekly_class: Yup.number().required("Required *"),
  index: Yup.number(),
  no_of_classes: Yup.number(),
});
const cookies_academic_year = Cookies.get("academic_year");
const Create = (props: any) => {
  const token = Cookies.get("token");
  const score_categories = ["Marks", "Grade"];

  const { handleShowPage, fetchingData } = props;

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      subject_name: "",
      academic_year: cookies_academic_year,
      subject_code: "",
      class_name: "",
      max_weekly_class: 0,
      is_core_subject: false,
      is_lab: false,
      is_extra_curricular: false,
      no_of_classes: 0,
      scoring_type: "",
      index: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_subject`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          fetchingData();
          action.resetForm();
          //handleShowPage();
        })
        .catch((error: any) => {
          console.log(error, " error");
          message.error(error.response.data.detail);
        });
    },
  });
  const { classes } = useSelector((state: any) => state);
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Subject
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                required
                variant="standard"
                name="subject_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Subject Name
                  </MDTypography>
                }
                value={values.subject_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.subject_name && Boolean(errors.subject_name)}
                success={values.subject_name.length && !errors.subject_name}
                helperText={touched.subject_name && errors.subject_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                required
                variant="standard"
                name="subject_code"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Subject Code
                  </MDTypography>
                }
                value={values.subject_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.subject_code && Boolean(errors.subject_code)}
                success={values.subject_code.length && !errors.subject_code}
                helperText={touched.subject_code && errors.subject_code}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                sx={{ width: "80%" }}
                value={values.scoring_type}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "scoring_type", value },
                  });
                }}
                options={score_categories}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    required
                    name="scoring_type"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Scoring Type
                      </MDTypography>
                    }
                    value={values.scoring_type}
                    {...params}
                    variant="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.scoring_type && Boolean(errors.scoring_type)}
                    success={values.scoring_type.length && !errors.scoring_type}
                    helperText={touched.scoring_type && errors.scoring_type}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                required
                type="number"
                variant="standard"
                name="max_weekly_class"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Max Weekly Class
                  </MDTypography>
                }
                value={values.max_weekly_class}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.max_weekly_class && Boolean(errors.max_weekly_class)}
                success={values.max_weekly_class && !errors.max_weekly_class}
                helperText={touched.max_weekly_class && errors.max_weekly_class}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                required
                type="number"
                variant="standard"
                name="no_of_classes"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    No. of Classes
                  </MDTypography>
                }
                value={values.no_of_classes}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.no_of_classes && Boolean(errors.no_of_classes)}
                success={values.no_of_classes && !errors.no_of_classes}
                helperText={touched.no_of_classes && errors.no_of_classes}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                type="number"
                variant="standard"
                name="index"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Index No.
                  </MDTypography>
                }
                value={values.index}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.index && Boolean(errors.index)}
                success={values.index && !errors.index}
                helperText={touched.index && errors.index}
              />
            </Grid>
            <Grid item xs={6} sm={2.5}>
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Core Subject
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5}>
              <input
                type="checkbox"
                checked={values.is_core_subject}
                onChange={handleChange}
                name="is_core_subject"
              />
            </Grid>
            <Grid item xs={6} sm={2.5}>
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Lab Subject
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5}>
              <input
                type="checkbox"
                checked={values.is_lab}
                onChange={handleChange}
                name="is_lab"
              />
            </Grid>{" "}
            <Grid item xs={6} sm={2.5}>
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Extra-curricular Subject
              </MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5}>
              <input
                type="checkbox"
                checked={values.is_extra_curricular}
                onChange={handleChange}
                name="is_extra_curricular"
              />
            </Grid>{" "}
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                sx={{ width: "80%" }}
                value={values.academic_year}
                onChange={(_event, value) => {
                  handleChange({ target: { name: "academic_year", value } });
                }}
                options={
                  classes ? Array.from(new Set(classes.map((item: any) => item.academic_year))) : []
                }
                renderInput={(params) => (
                  <MDInput
                    name="academic_year"
                    required
                    //onChange={handleChange}
                    value={values.academic_year}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    }
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.academic_year && Boolean(errors.academic_year)}
                    success={values.academic_year.length && !errors.academic_year}
                    helperText={touched.academic_year && errors.academic_year}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                sx={{ width: "80%" }}
                value={values.class_name}
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
                    name="class_name"
                    required
                    // onChange={handleChange}
                    value={values.class_name}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Class Name
                      </MDTypography>
                    }
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.class_name && Boolean(errors.class_name)}
                    success={values.class_name.length && !errors.class_name}
                    helperText={touched.class_name && errors.class_name}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item mt={4}>
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
              <Grid item ml={2} mt={4}>
                <MDButton color="info" variant="contained" type="submit">
                  Save &nbsp;<Icon>save</Icon>
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
