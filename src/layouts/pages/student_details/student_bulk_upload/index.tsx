import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GroupsIcon from "@mui/icons-material/Groups";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { Icon, IconButton, Tooltip } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
const token = Cookies.get("token");
import * as Yup from "yup";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
const validationSchema = Yup.object().shape({
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required"),
  class_name: Yup.string(),
  section_name: Yup.string(),
  wing_name: Yup.string(),
});
const cookies_academic_year = Cookies.get("academic_year");

const StudentPhotoUpload = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const { classes, account, studentcategory } = useSelector((state: any) => state);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: cookies_academic_year,
        class_name: "",
        section_name: "",
        wing_name: "",
        stud_upload: [],
      },
      validationSchema: validationSchema,
      onSubmit: async (values, action) => {
        try {
          const formData = new FormData();
          formData.append("academic_year", values.academic_year);
          formData.append("class_name", values.class_name);
          formData.append("section_name", values.section_name);
          formData.append("wing_name", values.wing_name);

          uploadedImages.forEach((file, index) => {
            formData.append(`stud_upload[${index}]`, file);
          });

          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/your_endpoint`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            message.success("Student photos uploaded successfully!");
            action.resetForm();
            setUploadedImages([]);
          }
        } catch (error) {
          console.error("Error uploading student photos:", error);
          message.error("Error uploading student photos.");
        }
      },
    });

  const handleImages = (e: any) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    const validFiles: any = [];

    fileArray.forEach((file: any) => {
      if (file.size > 5 * 1024 * 1024) {
        message.error(`File ${file.name} exceeds 5 MB limit.`);
        return;
      }

      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/heic") {
        validFiles.push(file);
      } else {
        message.error(`File ${file.name} is not a valid PNG, JPEG, or HEIC image.`);
      }
    });

    setUploadedImages((prevImages) => [...prevImages, ...validFiles]);
    setFieldValue("stud_upload", validFiles);
  };
  return (
    <BaseLayout>
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Student Photo Upload
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}></Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  disableClearable
                  value={values.academic_year}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "academic_year", value } });
                    setFieldValue("wing_name", "");
                    setFieldValue("class_name", "");
                    setFieldValue("section_name", "");
                  }}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      name="academic_year"
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
                      success={values.academic_year && !errors.academic_year}
                      helperText={touched.academic_year && errors.academic_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  disableClearable
                  value={values.wing_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "wing_name", value } });
                    setFieldValue("class_name", "");
                    setFieldValue("section_name", "");
                  }}
                  options={
                    classes ? Array.from(new Set(classes.map((item: any) => item.wing_name))) : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      name="wing_name"
                      //onChange={handleChange}
                      value={values.wing_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Wing Name
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.wing_name && Boolean(errors.wing_name)}
                      success={values.wing_name && !errors.wing_name}
                      helperText={touched.wing_name && errors.wing_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  disableClearable
                  value={values.class_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "class_name", value } });
                    setFieldValue("section_name", "");
                  }}
                  options={
                    values.academic_year !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.academic_year &&
                              item.wing_name === values.wing_name
                          )
                          .map((item: any) => item.class_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      //required
                      name="class_name"
                      // onChange={handleChange}
                      value={values.class_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Class
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.class_name && Boolean(errors.class_name)}
                      success={values.class_name && !errors.class_name}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  disableClearable
                  value={values.section_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "section_name", value } });
                  }}
                  options={
                    values.class_name !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.academic_year &&
                              item.class_name === values.class_name
                          )[0]
                          .section_data.map((item: any) => item.section_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      //required
                      name="section_name"
                      //  onChange={handleChange}
                      value={values.section_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Section
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.section_name && Boolean(errors.section_name)}
                      success={values.section_name && !errors.section_name}
                      helperText={touched.section_name && errors.section_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  sx={{ width: "90%" }}
                  type="file"
                  accept="image/*"
                  name="stud_img"
                  onChange={handleImages}
                  inputProps={{ multiple: true }}
                  variant="standard"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                py={2}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Grid item>
                  <MDButton color="info" variant="contained" type="submit">
                    Save&nbsp;<Icon>save</Icon>
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </form>
      </Card>
    </BaseLayout>
  );
};

export default StudentPhotoUpload;
