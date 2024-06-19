import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
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
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
const validationSchema = Yup.object().shape({
  section_name: Yup.string().required("Required *"),
  start_date: Yup.date()
    .required("Required *")
    .test("year-range", "Incorrect format", function (value) {
      if (value) {
        const year = value.getFullYear();
        return year >= 2000 && year <= 3000;
      }
      return true;
    }),
  end_date: Yup.date()
    .required("Required *")
    .test("year-range", "Incorrect format", function (value) {
      if (value) {
        const year = value.getFullYear();
        return year >= 2000 && year <= 3000;
      }
      return true;
    }),
});

const UpdateSection = (props: any) => {
  const token = Cookies.get("token");

  const {
    setOpen,
    sectionData,
    academic_year,
    class_name,
    fetchData,
    setFieldValue,
    sectiondata,
    editIndex,
  } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      section_name: sectionData.section_name,
      academic_year: academic_year,
      class_name: class_name,
      start_date: sectionData.start_date,
      end_date: sectionData.end_date,
      old_section_name: sectionData.section_name,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, action) => {
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/mg_batches`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          fetchData();
          const editedData = sectiondata.map((info: any, i: number) => {
            if (i === editIndex) {
              return {
                ...info,
                section_name: values.section_name,
                start_date: values.start_date,
                end_date: values.end_date,
              };
            }
            return info;
          });
          setFieldValue("sectiondata", editedData);
          message.success("Updated successfully!");
          handleClose();
        })
        .catch(() => {
          message.error("Error on updating!");
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={5} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Section Name *
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7} mt={2}>
            <MDInput
              sx={{ width: "65%" }}
              variant="standard"
              name="section_name"
              value={values.section_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.section_name && Boolean(errors.section_name)}
              helperText={touched.section_name && errors.section_name}
            />
          </Grid>
          <Grid item xs={12} sm={5} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Start Date *
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7} mt={2}>
            <MDInput
              sx={{ width: "65%" }}
              variant="standard"
              name="start_date"
              type="date"
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
              value={values.start_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.start_date && Boolean(errors.start_date)}
              helperText={touched.start_date && errors.start_date}
            />
          </Grid>
          <Grid item xs={12} sm={5} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              End Date *
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7} mt={2}>
            <MDInput
              sx={{ width: "65%" }}
              variant="standard"
              type="date"
              onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
              name="end_date"
              value={values.end_date}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.end_date && Boolean(errors.end_date)}
              helperText={touched.end_date && errors.end_date}
            />
          </Grid>

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item mt={2}>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Back
              </MDButton>
            </Grid>
            <Grid item mt={2} ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default UpdateSection;
