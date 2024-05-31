import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Button from "@mui/material/Button";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import EditFeeCategory from "./edit_fee_category";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
export default function FeeConcession() {
  const [editdata, setEditdata] = useState({});
  const [editopen, setEditOpen] = useState(false);
  const [deletedata, setDeletedata] = useState({});
  const [deleteopen, setDeleteOpen] = useState(false);
  const [feecategoryData, setFeecategoryData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.0.20.200:8000/fee_category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setFeecategoryData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenEdit = (data: any) => {
    setEditdata(data);
    setEditOpen(true);
  };

  const handleClickCloseEdit = () => {
    setEditOpen(false);
  };

  const handleClickOpenDelete = (data: any) => {
    setDeletedata(data);
    setDeleteOpen(true);
  };

  const handleClickCloseDelete = () => {
    setDeleteOpen(false);
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://10.0.20.200:8000/fee_category`, {
        data: deletedata,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success(response.data.message);
        setDeleteOpen(false);
        fetchData();
      }
    } catch (error: any) {
      message.error(error.response.data.detail);
    }
  };
  const handleEditSuccess = () => {
    fetchData();
    handleClickCloseEdit();
  };

  const feeCategory = {
    columns: [
      { Header: "NAME", accessor: "name" },
      { Header: "DESCRIPTION", accessor: "description" },
      { Header: "ACTIONS", accessor: "action" },
    ],
    rows: feecategoryData.map((data, index) => ({
      name: data.name,
      description: data.description,
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Tooltip title="Edit" placement="top">
              <Icon fontSize="small" onClick={() => handleClickOpenEdit(data)}>
                edit
              </Icon>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Delete" placement="top">
              <Icon fontSize="small" onClick={() => handleClickOpenDelete(data)}>
                delete
              </Icon>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Manage Fee Amount Particular" placement="top">
              <Link to="/fee/fee_category/manage_fee_amount_perticular" state={data}>
                <FormatListBulletedTwoToneIcon fontSize="small" color="secondary" />
              </Link>
            </Tooltip>
          </Grid>
        </Grid>
      ),
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Dialog open={editopen} onClose={handleClickCloseEdit}>
          <EditFeeCategory data={editdata} onSuccess={handleEditSuccess} />
        </Dialog>
        <Dialog open={deleteopen} onClose={handleClickCloseDelete}>
          <DialogTitle>{"Delete Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {`Are you sure want to delete this Fee Category?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton color="info" variant="text" onClick={handleClickCloseDelete}>
              Cancel
            </MDButton>
            <MDButton color="error" variant="text" onClick={handleDelete}>
              Delete
            </MDButton>
          </DialogActions>
        </Dialog>
        <Grid container p={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Fee Category
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/fee/create_fee_category">
              <MDButton variant="outlined" color="info">
                + Create Fee Category
              </MDButton>
            </Link>
          </Grid>
        </Grid>
        <DataTable table={feeCategory} isSorted={false} canSearch={true} />
      </Card>
    </DashboardLayout>
  );
}
