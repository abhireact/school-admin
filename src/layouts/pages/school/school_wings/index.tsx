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
const Academic = () => {
  // To fetch rbac from redux:  Start
  const rbacData = useSelector((state: any) => state.rbacData);
  console.log("rbac user wings", rbacData);
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
  const fetchWings = () => {
    axios
      .get("http://10.0.20.200:8000/mg_wing/", {
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
    fetchWings();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`http://10.0.20.200:8000/mg_wing?wing_name=${name}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        const updatedData = data.filter((row) => row.wing_name !== name);
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
      { Header: "Wing Name", accessor: "wing_name" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      wing_name: <MDTypography variant="p">{row.wing_name}</MDTypography>,

      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "wingsupdate") ? (
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
            rbacData?.find((element: string) => element === "wingsdelete") ? (
              <IconButton
                onClick={() => {
                  handleDelete(row.wing_name);
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
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDTypography variant="h4" fontWeight="bold" color="secondary">
          Wings
        </MDTypography>
        {rbacData ? (
          rbacData?.find((element: string) => element === "wingscreate") ? (
            <MDButton variant="outlined" color="info" type="submit" onClick={handleClickOpen}>
              + New Wing
            </MDButton>
          ) : (
            ""
          )
        ) : (
          ""
        )}{" "}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={fetchWings} />
      </Dialog>

      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={fetchWings} />
      </Dialog>

      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default Academic;
