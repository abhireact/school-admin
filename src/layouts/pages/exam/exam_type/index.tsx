import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import { Grid, Card, Link, Autocomplete, Tooltip } from "@mui/material";
import Icon from "@mui/material/Icon";
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
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const Examtype = () => {
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
    const main_data = data[index];
    console.log(main_data, "maindata");
    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  const fetchExamtypes = () => {
    axios
      .get("http://10.0.20.200:8000/exam_type", {
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
    fetchExamtypes();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete("http://10.0.20.200:8000/grades", {
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
        fetchExamtypes();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Exam Type", accessor: "exam_type" },
      { Header: "Class Name", accessor: "class_name" },
      { Header: "Section Name", accessor: "section_name" },
      { Header: "Academic Year", accessor: "academic_year" },
      { Header: "Action", accessor: "action" },
    ],

    // rows: data.map((row, index) => ({
    //   action: (
    //     <MDTypography variant="p">
    //       {rbacData ? (
    //         rbacData?.find((element: string) => element === "nonacademicgradeupdate") ? (
    //           <IconButton
    //             onClick={() => {
    //               handleOpenupdate(index);
    //             }}
    //           >
    //             <CreateRoundedIcon />
    //           </IconButton>
    //         ) : (
    //           ""
    //         )
    //       ) : (
    //         ""
    //       )}

    //       {rbacData ? (
    //         rbacData?.find((element: string) => element === "nonacademicgradedelete") ? (
    //           <IconButton
    //             onClick={() => {
    //               handleDelete(row);
    //             }}
    //           >
    //             <DeleteIcon />
    //           </IconButton>
    //         ) : (
    //           ""
    //         )
    //       ) : (
    //         ""
    //       )}
    //     </MDTypography>
    //   ),
    //   exam_type: <MDTypography variant="p">{row.exam_type}</MDTypography>,
    //   class_name: <MDTypography variant="p">{row.class_name}</MDTypography>,
    //   section_name: <MDTypography variant="p">{row.section_name}</MDTypography>,
    //   academic_year: <MDTypography variant="p">{row.academic_year}</MDTypography>,
    // })),
    rows: [
      {
        exam_type: "Term I",
        class_name: "I",
        section_name: "A",
        academic_year: "2024-2025",
        action: (
          <Grid container spacing={1}>
            <Grid item>
              <Tooltip title="Edit" placement="top">
                <Icon
                  fontSize="small"
                  onClick={() => {
                    handleOpenupdate(0);
                  }}
                >
                  edit
                </Icon>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Delete" placement="top">
                <Icon
                  fontSize="small"
                  // onClick={() => {
                  //   handleDelete(row);
                  // }}
                >
                  delete
                </Icon>
              </Tooltip>
            </Grid>
          </Grid>
        ),
      },
    ],
  };
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Dialog open={openupdate} onClose={handleCloseupdate}>
          <Update setOpenupdate={setOpenupdate} editData={editData} fetchingData={fetchExamtypes} />
        </Dialog>
      </Grid>
      <Card>
        <Grid container px={3} pt={3}>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Exam Type
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MDButton variant="outlined" color="info" type="submit" onClick={handleShowPage}>
              + New Exam Type
            </MDButton>
          </Grid>
          <DataTable table={dataTableData} canSearch={true} />
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default Examtype;
