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
const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),

  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YY format")
    .required("Required *"),
});
const FeeCertificate = (props: any) => {
  const token = Cookies.get("token");

  const { handleShowPage, setData } = props;

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
      .get("http://10.0.20.200:8000/mg_batches", {
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
      fee_category: "",
      fee_particular: "",

      class_name: "",

      academic_year: Cacademic_year,

      section_name: "",
      financial_year: "",
      wings_name: "",
      guardian: "",
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
          message.success(" Fetched Data Successfully!");
          setData(response.data);
          action.resetForm();
          handleShowPage();
        })
        .catch(() => {
          message.error("Error on fetching data !");
        });
    },
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          {" "}
          <MDBox p={4}>
            <Grid container>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.fee_category}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "fee_category", value },
                    });
                  }}
                  options={academicdata.map((acd) => acd.fee_category)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="fee_category"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Fee Category
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.fee_category}
                      {...params}
                      variant="standard"
                      error={touched.fee_category && Boolean(errors.fee_category)}
                      helperText={touched.fee_category && errors.fee_category}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.fee_particular}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "fee_particular", value },
                    });
                  }}
                  options={academicdata.map((acd) => acd.fee_particular)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="fee_particular"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Fee Particular
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.fee_particular}
                      {...params}
                      variant="standard"
                      error={touched.fee_particular && Boolean(errors.fee_particular)}
                      helperText={touched.fee_particular && errors.fee_particular}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.financial_year}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "financial_year", value },
                    });
                  }}
                  options={academicdata.map((acd) => acd.financial_year)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="financial_year"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Financial Year
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.financial_year}
                      {...params}
                      variant="standard"
                      error={touched.financial_year && Boolean(errors.financial_year)}
                      helperText={touched.financial_year && errors.financial_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.financial_year}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "financial_year", value },
                    });
                  }}
                  options={academicdata.map((acd) => acd.financial_year)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="financial_year"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Financial Year
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.financial_year}
                      {...params}
                      variant="standard"
                      error={touched.financial_year && Boolean(errors.financial_year)}
                      helperText={touched.financial_year && errors.financial_year}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.academic_year || Cacademic_year}
                  disabled
                  defaultValue={Cacademic_year}
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
                          Select Academic Year
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.academic_year || Cacademic_year}
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
                  value={values.wings_name}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "wings_name", value },
                    });
                    filterClassData(classdata, value);
                  }}
                  options={academicdata.map((acd) => acd.wings_name)}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="wings_name"
                      placeholder="2022-23"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Wing
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.wings_name}
                      {...params}
                      variant="standard"
                      error={touched.wings_name && Boolean(errors.wings_name)}
                      helperText={touched.wings_name && errors.wings_name}
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
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Class
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
                          Select Section
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
                <Autocomplete
                  sx={{ width: "70%" }}
                  value={values.guardian}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "guardian", value },
                    });
                    filterClassData(classdata, value);
                  }}
                  options={["Both", "Father", "Mother"]}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="guardian"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Guardian
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.guardian}
                      {...params}
                      variant="standard"
                      error={touched.guardian && Boolean(errors.guardian)}
                      helperText={touched.guardian && errors.guardian}
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
                <Grid item mt={4}>
                  <MDButton
                    color="dark"
                    variant="contained"
                    onClick={() => {
                      handleShowPage();
                    }}
                  >
                    Back
                  </MDButton>
                </Grid>
                <Grid item mt={4} ml={5}>
                  <MDButton color="info" variant="contained" type="submit">
                    Submit
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
};

export default FeeCertificate;
