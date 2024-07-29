import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EmployeePDF from "./employee_pdf";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useReactToPrint } from "react-to-print";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Create from "./create";
import Update from "./show_update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Card, Tooltip, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import MDBox from "components/MDBox";

const token = Cookies.get("token");

const Employee = () => {
  const tableRef = useRef();
  const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const [employeeInfo, setEmployeeInfo] = useState<any>(null);
  const fetchEmployeeInfo = (userinfo: any) => {
    // Clear the previous employeeInfo before fetching new data
    setEmployeeInfo(null);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_employees/retrive`,
        {
          user_name: userinfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setEmployeeInfo(response.data);
        console.log("employee info data", response.data);

        // Move handlePrint() here to ensure it's called after the state is updated
        setTimeout(() => {
          handlePrint();
        }, 0);
      })
      .catch(() => {
        console.error("Error on getting student info");
      });
  };

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

  const [data, setData] = useState([]);

  const [username, setUsername] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(!openupdate);
    setUsername(main_data.user_id);
  };

  const handlePdf = (index: number) => {
    setUsername(data[index].user_id);
    fetchEmployeeInfo(data[index].user_id);
  };

  const handleCloseupdate = () => {
    setOpenupdate(!openupdate);
  };

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

  const handleDelete = async (info: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_employees`, {
        data: { user_name: info },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted Successfully");
        fetchEmployees();
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
                <Tooltip title="Manage Employee" placement="top">
                  <AccountBoxIcon />
                </Tooltip>
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {rbacData ? (
            rbacData?.find((element: string) => element === "employee_detailsdelete") ? (
              <>
                <IconButton
                  onClick={() => {
                    handlePdf(index);
                  }}
                >
                  <Tooltip title="Download Profile" placement="top">
                    <FileDownloadIcon />
                  </Tooltip>
                </IconButton>
                <IconButton>
                  <Popconfirm
                    title="Delete"
                    description="Are you sure you want to delete it?"
                    placement="topLeft"
                    onConfirm={() => handleDelete(row.user_id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Tooltip title="Delete" placement="top">
                      <DeleteIcon />
                    </Tooltip>
                  </Popconfirm>
                </IconButton>
              </>
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
          <MDBox p={4}>
            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
              <Grid item pt={2} pl={2}>
                <MDTypography variant="h4" color="secondary" fontWeight="bold">
                  Employee List
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
            {data.length > 0 && <DataTable table={dataTableData} canSearch />}
          </MDBox>
        </Card>
      )}
      {employeeInfo && (
        <div ref={tableRef} className="report-hidden-text">
          <EmployeePDF employeeInfo={employeeInfo} />
        </div>
      )}
    </BaseLayout>
  );
};

export default Employee;
