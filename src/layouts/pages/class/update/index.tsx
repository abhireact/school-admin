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
  code: Yup.string().required("Required *"),
  wing_name: Yup.string().required("Required *"),
  academic_year: Yup.string().required("Required *"),
});

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, fetchData, editData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };
  const [academicData, setAcademicData] = useState([]);
  const [winginfo, setWinginfo] = useState([]);
  useEffect(() => {
    axios
      .get("http://10.0.20.121:8000/mg_accademic_year", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAcademicData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("http://10.0.20.121:8000/mg_wing/", {
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
      academic_year: editData.academic_year,
      wing_name: editData.wing_name,
      code: editData.code,
      class_name: editData.class_name,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendValues = { ...values, old_class_name: editData.class_name };
      axios
        .put("http://10.0.20.121:8000/mg_class", sendValues, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          action.resetForm();
          message.success("Updated successfully!");
          fetchData();
          handleClose();
        })
        .catch(() => {
          message.error("Error on updating  !");
        });
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Class Name
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="class_name"
              value={values.class_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.class_name && Boolean(errors.class_name)}
              helperText={touched.class_name && errors.class_name}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Class Code
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <MDInput
              mb={2}
              sx={{ width: "65%" }}
              variant="standard"
              name="code"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.code && Boolean(errors.code)}
              helperText={touched.code && errors.code}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Wing Name
            </MDTypography>
          </Grid>

          <Grid item xs={12} sm={7} mb={2}>
            <Autocomplete
              sx={{ width: "65%" }}
              value={values.wing_name}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "wing_name", value },
                });
              }}
              options={winginfo.map((acd) => acd.wing_name)}
              renderInput={(params: any) => (
                <MDInput
                  name="wing_name"
                  onChange={handleChange}
                  value={values.wing_name}
                  {...params}
                  variant="standard"
                  error={touched.wing_name && Boolean(errors.wing_name)}
                  helperText={touched.wing_name && errors.wing_name}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <MDTypography mb={2} variant="body2">
              Academic Year
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={7} mb={2}>
            <Autocomplete
              sx={{ width: "65%" }}
              value={values.academic_year}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "academic_year", value },
                });
              }}
              options={academicData.map((acd) => acd.academic_year)}
              renderInput={(params: any) => (
                <MDInput
                  name="academic_year"
                  placeholder="eg. 2022-23"
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
          <Grid
            item
            container
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Grid item mt={4}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
            <Grid item ml={2} mt={4}>
              <MDButton
                color="primary"
                variant="outlined"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
