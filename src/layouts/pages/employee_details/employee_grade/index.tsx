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
import MDBox from "components/MDBox";
const token = Cookies.get("token");
const EmpGrade = () => {
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
  const fetchEmployeeGrade = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_empgrd`, {
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
    fetchEmployeeGrade();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_Egrade`, {
        data: { grade_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        fetchEmployeeGrade();
        message.success("Deleted successFully");
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Employee Grade", accessor: "grade_name" },
      { Header: "Status", accessor: "status" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "employee_typeupdate") ? (
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
            rbacData?.find((element: string) => element === "employee_typedelete") ? (
              <IconButton>
                <Popconfirm
                  title="Delete"
                  description="Are you sure to Delete it ?"
                  placement="topLeft"
                  onConfirm={() => handleDelete(row.grade_name)} // Pass index to confirm function
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

      grade_name: row.grade_name,
      status: row.status ? "Active" : "InActive",
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item pt={2} pl={2}>
              <MDTypography variant="h4" color="secondary" fontWeight="bold">
                Employee Grade
              </MDTypography>
            </Grid>
            <Grid item pt={2} pr={2}>
              {" "}
              {rbacData ? (
                rbacData?.find((element: string) => element === "employee_typecreate") ? (
                  <MDButton variant="outlined" color="info" type="submit" onClick={handleClickOpen}>
                    + New Employee Grade
                  </MDButton>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          {data.length > 0 && <DataTable table={dataTableData} canSearch />}
        </MDBox>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={fetchEmployeeGrade} />
      </Dialog>

      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={fetchEmployeeGrade} />
      </Dialog>
    </DashboardLayout>
  );
};

export default EmpGrade;
