import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

import MDBox from "components/MDBox";
import { commonacademicyear } from "../common_validationschema";
import Checkbox from "@mui/material/Checkbox";

import DataTable from "examples/Tables/DataTable";
import FormField from "layouts/pages/account/components/FormField";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
import { useSelector } from "react-redux";
interface FeeConcessionInterface {
  columns: { Header: string; accessor: string }[];
  rows: {
    sl_no: Number;
    student_name: string;
    guardian_name: string;
    admission_number: string;
    section: string;
    concession: Number;
    discount: Number;
  }[];
}
const initialValues = {
  academic_year: "",
  class_name: "",
  section_name: "",
  late_fine_discount: false,
};
export default function FeeConcessionReport() {
  const { classes, account, studentcategory } = useSelector((state: any) => state);
  const [feeConcessionReportData, setfeeConcessionReportData] = useState<FeeConcessionInterface>({
    columns: [],
    rows: [],
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: commonacademicyear,
      enableReinitialize: true,

      onSubmit: async (values, action) => {
        axios
          .post("http://10.0.20.200:8000/concession_report", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const feeConcessionData = {
              columns: [
                { Header: "SL.NO", accessor: "sl_no" },
                { Header: "STUDENT NAME", accessor: "student_name" },
                { Header: "GUARDIAN NAME", accessor: "guardian_name" },
                { Header: "ADMISSION NUMBER", accessor: "admission_number" },
                { Header: "CLASS & SECTION", accessor: "section" },
                { Header: "CONCESSION", accessor: "concession" },
                { Header: "DISCOUNT", accessor: "discount" },
              ],
              rows: response.data.map(
                (
                  data: {
                    first_name: any;
                    middle_name: any;
                    last_name: string;
                    guardians: [{ first_name: any; middle_name: any; last_name: string }];
                    admission_number: any;
                    concession: any;
                    discount: any;
                  },
                  index: any
                ) => ({
                  sl_no: index,
                  student_name: `${data.first_name} ${
                    data.middle_name != null ? data.middle_name : ""
                  } ${data.last_name != null ? data.last_name : ""}`,
                  guardian_name: `${data.guardians[0].first_name} ${
                    data.guardians[0].middle_name != null ? data.guardians[0].middle_name : ""
                  } ${data.guardians[0].last_name != null ? data.guardians[0].last_name : ""}`,
                  admission_number: data.admission_number,
                  section: `${values.class_name}-${values.section_name}`,
                  concession: data.concession,
                  discount: data.discount,
                })
              ),
            };
            setfeeConcessionReportData(feeConcessionData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        //

        console.log("submited", values);
      },
    });

  console.log(feeConcessionReportData, "concession DAtaa");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <MDBox p={3}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Concession Report
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "academic_year", value } });
                      }}
                      options={
                        classes
                          ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="academic_year"
                          onChange={handleChange}
                          value={values.academic_year}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Academic Year
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "class_name", value } });
                      }}
                      options={
                        values.academic_year !== ""
                          ? classes
                              .filter((item: any) => item.academic_year === values.academic_year)
                              .map((item: any) => item.class_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="class_name"
                          onChange={handleChange}
                          value={values.class_name}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Class
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "section_name", value } });
                      }}
                      options={
                        values.class_name !== ""
                          ? classes
                              .filter(
                                (item: any) =>
                                  item.academic_year === values.academic_year &&
                                  item.class_name === values.class_name
                              )[0]
                              .section_data.map((item: any) => item.section_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="section_name"
                          onChange={handleChange}
                          value={values.section_name}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Section
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Checkbox
                      checked={values.late_fine_discount}
                      name="late_fine_discount"
                      value="true"
                      onChange={handleChange}
                    />
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Show late fee discount
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                  <Grid item ml={2}>
                    <MDButton color="info" variant="contained" type="submit">
                      Show Data
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} pt={2}>
            {feeConcessionReportData.rows.length > 0 ? (
              <Card>
                <MDBox p={3}>
                  <DataTable
                    table={feeConcessionReportData}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                  />
                </MDBox>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
