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
import { Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const LateFine = () => {
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
  const [editData, setEditData] = useState(null);
  const [updatepage, setUpdatepage] = useState(false);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");

    setEditData(main_data);
    setUpdatepage(true);
  };

  const handleCloseupdate = () => {
    setUpdatepage(false);
  }; //End
  const fetchLateFees = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/late_fee`, {
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
    fetchLateFees();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/late_fee`, {
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
        fetchLateFees();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Fine ", accessor: "fine_name" },
      { Header: "Account ", accessor: "account_name" },
      { Header: "Late Fee Calculation Type", accessor: "late_fee_calculation_type" },
      { Header: "Description", accessor: "description" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(index);
            }}
          >
            <CreateRoundedIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              handleDelete(row);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),
      account_name: row.account_name,
      fine_name: row.fine_name,
      description: row.description,
      late_fee_calculation_type: row.late_fee_calculation_type,
    })),
  };
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showpage ? (
        <>
          <Create handleShowPage={handleShowPage} fetchingData={fetchLateFees} />
        </>
      ) : (
        <>
          {!updatepage && (
            <>
              <Card>
                <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid item pt={2} pl={2}>
                    <MDTypography variant="h5" fontWeight="bold" color="secondary">
                      Late Fee
                    </MDTypography>
                  </Grid>
                  <Grid item pt={2} pr={2}>
                    <MDButton
                      variant="outlined"
                      color="info"
                      type="submit"
                      onClick={handleShowPage}
                    >
                      + New Late Fee
                    </MDButton>
                  </Grid>
                </Grid>
                <DataTable table={dataTableData} />
              </Card>
            </>
          )}
        </>
      )}
      <>
        {updatepage && (
          <Update setOpenupdate={setUpdatepage} editData={editData} fetchingData={fetchLateFees} />
        )}
      </>
    </DashboardLayout>
  );
};

export default LateFine;
