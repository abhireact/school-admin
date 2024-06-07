import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import BuildIcon from "@mui/icons-material/Build";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Create from "./create";

import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const EmployeeSubject = () => {
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

  const fetchEmployeeList = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.filter((info: any) => info.employe_type == "Teaching Staff"));

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete("${process.env.REACT_APP_BASE_URL}/mg_subject", {
        data: {
          class_code: name.class_code,
          subject_code: name.subject_code,
          subject_name: name.subject_name,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        fetchEmployeeList();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Employee No.", accessor: "user_id", width: "20%" },
      { Header: "Employee Name", accessor: "employee_name", width: "20%" },
      { Header: "Category Position", accessor: "category_position", width: "20%" },

      { Header: "Action", accessor: "action", width: "20%" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleSettings(row);
            }}
          >
            <BuildIcon />
          </IconButton>
        </MDTypography>
      ),

      user_id: row.user_id,

      employee_name: row.employee_name,
      category_position: row.employe_type,
    })),
  };
  const [showpage, setShowpage] = useState(false);
  const [employeedata, setEmployeedata] = useState({});
  const handleClose = () => {
    setShowpage(!showpage);
  };
  const handleSettings = (info: any) => {
    setShowpage(!showpage);
    setEmployeedata(info);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showpage ? (
        <>
          <Create
            handleClose={handleClose}
            fetchData={fetchEmployeeList}
            employeedata={employeedata}
          />
        </>
      ) : (
        <>
          <Card>
            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
              <Grid item pt={2} pl={2}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Employee Subject List
                </MDTypography>
              </Grid>
            </Grid>
            <DataTable table={dataTableData} canSearch />
          </Card>
        </>
      )}
    </DashboardLayout>
  );
};

export default EmployeeSubject;
