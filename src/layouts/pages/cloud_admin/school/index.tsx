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
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useNavigate } from "react-router-dom";
const token = Cookies.get("token");

const SchoolCreation = () => {
  const rbacData = useSelector((state: any) => state?.rbacData);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //Start

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //End

  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [open, setOpen] = useState(false);

  const [openupdate, setOpenupdate] = useState(false);
  const handleUpdate = async (data: any) => {
    console.log(data);
    navigate("/school/edit_school", { state: data });
  };
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
  const FetchModule = () => {
    axios
      .get(
        `http://10.0.20.200:8000/mg_school/all_school
      `,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    FetchModule();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_castes`, {
        data: { caste_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        FetchModule();
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error("An unexpected error occurred");
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Name", accessor: "school_name" },

      { Header: "School Code", accessor: "school_code" },
      { Header: "Reg.No", accessor: "reg_num" },
      { Header: "City ", accessor: "city" },
      { Header: "State", accessor: "state" },

      { Header: "Status", accessor: "is_active" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      school_name: <MDTypography variant="p">{row.school_name}</MDTypography>,

      reg_num: <MDTypography variant="p">{row.reg_num}</MDTypography>,
      city: <MDTypography variant="p">{row.city}</MDTypography>,
      state: <MDTypography variant="p">{row.state}</MDTypography>,

      is_active: (
        <MDTypography variant="p">
          {row.is_active === true ? (
            <ToggleOnIcon fontSize="large" />
          ) : (
            <ToggleOffIcon fontSize="large" />
          )}
        </MDTypography>
      ),
      action: (
        <MDTypography variant="p">
          <IconButton
            onClick={() => {
              handleOpenupdate(index);
            }}
          >
            <CreateRoundedIcon />
          </IconButton>
        </MDTypography>
      ),

      school_code: <MDTypography variant="p">{row.school_code}</MDTypography>,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />{" "}
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              School
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}>
            <MDButton
              variant="outlined"
              color="info"
              type="submit"
              //   onClick={handleClickOpen}
              onClick={() => navigate("/school/create_school")}
            >
              + Add School
            </MDButton>
          </Grid>
        </Grid>
        <DataTable table={dataTableData} />
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={FetchModule} />
      </Dialog>
      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={FetchModule} />
      </Dialog>
    </DashboardLayout>
  );
};

export default SchoolCreation;
