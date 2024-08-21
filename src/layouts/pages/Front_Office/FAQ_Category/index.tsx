import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { Grid, Card, Tooltip, Icon } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
// import EditDialog from "./update";
import { Popconfirm, message } from "antd";
import EditDialog from "./update";
import NewDialog from "./newCategory";

const FAQ_Category = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [editedItem, setEditedItem] = useState<any>(null);
  const { classes } = useSelector((state: any) => state);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });
  const [manageData, setManageData] = useState<any[]>([]);

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
          { Header: "Category", accessor: "academic_year" },
          { Header: "ACTIONS", accessor: "action" },
        ],
        rows: response.data.map((item: any, index: number) => ({
          academic_year: item.academic_year,
          action: (
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Edit" placement="top" onClick={() => handleEditClick(item)}>
                  <Icon fontSize="small">edit</Icon>
                </Tooltip>
              </Grid>
              <Grid item>
                <Popconfirm
                  title="Delete"
                  description="Are you sure you want to delete it? ?"
                  placement="topLeft"
                  onConfirm={() => handleDelete(item)}
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete" placement="top">
                    <Icon fontSize="small">delete</Icon>
                  </Tooltip>
                </Popconfirm>
              </Grid>
            </Grid>
          ),
        })),
      });
      setManageData(response.data);
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

  const handleNewCategory = () => {
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

  const handleDelete = async (item: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admissions/settings`, {
        data: {
          academic_year: item.academic_year,
          start_date: item.start_date,
          end_date: item.end_date,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete response:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleManageSubTemplate = (item: any) => {
    // const filteredData = manageData.find((data: any) => data.academic_year === item.academic_year);
    // console.error("manageData is empty.", filteredData);

    navigate("/pages/admission/formsetting/manage_sub_template", {
      state: {
        templateData: item,
        postedData: {
          academic_year: item.academic_year,
          start_date: item.start_date,
          end_date: item.end_date,
        },
      },
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Manage Category
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton variant="outlined" color="info" onClick={() => handleNewCategory()}>
                + ADD Category
              </MDButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            {tabledata.rows.length > 0 ? (
              <MDBox pt={3}>
                <DataTable
                  table={tabledata}
                  // isSorted={false}
                  // entriesPerPage={false}
                  // showTotalEntries={false}
                />
              </MDBox>
            ) : (
              <MDTypography>No data Avialble</MDTypography>
            )}
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
      <NewDialog
        open={newDialogOpen}
        handleClose={handleEditClose}
        editedItem={editedItem}
        setEditedItem={setEditedItem}
        handleEditSave={handleEditSave}
        classes={classes}
      />
    </DashboardLayout>
  );
};

export default FAQ_Category;
