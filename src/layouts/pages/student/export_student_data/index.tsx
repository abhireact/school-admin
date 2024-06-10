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
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import ExportExcel from "layouts/pages/student/export_student_data/export_excel";
// import ExportPDFList from "./export_pdf";
import * as Yup from "yup";

import Cookies from "js-cookie";

const token = Cookies.get("token");

const validationSchema = Yup.object().shape({
  academic_year: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
});

const CollectionList = () => {
  const [data, setData] = useState([]);
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);

  function filterSectionData(data: any, class_name: any) {
    console.log(classdata, "class data");
    let filtereddata = classdata
      .filter(
        (item: any) => item.class_name === class_name && item.academic_year === values.academic_year
      )
      .map((item: any) => item.section_data);

    console.log(filtereddata, "filter section Data");
    setFilteredSection(filtereddata);
  }

  console.log(filteredSection, "section name");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
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
      .get(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
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
  const [schoolData, setSchoolData] = useState({});
  const fetchSchoolInfo = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_school`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSchoolData(response.data);
        console.log(response.data, "school information");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchSchoolInfo();
  }, []);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: "",
        class_name: "",
        section_name: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {},
    });
  const [pdfpage, setPdfpage] = useState(false);
  const [pdftype, setPdftype] = useState("");
  const handlePDFList = () => {
    setPdfpage(true);
    setPdftype("pdflist");
  };
  const handlePDFProfile = () => {
    setPdfpage(true);
    setPdftype("pdfprofile");
  };
  const handleClosepdf = () => {
    setPdfpage(false);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {pdfpage ? (
        "  // <ExportPDFList pdfdata={values} pdftype={pdftype} handleClose={handleClosepdf} />"
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox p={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    disableClearable
                    value={values.academic_year}
                    onChange={(event, value) => {
                      handleChange({
                        target: { name: "academic_year", value },
                      });
                      filterDataByAcdName(classdata, value);
                    }}
                    options={academicdata.map((acd) => acd.academic_year)}
                    renderInput={(params: any) => (
                      <MDInput
                        InputLabelProps={{ shrink: true }}
                        name="academic_year"
                        placeholder="eg. 2022-2023"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Academic Year
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.academic_year}
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
                    sx={{ width: "100%" }}
                    disableClearable
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
                        success={values.class_name.length && !errors.class_name}
                        helperText={touched.class_name && errors.class_name}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    disableClearable
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
                    options={
                      filteredSection[0]
                        ? filteredSection[0].map((sectiondata: any) => sectiondata.section_name)
                        : []
                    }
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
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  mr={2}
                >
                  {" "}
                  <Grid item mt={2} mr={2}>
                    <MDButton
                      variant="contained"
                      color="info"
                      onClick={() => {
                        handlePDFProfile();
                      }}
                    >
                      Student Profile PDF
                    </MDButton>
                  </Grid>
                  <Grid item mt={2} mr={2}>
                    <MDButton
                      variant="contained"
                      color="info"
                      onClick={() => {
                        handlePDFList();
                      }}
                    >
                      Student List PDF
                    </MDButton>
                  </Grid>
                  <Grid item mt={2}>
                    <ExportExcel exceldata={values} fileName={"student_data_report"} />
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </form>
        </Card>
      )}
    </DashboardLayout>
  );
};
export default CollectionList;
