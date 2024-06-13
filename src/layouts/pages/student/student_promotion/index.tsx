import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete, Checkbox } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import MDBox from "components/MDBox";
const token = Cookies.get("token");
import * as Yup from "yup";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
const validationSchema = Yup.object().shape({
  to_class: Yup.string().required("Required *"),
  to_section: Yup.string().required("Required *"),
  to_academic: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
  from_class: Yup.string().required("Required *"),
  from_section: Yup.string().required("Required *"),
  from_academic: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});
export default function StudentPromotion() {
  const [data, setData] = useState([]);
  const initialValues = {
    from_academic: "",
    from_class: "",
    from_section: "",
    to_academic: "",
    to_class: "",
    to_section: "",
    user_name: [] as string[], // Array to store particulars
  };

  const { classes, account, studentcategory } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const sendData = data
          .filter((info: any) => info.is_selected)
          .map((info: any) => info.user_id);
        console.log(sendData);
        if (sendData.length < 1) {
          message.error("No Student is Selected");
        }
        const sendValue = { ...values, user_name: sendData };

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_student_promotions/`, sendValue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            action.resetForm();

            message.success("Student Promoted Successfully");
          })
          .catch((error: any) => {
            console.log(error, "error");
            message.error(error.response.data.detail);
          });
      },
    });

  const handleShowData = () => {
    const sendData = {
      academic_year: values.from_academic,
      classes: [
        {
          class_name: values.from_class,
          section_name: values.from_section,
        },
      ],
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_student/search`, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data, "Student for this  Academic Year,Class and Section");
        if (response.data.length < 1) {
          message.error("No Student found  for this Academic Year ,Class and Section ");
          setData([]);
        }
        let studentData = response.data.map((selection: any, i: number) => ({
          ...selection,
          is_selected: false,
        }));
        setData(studentData);
      })
      .catch((error: any) => {
        setData([]);
        console.log(error, "error");
        message.error(error.response.data.detail);
      });
  };
  const handleCheckboxChange = (index: number) => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) =>
        i === index ? { ...selection, is_selected: !selection.is_selected } : selection
      )
    );
    console.log(data, "change checkbox");
  };
  const handleSelectAll = () => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) => ({ ...selection, is_selected: true }))
    );
    console.log(data, "change checkbox");
  };
  const handleSelectNone = () => {
    setData((prevSelections: any) =>
      prevSelections.map((selection: any, i: number) => ({ ...selection, is_selected: false }))
    );
    console.log(data, "change checkbox");
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Student Promotion
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "from_academic", value } });
                  }}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="from_academic"
                      //onChange={handleChange}
                      value={values.from_academic}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Academic Year
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.from_academic && Boolean(errors.from_academic)}
                      success={values.from_academic.length && !errors.from_academic}
                      helperText={touched.from_academic && errors.from_academic}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "from_class", value } });
                  }}
                  options={
                    values.from_academic !== ""
                      ? classes
                          .filter((item: any) => item.academic_year === values.from_academic)
                          .map((item: any) => item.class_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="from_class"
                      // onChange={handleChange}
                      value={values.from_class}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Class
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.from_class && Boolean(errors.from_class)}
                      success={values.from_class.length && !errors.from_class}
                      helperText={touched.from_class && errors.from_class}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "from_section", value } });
                  }}
                  options={
                    values.from_class !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.from_academic &&
                              item.class_name === values.from_class
                          )[0]
                          .section_data.map((item: any) => item.section_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="section_name"
                      //  onChange={handleChange}
                      value={values.from_section}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Section
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.from_section && Boolean(errors.from_section)}
                      success={values.from_section.length && !errors.from_section}
                      helperText={touched.from_section && errors.from_section}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "to_academic", value } });
                  }}
                  options={
                    classes
                      ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="to_academic"
                      //onChange={handleChange}
                      value={values.to_academic}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          To Academic Year
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.to_academic && Boolean(errors.to_academic)}
                      success={values.to_academic.length && !errors.to_academic}
                      helperText={touched.to_academic && errors.to_academic}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "to_class", value } });
                  }}
                  options={
                    values.to_academic !== ""
                      ? classes
                          .filter((item: any) => item.academic_year === values.to_academic)
                          .map((item: any) => item.class_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="to_class"
                      //onChange={handleChange}
                      value={values.to_class}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          To Class
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.to_class && Boolean(errors.to_class)}
                      success={values.to_class.length && !errors.to_class}
                      helperText={touched.to_class && errors.to_class}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "to_section", value } });
                  }}
                  options={
                    values.to_class !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.to_academic &&
                              item.class_name === values.to_class
                          )[0]
                          .section_data.map((item: any) => item.section_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="to_section"
                      //onChange={handleChange}
                      value={values.to_section}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          To Section
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.to_section && Boolean(errors.to_section)}
                      success={values.to_section.length && !errors.to_section}
                      helperText={touched.to_section && errors.to_section}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item>
                  <MDButton
                    color="dark"
                    variant="contained"
                    onClick={() => {
                      handleShowData();
                    }}
                  >
                    Show Data
                  </MDButton>
                </Grid>
                {data.length > 0 && (
                  <Grid item mr={8}>
                    <MDButton color="info" variant="contained" type="submit">
                      Save
                    </MDButton>
                  </Grid>
                )}
              </Grid>

              {data.length > 0 && (
                <Grid item xs={12} sm={12} m={4}>
                  <div style={{ maxHeight: "400px", overflowY: "auto", position: "relative" }}>
                    <table
                      style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}
                    >
                      <thead
                        style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}
                      >
                        <tr>
                          <td
                            style={{
                              fontSize: "18px",
                              textAlign: "left",
                            }}
                          >
                            AVAILABLE STUDENTS
                          </td>
                          <td
                            style={{
                              fontSize: "18px",
                              textAlign: "left",
                            }}
                          >
                            SELECT:
                            <MDButton color="info" variant="text" onClick={() => handleSelectAll()}>
                              All
                            </MDButton>
                            <MDButton
                              color="info"
                              variant="text"
                              onClick={() => handleSelectNone()}
                            >
                              None
                            </MDButton>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.length > 0
                          ? data?.map((item: any, index: any) => (
                              <tr key={index + item.user_id}>
                                <td style={{ textAlign: "left" }}>
                                  <MDTypography variant="button" fontWeight="bold">
                                    {item.admission_number} {item.user_id} {item.first_name}
                                    {item.middle_name} {item.last_name}
                                  </MDTypography>
                                </td>

                                <td>
                                  <Checkbox
                                    checked={item.is_selected}
                                    onChange={() => handleCheckboxChange(index)}
                                  />
                                </td>
                              </tr>
                            ))
                          : ""}
                      </tbody>
                    </table>
                  </div>
                </Grid>
              )}
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}
