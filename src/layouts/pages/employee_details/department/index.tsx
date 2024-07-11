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
import { Card, Tooltip, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
const Department = () => {
  // To fetch rbac from redux:  Start
  // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
  // console.log("rbac user", rbacData);
  //End

  // Fetch rbac  Date from useEffect: Start

  const [rbacData, setRbacData] = useState([]);
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
  const fetchEmployeeDepartment = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_department`, {
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
    fetchEmployeeDepartment();
  }, []);
  const handleDelete = async (info: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/employee_department`, {
        data: { dept_name: info.dept_name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted SuccessFully");
        fetchEmployeeDepartment();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Department Name", accessor: "dept_name" },
      { Header: "Department Code", accessor: "dept_code" },
      { Header: "Status", accessor: "status" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "departmentupdate") ? (
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
            rbacData?.find((element: string) => element === "departmentdelete") ? (
              <IconButton>
                <Popconfirm
                  title="Delete"
                  description="Are you sure you want to delete it? ?"
                  placement="topLeft"
                  onConfirm={() => handleDelete(row)} // Pass index to confirm function
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete" placement="top">
                    <DeleteIcon />
                  </Tooltip>
                </Popconfirm>
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </MDTypography>
      ),

      dept_name: row.dept_name,
      dept_code: row.dept_code,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            {" "}
            <MDTypography variant="h4" fontweight="bold" color="secondary">
              Department
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}>
            {" "}
            {rbacData ? (
              rbacData?.find((element: string) => element === "departmentcreate") ? (
                <MDButton variant="outlined" color="info" type="submit" onClick={handleClickOpen}>
                  + New Department
                </MDButton>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Grid>{" "}
        </Grid>
        {data.length > 0 && <DataTable table={dataTableData} canSearch />}
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={fetchEmployeeDepartment} />
      </Dialog>
      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update
          setOpenupdate={setOpenupdate}
          editData={editData}
          fetchData={fetchEmployeeDepartment}
        />
      </Dialog>
    </DashboardLayout>
  );
};

export default Department;
