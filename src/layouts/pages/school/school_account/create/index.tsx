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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  account_name: Yup.string().required("Required *"),
});

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { handleShowPage, fetchingData } = props;

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        account_name: "",
        description: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post("http://10.0.20.200:8000/mg_accounts", values, {
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
          <Grid container>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="account_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Account
                  </MDTypography>
                }
                value={values.account_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.account_name && Boolean(errors.account_name)}
                success={values.account_name.length && !errors.account_name}
                helperText={touched.account_name && errors.account_name}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                multiline
                rows={2}
                sx={{ width: "70%" }}
                variant="standard"
                name="description"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Description ...
                  </MDTypography>
                }
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                success={values.description.length && !errors.description}
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
                    handleShowPage();
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
      </Card>
    </form>
  );
};

export default Create;
