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
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { I18nextProvider, useTranslation } from "react-i18next";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useSelector } from "react-redux";
const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),

  academic_year: Yup.string()
    .matches(/^\d{4}-\d{4}$/, "YYYY-YY format")
    .required("Required *"),
});
const FeeCertificate = (props: any) => {
  const { t } = useTranslation();
  const { classes, account, studentcategory, student, wings_name } = useSelector(
    (state: any) => state
  );
  const token = Cookies.get("token");
  const { handleShowPage } = props;
  const [data, setData] = useState(student);
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [feeCategory, setFeecategory] = useState([]);
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
    const filteredClassData = classes.filter(
      (item: any) => item.academic_year === values.academic_year
    );
    axios
      .get("http://10.0.20.200:8000/fee_category", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setFeecategory(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        fee_category: "",
        fee_perticular: "",

        class_name: "",

        academic_year: Cacademic_year,

        section_name: "",
        financial_year: "",
        wings_name: "",
        wing_name: "",
        guardian: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values, action) => {},
    });
  const handleFetchStudents = useCallback(() => {
    const filteredStudents = student
      ?.filter((item: any) => item.academic_year === values.academic_year)
      ?.filter((item: any) => !values.wing_name || item.wing_name === values.wing_name)
      ?.filter((item: any) => !values.class_name || item.class_name === values.class_name)
      ?.filter((item: any) => !values.section_name || item.section_name === values.section_name);

    if (JSON.stringify(filteredStudents) !== JSON.stringify(data)) {
      setData(filteredStudents);
    }
  }, [student, values, data]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid container p={2}>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Fee Certificate
              </MDTypography>
            </Grid>
          </Grid>{" "}
          <MDBox p={2}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "fee_category", value } });
                  }}
                  options={feeCategory ? feeCategory.map((item) => item.name) : []}
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="fee_category"
                      value={values.fee_category}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Category Name
                        </MDTypography>
                      }
                      onChange={handleChange}
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "fee_perticular", value } });
                  }}
                  options={
                    values.fee_category !== ""
                      ? feeCategory
                          .find((item) => item.name === values.fee_category)
                          .particular_types.map((item: any) => item.particular_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      required
                      name="fee_perticular"
                      onChange={handleChange}
                      value={values.fee_perticular}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Fee Particular
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  sx={{ width: "70%" }}
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
                      name="academic_year"
                      onChange={handleChange}
                      value={values.academic_year}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Financial Year
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      required
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
                  value={values.wing_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "wing_name", value } });
                    setFieldValue("class_name", "");
                    setFieldValue("section_name", "");
                  }}
                  options={
                    classes ? Array.from(new Set(classes.map((item: any) => item.wing_name))) : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      name="wing_name"
                      //onChange={handleChange}
                      value={values.wing_name}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Wing Name
                        </MDTypography>
                      }
                      {...params}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.wing_name && Boolean(errors.wing_name)}
                      success={values.wing_name && !errors.wing_name}
                      helperText={touched.wing_name && errors.wing_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
                  disableClearable
                  value={values.class_name}
                  onChange={(_event, value) => {
                    handleChange({ target: { name: "class_name", value } });
                    setFieldValue("section_name", "");
                  }}
                  options={
                    values.academic_year !== ""
                      ? classes
                          .filter(
                            (item: any) =>
                              item.academic_year === values.academic_year &&
                              item.wing_name === values.wing_name
                          )
                          .map((item: any) => item.class_name)
                      : []
                  }
                  renderInput={(params) => (
                    <MDInput
                      //required
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
                      success={values.class_name && !errors.class_name}
                      helperText={touched.class_name && errors.class_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "70%" }}
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
                      //required
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
                      success={values.section_name && !errors.section_name}
                      helperText={touched.section_name && errors.section_name}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <MDInput
                  sx={{ width: "70%" }}
                  variant="standard"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Admission Number/Name
                    </MDTypography>
                  }
                  // value={guardianinfo.first_name}
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
                <Grid item mt={4} ml={2}>
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
