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
  const score_categories = ["Percentage", "Grade"];
  const { setOpenupdate, editData, fetchingData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      subject_name: editData.subject_name,
      acd_name: editData.acd_name,
      subject_code: editData.subject_code,
      class_code: editData.class_code,
      max_weekly_class: editData.max_weekly_class,
      is_core_subject: editData.is_core_subject,
      is_lab: editData.is_lab,
      is_extra_curricular: editData.is_extra_curricular,
      no_of_classes: editData.no_of_classes,
      scoring_type: editData.scoring_type,
      index: editData.index,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendValues = { ...values, old_subject_name: editData.subject_name };
      axios
        .put("http://10.0.20.128:8000/mg_subject", sendValues, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchingData();
          handleClose();

          action.resetForm();
        })
        .catch(() => {
          message.error("Error on creating  !");
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="subject_name"
                label={<MDTypography variant="body2">Subject Name</MDTypography>}
                value={values.subject_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="subject_code"
                label={<MDTypography variant="body2">Subject Code</MDTypography>}
                value={values.subject_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="class_code"
                label={<MDTypography variant="body2">Class Code</MDTypography>}
                value={values.class_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="max_weekly_class"
                label={<MDTypography variant="body2">Max Weekly Class </MDTypography>}
                value={values.max_weekly_class}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="no_of_classes"
                label={<MDTypography variant="body2">No. of Classes </MDTypography>}
                value={values.no_of_classes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="index"
                label={<MDTypography variant="body2">Index No.</MDTypography>}
                value={values.index}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sm={2.5} mt={4}>
              <MDTypography variant="body2">Core Subject</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={3}>
              <Checkbox
                checked={values.is_core_subject}
                onChange={handleChange}
                name="is_core_subject"
              />
            </Grid>
            <Grid item xs={6} sm={2.5} mt={4}>
              <MDTypography variant="body2">Lab Subject</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={3}>
              <Checkbox checked={values.is_lab} onChange={handleChange} name="is_lab" />
            </Grid>{" "}
            <Grid item xs={6} sm={2.5} mt={4}>
              <MDTypography variant="body2">Extra-curricular Subject</MDTypography>
            </Grid>
            <Grid item xs={6} sm={1.5} mt={3}>
              <Checkbox
                checked={values.is_extra_curricular}
                onChange={handleChange}
                name="is_extra_curricular"
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "65%" }}
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
                    name="scoring_type"
                    label={<MDTypography variant="body2">Scoring Type</MDTypography>}
                    onChange={handleChange}
                    value={values.scoring_type}
                    {...params}
                    variant="standard"
                  />
                )}
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
