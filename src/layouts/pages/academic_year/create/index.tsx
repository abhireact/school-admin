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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Academic {
  academic_year: string;
  start_date: Date;
  end_date: Date;
}

interface FormValues {
  academic: Academic[];
}
// 3000 max year
const validationSchema = Yup.object().shape({
  academic: Yup.array().of(
    Yup.object().shape({
      academic_year: Yup.string()
        .matches(/^\d{4}-\d{4}$/, "YYYY-YYYY format")
        .required("Required *"),
      start_date: Yup.date()
        .required("Required *")
        .test("year-range", "Incorrect format", function (value) {
          if (value) {
            const year = value.getFullYear();
            return year >= 2000 && year <= 3000;
          }
          return true;
        }),
      end_date: Yup.date()
        .nullable()
        .test("year-range", "Incorrect format", function (value) {
          if (value) {
            const year = value.getFullYear();
            return year >= 2000 && year <= 3000;
          }
          return true;
        }),
    })
  ),
});

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { setOpen, fetchData } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic: [{ academic_year: "", start_date: "", end_date: "" }],
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, values.academic, {
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

  const addAcademic = () => {
    setFieldValue("academic", [
      ...values.academic,
      { academic_year: "", start_date: "", end_date: "" },
    ]);
  };

  const removeAcademic = (index: number) => {
    const newacademic = [...values.academic];
    newacademic.splice(index, 1);
    setFieldValue("academic", newacademic);
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBox pt={4} px={4} pb={1}>
        {" "}
        <Grid container spacing={3}>
          {values.academic.map((account, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={4}>
                <MDInput
                  placeholder="eg. 2023-2024"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name={`academic.${index}.academic_year`}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      ACADEMIC YEAR
                    </MDTypography>
                  }
                  value={account.academic_year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.academic?.[index]?.academic_year &&
                    Boolean((errors.academic as FormikErrors<Academic>[])?.[index]?.academic_year)
                  }
                  success={
                    account.academic_year.length > 0 &&
                    !(errors.academic as FormikErrors<Academic>[])?.[index]?.academic_year
                  }
                  helperText={
                    touched.academic?.[index]?.academic_year &&
                    (errors.academic as FormikErrors<Academic>[])?.[index]?.academic_year
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <MDInput
                  type="date"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name={`academic.${index}.start_date`}
                  InputLabelProps={{ shrink: true }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Start Date
                    </MDTypography>
                  }
                  value={account.start_date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    touched.academic?.[index]?.start_date &&
                    Boolean((errors.academic as FormikErrors<Academic>[])?.[index]?.start_date)
                  }
                  success={
                    account.start_date.length > 0 &&
                    !(errors.academic as FormikErrors<Academic>[])?.[index]?.start_date
                  }
                  helperText={
                    touched.academic?.[index]?.start_date &&
                    (errors.academic as FormikErrors<Academic>[])?.[index]?.start_date
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <MDInput
                  type="date"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name={`academic.${index}.end_date`}
                  InputLabelProps={{ shrink: true }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      End Date
                    </MDTypography>
                  }
                  value={account.end_date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.academic?.[index]?.end_date &&
                    Boolean((errors.academic as FormikErrors<Academic>[])?.[index]?.end_date)
                  }
                  success={
                    account.end_date.length > 0 &&
                    !(errors.academic as FormikErrors<Academic>[])?.[index]?.end_date
                  }
                  helperText={
                    touched.academic?.[index]?.end_date &&
                    (errors.academic as FormikErrors<Academic>[])?.[index]?.end_date
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                mt={2}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {index == values.academic.length - 1 && (
                  <IconButton onClick={() => addAcademic()}>
                    <AddIcon />
                  </IconButton>
                )}

                <IconButton
                  onClick={() => removeAcademic(index)}
                  disabled={values.academic.length === 1}
                >
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
