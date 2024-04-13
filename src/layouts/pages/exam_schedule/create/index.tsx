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

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { handleShowPage, fetchingData } = props;
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterClassData(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);
  const [filteredSection, setFilteredSection] = useState([]);
  function filterSectionData(data: any, class_name: any) {
    let filtereddata = data
      .filter((item: any) => item.class_name === class_name)
      .map((item: any) => item.section_name);
    setFilteredSection(filtereddata);
  }
  const [examtypeData, setExamtypeData] = useState([]);

  const [particularData, setParticularData] = useState([]);
  const [componentData, setComponentData] = useState([]);
  const [filteredComponent, setFilteredComponent] = useState([]);
  function filterComponentData(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.particular_name === acdName)
      .map((item: any) => item.component_name);
    setFilteredComponent(filtereddata);
  }
  const [subjectData, setSubjectData] = useState([]);
  const [subsubjectData, setSubsubjectData] = useState([]);
  const [filteredSubject, setFilteredSubject] = useState([]);
  function filterSubjectData(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.subject_name === acdName)
      .map((item: any) => item.sub_subject);
    setFilteredSubject(filtereddata);
  }
  useEffect(() => {
    axios
      .get("http://10.0.20.128:8000/mg_section", {
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
      .get("http://10.0.20.128:8000/mg_accademic_year", {
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
        console.error("Error fetching academic year data:", error);
      });
    axios
      .get("http://10.0.20.128:8000/mg_class", {
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
        console.error("Error fetching class data:", error);
      });
    axios
      .get("http://10.0.20.128:8000/exam_type", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExamtypeData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exam type data:", error);
      });
    axios
      .get("http://10.0.20.128:8000/schol_particular", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setParticularData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scholastic particular data:", error);
      });
    axios
      .get("http://10.0.20.128:8000/schol_components", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setComponentData(response.data);
        3;

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scholatic component data:", error);
      });
    axios
      .get("http://10.0.20.128:8000/mg_subject", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSubjectData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subject data:", error);
      });
    axios
      .get("http://10.0.20.128:8000/mg_sub_subjects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSubsubjectData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subject data:", error);
      });
  }, []);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      class_name: "",
      section_name: "",
      exam_type: "",
      academic_year: "",
      scholastic_particular_name: "",
      scholastic_component_name: "",
      date: "",
      start_time: "",
      end_time: "",
      subject_name: "",
      sub_subject_name: "",
      subject_weightage: 0,
      subject_maxmarks: 0,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.128:8000/exam_schedule", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchingData();
          handleShowPage();
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
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.exam_type}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "exam_type", value },
                  });
                  filterClassData(classdata, value);
                }}
                options={examtypeData.map((acd) => acd.exam_type)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="exam_type"
                    label={<MDTypography variant="body2">Exam Type</MDTypography>}
                    onChange={handleChange}
                    value={values.exam_type}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.scholastic_particular_name}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "scholastic_particular_name", value },
                  });
                  filterComponentData(componentData, value);
                }}
                options={particularData.map((acd) => acd.name)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="scholastic_particular_name"
                    label={<MDTypography variant="body2">Scholastic Particular</MDTypography>}
                    onChange={handleChange}
                    value={values.scholastic_particular_name}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.scholastic_component_name}
                onChange={
                  filteredComponent.length >= 1
                    ? (event, value) => {
                        handleChange({
                          target: { name: "scholastic_component_name", value },
                        });
                      }
                    : undefined
                }
                options={filteredComponent}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="scholastic_component_name"
                    label={<MDTypography variant="body2">Scholastic Component</MDTypography>}
                    onChange={handleChange}
                    value={values.scholastic_component_name}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
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
                    label={<MDTypography variant="body2">Academic Year</MDTypography>}
                    onChange={handleChange}
                    value={values.academic_year}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
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
                    label={<MDTypography variant="body2">Class Name</MDTypography>}
                    onChange={handleChange}
                    value={values.class_name}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
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
                    label={<MDTypography variant="body2">Section Name</MDTypography>}
                    onChange={handleChange}
                    value={values.section_name}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.subject_name}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "subject_name", value },
                  });
                  filterSubjectData(subsubjectData, value);
                }}
                options={subjectData.map((acd) => acd.subject_name)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="subject_name"
                    label={<MDTypography variant="body2">Subject</MDTypography>}
                    onChange={handleChange}
                    value={values.subject_name}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.sub_subject_name}
                onChange={
                  filteredSubject.length >= 1
                    ? (event, value) => {
                        handleChange({
                          target: { name: "sub_subject_name", value },
                        });
                      }
                    : undefined
                }
                options={filteredSubject}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="sub_subject_name"
                    label={<MDTypography variant="body2">Subject Name</MDTypography>}
                    onChange={handleChange}
                    value={values.sub_subject_name}
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
                    handleShowPage();
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

export default Create;
