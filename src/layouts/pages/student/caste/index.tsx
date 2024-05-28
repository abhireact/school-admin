import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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
const Caste = () => {
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
  const FetchCastes = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_castes`, {
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
        message.error(error.response.data.detail);
      });
  };

  useEffect(() => {
    FetchCastes();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_castes`, {
        data: { name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        FetchCastes();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Caste", accessor: "name" },

      { Header: "Description", accessor: "description" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      name: row.name,

      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "casteupdate") ? (
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
            rbacData?.find((element: string) => element === "academicdelete") ? (
              <IconButton
                onClick={() => {
                  handleDelete(row.name);
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

      description: row.description,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />{" "}
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Caste
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}>
            {" "}
            {rbacData ? (
              rbacData?.find((element: string) => element === "academiccreate") ? (
                <MDButton variant="outlined" color="info" type="submit" onClick={handleClickOpen}>
                  + Add Caste
                </MDButton>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <DataTable table={dataTableData} canSearch />
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={FetchCastes} />
      </Dialog>
      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={FetchCastes} />
      </Dialog>
    </DashboardLayout>
  );
};

export default Caste;
