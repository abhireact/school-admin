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
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@emotion/react";
import { Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const ScholasticComponent = () => {
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
  const fetchComponents = () => {
    setData([
      {
        component_name: "1sttt",
        weightage: "20",
        maximum_marks: "20",
      },
    ]);
    // axios
    //   .get("http://10.0.20.200:8000/schol_components", {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     setData(response.data);

    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
  };

  useEffect(() => {
    fetchComponents();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete("http://10.0.20.200:8000/schol_components", {
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
        fetchComponents();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Component", accessor: "component_name" },
      { Header: "Weightage", accessor: "weightage" },
      { Header: "Maximum marks", accessor: "maximum_marks" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <>
          <IconButton onClick={() => handleOpenupdate(index)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
        </>
      ),
      component_name: <MDTypography variant="p">{row.component_name}</MDTypography>,
      weightage: <MDTypography variant="p">{row.weightage}</MDTypography>,

      maximum_marks: <MDTypography variant="p">{row.maximum_marks}</MDTypography>,
    })),
  };
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={openupdate} onClose={handleCloseupdate} maxWidth="lg">
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchingData={fetchComponents} />
      </Dialog>
      <Card>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Scholastic Component
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MDButton variant="outlined" color="info" type="submit" onClick={handleShowPage}>
              + New Component
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12}>
            <DataTable table={dataTableData} canSearch />
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default ScholasticComponent;
