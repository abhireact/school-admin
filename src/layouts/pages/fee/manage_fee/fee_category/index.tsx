import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import EditFeeCategory from "./edit_fee_category";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateFeeCategory from "./create";

const token = Cookies.get("token");
export default function FeeConcession(props: any) {
  const [editdata, setEditdata] = useState({});
  const [editopen, setEditOpen] = useState(false);
  const [createopen, setCreateOpen] = useState(false);

  const [feecategoryData, setFeecategoryData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/fee_category`, {
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
    console.log(data, "editdata");

    setEditdata(data);
    setEditOpen(true);
  };

  const handleClickCloseEdit = () => {
    setEditOpen(false);
  };
  const handleEditSuccess = () => {
    fetchData();
    handleClickCloseEdit();
  };
  const handleCreateSuccess = () => {
    fetchData();
    setCreateOpen(false);
  };

  const confirm = async (data: any) => {
    console.log(data, "confirm data");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/fee_category`, {
        data: {
          name: data.name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted Successfully");
        fetchData();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      message.error(error.response?.data?.detail || "An error occurred");
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };
  const feeCategory = {
    columns: [
      { Header: "NAME", accessor: "name" },
      { Header: "Particular", accessor: "particular_types" },
      { Header: "DESCRIPTION", accessor: "description" },

      { Header: "ACTIONS", accessor: "action" },
    ],
    rows: feecategoryData.map((data, index) => ({
      name: data.name,
      description: data.description,
      particular_types: data.particular_types.map(
        (
          item: {
            particular_name:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | React.ReactFragment
              | React.ReactPortal;
          },
          itemIndex: React.Key
        ) => <li key={itemIndex}>{item.particular_name}</li>
      ),
      action: (
        <Grid container>
          <Grid item>
            <IconButton
              onClick={() => {
                handleClickOpenEdit(data);
              }}
            >
              <Tooltip title="Edit" placement="top">
                <EditIcon fontSize="small" color="secondary" />
              </Tooltip>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Popconfirm
                title="Delete"
                description="Are you sure you want to delete it? ?"
                placement="topLeft"
                onConfirm={() => confirm(data)} // Pass index to confirm function
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete" placement="top">
                  <DeleteIcon fontSize="small" color="secondary" />
                </Tooltip>
              </Popconfirm>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Tooltip title="Manage Fee Amount Perticular" placement="top">
                <Link to="/fee/fee_category/manage_fee_amount_perticular" state={data}>
                  <FormatListBulletedTwoToneIcon fontSize="small" color="secondary" />
                </Link>
              </Tooltip>
            </IconButton>
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
        <Dialog open={createopen} onClose={() => setCreateOpen(false)}>
          <CreateFeeCategory onSuccess={handleCreateSuccess} />
        </Dialog>
        <Grid container p={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Fee Category
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* <Link to="/fee/create_fee_category"> */}
            <MDButton variant="outlined" color="info" onClick={() => setCreateOpen(true)}>
              + Create Fee Category
            </MDButton>
            {/* </Link> */}
          </Grid>
        </Grid>
        <DataTable
          table={feeCategory}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          canSearch
        />
      </Card>
    </DashboardLayout>
  );
}
