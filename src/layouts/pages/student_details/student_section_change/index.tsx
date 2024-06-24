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
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import MDBox from "components/MDBox";
const token = Cookies.get("token");
import * as Yup from "yup";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { fetchStudent } from "layouts/pages/redux/dataSlice";
const validationSchema = Yup.object().shape({
  to_section_name: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  from_section_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
    .required("Required *"),
  select_fees: Yup.string().required("Required *"),
});
export default function StudentSectionChange() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const initialValues = {
    academic_year: "",
    class_name: "",
    from_section_name: "",
    to_section_name: "",
    select_fees: "",
    user_name: [] as string[], // Array to store particulars
  };

  const { classes, account, studentcategory } = useSelector((state: any) => state);

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
        const sendValue = { ...values, user_name: sendData };

        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_student/change_section`, sendValue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            action.resetForm();
            setData([]);
            message.success("Student Section Changed Successfully");
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
          section_name: values.from_section_name,
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
        dispatch(fetchStudent() as any);
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
                  Student Section Change
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
                  value={values.from_section_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "from_section_name", value } });
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
                      value={values.from_section_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          From Section
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.from_section_name && Boolean(errors.from_section_name)}
                      success={values.from_section_name.length && !errors.from_section_name}
                      helperText={touched.from_section_name && errors.from_section_name}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  value={values.to_section_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "to_section_name", value } });
                  }}
                  options={
                    values.class_name !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.academic_year &&
                              item.class_name === values.class_name
                          )[0]
                          .section_data.filter(
                            (item: any) => item.section_name !== values.from_section_name
                          )
                          .map((item: any) => item.section_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="to_section_name"
                      //onChange={handleChange}
                      value={values.to_section_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          To Section
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.to_section_name && Boolean(errors.to_section_name)}
                      success={values.to_section_name.length && !errors.to_section_name}
                      helperText={touched.to_section_name && errors.to_section_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  disableClearable
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "select_fees", value } });
                  }}
                  options={[
                    "Section change with fee deletion",
                    "Section change without fee deletion",
                  ]}
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="select_fees"
                      //onChange={handleChange}
                      value={values.select_fees}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Fees
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.select_fees && Boolean(errors.select_fees)}
                      success={values.select_fees.length && !errors.select_fees}
                      helperText={touched.select_fees && errors.select_fees}
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
                              padding: "10px",
                              textAlign: "left",
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
                              AVAILABLE STUDENTS
                            </MDTypography>
                          </td>
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
                              color="secondary"
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              SELECT:
                            </MDTypography>
                            &nbsp;
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
                                    {item.user_id} {item.first_name}
                                    {item.middle_name} {item.last_name}
                                  </MDTypography>
                                </td>

                                <td
                                  style={{
                                    padding: "10px",
                                    textAlign: "start",
                                    border: "1px solid #f0f2f5",
                                  }}
                                >
                                  <input
                                    type="checkbox"
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
