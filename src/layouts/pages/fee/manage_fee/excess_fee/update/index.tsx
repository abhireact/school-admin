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
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const Update = (props: any) => {
  const { editData, handleClose, fetchingData } = props;

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        id: editData.id,
        name: editData.name,
        description: editData.description || "",
        academic_year: editData.academic_year,
        account_name: editData.account_name,
        class_name: editData.class_name,
        section_name: editData.section_name,
        user_name: editData.user_name,
        first_name: editData.first_name,
        middle_name: editData.middle_name,
        last_name: editData.last_name,
        excess_amount: editData.excess_amount,
        payment_status: editData.payment_status,
        collection_date: editData.collection_date,
        add_amount: 0,
        total_amount: editData.excess_amount,
      },
      onSubmit: (values, action) => {
        const sendData = {
          ...editData,
          excess_amount: values.total_amount,
          payment_status: values.payment_status,
        };
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/excess_fee`, sendData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            handleClose();
            fetchingData();
            console.log("submit data", response.data);
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  // console.log(editData.fine_name, "fine name");
  const handleAmount = (e: any) => {
    setFieldValue("add_amount", e.target.value);
    setFieldValue("total_amount", Number(e.target.value) + Number(values.excess_amount));
  };
  return (
    <>
      <Card>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} p={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Edit Excess Fees
              </MDTypography>
            </Grid>
          </Grid>
          <MDBox p={4}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <MDInput
                  name="name"
                  sx={{ width: "80%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Name
                    </MDTypography>
                  }
                  disabled
                  value={values.name}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="description"
                  sx={{ width: "80%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Description
                    </MDTypography>
                  }
                  value={values.description}
                  variant="standard"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="academic_year"
                  sx={{ width: "80%" }}
                  placeholder="eg. 2022-2023"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Academic Year
                    </MDTypography>
                  }
                  value={values.academic_year}
                  variant="standard"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="account_name"
                  sx={{ width: "80%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Account Name
                    </MDTypography>
                  }
                  value={values.account_name}
                  variant="standard"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="class_name"
                  sx={{ width: "80%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Class and Section
                    </MDTypography>
                  }
                  value={`${values.class_name} ${values.section_name}`}
                  variant="standard"
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="section_name"
                  sx={{ width: "80%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Student
                    </MDTypography>
                  }
                  value={`${values.user_name}-${values.first_name} ${values.middle_name} ${values.last_name}`}
                  variant="standard"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="excess_amount"
                  sx={{ width: "80%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Excess Amount
                    </MDTypography>
                  }
                  value={`${values.excess_amount}`}
                  variant="standard"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="collection_date"
                  sx={{ width: "80%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Date
                    </MDTypography>
                  }
                  value={`${values.collection_date}`}
                  variant="standard"
                  disabled
                />
              </Grid>
              <Grid item xs={6} sm={4} mt={2}>
                <Autocomplete
                  disableClearable
                  sx={{ width: "80%" }}
                  value={values.payment_status}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "payment_status", value },
                    });
                  }}
                  options={["adjust", "refund"]}
                  renderInput={(params: any) => (
                    <MDInput
                      InputLabelProps={{ shrink: true }}
                      name="payment_status"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Select Payment Status
                        </MDTypography>
                      }
                      value={values.payment_status}
                      {...params}
                      variant="standard"
                      error={touched.payment_status && Boolean(errors.payment_status)}
                      helperText={touched.payment_status && errors.payment_status}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="add_amount"
                  sx={{ width: "80%" }}
                  type="number"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Add Amount
                    </MDTypography>
                  }
                  onChange={handleAmount}
                  value={`${values.add_amount}`}
                  variant="standard"
                  onBlur={handleBlur}
                  error={touched.add_amount && Boolean(errors.add_amount)}
                  success={values.add_amount && !errors.add_amount}
                  helperText={touched.add_amount && errors.add_amount}
                />
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <MDInput
                  name="total_amount"
                  sx={{ width: "80%" }}
                  type="number"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Total Amount
                    </MDTypography>
                  }
                  value={`${values.total_amount}`}
                  variant="standard"
                  disabled
                />
              </Grid>

              <Grid
                item
                container
                xs={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
                mr={2}
              >
                <Grid item mt={2} mr={2}>
                  <MDButton
                    color="dark"
                    variant="contained"
                    onClick={() => {
                      handleClose(false);
                    }}
                  >
                    Back
                  </MDButton>
                </Grid>
                <Grid item mt={2}>
                  <MDButton color="info" variant="contained" type="submit">
                    Submit
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </form>
      </Card>
    </>
  );
};
export default Update;
