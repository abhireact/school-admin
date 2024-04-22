import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect } from "react";
import axios from "axios";
import Update from "./update";
import Create from "./create";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
const token = Cookies.get("token");
const Student = () => {
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
  const navigate = useNavigate();

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
  const fetchStudents = () => {
    axios
      .get("http://10.0.20.121:8000/mg_student", {
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
    fetchStudents();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete("http://10.0.20.121:8000/mg_student", {
        data: { stud_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        const updatedData = data.filter((row) => row.username !== name);
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
      { Header: "Student Name", accessor: "full_name" },

      { Header: "Class", accessor: "class_name" },
      { Header: "Section", accessor: "section_name" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Academic Year", accessor: "academic_year" },
      { Header: "Mobile Number", accessor: "mobile_number" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      academic_year: <MDTypography variant="p"> {row.academic_year}</MDTypography>,

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
              handleDelete(row.first_name + " " + row.middle_name + " " + row.last_name);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),

      full_name: (
        <MDTypography variant="p">
          <MDAvatar size="lg" bgColor="dark" alt={row.academic_year} src={row.stud_img} />
          {row.first_name + " " + row.middle_name + " " + row.last_name}
        </MDTypography>
      ),
      class_name: <MDTypography variant="p">{row.class_name}</MDTypography>,
      gender: <MDTypography variant="p">{row.gender}</MDTypography>,
      section_name: <MDTypography variant="p">{row.section_name}</MDTypography>,
      mobile_number: <MDTypography variant="p">{row.mobile_number}</MDTypography>,
    })),
  };
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  return (
    <BaseLayout>
      {showpage ? (
        <>
          <Create setShowpage={setShowpage} />
        </>
      ) : (
        <>
          <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Student
            </MDTypography>
            {rbacData ? (
              rbacData?.find((element: string) => element === "studentdetailscreate") ? (
                <MDButton variant="outlined" color="info" type="submit" onClick={handleShowPage}>
                  + Student
                </MDButton>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Grid>
          <Dialog open={openupdate} onClose={handleCloseupdate} maxWidth="lg">
            <Update setOpenupdate={setOpenupdate} editData={editData} />
          </Dialog>

          <DataTable table={dataTableData} />
        </>
      )}
    </BaseLayout>
  );
};

export default Student;
