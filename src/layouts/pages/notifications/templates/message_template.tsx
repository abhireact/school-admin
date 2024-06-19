import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import { Popconfirm, message } from "antd";
import EditMessageTemplate from "./template_form";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
export default function MessageTemplate() {
  const [editdata, setEditdata] = useState({});
  const [editopen, setEditOpen] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.0.20.200:8000/mg_templates/school_incharge`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setTemplateData(response.data);
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
  const handleEditSuccess = () => {
    fetchData();
    handleClickCloseEdit();
  };
  const confirm = async (data: any) => {
    console.log(data, "delete data");
    axios
      .delete("http://10.0.20.200:8000/mg_templates/school_incharge", {
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        message.success(response.data.message);
        fetchData();
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };
  const feeCategory = {
    columns: [
      { Header: "MODULE NAME", accessor: "modulename", Width: "15%" },
      { Header: "ACTIVITY", accessor: "activity", Width: "15%" },
      { Header: "VENDOR NAME", accessor: "vendername", Width: "15%" },
      {
        Header: "MESSAGE",
        accessor: "message",
        Width: "40%",
      },
      { Header: "ACTIONS", accessor: "action", Width: "15%" },
    ],
    rows: templateData.map((data, index) => ({
      modulename: data.module_name,
      activity: data.sms_activity,
      vendername: data.vendor,
      message: data.message,
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
            <Popconfirm
              title="Delete"
              description="Are you sure to Delete it ?"
              placement="topLeft"
              onConfirm={() => confirm(data)} // Pass index to confirm function
              onCancel={cancel}
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
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Dialog open={editopen} onClose={handleClickCloseEdit}>
          <EditMessageTemplate data={editdata} onSuccess={handleEditSuccess} />
        </Dialog>
        <Grid container p={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Message Template
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/notification/create_template">
              <MDButton variant="outlined" color="info">
                + Create Template
              </MDButton>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} mt={2}>
          <DataTable
            table={feeCategory}
            isSorted={false}
            showTotalEntries={false}
            canSearch={true}
          />
        </Grid>
      </Card>
    </DashboardLayout>
  );
}
