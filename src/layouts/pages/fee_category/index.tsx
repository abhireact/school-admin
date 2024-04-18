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
import Create from "./category/create";
import Update from "./category/update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
const FeeCategory = () => {
  // To fetch rbac from redux:  Start
  // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
  // console.log("rbac user", rbacData);
  //End

  // Fetch rbac  Date from useEffect: Start

  const [rbacData, setRbacData] = useState([]);
  const fetchRbac = async () => {
    try {
      const response = await axios.get(`http://10.0.20.121:8000/mg_rbac_current_user`, {
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
  const FetchFeeCategory = () => {
    axios
      .get("http://10.0.20.121:8000/mg_caste_category", {
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
    FetchFeeCategory();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete("http://10.0.20.121:8000/fee_category", {
        data: { caste_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        FetchFeeCategory();
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error("An unexpected error occurred");
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Fee Category", accessor: "name" },

      { Header: "Description", accessor: "description" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      name: <MDTypography variant="p">{row.name}</MDTypography>,

      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "castecategoryupdate") ? (
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
            rbacData?.find((element: string) => element === "castecategorydelete") ? (
              <IconButton
                onClick={() => {
                  handleDelete(row.caste);
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

      description: <MDTypography variant="p">{row.description}</MDTypography>,
    })),
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDTypography variant="h4" fontWeight="bold" color="secondary">
          Fee Category
        </MDTypography>
        {rbacData ? (
          rbacData?.find((element: string) => element === "castecategorycreate") ? (
            <MDButton variant="outlined" color="info" type="submit" onClick={handleClickOpen}>
              + Add Fee Category
            </MDButton>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={FetchFeeCategory} />
      </Dialog>

      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={FetchFeeCategory} />
      </Dialog>

      <DataTable table={dataTableData} />
    </DashboardLayout>
  );
};

export default FeeCategory;
