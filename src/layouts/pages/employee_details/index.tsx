import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Create from "./employee/create";
import Update from "./employee/update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const Employee = () => {
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

  //Update Dialog Box Start
  const [username, setUsername] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(!openupdate);
    setUsername(main_data.user_id);
  };

  const handleCloseupdate = () => {
    setOpenupdate(!openupdate);
  }; //End
  const fetchEmployees = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employees`, {
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
    fetchEmployees();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_leaves`, {
        data: { leave_type: name.leave_type, leave_code: name.leave_code },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        const updatedData = data.filter((row) => row.username !== name);
        setData(updatedData); // Update the state with the new data
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Employee Name", accessor: "employee_name" },

      { Header: "Position", accessor: "position" },
      { Header: "Department", accessor: "department" },
      { Header: "User ID", accessor: "user_id" },

      { Header: "Joining Date", accessor: "joining_date" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "employee_detailsupdate") ? (
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
            rbacData?.find((element: string) => element === "employee_detailsdelete") ? (
              <IconButton
                onClick={() => {
                  handleDelete(row);
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

      employee_name: row.employee_name,
      department: row.department,
      position: row.position,

      user_id: row.user_id,
      joining_date: row.joining_date,
    })),
  };
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  return (
    <BaseLayout>
      {showpage ? (
        <>
          <Create handleClose={handleShowPage} fetchData={fetchEmployees} />
        </>
      ) : openupdate ? (
        <Update username={username} fetchData={fetchEmployees} handleClose={handleCloseupdate} />
      ) : (
        <Card>
          <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item pt={2} pl={2}>
              <MDTypography variant="h4" color="secondary" fontWeight="bold">
                Employee Information
              </MDTypography>
            </Grid>
            {rbacData &&
            rbacData.find((element: string) => element === "employee_detailscreate") ? (
              <Grid item pt={2} pr={2}>
                <MDButton variant="outlined" color="info" type="submit" onClick={handleShowPage}>
                  + New Employee
                </MDButton>
              </Grid>
            ) : null}
          </Grid>
          <DataTable table={dataTableData} canSearch />
        </Card>
      )}
    </BaseLayout>
  );
};

export default Employee;
