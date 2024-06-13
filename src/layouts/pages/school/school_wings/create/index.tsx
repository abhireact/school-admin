import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { FormikErrors, useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen, fetchData } = props;
  const handleClose = () => {
    setOpen(false);
  };

  interface Wings {
    wing_name: string;
  }

  interface FormValues {
    wing: Wings[];
  }

  const validationSchema = Yup.object().shape({
    wing: Yup.array().of(
      Yup.object().shape({
        wing_name: Yup.string().required("Required *"),
      })
    ),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        wing: [{ wing_name: "" }],
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_wing`, values.wing, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Created successfully!");
            fetchData();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });

        action.resetForm();
      },
    });
  const addWing = () => {
    setFieldValue("wing", [...values.wing, { wing_name: "" }]);
  };

  const removeWing = (index: number) => {
    const newwing = [...values.wing];
    newwing.splice(index, 1);
    setFieldValue("wing", newwing);
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBox pt={4} px={4} pb={2}>
        <Grid container spacing={3}>
          {values.wing.map((account, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={10}>
                <MDInput
                  sx={{ width: "100%" }}
                  variant="standard"
                  name={`wing.${index}.wing_name`}
                  placeholder="Enter Wing Name"
                  value={account.wing_name}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      WING NAME *
                    </MDTypography>
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.wing?.[index]?.wing_name &&
                    Boolean((errors.wing as FormikErrors<Wings>[])?.[index]?.wing_name)
                  }
                  success={
                    account.wing_name.length > 0 &&
                    !(errors.wing as FormikErrors<Wings>[])?.[index]?.wing_name
                  }
                  helperText={
                    touched.wing?.[index]?.wing_name &&
                    (errors.wing as FormikErrors<Wings>[])?.[index]?.wing_name
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                mt={1.5}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {index == values.wing.length - 1 && (
                  <IconButton onClick={() => addWing()}>
                    <AddIcon />
                  </IconButton>
                )}

                <IconButton onClick={() => removeWing(index)} disabled={values.wing.length === 1}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
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
      </MDBox>
    </form>
  );
};

export default Create;
