import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect } from "react";
import axios from "axios";
import Addrole from "./create";
import Editrole from "./update";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Rbac from "../rbac";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Showrole = () => {
  const [data, setData] = useState([]);
  //Start
  const token = Cookies.get("token");

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //End

  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);
  const [editData2, setEditData2] = useState(null);
  const [openupdate2, setOpenupdate2] = useState(false);
  const handleOpenupdate = (index: number) => {
    setOpenupdate(true);
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };
  const handleOpenupdate2 = (index: number) => {
    setOpenupdate2(true);
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate2(true);
    setEditData2(main_data);
  };
  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  const handleCloseupdate2 = () => {
    setOpenupdate2(false);
  }; //End

  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_role", {
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
  }, []);
  const dataTableData = {
    columns: [
      { Header: "Role Name", accessor: "role_name" },

      { Header: "Status", accessor: "status" },
      { Header: "Role Access", accessor: "seeded" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      role_name: <MDTypography variant="p">{row.role_name}</MDTypography>,

      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              if (index !== 0) {
                handleOpenupdate2(index);
                console.log(index, "update index");
              }
            }}
            disabled={index === 0}
          >
            <ManageAccountsIcon />
          </IconButton>
        </MDTypography>
      ),

      status: <MDTypography variant="p">{row.status}</MDTypography>,
      seeded: (
        <MDTypography variant="p">
          {row.seeded === "y" ? (
            <CheckCircleIcon fontSize="medium" />
          ) : (
            <CancelIcon fontSize="medium" />
          )}
        </MDTypography>
      ),
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h4">ROLES</MDTypography>
      <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MDButton variant="outlined" color="info" onClick={() => handleClickOpen()}>
          + Add Role
        </MDButton>
        <Dialog open={open} onClose={handleClose}>
          <Addrole setOpen={setOpen} />
        </Dialog>
        <Dialog open={openupdate} onClose={handleCloseupdate}>
          <Editrole setOpenupdate={setOpenupdate} editData={editData} />
        </Dialog>
        <Dialog open={openupdate2} onClose={handleCloseupdate2} fullWidth={true} maxWidth="lg">
          <Rbac setOpenupdate2={setOpenupdate2} editData2={editData2} />
        </Dialog>
      </Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default Showrole;
