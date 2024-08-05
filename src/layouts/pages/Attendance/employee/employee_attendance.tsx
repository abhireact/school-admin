import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Link, Tooltip, Autocomplete, Card, Fab, Dialog } from "@mui/material";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable/entrieshundred";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import MDAvatar from "components/MDAvatar";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { commonacademicyear } from "layouts/pages/fee/common_validationschema";
import { useSelector } from "react-redux";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ComplexProjectCard from "examples/Cards/ProjectCards/ComplexProjectCard";
import logoXD from "assets/images/small-logos/logo-xd.svg";
import MDBox from "components/MDBox";
import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import EmployeeWiseAttandance from "./show_attendance";
const token = Cookies.get("token");
const Cacademic_year = Cookies.get("academic_year");
const initialValues = {
  date: "",
};

export default function EmployeeAttendance() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: commonacademicyear,
    enableReinitialize: true,
    onSubmit: () => {},
  });
  console.log(selectedTab, "selected tab");
  const card = [
    { color: "red" },
    { color: "green" },
    { color: "blue" },
    { color: "red" },
    { color: "green" },
    { color: "blue" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://10.0.20.200:8000/mg_student_attendance/retrieve",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (values.date != "") {
      fetchData();
    }
  }, [values.date]);
  const handleTabChange = (_event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Card>
            <Grid container px={3} p={3}>
              <Grid item xs={12} sm={6}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Employee Attendance
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  sx={{ display: "flex", width: "100%" }}
                >
                  <Tab
                    label={
                      <MDTypography variant="h6" fontWeight="bold" color="secondary">
                        Date Wise
                      </MDTypography>
                    }
                    sx={{ flex: "50%", color: "blue" }}
                  />
                  <Tab
                    label={
                      <MDTypography variant="h6" fontWeight="bold" color="secondary">
                        Employee Wise
                      </MDTypography>
                    }
                    sx={{ flex: "50%" }}
                  />
                </Tabs>
              </Grid>
            </Grid>
            {selectedTab === 0 && (
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={3}>
                  <MDInput
                    required
                    sx={{ width: "100%" }}
                    onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={values.date}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Select Date
                      </MDTypography>
                    }
                    variant="standard"
                  />
                </Grid>
                <Grid container item xs={12} sm={12} spacing={2}>
                  {card.map((item, index) => (
                    <Grid item xs={12} sm={3} key={index}>
                      <Card
                        sx={{
                          boxShadow: "4px 4px 8px 4px rgba(0,0,0,0.1)",
                          borderRadius: 8,
                        }}
                      >
                        <MDBox p={2}>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                              }}
                            >
                              <MDButton
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Tooltip title={"Edit Time"} placement="top">
                                  <Icon fontSize="small">edit</Icon>
                                </Tooltip>
                              </MDButton>
                              <MDAvatar
                                src={
                                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpSXnKXnGgmYGuPVlbP2Qt_kC1YrV3Ylbpww&s"
                                }
                                style={{
                                  border: `5px solid ${item.color}`,
                                  borderRadius: "50%",
                                }}
                                size="xl"
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Prabhakar Biswal
                              </MDTypography>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                ASD@1234
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                In :
                              </MDTypography>
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                {" "}
                                8:00 AM
                              </MDTypography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Out :
                              </MDTypography>
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                {" "}
                                4:00 PM
                              </MDTypography>
                            </Grid>
                          </Grid>
                        </MDBox>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            {selectedTab === 1 && <EmployeeWiseAttandance />}
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
