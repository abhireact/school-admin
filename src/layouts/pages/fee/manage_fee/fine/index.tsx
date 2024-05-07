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

import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const FineParticular = () => {
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

  const fetchSubjects = () => {
    axios
      .get("http://10.0.20.200:8000/sub_subjects", {
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
        fetchSubjects();
      }
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error("An unexpected error occurred");
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Index ", accessor: "index", width: "10%" },
      { Header: "Sub-Subject ", accessor: "sub_subject" },
      { Header: "Subject", accessor: "subject_name" },
      { Header: "Class Name", accessor: "class_name" },
      { Header: "Section Name", accessor: "section_name" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "subsubjectdelete") ? (
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
      sub_subject: <MDTypography variant="p">{row.sub_subject}</MDTypography>,
      subject_name: <MDTypography variant="p">{row.subject_name}</MDTypography>,

      index: <MDTypography variant="p">{row.index}</MDTypography>,
      section_name: <MDTypography variant="p">{row.section_name}</MDTypography>,
      class_name: <MDTypography variant="p">{row.class_name}</MDTypography>,
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
          <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
            <MDTypography variant="h5" fontWeight="bold" color="secondary">
              Fine Particular List
            </MDTypography>

            <MDButton variant="outlined" color="info" type="submit" onClick={handleShowPage}>
              + New Fine Particular
            </MDButton>
          </Grid>
          <DataTable table={dataTableData} />
        </>
      )}
    </DashboardLayout>
  );
};

export default FineParticular;
