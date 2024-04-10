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

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, editData, fetchingData } = props;

  const handleClose = () => {
    setOpenupdate(false);
  };
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  function filterDataByAcdName(data: any, acdName: any) {
    let filtereddata = data
      .filter((item: any) => item.acd_name === acdName)
      .map((item: any) => item.cls_name);
    setFilteredClass(filtereddata);
  }

  useEffect(() => {
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
        console.error("Error fetching data:", error);
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
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      cls_name: editData.cls_name,
      sec_name: editData.sec_name,
      grade_name: editData.grade_name,
      acd_name: editData.acd_name,
      credit_point: editData.credit_point,
      minimum_score: editData.minimum_score,
      description: editData.description,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.128:8000/mg_subject", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchingData();
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
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="grade_name"
                label={<MDTypography variant="body2">Grade Name</MDTypography>}
                value={values.grade_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="sec_name"
                label={<MDTypography variant="body2">Section Name</MDTypography>}
                value={values.sec_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="credit_point"
                label={<MDTypography variant="body2">Credit Point No.</MDTypography>}
                value={values.credit_point}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="minimum_score"
                label={<MDTypography variant="body2">Minimum Score</MDTypography>}
                value={values.minimum_score}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="description"
                label={<MDTypography variant="body2">Description</MDTypography>}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.acd_name}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "acd_name", value },
                  });
                  filterDataByAcdName(classdata, value);
                }}
                options={academicdata.map((acd) => acd.acd_name)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="acd_name"
                    placeholder="2022-23"
                    label={<MDTypography variant="body2">Academic Year</MDTypography>}
                    onChange={handleChange}
                    value={values.acd_name}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.cls_name}
                onChange={
                  filteredClass.length > 1
                    ? (event, value) => {
                        handleChange({
                          target: { name: "cls_name", value },
                        });
                      }
                    : undefined
                }
                options={filteredClass}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="cls_name"
                    label={<MDTypography variant="body2">Class Name</MDTypography>}
                    onChange={handleChange}
                    value={values.cls_name}
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
                    handleClose();
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

export default Update;
