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
import { Table } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import DataTable from "examples/Tables/DataTable";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import SMSConfiguration from "layouts/pages/cloud_admin/sms_config/sms_configuration";
// import EditMessageTemplate from "./template_form";
import axios from "axios";
import Cookies from "js-cookie";
import { Popconfirm, message } from "antd";
import SMSConfigurationCreate from "layouts/pages/cloud_admin/sms_config/sms_configuration_create";
const token = Cookies.get("token");
export default function SmsConfiguration() {
  const [editdata, setEditdata] = useState({});
  const [editopen, setEditOpen] = useState(false);

  const [templateData, setTemplateData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/mg_sms_configuration/school_incharge`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data, "configuration data");
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
    const delete_value = {
      url: data.url,
      vendor: data.vendor_name,
    };
    axios
      .delete("http://10.0.20.200:8000/mg_sms_configuration/school_incharge", {
        data: delete_value,
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
      { Header: "VENDOR", accessor: "vendor" },
      { Header: "URL", accessor: "url" },
      { Header: "SENDER ID", accessor: "sender_id" },
      { Header: "School Subdomain", accessor: "sub_domain" },
      { Header: "ACTIONS", accessor: "action" },
    ],
    rows: templateData.map((data, index) => ({
      vendor: data.vendor_name,
      url: data.url,
      sender_id: data.sender_id,
      sub_domain: data.sub_domain,
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
              description="Are you sure you want to delete it? ?"
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
        <Dialog open={editopen} onClose={handleClickCloseEdit} maxWidth="lg">
          <SMSConfigurationCreate data={editdata} onSuccess={handleEditSuccess} />
        </Dialog>
        <Grid container p={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              SMS Configuration
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/notification/sms_configuration_create">
              <MDButton variant="outlined" color="info">
                + Create Configuration
              </MDButton>
            </Link>
          </Grid>
        </Grid>
        <DataTable table={feeCategory} isSorted={false} showTotalEntries={false} canSearch={true} />
      </Card>
    </DashboardLayout>
  );
}
