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

import Update from "./update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const ExcessFee = () => {
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
  const [updatepage, setUpdatepage] = useState(false);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");

    setEditData(main_data);
    setUpdatepage(true);
  };

  const handleCloseupdate = () => {
    setUpdatepage(false);
  }; //End
  const fetchLateFees = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/excess_fee`, {
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
    fetchLateFees();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/excess_fee`, {
        data: name,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        fetchLateFees();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Excess Fee Name ", accessor: "name" },

      { Header: "Academic Year", accessor: "academic_year" },

      { Header: "Class & Section ", accessor: "class_section" },

      { Header: "Student Name ", accessor: "student_name" },
      { Header: "Excess Amount", accessor: "excess_amount" },
      { Header: " Status", accessor: "payment_status" },
      { Header: "Collection Date", accessor: "collection_date" },

      { Header: "Action", accessor: "action" },
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

          <IconButton
            onClick={() => {
              handleDelete(row);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </MDTypography>
      ),
      student_name: `${row.first_name} ${row.middle_name} ${row.last_name}`,
      name: row.name,

      academic_year: row.academic_year,

      class_section: `${row.class_name} ${row.section_name}`,

      excess_amount: row.excess_amount,
      payment_status: row.payment_status,
      collection_date: row.collection_date,
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {!updatepage && (
        <>
          <DataTable table={dataTableData} isSorted={false} />
        </>
      )}

      <>
        {updatepage && (
          <Update handleClose={setUpdatepage} editData={editData} fetchingData={fetchLateFees} />
        )}
      </>
    </DashboardLayout>
  );
};

export default ExcessFee;
