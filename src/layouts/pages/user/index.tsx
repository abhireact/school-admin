import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Create from "./create";
import Update from "./update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
const User = () => {
  // To fetch rbac from redux:  Start
  // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
  // console.log("rbac user", rbacData);
  //End

  // Fetch rbac  Date from useEffect: Start

  const [rbacData, setRbacData] = useState([]);
  const fetchRbac = async () => {
    try {
      const response = await axios.get(`http://10.0.20.200:8000/mg_rbac_current_user`, {
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
  }, [token]);
  //End
  const [data, setData] = useState([]);

  //Start

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

  const handleOpenupdate = (index: number) => {
    setOpenupdate(true);
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  const fetchUsers = () => {
    axios
      .get("http://10.0.20.200:8000/mg_users_name/", {
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
    fetchUsers();
  }, []);

  const dataTableData = {
    columns: [
      { Header: "Username", accessor: "username" },

      { Header: "Role Name", accessor: "user_role_name" },
      { Header: "Email", accessor: "email" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      username: <MDTypography variant="p">{row.username}</MDTypography>,

      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(index);
              console.log(index, "update index");
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
        </MDTypography>
      ),

      user_role_name: <MDTypography variant="p">{row.user_role_name}</MDTypography>,
      email: <MDTypography variant="p">{row.email}</MDTypography>,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h5">User</MDTypography>
      <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
        {rbacData ? (
          rbacData?.find((element: string) => element === "usercreate") ? (
            <MDButton variant="outlined" color="info" type="submit" onClick={handleClickOpen}>
              + New User
            </MDButton>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        <Dialog open={open} onClose={handleClose}>
          <Create setOpen={setOpen} />
        </Dialog>
        {rbacData ? (
          rbacData?.find((element: string) => element === "userupdate") ? (
            <Dialog open={openupdate} onClose={handleCloseupdate}>
              <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={fetchUsers} />
            </Dialog>
          ) : (
            <Dialog open={openupdate} onClose={handleCloseupdate}>
              <MDBox p={1}>You can&apos;t Update</MDBox>
            </Dialog>
          )
        ) : (
          ""
        )}
      </Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default User;
