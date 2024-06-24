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
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  subject_name: Yup.string().required("Required *"),
  sub_subject: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),

  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),

  index: Yup.number().required("Required *"),
});
const Create = (props: any) => {
  const token = Cookies.get("token");

  const { handleShowPage, fetchingData } = props;
  const [subjectInfodata, setSubjectInfodata] = useState([]);
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterClassData(data: any, academic_year: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === academic_year)
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

  const [filteredSubject, setFilteredSubject] = useState([]);
  function filterSubjectData(data: any, class_name: any) {
    let filtereddata = data
      .filter((item: any) => item.class_name === class_name)
      .map((item: any) => item.subject_name);
    setFilteredSubject(filtereddata);
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
      .get("http://10.0.20.200:8000/mg_subject", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSubjectInfodata(response.data);

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
      subject_name: "",
      sub_subject: "",
      academic_year: "",

      section_name: "",
      index: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.200:8000/sub_subjects", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchingData();
          action.resetForm();
          handleShowPage();
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
                        filterSubjectData(subjectInfodata, value);
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
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.subject_name}
                onChange={
                  filteredSubject.length >= 1
                    ? (event, value) => {
                        handleChange({
                          target: { name: "subject_name", value },
                        });
                      }
                    : undefined
                }
                options={filteredSubject}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="subject_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Subject Name
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.subject_name}
                    {...params}
                    variant="standard"
                    error={touched.subject_name && Boolean(errors.subject_name)}
                    helperText={touched.subject_name && errors.subject_name}
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

            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="sub_subject"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Sub-Subject Name
                  </MDTypography>
                }
                value={values.sub_subject}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sub_subject && Boolean(errors.sub_subject)}
                helperText={touched.sub_subject && errors.sub_subject}
              />
            </Grid>

            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="index"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Index No.
                  </MDTypography>
                }
                value={values.index}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.index && Boolean(errors.index)}
                helperText={touched.index && errors.index}
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
