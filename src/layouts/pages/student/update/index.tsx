import { Card, Grid } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Student from "layouts/pages/student/studentdetails/update";
import MDButton from "components/MDButton";
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";
import Sidenav from "../sidenav";

const token = Cookies.get("token");

const Update = (props: any) => {
  const { editData, setOpenupdate, fetchData } = props;
  const [studentInfo, setStudentInfo] = useState({});
  const [guardianInfo, setGuardianInfo] = useState([]);

  const fetchGuardian = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_guardian/manage`,
        { student_user_name: editData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setGuardianInfo(response.data);
        console.log(guardianInfo, "guardian info");
      })
      .catch((error) => {
        console.error("Error fetching guardian data:", error);
      });
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_student/retrive`,
        {
          user_name: editData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStudentInfo(response.data);
        console.log("student info data", response.data);
      })
      .catch(() => {
        console.error("Error on getting student info");
      });

    fetchGuardian();
  }, []);
  return (
    <Student
      editData={studentInfo}
      username={editData}
      setOpenupdate={setOpenupdate}
      fetchData={fetchData}
      guardianInfo={guardianInfo}
      fetchGuardian={fetchGuardian}
    />
  );
};

export default Update;
