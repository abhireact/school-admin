import React, { useEffect, useState } from "react";
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
import SaveIcon from "@mui/icons-material/Save";
const token = Cookies.get("token");
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
  archive_date: Yup.date().required("Required *"),
  reason_id: Yup.string().required("Required *"),
});
const cookies_academic_year = Cookies.get("academic_year");
export default function StudentArchive(props: any) {
  const [data, setData] = useState([]);
  const initialValues = {
    academic_year: cookies_academic_year,
    class_name: "",
    section_name: "",
    reason_id: "",
    archive_date: "",
    user_name: [] as string[], // Array to store particulars
  };

  const { classes, account, studentcategory } = useSelector((state: any) => state);
  const [reasonsdata, setReasonsdata] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/student_archive/archive_reasons`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReasonsdata(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log("submit");
        const sendData = data
          .filter((info: any) => info.is_selected)
          .map((info: any) => info.user_id);
        console.log(sendData);
        if (sendData.length < 1) {
          message.error("No Student is Selected");
          return;
        }
        let reasonNumber = reasonsdata.find((item: any) => item.reason === values.reason_id).id;
        const sendValue = { ...values, user_name: sendData, reason_id: reasonNumber };

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/student_archive`, sendValue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            action.resetForm();
            props.setShowpage(false);
            message.success("Student Archived Successfully");
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
      classes: [
        {
          class_name: values.class_name,
          section_name: values.section_name,
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
          setData([]);
          message.error("No Student found  for this Academic Year ,Class and Section ");
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
    <form onSubmit={handleSubmit}>
      <Card>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Student Archive
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton color="dark" variant="contained" onClick={() => props.setShowpage(false)}>
                Back
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                value={values.academic_year}
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
            <Grid item xs={12} sm={4}>
              <Autocomplete
                disableClearable
                value={values.reason_id}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "reason_id", value },
                  });
                }}
                options={reasonsdata ? reasonsdata.map((acd) => acd.reason) : []}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="reason_id"
                    required
                    //onChange={handleChange}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Reason
                      </MDTypography>
                    }
                    value={values.reason_id}
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.reason_id && Boolean(errors.reason_id)}
                    success={values.reason_id.length && !errors.reason_id}
                    helperText={touched.reason_id && errors.reason_id}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDInput
                type="date"
                required
                sx={{ width: "100%" }}
                onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                variant="standard"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Archive Date
                  </MDTypography>
                }
                name="archive_date"
                value={values.archive_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.archive_date && Boolean(errors.archive_date)}
                success={values.archive_date && !errors.archive_date}
                helperText={touched.archive_date && errors.archive_date}
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
                    Save&nbsp;
                    <SaveIcon />
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
                          SELECT: &nbsp;
                          <MDButton
                            color="info"
                            size="small"
                            variant="outlined"
                            onClick={() => handleSelectAll()}
                          >
                            All
                          </MDButton>
                          &nbsp; &nbsp;
                          <MDButton
                            color="info"
                            size="small"
                            variant="outlined"
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
  );
}
