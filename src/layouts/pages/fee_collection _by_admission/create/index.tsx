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
  wing_name: Yup.string().required("Required *"),
  fee_code: Yup.string().required("Required *"),
  admission_number: Yup.string().required("Required *"),

  collection_date: Yup.date().required("Required"),
});
const Create = (props: any) => {
  const token = Cookies.get("token");

  const { handleShowPage, setData } = props;
  const [wingData, setWingData] = useState([]);
  const [feeData, setFeeData] = useState(["Fee Code", "Admission Number"]);
  useEffect(() => {
    axios
      .get("http://10.0.20.121:8000/mg_wings", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWingData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      wing_name: "",
      fee_code: "",
      collection_date: "",
      admission_number: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://10.0.20.121:8000/fee_collection", values, {
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
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={6} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.wing_name}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "wing_name", value },
                  });
                }}
                options={wingData.map((acd) => acd.wing_name)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="wing_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Wing
                      </MDTypography>
                    }
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
            <Grid item xs={12} sm={6} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                value={values.fee_code}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "fee_code", value },
                  });
                }}
                options={feeData.map((acd) => acd)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="fee_code"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Admission Number / Fee Code
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.fee_code}
                    {...params}
                    variant="standard"
                    error={touched.fee_code && Boolean(errors.fee_code)}
                    helperText={touched.fee_code && errors.fee_code}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="collection_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Collection Date
                  </MDTypography>
                }
                value={values.collection_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.collection_date && Boolean(errors.collection_date)}
                success={values.collection_date.length && !errors.collection_date}
                helperText={touched.collection_date && errors.collection_date}
              />
            </Grid>
            <Grid item xs={12} sm={6} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="admission_number"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Search By Admission Number
                  </MDTypography>
                }
                value={values.admission_number}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.admission_number && Boolean(errors.admission_number)}
                success={values.admission_number.length && !errors.admission_number}
                helperText={touched.admission_number && errors.admission_number}
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
                    handleShowPage();
                  }}
                >
                  Back
                </MDButton>
              </Grid>
              <Grid item ml={2} mt={4}>
                <MDButton color="info" variant="contained" type="submit">
                  Search
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
