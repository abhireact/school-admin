import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Icon from "@mui/material/Icon";
import { Grid, Card, Tooltip } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const FormSetting = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admissions/settings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTableData({
        columns: [
          { Header: "Academic Year", accessor: "academic_year" },
          { Header: "Start Date", accessor: "start_date" },
          { Header: "End Date", accessor: "end_date" },
          { Header: "ACTIONS", accessor: "action" },
        ],
        rows: response.data.map((item: any, index: number) => ({
          academic_year: item.academic_year,
          start_date: item.start_date,
          end_date: item.end_date,
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
              <Grid item>
                <Tooltip
                  title="Manage Sub Template"
                  placement="top"
                  onClick={() => handleManageSubTemplate(item)}
                >
                  <FormatListBulletedTwoToneIcon fontSize="small" />
                </Tooltip>
              </Grid>
            </Grid>
          ),
        })),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleManageSubTemplate = async (item: any) => {
    try {
      const response = await axios.post(
        "http://10.0.20.200:8000/admissions/settings_detail",
        {
          academic_year: item.academic_year,
          start_date: item.start_date,
          end_date: item.end_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/pages/admission/formsetting/manage_sub_template", {
        state: { templateData: response.data },
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Admission Date
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton
                variant="outlined"
                color="info"
                onClick={() => navigate("/pages/admission/add_date")}
              >
                + ADD DATE
              </MDButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            {tabledata.rows.length > 0 ? (
              <MDBox pt={3}>
                <DataTable
                  table={tabledata}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </MDBox>
            ) : null}
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default FormSetting;
