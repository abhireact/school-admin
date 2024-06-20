import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import Dialog from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import MDBox from "components/MDBox";
import { Icon, Tooltip } from "@mui/material";
import { message } from "antd";
import StudentCard from "../student_card";
const token = Cookies.get("token");

const UnPaidFees = (props: any) => {
  const [data, setData] = useState([]);

  console.log(props, "props");
  useEffect(() => {
    GetData(props.mainData);
  }, [props.mainData, props.collection_date]);
  const GetData = (data: any) => {
    console.log(data, "data in GetData");

    axios
      .post(
        "http://10.0.20.200:8000/fee_collections/unpaid_fees",
        {
          user_name: data.user_id,
          academic_year: data.academic_year,
          class_name: data.class_name,
          collection_date: props.collection_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        message.error("Error on fetching data !");
      });
  };

  const dataTableData = {
    columns: [
      { Header: "COLLECTION NAME", accessor: "collection_name" },
      { Header: "PARTICULAR NAME", accessor: "particular_name" },
      { Header: "ASSIGNED AMOUNT", accessor: "assigned_amount" },
      { Header: "PAID AMOUNT", accessor: "paid_amount" },

      { Header: "FINE", accessor: "fine_amount" },
      { Header: "CONCESSION", accessor: "concession_amount" },
      // { Header: "DISCOUNT AMOUNT", accessor: "total" },
      { Header: " UnPAID AMOUNT", accessor: "unpaid_amount" },
      //   { Header: "ACTION", accessor: "a" },
    ],

    rows: data.map(
      (
        row: {
          assigned_amount: any;
          particular_name: any;
          collection_name: any;
          paid_amount: any;
          concession_amount: any;
          fine_amount: any;
          unpaid_amount: any;
        },
        index: number
      ) => ({
        fine_amount: <MDTypography variant="p">{row.fine_amount}</MDTypography>,
        particular_name: <MDTypography variant="p">{row.particular_name}</MDTypography>,
        paid_amount: <MDTypography variant="p">{row.paid_amount}</MDTypography>,
        assigned_amount: <MDTypography variant="p">{row.assigned_amount}</MDTypography>,
        collection_name: <MDTypography variant="p">{row.collection_name}</MDTypography>,
        concession_amount: <MDTypography variant="p">{row.concession_amount}</MDTypography>,
        unpaid_amount: <MDTypography variant="p">{row.unpaid_amount}</MDTypography>,
      })
    ),
  };
  return (
    <>
      {/* <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6">UnPaid Fees</MDTypography>
        <Tooltip title="UnPaid Fees" placement="bottom" arrow>
          <MDButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </MDButton>
        </Tooltip>
      </MDBox>{" "} */}
      <Grid container px={3} display="flex" justifyContent={"center"}>
        <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}>
          <StudentCard data={props.mainData} />
        </Grid>
      </Grid>
      <DataTable table={dataTableData} />
    </>
  );
};

export default UnPaidFees;
