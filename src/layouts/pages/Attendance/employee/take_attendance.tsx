import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import IconButton from "@mui/material/IconButton";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable/entrieshundred";
import { Drawer } from "antd";
import Importattandance from "./import_attendance";
import { Card, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const TakeAttandance = () => {
  const token = Cookies.get("token");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const locationdata: string[] = [];
  useEffect(() => {
    axios
      .get(`http://10.0.20.200:8000/mg_employees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const employeesWithCheckInStatus = response.data.map((employee: any) => ({
          ...employee,
          isCheckedIn: false,
        }));
        setData(employeesWithCheckInStatus);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handlecheckIn = async (index: number) => {
    const updatedData = [...data];
    const currentGMTTime = new Date();
    const istOffset = 5.5;
    const current_time = new Date(currentGMTTime.getTime() + istOffset * 60 * 60 * 1000);

    console.log("Current IST Time: " + current_time.toISOString());
    console.log(typeof current_time, "typeof current_time,");

    updatedData[index].isCheckedIn = true;
    setData(updatedData);
    const main_data = data[index];
    console.log(main_data, "maindata");
    console.log(main_data.first_name, main_data.email, typeof current_time, "handlecheckin");

    try {
      const response = await axios.post(
        `http://10.0.20.200:8000/attendance`,
        {
          employee_name: main_data.user_id,
          checkin: current_time,
          checkout: null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        // navigate("/pages");
        console.log(" Created SchoolPage Successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handlecheckOut = async (index: number) => {
    const updatedData = [...data];
    const currentGMTTime = new Date();

    // Convert GMT to IST
    const istOffset = 5.5; // IST is GMT+5:30
    const current_time = new Date(currentGMTTime.getTime() + istOffset * 60 * 60 * 1000);
    updatedData[index].isCheckedIn = false;
    setData(updatedData);
    const main_data = data[index];
    try {
      const response = await axios.post(
        `http://10.0.20.200:8000/attendance`,
        {
          employee_name: main_data.user_id,
          checkin: null,
          checkout: current_time,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // navigate("/pages");
        console.log("checkout successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dataTableData = {
    columns: [
      { Header: "Employee", accessor: "first_name" },
      { Header: "User Id", accessor: "email" },
      { Header: "Action", accessor: "action" },
    ],
    rows: data.map((row, index) => ({
      first_name: row.employee_name,
      email: row.user_id,
      action: (
        <>
          {row.isCheckedIn ? (
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={() => handlecheckOut(index)}
            >
              CheckOut
            </MDButton>
          ) : (
            <MDButton
              variant="gradient"
              color="info"
              fullWidth
              onClick={() => handlecheckIn(index)}
            >
              CheckIn
            </MDButton>
          )}
        </>
      ),
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Drawer
        zIndex={5}
        title="Upload Attandance"
        placement="right"
        onClose={onClose}
        open={open}
        width={720}
        style={{ paddingTop: "10%" }}
      >
        <Importattandance />
      </Drawer>
      <Card>
        <Grid container px={3} pt={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Take Attendance
            </MDTypography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            spacing={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item>
              <MDButton variant="gradient" color="info" onClick={showDrawer}>
                <FileUploadIcon />
              </MDButton>
            </Grid>
            <Grid item>
              <MDButton variant="gradient" color="info">
                <FileDownloadIcon />
              </MDButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <DataTable table={dataTableData} canSearch />
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default TakeAttandance;
