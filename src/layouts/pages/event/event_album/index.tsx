import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { IconButton, Tooltip } from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Card } from "@mui/material";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { Popconfirm, Table } from "antd";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
const token = Cookies.get("token");

const EventCommittee = () => {
  const [rbacData, setRbacData] = useState<string[]>([]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchRbac = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/mg_rbac_current_user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("rbac user", response.data);
        setRbacData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRbac();
  }, []);

  const FetchEventCommittee = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_event_committee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    FetchEventCommittee();
  }, []);

  const handleDelete = async (academicYear: string) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
        data: { academic_year: academicYear },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted Successfully");
        const updatedData = data.filter((row) => row.academic_year !== academicYear);
        setData(updatedData);
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      message.error(error.response.data.detail);
    }
  };

  const dataTableData = {
    columns: [
      { Header: "EVENT COMMITTEE", accessor: "committee_name" },

      { Header: "Action", accessor: "action" },
    ],
    rows: data.map((row, index) => ({
      committee_name: row.committee_name,

      action: (
        <MDTypography variant="p">
          {rbacData.includes("academicupdate") && (
            <IconButton onClick={() => handleUpdate(index)}>
              <CreateRoundedIcon />
            </IconButton>
          )}
          {rbacData.includes("academicdelete") && (
            <IconButton disabled>
              <Popconfirm
                title="Delete"
                description="Are you sure you want to delete it? ?"
                placement="topLeft"
                onConfirm={() => handleDelete(row.academic_year)} // Pass index to confirm function
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete" placement="top">
                  <DeleteIcon />
                </Tooltip>
              </Popconfirm>
            </IconButton>
          )}
        </MDTypography>
      ),
    })),
  };

  const handleUpdate = (index: number) => {
    const main_data = data[index];
    navigate("/event/update_album", {
      state: {
        ...main_data,
      },
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              ALBUM LIST
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}>
            <MDButton
              variant="outlined"
              color="info"
              onClick={() => navigate("/event/create_album")}
            >
              + New Event Committee
            </MDButton>
          </Grid>
        </Grid>
        <DataTable table={dataTableData} canSearch />
      </Card>
    </DashboardLayout>
  );
};

export default EventCommittee;
