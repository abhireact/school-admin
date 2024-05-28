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
// import EditMessageTemplate from "./template_form";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
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
      const response = await axios.get(`http://10.0.20.200:8000/mg_sms_configuration`, {
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
  const feeCategory = {
    columns: [
      { Header: "URL", accessor: "url" },
      { Header: "SUPPORT MULTIPLE SMS", accessor: "support_multi_sms" },
      { Header: "MAXIMUM SMS SUPPORT", accessor: "max_sms_support" },
      { Header: "MOBILE NUMBER ATTRIBUTE", accessor: "mobile_no_attribute" },
      { Header: "MSG", accessor: "msg" },
      { Header: "ACTIONS", accessor: "action" },
    ],
    rows: templateData.map((data, index) => ({
      url: data.url,
      support_multi_sms: data.support_multiple_sms,
      max_sms_support: data.maximum_sms_Support,
      mobile_no_attribute: data.mobile_number_attribute,
      msg: data.msg_attribute,
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
              <Icon fontSize="small">delete</Icon>
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
          {/* <EditMessageTemplate data={editdata} onSuccess={handleEditSuccess} /> */}
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
        <DataTable
          table={feeCategory}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
        />
      </Card>
    </DashboardLayout>
  );
}
