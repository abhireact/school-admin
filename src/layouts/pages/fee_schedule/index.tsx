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

import NewFeeSchedule from "./new_fee_schedule";
import UnscheduledStudents from "./unscheduled_students";
const FeeSchedule = () => {
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

  const dataTableData = {
    columns: [
      { Header: "Index ", accessor: "index", width: "10%" },
      { Header: "Sub-Subject ", accessor: "sub_subject" },
      { Header: "Subject", accessor: "subject_name" },
      { Header: "Class Name", accessor: "class_name" },
      { Header: "Section Name", accessor: "section_name" },
    ],

    rows: data.map((row, index) => ({
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

      <Create handleShowPage={handleShowPage} setData={setData} />

      {data.length > 1 ? <DataTable table={dataTableData} /> : ""}
      <NewFeeSchedule />
      <UnscheduledStudents />
    </DashboardLayout>
  );
};

export default FeeSchedule;
