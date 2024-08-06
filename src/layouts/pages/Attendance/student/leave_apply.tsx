import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDInput from "components/MDInput";
import { Card, Grid, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import { Popconfirm } from "antd";
const validationSchema = yup.object({
  from_date: yup
    .date()
    .min(new Date().toISOString().split("T")[0], "From date must be today or a future date")
    .required("From date is required"),
  to_date: yup
    .date()
    .min(yup.ref("from_date"), "To date must be the same or later than From date")
    .required("To date is required"),
  reason_for_leave: yup.string().required("Reason is required"),
});
const token = Cookies.get("token");
export default function StudentLeaveApply() {
  const [leaveData, setLeaveData] = useState([]);
  const fetchLeaveData = () => {
    axios
      .get("http://10.0.20.200:8000/apply_leave", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLeaveData(response.data);
      })
      .catch(() => {});
  };
  useEffect(() => {
    fetchLeaveData();
  }, []);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      to_date: "",
      from_date: "",
      reason_for_leave: "",
    },
    validationSchema,
    onSubmit: async (values, action) => {
      axios
        .post("http://10.0.20.200:8000/apply_leave", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success(" Created successfully!");
          fetchLeaveData();
          action.resetForm();
        })
        .catch(() => {
          message.error("Error on creating  !");
        });
    },
  });
  const deleteLeave = (deleteDate: any) => {
    axios
      .delete(`http://10.0.20.200:8000/apply_leave`, {
        data: {
          date: deleteDate,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        message.success(response.data.message);
        fetchLeaveData();
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });
  };
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    message.error("Click on No");
  };
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
                      label="From Date*"
                      InputLabelProps={{ shrink: true }}
                      name="from_date"
                      inputProps={{ min: new Date().toISOString().split("T")[0] }}
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
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      type="date"
                      sx={{ width: "100%" }}
                      InputLabelProps={{ shrink: true }}
                      label="To Date*"
                      name="to_date"
                      inputProps={{ min: new Date().toISOString().split("T")[0] }}
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

                  <Grid item xs={12} sm={12}>
                    <MDInput
                      sx={{ width: "100%" }}
                      label="Reason*"
                      name="reason_for_leave"
                      value={values.reason_for_leave}
                      placeholder="Enter Reason"
                      multiline
                      rows="4"
                      variant="outlined"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.reason_for_leave && touched.reason_for_leave)}
                    />
                    {errors.reason_for_leave && touched.reason_for_leave && (
                      <MDTypography color="error" variant="caption">
                        {errors.reason_for_leave}
                      </MDTypography>
                    )}
                  </Grid>
                </Grid>
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
                <Grid
                  container
                  spacing={2}
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    maxHeight: "80vh",
                    overflowY: "auto",
                    paddingTop: "2%",
                  }}
                >
                  {[...leaveData].reverse().map((item, index) => (
                    <Grid item xs={12} sm={12} key={index}>
                      <Card
                        sx={{
                          boxShadow: "4px 4px 8px 4px rgba(0,0,0,0.1)",
                          borderRadius: 8,
                          height: 70,
                          overflow: "hidden",
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
                                  {item.reason_of_leave}
                                </MDTypography>
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              {new Date(item.date) > new Date() && (
                                <IconButton>
                                  <Popconfirm
                                    title="Delete"
                                    description="Are you sure you want to Cancel it?"
                                    placement="topLeft"
                                    onConfirm={() => deleteLeave(item.date)}
                                    // onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <Tooltip title="Cancel" placement="bottom">
                                      <CloseIcon color="error" />
                                    </Tooltip>
                                  </Popconfirm>
                                </IconButton>
                              )}
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
