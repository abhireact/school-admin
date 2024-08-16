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
import Create from "./create";
import Update from "./update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Card } from "@mui/material";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { Popconfirm, Table } from "antd";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";

const token = Cookies.get("token");

const Academic = () => {
  const navigate = useNavigate();
  const [rbacData, setRbacData] = useState<string[]>([]);
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

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

  const FetchEventCalendar = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_calender`, {
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
    FetchEventCalendar();
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
        message.success("Deleted successfully");
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
      { Header: "EVENT NAME", accessor: "title" },
      { Header: "EVENT COMMITTEE", accessor: "committee_name" },
      { Header: "START DATE", accessor: "event_date" },
      { Header: "END DATE", accessor: "end_date" },
      { Header: "Action", accessor: "action" },
    ],
    rows: data.map((row, index) => ({
      title: row.title,
      committee_name: row.committee_name,
      event_date: `${row.event_date.split("-")[2]} /
        ${row.event_date.split("-")[1]} /
        ${row.event_date.split("-")[0]}
      `,
      end_date: `${row.end_date.split("-")[2]} /
        ${row.end_date.split("-")[1]} /
        ${row.end_date.split("-")[0]}
      `,

      action: (
        <MDTypography variant="p">
          {rbacData.includes("academicupdate") && (
            <IconButton onClick={() => handleOpenupdate(index)}>
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");
    setEditData(main_data);
    setOpenupdate(true);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Event List
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}>
            <MDButton variant="contained" color="dark" onClick={() => navigate(-1)}>
              Back
            </MDButton>
            &nbsp;&nbsp;
            <MDButton variant="outlined" color="info" type="submit" onClick={handleOpen}>
              + New Event
            </MDButton>
          </Grid>
        </Grid>
        <DataTable table={dataTableData} canSearch />
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={FetchEventCalendar} />
      </Dialog>
      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={FetchEventCalendar} />
      </Dialog>
    </DashboardLayout>
  );
};

export default Academic;
