import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from "components/MDInput";
import { Card, Grid, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

// Create Yup validation schema
const validationSchema = yup.object({
  to_date: yup
    .date()
    .min(new Date(), "To date must be today or a future date")
    .required("To date is required"),
  from_date: yup
    .date()
    .min(yup.ref("to_date"), "From date must be later than To date")
    .required("From date is required"),
  resion: yup.string().required("Reason is required"),
});

const token = Cookies.get("token");

export default function StudentLeaveApply() {
  const [sendedData, setsendedData] = useState([
    { date: "09-09-2024", resion: "family function" },
    {
      date: "10-09-2024",
      resion: "family functionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    },
  ]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      to_date: "",
      from_date: "",
      resion: "",
    },
    validationSchema,
    onSubmit: async (values, action) => {
      //   try {
      //     const response = await axios.put(
      //       "http://10.0.20.200:8000/mg_sms_configuration/school_incharge",
      //       values,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );
      //     message.success(response.data.message);
      //     action.resetForm();
      //     // Add any additional actions if needed, like fetching data again
      //   } catch (error) {
      //     message.error(error.response?.data?.detail || "An error occurred");
      //   }
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Card>
              <Grid container p={3}>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Apply Leave
                  </MDTypography>
                </Grid>
                <Grid container spacing={2} item xs={12} sm={12} p={2}>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      type="date"
                      sx={{ width: "100%" }}
                      InputLabelProps={{ shrink: true }}
                      label="To Date*"
                      name="to_date"
                      value={values.to_date}
                      variant="standard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.to_date && touched.to_date)}
                    />
                    {errors.to_date && touched.to_date && (
                      <MDTypography color="error" variant="caption">
                        {errors.to_date}
                      </MDTypography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      type="date"
                      sx={{ width: "100%" }}
                      label="From Date*"
                      InputLabelProps={{ shrink: true }}
                      name="from_date"
                      value={values.from_date}
                      variant="standard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.from_date && touched.from_date)}
                    />
                    {errors.from_date && touched.from_date && (
                      <MDTypography color="error" variant="caption">
                        {errors.from_date}
                      </MDTypography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <MDInput
                      sx={{ width: "100%" }}
                      label="Reason*"
                      name="resion"
                      value={values.resion}
                      placeholder="Enter Reason"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.resion && touched.resion)}
                    />
                    {errors.resion && touched.resion && (
                      <MDTypography color="error" variant="caption">
                        {errors.resion}
                      </MDTypography>
                    )}
                  </Grid>
                </Grid>
                {/* <Grid item xs={12} sm={12} display="flex" justifyContent="center">
                  <MDTypography
                    variant="button"
                    sx={{ backgroundColor: "#f7ba63", padding: "8PX" }}
                  >
                    <InfoIcon /> Note: Select To-Date and From-Date Same If want to apply for One
                    day.
                  </MDTypography>
                </Grid> */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  pt={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Grid item ml={2}>
                    <MDButton color="info" variant="contained" type="submit">
                      Apply
                    </MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <Grid container px={3} p={3}>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Applied Leave
                  </MDTypography>
                </Grid>
                <Grid container spacing={2} item xs={12} sm={12}>
                  {/* {sendedData.map((item, index) => (
                    <Grid item xs={12} sm={12} key={index}>
                      <Card
                        sx={{
                          boxShadow: "4px 4px 8px 4px rgba(0,0,0,0.1)",
                          borderRadius: 8,
                        }}
                      >
                        <MDBox p={2}>
                          <Grid container>
                            <Grid item xs={12} sm={10}>
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                {item.date}
                                <br />
                                <MDTypography variant="button" fontWeight="regular" color="dark">
                                  {item.resion}
                                </MDTypography>
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Tooltip title="Cancel" placement="top">
                                <IconButton>
                                  <CloseIcon color="error" />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </MDBox>
                      </Card>
                    </Grid>
                  ))} */}
                  {sendedData.map((item, index) => (
                    <Grid item xs={12} sm={12} key={index}>
                      <Card
                        sx={{
                          boxShadow: "4px 4px 8px 4px rgba(0,0,0,0.1)",
                          borderRadius: 8,
                          height: 70, // Adjust height as needed
                          overflow: "hidden", // Hide overflow content
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <MDBox p={2} sx={{ flexGrow: 1, overflow: "hidden" }}>
                          <Grid container>
                            <Grid item xs={12} sm={10}>
                              <MDTypography
                                variant="button"
                                fontWeight="bold"
                                color="secondary"
                                sx={{
                                  display: "block",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.date}
                                <br />
                                <MDTypography
                                  variant="button"
                                  fontWeight="regular"
                                  color="dark"
                                  sx={{
                                    display: "block",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.resion}
                                </MDTypography>
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Tooltip title="Cancel" placement="top">
                                <IconButton>
                                  <CloseIcon color="error" />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </MDBox>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
