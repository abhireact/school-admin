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
const ClassTeacher = () => {
  // To fetch rbac from redux:  Start
  // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
  // console.log("rbac user", rbacData);
  //End

  // Fetch rbac  Date from useEffect: Start

  const [rbacData, setRbacData] = useState([]);
  const fetchRbac = async () => {
    try {
      const response = await axios.get(`http://10.0.20.200:8000/mg_rbac_current_user`, {
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
  const fetchClassTeachers = () => {
    axios
      .get("http://10.0.20.200:8000/mg_subject", {
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
    fetchClassTeachers();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete("http://10.0.20.200:8000/mg_subject", {
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
        fetchClassTeachers();
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error("An unexpected error occurred");
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Subject", accessor: "subject_name" },
      { Header: "Subject Code", accessor: "subject_code" },
      { Header: "Class Code", accessor: "class_code" },
      { Header: "Max Weekly Class", accessor: "max_weekly_class" },
      { Header: "No. of Class", accessor: "no_of_classes" },
      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "subjectupdate") ? (
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
            rbacData?.find((element: string) => element === "subjectdelete") ? (
              <IconButton
                onClick={() => {
                  handleDelete(row);
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
      subject_code: <MDTypography variant="p">{row.subject_code}</MDTypography>,
      subject_name: <MDTypography variant="p">{row.subject_name}</MDTypography>,

      class_code: <MDTypography variant="p">{row.class_code}</MDTypography>,
      max_weekly_class: <MDTypography variant="p">{row.max_weekly_class}</MDTypography>,
      no_of_classes: <MDTypography variant="p">{row.no_of_classes}</MDTypography>,
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
          <Create handleShowPage={handleShowPage} fetchingData={fetchClassTeachers} />
        </>
      ) : (
        <>
          <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
            <MDTypography variant="h5">Class Teacher</MDTypography>
            {rbacData ? (
              rbacData?.find((element: string) => element === "subjectcreate") ? (
                <MDButton variant="outlined" color="info" type="submit" onClick={handleShowPage}>
                  + New Class Teacher
                </MDButton>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            <Dialog open={openupdate} onClose={handleCloseupdate} maxWidth="lg">
              <Update
                setOpenupdate={setOpenupdate}
                editData={editData}
                fetchingData={fetchClassTeachers}
              />
            </Dialog>
          </Grid>
          <DataTable table={dataTableData} />
        </>
      )}
    </DashboardLayout>
  );
};

export default ClassTeacher;
