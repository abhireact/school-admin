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
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),
});
const Create = (props: any) => {
  const token = Cookies.get("token");

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

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      fee_collection_name: "",
      late_fee_fine: "",
      fee_category: "",
      academic_year: "",
      start_date: "",
      due_date: "",
      end_date: "",
      isapplicable: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.200:8000/fee_schedule", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success(" Fetched Data Successfully!");

          action.resetForm();
        })
        .catch(() => {
          message.error("Error on fetching data !");
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
                        Fee Category
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
              <MDInput
                sx={{ width: "70%" }}
                name="fee_collection_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Fee Collectin Name
                  </MDTypography>
                }
                onChange={handleChange}
                value={values.fee_collection_name}
                variant="standard"
                error={touched.fee_collection_name && Boolean(errors.fee_collection_name)}
                helperText={touched.fee_collection_name && errors.fee_collection_name}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.late_fee_fine}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "late_fee_fine", value },
                  });
                }}
                options={academicdata.map((acd) => acd.late_fee_fine)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="late_fee_fine"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Late Fee Fine
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.late_fee_fine}
                    {...params}
                    variant="standard"
                    error={touched.late_fee_fine && Boolean(errors.late_fee_fine)}
                    helperText={touched.late_fee_fine && errors.late_fee_fine}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.late_fee_fine}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "late_fee_fine", value },
                  });
                }}
                options={academicdata.map((acd) => acd.late_fee_fine)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="late_fee_fine"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Fee Particulars
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.late_fee_fine}
                    {...params}
                    variant="standard"
                    error={touched.late_fee_fine && Boolean(errors.late_fee_fine)}
                    helperText={touched.late_fee_fine && errors.late_fee_fine}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                InputLabelProps={{ shrink: true }}
                name="start_date"
                type="date"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Start Date
                  </MDTypography>
                }
                onChange={handleChange}
                value={values.start_date}
                variant="standard"
                error={touched.start_date && Boolean(errors.start_date)}
                helperText={touched.start_date && errors.start_date}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                InputLabelProps={{ shrink: true }}
                name="end_date"
                type="date"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    End Date
                  </MDTypography>
                }
                onChange={handleChange}
                value={values.end_date}
                variant="standard"
                error={touched.end_date && Boolean(errors.end_date)}
                helperText={touched.end_date && errors.end_date}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                InputLabelProps={{ shrink: true }}
                name="due_date"
                type="date"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Due Date
                  </MDTypography>
                }
                onChange={handleChange}
                value={values.due_date}
                variant="standard"
                error={touched.due_date && Boolean(errors.due_date)}
                helperText={touched.due_date && errors.due_date}
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
            </Grid>{" "}
            <Grid item xs={12} sm={6} py={1}>
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Is Applicable
              </MDTypography>
              <Checkbox checked={values.isapplicable} onChange={handleChange} name="isapplicable" />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Grid item ml={2} mt={4}>
                <MDButton color="info" variant="contained" type="submit">
                  Submit
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
