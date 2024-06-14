import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete, Tooltip } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDInput from "components/MDInput";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import List from "@mui/material/List";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Tree } from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import MDBox from "components/MDBox";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const token = Cookies.get("token");
const current_academic_year = Cookies.get("academic_year");
const initialValues = {
  academic_year: current_academic_year,
  class_name: "",
};
export default function ClassTiming() {
  const [timingData, setTimingData] = useState([]);
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    // Uncomment and ensure createschema is correctly defined
    // validationSchema: createschema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const submit_value = {
        academic_year: "string",
        class_name: ["string"],
        weekdays: ["string"],
        class_time_name: "string",
        start_time: "string",
        end_time: "string",
        is_break: false,
      };
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_class_timing/filter_by_wing", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTimingData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [values.class_name]);
  const feeConcessionData = {
    //
    columns: [
      { Header: "WEEK DAY", accessor: "week_day" },
      { Header: "NAME", accessor: "name" },
      { Header: "START TIME", accessor: "start_time" },
      { Header: "END TIME", accessor: "end_time" },
      { Header: "ACtion", accessor: "action" },
    ],
    rows: timingData.map((row, index) => ({
      week_day: row.week_day,
      name: row.name,
      start_time: row.start_time,
      end_time: row.end_time,
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Tooltip title="Edit" placement="top">
              <Icon fontSize="small">edit</Icon>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Delete" placement="top">
              <Icon fontSize="small">delete</Icon>
            </Tooltip>
          </Grid>
        </Grid>
      ),
    })),
  };
  console.log(values, "valuesss");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} mt={2}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Class Timing
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton
                variant="outlined"
                color="info"
                onClick={() => navigate("/attendance/create_class_timing")}
              >
                + Create Class Timing
              </MDButton>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <MDInput
                disabled
                sx={{ width: "100%" }}
                name="academic_year"
                value={values.academic_year}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Academic Year
                  </MDTypography>
                }
                variant="standard"
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
                defaultValue={
                  values.academic_year !== ""
                    ? classes
                        .filter((item: any) => item.academic_year === values.academic_year)
                        .map((item: any) => item.class_name)[0]
                    : ""
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
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
