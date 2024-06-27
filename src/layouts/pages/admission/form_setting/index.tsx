import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { Grid, Card, Tooltip, Icon } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import EditDialog from "./update";

const FormSetting = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [editedItem, setEditedItem] = useState<any>(null);
  const { classes } = useSelector((state: any) => state);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

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
          start_date: formatDate(item.start_date),
          end_date: formatDate(item.end_date),
          action: (
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Edit" placement="top" onClick={() => handleEditClick(item)}>
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

  const handleEditClick = (item: any) => {
    setEditedItem(item);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditedItem(null);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://10.0.20.200:8000/admissions/settings`, editedItem, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Item updated:", response.data);

      setEditDialogOpen(false);
      setEditedItem(null);

      fetchData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

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
      navigate(
        "/pages/admission/formsetting/manage_sub_template",
        // "/pages/admission/formsetting/try",
        {
          state: {
            templateData: response.data,
            postedData: {
              academic_year: item.academic_year,
              start_date: item.start_date,
              end_date: item.end_date,
            },
          },
        }
      );
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
      <EditDialog
        open={editDialogOpen}
        handleClose={handleEditClose}
        editedItem={editedItem}
        setEditedItem={setEditedItem}
        handleEditSave={handleEditSave}
        classes={classes}
      />
    </DashboardLayout>
  );
};

export default FormSetting;
