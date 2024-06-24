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
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
});
let cookies_academic_year = Cookies.get("academic_year");
export default function StudentSectionChange() {
  const [data, setData] = useState([]);
  const initialValues = {
    academic_year: cookies_academic_year,
    class_name: "",
    section_name: "",
    student_data: [] as any[],
  };

  const { classes, account, studentcategory } = useSelector((state: any) => state);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log("submit");

        if (data.length < 1) {
          message.error("No Student is Selected");
          return;
        }
        const sendValue = { ...values, student_data: data };

        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_subject/student_subjects`, sendValue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            action.resetForm();
            setData([]);
            message.success("Student Subject Assigned Successfully");
          })
          .catch((error: any) => {
            console.log(error, "error");
            message.error(error.response.data.detail);
          });
      },
    });

  const handleShowData = () => {
    const sendData = {
      academic_year: values.academic_year,

      class_name: values.class_name,
      section_name: values.section_name,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_subject/student_subjects`, sendData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data, "Student for this  Academic Year,Class and Section");
        if (response.data.length < 1) {
          setData([]);
          message.error("No Student found  for this Academic Year ,Class and Section ");
        }

        setData(response.data);
      })
      .catch((error: any) => {
        setData([]);
        console.log(error, "error");
        message.error(error.response.data.detail);
      });
  };
  const handleCheckboxChange = (studentIndex: number, subjectIndex: any) => {
    setData((prevData) =>
      prevData.map((student, index) =>
        index === studentIndex
          ? {
              ...student,
              student_subjects: student.student_subjects.map((subject: any, i: any) =>
                i === subjectIndex ? { ...subject, is_selected: !subject.is_selected } : subject
              ),
            }
          : student
      )
    );
  };
  const [allNone, setAllNone] = useState(true);
  const handleAllNone = (subject_name: any) => {
    setAllNone(!allNone);
    const updatedData = data.map((student) => {
      const updatedSubjects = student.student_subjects.map((subject: any) => {
        if (subject.subject_name === subject_name) {
          return {
            ...subject,
            is_selected: allNone,
          };
        }
        return subject;
      });

      return {
        ...student,
        student_subjects: updatedSubjects,
      };
    });
    setData(updatedData);

    console.log(updatedData, "selected or unselected");
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
                  Student Subject Association
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  value={values.academic_year}
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
                      success={values.class_name.length && !errors.class_name}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
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
                      required
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
                      success={values.section_name.length && !errors.section_name}
                      helperText={touched.section_name && errors.section_name}
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
                    color="info"
                    variant="contained"
                    onClick={() => {
                      handleShowData();
                    }}
                  >
                    Show Data
                  </MDButton>
                </Grid>
                {data.length > 0 && (
                  <Grid item>
                    <MDButton color="info" variant="contained" type="submit">
                      Save &nbsp;<Icon>save</Icon>
                    </MDButton>
                  </Grid>
                )}
              </Grid>

              {data.length > 0 && (
                <Grid item xs={12} sm={12}>
                  <div
                    style={{
                      maxHeight: "400px",

                      overflowY: "auto",
                      position: "relative",
                    }}
                  >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead
                        style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}
                      >
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "10px",
                              border: "1px solid #f0f2f5",
                            }}
                          >
                            <MDTypography
                              variant="caption"
                              fontWeight="bold"
                              color="secondary"
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              STUDENT NAME
                            </MDTypography>
                          </td>

                          {data[0]?.student_subjects.map((subject: any, index: number) => (
                            <td
                              key={index}
                              style={{
                                padding: "10px",
                                textAlign: "left",
                                border: "1px solid #f0f2f5",
                              }}
                            >
                              <MDButton
                                onClick={() => {
                                  handleAllNone(subject.subject_name);
                                }}
                              >
                                {subject.subject_name}
                              </MDButton>
                            </td>
                          ))}
                        </tr>
                        <tr></tr>
                      </thead>
                      <tbody>
                        {data?.length > 0
                          ? data.map((item, index) => (
                              <tr key={index + item.user_name}>
                                <td
                                  style={{
                                    padding: "10px",
                                    textAlign: "left",
                                    border: "1px solid #f0f2f5",
                                  }}
                                >
                                  <MDTypography
                                    variant="caption"
                                    fontWeight="bold"
                                    style={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {item.student_name}
                                  </MDTypography>
                                </td>
                                {item.student_subjects.map((info: any, subIndex: any) => (
                                  <td
                                    style={{ textAlign: "center", border: "1px solid #f0f2f5" }}
                                    key={`${index}-${subIndex}`}
                                  >
                                    <Checkbox
                                      checked={info.is_selected}
                                      onChange={() => handleCheckboxChange(index, subIndex)}
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))
                          : null}
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
