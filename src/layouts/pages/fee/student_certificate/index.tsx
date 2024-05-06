import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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
import MDAvatar from "components/MDAvatar";
import DataTable from "examples/Tables/DataTable";
import SummarizeIcon from "@mui/icons-material/Summarize";
import IconButton from "@mui/material/IconButton";
import StudentInfo from "./student_info";

const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),

  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YY format")
    .required("Required *"),
});
const StudentCertificate = () => {
  const token = Cookies.get("token");
  const [studentData, setStudentData] = useState([
    {
      first_name: "ADVIKA",
      middle_name: "",
      last_name: "PANDEY",
      admission_number: "THS/2122/1099",
      user_id: "THSKRBS4",
      class_name: "I",
      section_name: "A",
      gender: "Female",
    },
  ]);
  const [showStudent, setShowStudent] = useState(false);

  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  console.log(classdata, "jj");
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
  const [wingInfo, setWingInfo] = useState([]);

  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_wing", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWingInfo(response.data);

        console.log(response.data, "wing info");
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

        console.log(response.data, "Academic Year");
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

        console.log(response.data, "Class info");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const dataTableData = {
    columns: [
      { Header: "Student Name", accessor: "full_name" },

      { Header: "Class", accessor: "class_name" },
      { Header: "Section", accessor: "section_name" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Admission Number", accessor: "admission_number" },
      { Header: "User ID", accessor: "user_id" },

      { Header: "Action", accessor: "action" },
    ],

    rows: studentData.map((row, index) => ({
      admission_number: <MDTypography variant="p"> {row.admission_number}</MDTypography>,
      user_id: <MDTypography variant="p"> {row.user_id}</MDTypography>,

      action: (
        <IconButton
          onClick={() => {
            setShowStudent(true);
          }}
        >
          <SummarizeIcon />
        </IconButton>
      ),

      full_name: (
        <MDTypography variant="p">
          {row.first_name + " " + row.middle_name + " " + row.last_name}
        </MDTypography>
      ),
      class_name: <MDTypography variant="p">{row.class_name}</MDTypography>,
      gender: <MDTypography variant="p">{row.gender}</MDTypography>,
      section_name: <MDTypography variant="p">{row.section_name}</MDTypography>,
    })),
  };
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      class_name: "",

      academic_year: "",

      section_name: "",
      wing_name: "",
      admission_number: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.200:8000/student_certificate", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success("Fetched Data Successfully!");
          setStudentData(response.data);
          action.resetForm();
        })
        .catch(() => {
          message.error("Error on fetching data !");
        });
    },
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showStudent ? (
        <StudentInfo />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <Card>
              {" "}
              <MDBox p={4}>
                <Grid container>
                  <Grid item xs={6} sm={4}>
                    <Autocomplete
                      sx={{ width: "80%" }}
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
                  <Grid item xs={6} sm={4}>
                    <Autocomplete
                      sx={{ width: "80%" }}
                      value={values.wing_name}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "wing_name", value },
                        });
                      }}
                      options={wingInfo.map((acd) => acd.wing_name)}
                      renderInput={(params: any) => (
                        <MDInput
                          InputLabelProps={{ shrink: true }}
                          name="wing_name"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Wing Name
                            </MDTypography>
                          }
                          onChange={handleChange}
                          value={values.wing_name}
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.wing_name && Boolean(errors.wing_name)}
                          success={values.wing_name.length && !errors.wing_name}
                          helperText={touched.wing_name && errors.wing_name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Autocomplete
                      sx={{ width: "80%" }}
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
                          onBlur={handleBlur}
                          error={touched.class_name && Boolean(errors.class_name)}
                          success={values.class_name.length && !errors.class_name}
                          helperText={touched.class_name && errors.class_name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <Autocomplete
                      sx={{ width: "80%" }}
                      // value={values.section_name}
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
                          onBlur={handleBlur}
                          error={touched.section_name && Boolean(errors.section_name)}
                          success={values.section_name.length && !errors.section_name}
                          helperText={touched.section_name && errors.section_name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <MDInput
                      sx={{ width: "80%" }}
                      name="admission_number"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Admission Number
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.admission_number}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.admission_number && Boolean(errors.admission_number)}
                      success={values.admission_number.length && !errors.admission_number}
                      helperText={touched.admission_number && errors.admission_number}
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Grid item mt={4}>
                      <MDButton color="info" variant="contained" type="submit">
                        Search
                      </MDButton>
                    </Grid>
                    <Grid item mt={4} ml={5}></Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </form>
          {studentData.length == 1 && (
            <DataTable table={dataTableData} entriesPerPage={false} showTotalEntries={false} />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default StudentCertificate;
