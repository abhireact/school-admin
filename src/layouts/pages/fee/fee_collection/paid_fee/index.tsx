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
import MyDataTableComponent from "layouts/pages/dashboard/test2";
const token = Cookies.get("token");

const PaidFees = (props: any) => {
  const [data, setData] = useState([]);

  console.log(props, "props");
  useEffect(() => {
    GetData(props.mainData);
  }, []);
  const GetData = (data: any) => {
    console.log(data, "data in GetData");

    axios
      .post(
        "http://10.0.20.200:8000/fee_receipts",
        {
          student_user_name: data.user_id,
          academic_year: data.academic_year,
          class_name: data.class_name,
          section_name: data.section_name,
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
      { Header: "RECIEPT NO", accessor: "receipt_number" },
      { Header: "COLLECTION DATE", accessor: "submit_date" },
      { Header: "COLLECTION NAME", accessor: "collection_name" },
      // { Header: "PARTICULAR NAME", accessor: "receipt_number" },
      // { Header: "ASSIGNED AMOUNT", accessor: "total" },
      { Header: "PAID AMOUNT", accessor: "paid_amount" },

      // { Header: "FINE", accessor: "total" },
      // { Header: "CONCESSION", accessor: "total" },
      // { Header: "DISCOUNT AMOUNT", accessor: "total" },
      { Header: "TOTAL PAID AMOUNT", accessor: "total_amount" },
      //   { Header: "ACTION", accessor: "a" },
    ],

    rows: data.map(
      (
        row: {
          receipt_number: any;
          submit_date: any;
          collection_name: any;
          paid_amount: any;
          total_amount: any;
        },
        index: number
      ) => ({
        total_amount: <MDTypography variant="p">{row.total_amount}</MDTypography>,
        submit_date: <MDTypography variant="p">{row.submit_date}</MDTypography>,
        paid_amount: <MDTypography variant="p">{row.paid_amount}</MDTypography>,
        receipt_number: <MDTypography variant="p">{row.receipt_number}</MDTypography>,
        collection_name: <MDTypography variant="p">{row.collection_name}</MDTypography>,
      })
    ),
  };
  return (
    <>
      {/* <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6">Paid Fees</MDTypography>
        <Tooltip title="Paid Fees" placement="bottom" arrow>
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

export default PaidFees;
