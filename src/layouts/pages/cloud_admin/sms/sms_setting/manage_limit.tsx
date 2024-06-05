import React, { useEffect, useState } from "react";
import { Grid, Link, Tooltip, Autocomplete, Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import MDInput from "components/MDInput";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
export default function ManageLimit(props: any) {
  const initialValues = props.data
    ? props.data
    : {
        school_name: "SAKSHARIKA VIDYA VARSHINI",
        limit: 0,
        cost_of_sms: 0,
        max_carry_forward_limit: 0,
        start_date: Date,
        end_date: Date, // Array to store particulars
      };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      //   validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        if (props.data) {
          axios
            .put("http://10.0.20.200:8000/sms_limit", values, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                message.success(response.data.message);
                props.onSuccess();
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        } else {
          axios
            .post("http://10.0.20.200:8000/sms_limit", values, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                message.success(response.data.message);
                props.onSuccess();
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid xs={12} sm={12} p={2}>
          <Grid container p={2}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Sms Limit
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6" fontWeight="bold" color="dark">
                {props.sc_name}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={4}>
              <MDInput
                type="number"
                sx={{ width: "100%" }}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    SMS Limit
                  </MDTypography>
                }
                name="limit"
                value={values.limit}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                type="number"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Cost Of SMS
                  </MDTypography>
                }
                name="cost_of_sms"
                value={values.cost_of_sms}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDInput
                sx={{ width: "100%" }}
                type="number"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Max Carry Forward Limit
                  </MDTypography>
                }
                name="max_carry_forward_limit"
                value={values.max_carry_forward_limit}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                type="date"
                sx={{ width: "100%" }}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Start Date
                  </MDTypography>
                }
                name="start_date"
                value={values.start_date}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                type="date"
                sx={{ width: "100%" }}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    End Date
                  </MDTypography>
                }
                name="end_date"
                value={values.end_date}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={4}>
            <Grid item>
              <MDButton color="dark" variant="contained" onClick={() => props.onSuccess()}>
                Back
              </MDButton>
            </Grid>
            <Grid item ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
}
