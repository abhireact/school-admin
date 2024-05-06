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
import * as Yup from "yup";
import PDFComponent from "../pdf_receipt";

const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  fee_slip_date: Yup.date().required("Required"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),
});

const Create = (props: any) => {
  const token = Cookies.get("token");
  const { handleShowPage, setData } = props;
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);
  const [showPdf, setShowPdf] = useState(true);

  function filterClassData(data: any, academic_year: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === academic_year)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }

  function filterSectionData(data: any, class_name: any) {
    let filtereddata = data
      .filter((item: any) => item.class_name === class_name)
      .map((item: any) => item.section_name);
    setFilteredSection(filtereddata);
  }

  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_section", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setsectiondata(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://10.0.20.200:8000/mg_accademic_year", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicdata(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://10.0.20.200:8000/mg_student", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStudentData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://10.0.20.200:8000/mg_class", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClassdata(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      class_name: "",
      academic_year: "",
      section_name: "",
      fee_slip_date: "",
      student_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.200:8000/fee_collection", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success("Fetched Data Successfully!");
          setData(response.data);
          action.resetForm();
          handleShowPage();
        })
        .catch(() => {
          message.error("Error on fetching data!");
          setShowPdf(true);
        });
    },
  });

  return (
    <>
      {showPdf ? (
        <PDFComponent />
      ) : (
        <form onSubmit={handleSubmit}>
          <Card>
            <MDBox p={4}>
              <Grid container>
                <Grid item xs={12} sm={6} py={1}>
                  <Autocomplete
                    sx={{ width: "70%" }}
                    value={values.academic_year}
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "academic_year", value },
                      });
                      filterClassData(classdata, value);
                    }}
                    options={academicdata.map((acd) => acd.academic_year)}
                    renderInput={(params: any) => (
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        name="academic_year"
                        placeholder="2022-23"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Academic Year
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.academic_year}
                        {...params}
                        variant="standard"
                        error={touched.academic_year && Boolean(errors.academic_year)}
                        helperText={touched.academic_year && errors.academic_year}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} py={1}>
                  <Autocomplete
                    sx={{ width: "70%" }}
                    value={values.class_name}
                    onChange={
                      filteredClass.length >= 1
                        ? (event, value) => {
                            handleChange({
                              target: { name: "class_name", value },
                            });

                            filterSectionData(sectiondata, value);
                          }
                        : undefined
                    }
                    options={filteredClass}
                    renderInput={(params: any) => (
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        name="class_name"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Class Name
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.class_name}
                        {...params}
                        variant="standard"
                        error={touched.class_name && Boolean(errors.class_name)}
                        helperText={touched.class_name && errors.class_name}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} py={1}>
                  <Autocomplete
                    sx={{ width: "70%" }}
                    value={values.section_name}
                    onChange={
                      filteredSection.length >= 1
                        ? (event, value) => {
                            handleChange({
                              target: { name: "section_name", value },
                            });
                          }
                        : undefined
                    }
                    options={filteredSection}
                    renderInput={(params: any) => (
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        name="section_name"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Section Name
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.section_name}
                        {...params}
                        variant="standard"
                        error={touched.section_name && Boolean(errors.section_name)}
                        helperText={touched.section_name && errors.section_name}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6} py={1}>
                  <Autocomplete
                    sx={{ width: "70%" }}
                    value={values.student_name}
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "student_name", value },
                      });
                    }}
                    options={academicdata.map((acd) => acd.student_name)}
                    renderInput={(params: any) => (
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        name="student_name"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="info">
                            Student Name
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.student_name}
                        {...params}
                        variant="standard"
                        error={touched.student_name && Boolean(errors.student_name)}
                        helperText={touched.student_name && errors.student_name}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} py={1}>
                  <MDInput
                    sx={{ width: "70%" }}
                    variant="standard"
                    name="fee_slip_date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Fee Slip Generation Date
                      </MDTypography>
                    }
                    value={values.fee_slip_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fee_slip_date && Boolean(errors.fee_slip_date)}
                    success={values.fee_slip_date.length && !errors.fee_slip_date}
                    helperText={touched.fee_slip_date && errors.fee_slip_date}
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
                        handleShowPage();
                      }}
                    >
                      Back
                    </MDButton>
                  </Grid>
                  <Grid item ml={2} mt={4}>
                    <MDButton color="info" variant="contained" type="submit">
                      Generate Fee Slip
                    </MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </form>
      )}
    </>
  );
};

export default Create;
