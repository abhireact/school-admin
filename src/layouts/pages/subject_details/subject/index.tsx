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
import { Card, Tooltip, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const Subject = () => {
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
  const fetchSubjects = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_subject`, {
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
    fetchSubjects();
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
        fetchSubjects();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Subject", accessor: "subject_name", width: "20%" },
      { Header: "Class Name", accessor: "class_name", width: "20%" },
      { Header: "Max Weekly Class", accessor: "max_weekly_class", width: "20%" },
      { Header: "No. of Class", accessor: "no_of_classes", width: "20%" },
      { Header: "Action", accessor: "action", width: "20%" },
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

          <IconButton>
            <Popconfirm
              title="Delete"
              description="Are you sure to Delete it ?"
              placement="topLeft"
              onConfirm={() => handleDelete(row)} // Pass index to confirm function
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete" placement="top">
                <DeleteIcon />
              </Tooltip>
            </Popconfirm>
          </IconButton>
        </MDTypography>
      ),
      subject_code: row.subject_code,
      subject_name: row.subject_name,

      class_name: row.class_name,
      max_weekly_class: row.max_weekly_class || 0,
      no_of_classes: row.no_of_classes || 0,
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
          <Create handleShowPage={handleShowPage} fetchingData={fetchSubjects} />
        </>
      ) : (
        <>
          {" "}
          <Card>
            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
              <Grid item pt={2} pl={2}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Subject
                </MDTypography>
              </Grid>
              <Grid item pt={2} pr={2}>
                <MDButton variant="outlined" color="info" onClick={handleShowPage}>
                  + New Subject
                </MDButton>
              </Grid>
            </Grid>
            <DataTable table={dataTableData} canSearch />
          </Card>
          <Dialog open={openupdate} onClose={handleCloseupdate} maxWidth="lg">
            <Update
              setOpenupdate={setOpenupdate}
              editData={editData}
              fetchingData={fetchSubjects}
            />
          </Dialog>
        </>
      )}
    </DashboardLayout>
  );
};

export default Subject;
