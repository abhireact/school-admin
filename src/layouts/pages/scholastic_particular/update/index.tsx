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

  useEffect(() => {
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
  }, []);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      old_name: editData.name,
      name: editData.name,
      best_of_count: editData.best_of_count,
      calculation: editData.calculation,
      academic_year: editData.academic_year,
      weightage: editData.weightage,
      index: editData.index,
      description: editData.description,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .put("http://10.0.20.200:8000/schol_particular", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchingData();
          action.resetForm();
          handleClose();
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
                name="name"
                label={<MDTypography variant="body2">Particular Name</MDTypography>}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="calculation"
                label={<MDTypography variant="body2">Calculation </MDTypography>}
                value={values.calculation}
                onChange={handleChange}
                onBlur={handleBlur}
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
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                type="number"
                name="best_of_count"
                label={<MDTypography variant="body2">Best of count </MDTypography>}
                value={values.best_of_count}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="index"
                label={<MDTypography variant="body2">Index No.</MDTypography>}
                value={values.index}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                type="number"
                variant="standard"
                name="weightage"
                label={<MDTypography variant="body2">Weightage</MDTypography>}
                value={values.weightage}
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
