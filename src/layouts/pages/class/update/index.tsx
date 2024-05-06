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
import FormField from "layouts/pages/account/components/FormField";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  code: Yup.string().required("Required *"),
  wing_name: Yup.string().required("Required *"),
  // academic_year: Yup.string().required("Required *"),
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
      .get("http://10.0.20.200:8000/mg_accademic_year", {
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
      .get("http://10.0.20.200:8000/mg_wing", {
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
      class_name: editData.class_name,
      code: editData.class_code,
      index: editData.index,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      const sendValues = {
        ...values,
        old_class_name: editData.class_name,
        old_code: editData.class_code,
      };
      axios
        .put("http://10.0.20.200:8000/mg_class", sendValues, {
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
          <Grid container spacing={3} pt={2} px={2}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6" fontWeight="bold" color="secondary">
                Update Class
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={4}>
              <MDInput mb={2} label="Index" variant="standard" name="index" value={values.index} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <Autocomplete
                value={values.academic_year}
                options={academicData.map((acd) => acd.academic_year)}
                renderInput={(params: any) => (
                  <FormField
                    sx={{ width: "100%" }}
                    label="Academic Year"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    name="academic_year"
                    value={values.academic_year}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                value={values.wing_name}
                options={winginfo.map((acd) => acd.wing_name)}
                renderInput={(params: any) => (
                  <FormField
                    label="Wing Name"
                    autoComplete="off"
                    InputLabelProps={{ shrink: true }}
                    name="wing_name"
                    value={values.wing_name}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                label="Class Name"
                variant="standard"
                name="class_name"
                value={values.class_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                mb={2}
                label="Class Code"
                variant="standard"
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
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

export default Update;
