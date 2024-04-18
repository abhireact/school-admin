import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
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
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
  academic_year: Yup.string().required("Required *"),
});

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen, fetchData } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterClassData(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === acdName)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  useEffect(() => {
    axios
      .get("http://10.0.20.121:8000/mg_accademic_year", {
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
        console.error("Error fetching academic data:", error);
      });
    axios
      .get("http://10.0.20.121:8000/mg_class", {
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
  }, []);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      academic_year: "",
      section_name: "",
      class_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.121:8000/mg_section", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Created successfully!");
          fetchData();
          handleClose();
        })
        .catch(() => {
          message.error("Error on creating!");
        });

      action.resetForm();
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={5} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Section Name
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7} mt={2}>
            <MDInput
              sx={{ width: "65%" }}
              variant="standard"
              name="section_name"
              value={values.section_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.section_name && Boolean(errors.section_name)}
              helperText={touched.section_name && errors.section_name}
            />
          </Grid>

          <Grid item xs={12} sm={5} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Academic Year
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7} mt={2}>
            <Autocomplete
              sx={{ width: "65%" }}
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
                  placeholder="Choose Options"
                  //label={<MDTypography variant="body2">Academic Year</MDTypography>}
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
          <Grid item xs={12} sm={5} mt={2}>
            <MDTypography variant="button" fontWeight="bold" color="secondary">
              Class Name
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mt={2}>
            <Autocomplete
              sx={{ width: "65%" }}
              value={values.class_name}
              onChange={
                filteredClass.length > 1
                  ? (event, value) => {
                      handleChange({
                        target: { name: "class_name", value },
                      });
                    }
                  : undefined
              }
              options={filteredClass}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="class_name"
                  // label={<MDTypography variant="body2">Class Name</MDTypography>}
                  placeholder="Choose Options"
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

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
  );
};

export default Create;
