import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { createschema } from "../createschema";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";
const token = Cookies.get("token");
export default function EditFeeParicularAmount(props: any) {
  const { t } = useTranslation();
  const initialValues = {
    fee_category: props.data.fee_category,
    fee_perticular: props.data.fee_particular,
    account: props.data.account_name,
    amount: props.data.amount,
    id: props.data?.id,
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(values, "lllllllllllll");
        const updatedValue = {
          academic_year: props.data.academic_year,
          account_name: props.data.account_name,
          amount: values.amount,
          class_name: props.data.class_name,
          fee_category: props.data.fee_category,
          fee_particular: props.data.fee_particular,
          section_name: props.data.section_name,
          student_category: props.data.student_category,
          user_id: props.data.user_id,
          id: props.data?.id,
        };
        axios
          .put("http://10.0.20.200:8000/fee_particular", updatedValue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // console.log(response, "responseeeeeeeeeeeeeee");
            message.success(response.data.message);
            props.onSuccess();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });
  return (
    <I18nextProvider i18n={createTrans}>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  {t("Edit")}
                  {""}
                  {t("fee_amount_particular")}
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={4}>
                <MDInput
                  sx={{ width: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("category_name")}
                    </MDTypography>
                  }
                  disabled
                  // label="Fee Category"
                  name="fee_category"
                  value={values.fee_category}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  disabled
                  sx={{ width: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("fee_particular")}
                    </MDTypography>
                  }
                  // label="Fee Particular"
                  name="fee_perticular"
                  value={values.fee_perticular}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  disabled
                  sx={{ width: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("account")}
                    </MDTypography>
                  }
                  // label="Account"
                  name="account"
                  value={values.account}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <MDInput
                  sx={{ width: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("amount")}
                    </MDTypography>
                  }
                  // label="Amount"
                  name="amount"
                  value={values.amount}
                  placeholder="Enter Amount"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={4}>
              <Grid item>
                <MDButton color="dark" variant="contained" onClick={() => props.onSuccess()}>
                  {t("back")}
                </MDButton>
              </Grid>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  {t("save")}
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </form>
    </I18nextProvider>
  );
}
