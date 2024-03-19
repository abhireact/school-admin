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
const Student = () => {
  // To fetch rbac from redux:  Start
  // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
  // console.log("rbac user", rbacData);
  //End

  // Fetch rbac  Date from useEffect: Start

  const [rbacData, setRbacData] = useState([]);
  const fetchRbac = async () => {
    try {
      const response = await axios.get(`http://10.0.20.128:8000/mg_rbac_current_user`, {
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

  useEffect(() => {
    axios
      .get("http://10.0.20.128:8000/show_student", {
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
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete("http://10.0.20.128:8000/delete_student", {
        data: { student_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.error("Deleted successFully");
        // Filter out the deleted user from the data
        const updatedData = data.filter((row) => row.username !== name);
        setData(updatedData); // Update the state with the new data
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error("An unexpected error occurred");
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Student Name", accessor: "full_name" },
      { Header: "Class", accessor: "cls_name" },
      { Header: "Section", accessor: "sec_name" },
      { Header: "Academic Year", accessor: "acd_name" },
      { Header: "Mobile Number", accessor: "mob_no" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      acd_name: <MDTypography variant="p">{row.acd_name}</MDTypography>,

      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "studentupdate") ? (
              <IconButton
                onClick={() => {
                  handleOpenupdate(index);
                }}
              >
                <CreateRoundedIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {rbacData ? (
            rbacData?.find((element: string) => element === "studentdelete") ? (
              <IconButton
                onClick={() => {
                  handleDelete(row.first_name + row.last_name);
                }}
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </MDTypography>
      ),

      full_name: (
        <MDTypography variant="p">
          {row.first_name}
          {row.last_name}
        </MDTypography>
      ),
      cls_name: <MDTypography variant="p">{row.cls_name}</MDTypography>,
      sec_name: <MDTypography variant="p">{row.sec_name}</MDTypography>,
      mob_no: <MDTypography variant="p">{row.mob_no}</MDTypography>,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTypography variant="h5">Student</MDTypography>
      <Grid container sx={{ display: "flex", justifyContent: "flex-end" }}>
        {rbacData ? (
          rbacData?.find((element: string) => element === "studentcreate") ? (
            <MDButton variant="outlined" color="info" type="submit" onClick={handleClickOpen}>
              + New Student
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

        <Dialog open={openupdate} onClose={handleCloseupdate}>
          <Update setOpenupdate={setOpenupdate} editData={editData} />
        </Dialog>
      </Grid>
      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default Student;
