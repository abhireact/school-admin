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
import * as Yup from "yup";
import FormField from "layouts/pages/account/components/FormField";

const Create = (props: any) => {
  const token = Cookies.get("token");
  const [academicdata, setAcademicdata] = useState([]);
  const { handleShowPage, fetchData } = props;
  const handleClose = () => {
    handleShowPage();
  };
  const validationSchema = Yup.object().shape({
    class_name: Yup.string().required("Required *"),
    section_name: Yup.string().required("Required *"),
    class_code: Yup.string().required("Required *"),
    wing_name: Yup.string().required("Required *"),
    academic_year: Yup.string()
      .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
      .required("Required *"),
    start_date: Yup.date()
      .required("Required *")
      .test("max-year", "Incorrect format", function (value) {
        if (value) {
          const year = value.getFullYear();
          return year <= 3000;
        }
        return true;
      }),
    end_date: Yup.date()
      .required("Required *")
      .test("max-year", "Incorrect format", function (value) {
        if (value) {
          const year = value.getFullYear();
          return year <= 3000;
        }
        return true;
      }),
  });

  // useEffect(() => {
  //   const translatePage = async () => {
  //     try {
  //       const pageContent = document.body.innerText; // Get the entire page content as text
  //       // const translation = await translate(pageContent, { to: targetLanguage });
  //       setTranslatedText(translation.text);
  //     } catch (error) {
  //       console.error("Error translating page:", error);
  //     }
  //   };

  //   translatePage();
  // }, [targetLanguage]);

  const [winginfo, setWinginfo] = useState([]);
  useEffect(() => {
    // axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year", {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     setAcademicData(response.data);

    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });

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
      .get(`${process.env.REACT_APP_BASE_URL}/mg_wing`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWinginfo(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      academic_year: "",
      wing_name: "",
      class_name: "",
      class_code: "",
      index: 0,
      section_name: "",
      start_date: "",
      end_date: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/mg_class`,
          {
            class_data: {
              academic_year: values.academic_year,
              wing_name: values.wing_name,
              class_name: values.class_name,
              class_code: values.class_code,
              index: values.index,
            },
            section_data: {
              section_name: values.section_name,
              start_date: values.start_date,
              end_date: values.end_date,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          console.log("create successfully");
          message.success(" Created successfully!");
          fetchData();
        })
        .catch(() => {
          message.error("Error on creating  !");
        });

      action.resetForm();
    },
  });
  return (
    <Card>
      {" "}
      <form onSubmit={handleSubmit}>
        <MDBox p={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Create Class
              </MDTypography>
            </Grid>

            <Grid item sm={4} xs={4}>
              <Autocomplete
                disableClearable
                sx={{ width: "80%" }}
                value={values.academic_year}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "academic_year", value },
                  });
                }}
                options={academicdata.map((acd) => acd.academic_year)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="academic_year"
                    placeholder="2022-2023"
                    label="Academic Year *"
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
                disableClearable
                sx={{ width: "80%" }}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "wing_name", value },
                  });
                }}
                value={values.wing_name}
                options={winginfo.map((acd) => acd.wing_name)}
                renderInput={(params: any) => (
                  <FormField
                    label="Wing Name *"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    name="wing_name"
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
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                mb={2}
                label="Class Name *"
                variant="standard"
                name="class_name"
                value={values.class_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.class_name && Boolean(errors.class_name)}
                success={values.class_name.length && !errors.class_name}
                helperText={touched.class_name && errors.class_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                mb={2}
                label="Class Code *"
                variant="standard"
                name="class_code"
                value={values.class_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.class_code && Boolean(errors.class_code)}
                success={values.class_code.length && !errors.class_code}
                helperText={touched.class_code && errors.class_code}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                mb={2}
                label="Index"
                variant="standard"
                name="index"
                value={values.index}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.index && Boolean(errors.index)}
                success={values.index && !errors.index}
                helperText={touched.index && errors.index}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Initial Section
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                sx={{ width: "80%" }}
                label="Section Name *"
                variant="standard"
                name="section_name"
                value={values.section_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.section_name && Boolean(errors.section_name)}
                success={values.section_name.length && !errors.section_name}
                helperText={touched.section_name && errors.section_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                InputLabelProps={{ shrink: true }}
                type="date"
                sx={{ width: "80%" }}
                label="Start Date *"
                variant="standard"
                name="start_date"
                value={values.start_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.start_date && Boolean(errors.start_date)}
                success={values.start_date.length && !errors.start_date}
                helperText={touched.start_date && errors.start_date}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "80%" }}
                InputLabelProps={{ shrink: true }}
                type="date"
                label="End Date *"
                variant="standard"
                name="end_date"
                value={values.end_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.end_date && Boolean(errors.end_date)}
                success={values.end_date.length && !errors.end_date}
                helperText={touched.end_date && errors.end_date}
              />
            </Grid>

            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item mt={2}>
                <MDButton
                  color="dark"
                  variant="contained"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item mt={2} ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </form>
    </Card>
  );
};

export default Create;
