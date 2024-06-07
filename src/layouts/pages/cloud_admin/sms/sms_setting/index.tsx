import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Link, Tooltip, Autocomplete, Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import IsoIcon from "@mui/icons-material/Iso";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MDButton from "components/MDButton";
import ManageLimit from "./manage_limit";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import Priority from "./priority";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
export default function SmsSetting() {
  const [enableData, setEnableData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [limitData, setLimitData] = useState([]);
  const [popupdata, setPopupdata] = useState([]);
  const [managelimitopen, setManagelimitopen] = useState(false);
  const [prioritypopup, setPrioritypopup] = useState(false);
  const [permissionopen, setPermissionopen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const fetchEnableData = async () => {
    try {
      const response = await axios.get(`http://10.0.20.200:8000/mg_school/sms_enable`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setEnableData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPriorityData = async () => {
    try {
      const response = await axios.get(`http://10.0.20.200:8000/mg_sms_priority`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPriorityData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchLimitData = async () => {
    try {
      const response = await axios.get(`http://10.0.20.200:8000/sms_limit`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setLimitData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEnableData();
    fetchPriorityData();
    fetchLimitData();
  }, []);
  const handleManageLimitOpen = (data: any) => {
    setSchoolName(data);
    const filtered_limitdata = limitData.filter((l_row) => l_row.school_name == data);
    setPopupdata(filtered_limitdata);
    setManagelimitopen(true);
  };
  const handleManageLimitClose = () => {
    setSchoolName("");
    setManagelimitopen(false);
  };
  const handleManageLimit = () => {
    handleManageLimitClose();
  };
  const handlePriorityOpen = (data: any) => {
    setSchoolName(data);
    const filtered_prioritydata = priorityData.filter((l_row) => l_row.school_name == data);
    setPopupdata(filtered_prioritydata);
    setPrioritypopup(true);
  };
  const handlePriorityClose = () => {
    setSchoolName("");
    setPrioritypopup(false);
  };

  const handlePermissionOpen = (data: any) => {
    setSchoolName(data.sc_name);
    setPermissionopen(true);
  };
  const handleEditSuccess = () => {
    //   fetchData();
    handleManageLimitClose();
  };
  const sms_data = {
    columns: [
      { Header: "School Name", accessor: "school_name" },
      { Header: "SMS Enable", accessor: "sms_enable" },
      { Header: "Action", accessor: "action" },
    ],
    rows: enableData.map((row, index) => ({
      school_name: row.school_name,
      sms_enable: row.sms_enable ? "YES" : "NO",
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Tooltip title="Manage SMS Limit" placement="top">
              <IsoIcon fontSize="small" onClick={() => handleManageLimitOpen(row.school_name)} />
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Manage priority" placement="top">
              <LowPriorityIcon
                fontSize="small"
                onClick={() => handlePriorityOpen(row.school_name)}
              />
            </Tooltip>
          </Grid>
        </Grid>
      ),
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={managelimitopen} onClose={handleManageLimit}>
        <ManageLimit data={popupdata[0]} sc_name={schoolName} onSuccess={handleEditSuccess} />
      </Dialog>
      <Dialog open={prioritypopup} onClose={handlePriorityClose} maxWidth="lg">
        <Priority data={popupdata} sc_name={schoolName} onSuccess={handleEditSuccess} />
      </Dialog>
      <Card>
        <DataTable
          table={sms_data}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          canSearch
        />
      </Card>
    </DashboardLayout>
  );
}
