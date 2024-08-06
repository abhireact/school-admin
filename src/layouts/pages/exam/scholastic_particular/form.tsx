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
import { useNavigate } from "react-router";

const Create = (props: any) => {
  const token = Cookies.get("token");
  const academic_year = Cookies.get("academic_year");
  const navigate = useNavigate();

  const { handleShowPage, fetchingData } = props;
  const [academicdata, setAcademicdata] = useState([]);

  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: props.editData
      ? props.editData
      : {
          name: "",
          best_of_count: 0,
          calculation: "",
          academic_year: academic_year,
          description: "",
          weightage: 0,
          index: 0,
        },
    // validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.200:8000/schol_particular", values, {
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} px={2}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                {props.editData ? "Edit Scholastic Particulars" : "Create Scholastic Particulars"}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                sx={{ width: "100%" }}
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
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Academic Year
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.academic_year}
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                name="name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Particular Name
                  </MDTypography>
                }
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                name="calculation"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Calculation{" "}
                  </MDTypography>
                }
                value={values.calculation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                type="number"
                variant="standard"
                name="best_of_count"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Best of count{" "}
                  </MDTypography>
                }
                value={values.best_of_count}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                type="number"
                variant="standard"
                name="weightage"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Weightage
                  </MDTypography>
                }
                value={values.weightage}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
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
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                variant="standard"
                name="description"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Description
                  </MDTypography>
                }
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
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item mt={4}>
                <MDButton color="dark" variant="contained" onClick={() => navigate(-1)}>
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
