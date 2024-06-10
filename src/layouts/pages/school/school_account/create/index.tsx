import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik, FormikErrors } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import * as Yup from "yup";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface Account {
  account_name: string;
  description: string;
}

interface FormValues {
  accounts: Account[];
}

const validationSchema = Yup.object().shape({
  accounts: Yup.array().of(
    Yup.object().shape({
      account_name: Yup.string().required("Required *"),
      description: Yup.string(),
    })
  ),
});

const Create = (props: { handleClose: () => void; fetchingData: () => void }) => {
  const token = Cookies.get("token");
  const { handleClose, fetchingData } = props;

  const formik = useFormik<FormValues>({
    initialValues: {
      accounts: [{ account_name: "", description: "" }],
    },
    validationSchema,
    onSubmit: (values, actions) => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_accounts`, values.accounts, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Created successfully!");
          fetchingData();
          actions.resetForm();
          handleClose();
        })
        .catch(() => {
          message.error("Error on creating!");
        });
    },
  });

  const addAccount = () => {
    formik.setFieldValue("accounts", [
      ...formik.values.accounts,
      { account_name: "", description: "" },
    ]);
  };

  const removeAccount = (index: number) => {
    const newAccounts = [...formik.values.accounts];
    newAccounts.splice(index, 1);
    formik.setFieldValue("accounts", newAccounts);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <MDBox pt={4} px={4} pb={1}>
          <Grid container spacing={3}>
            {formik.values.accounts.map((account, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={5}>
                  <MDInput
                    sx={{ width: "100%" }}
                    variant="standard"
                    name={`accounts.${index}.account_name`}
                    placeholder="Enter Account"
                    value={account.account_name}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        ACCOUNT
                      </MDTypography>
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.accounts?.[index]?.account_name &&
                      Boolean(
                        (formik.errors.accounts as FormikErrors<Account>[])?.[index]?.account_name
                      )
                    }
                    success={
                      account.account_name.length > 0 &&
                      !(formik.errors.accounts as FormikErrors<Account>[])?.[index]?.account_name
                    }
                    helperText={
                      formik.touched.accounts?.[index]?.account_name &&
                      (formik.errors.accounts as FormikErrors<Account>[])?.[index]?.account_name
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={5}>
                  <MDInput
                    rows={2}
                    sx={{ width: "100%" }}
                    variant="standard"
                    name={`accounts.${index}.description`}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        DESCRIPTION
                      </MDTypography>
                    }
                    placeholder="Enter the description"
                    value={account.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.accounts?.[index]?.description &&
                      Boolean(
                        (formik.errors.accounts as FormikErrors<Account>[])?.[index]?.description
                      )
                    }
                    helperText={
                      formik.touched.accounts?.[index]?.description &&
                      (formik.errors.accounts as FormikErrors<Account>[])?.[index]?.description
                    }
                    success={
                      account.description.length > 0 &&
                      !(formik.errors.accounts as FormikErrors<Account>[])?.[index]?.description
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={2} mt={1.5}>
                  {index == formik.values.accounts.length - 1 && (
                    <IconButton onClick={addAccount}>
                      <AddIcon />
                    </IconButton>
                  )}

                  <IconButton
                    onClick={() => removeAccount(index)}
                    disabled={formik.values.accounts.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}

            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item mt={2}>
                <MDButton color="dark" variant="contained" onClick={handleClose}>
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
