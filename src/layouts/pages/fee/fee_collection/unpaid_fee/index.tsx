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
import { Icon, Tooltip, DialogTitle, DialogContent, Switch, FormControlLabel } from "@mui/material";
import { message } from "antd";
import StudentCard from "../student_card";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

const token = Cookies.get("token");
type ColumnName =
  | "collection_name"
  | "particular_name"
  | "assigned_amount"
  | "paid_amount"
  | "fine_amount"
  | "concession_amount"
  | "unpaid_amount";
const UnPaidFees = (props: any) => {
  const [data, setData] = useState([]);
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnName, boolean>>({
    collection_name: true,
    particular_name: true,
    assigned_amount: true,
    paid_amount: true,
    fine_amount: true,
    concession_amount: true,
    unpaid_amount: true,
  });
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

  const handleColumnSelectorOpen = () => {
    setOpenColumnSelector(true);
  };

  const handleColumnSelectorClose = () => {
    setOpenColumnSelector(false);
  };

  const handleColumnToggle = (columnName: ColumnName) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  const dataTableData = {
    columns: [
      { Header: "COLLECTION NAME", accessor: "collection_name" as ColumnName },
      { Header: "PARTICULAR NAME", accessor: "particular_name" as ColumnName },
      { Header: "ASSIGNED AMOUNT", accessor: "assigned_amount" as ColumnName },
      { Header: "PAID AMOUNT", accessor: "paid_amount" as ColumnName },
      { Header: "FINE", accessor: "fine_amount" as ColumnName },
      { Header: "CONCESSION", accessor: "concession_amount" as ColumnName },
      { Header: "UNPAID AMOUNT", accessor: "unpaid_amount" as ColumnName },
    ].filter((column) => visibleColumns[column.accessor]),

    rows: data.map((row: any, index: number) => ({
      fine_amount: visibleColumns.fine_amount && (
        <MDTypography variant="p">{row.fine_amount}</MDTypography>
      ),
      particular_name: visibleColumns.particular_name && (
        <MDTypography variant="p">{row.particular_name}</MDTypography>
      ),
      paid_amount: visibleColumns.paid_amount && (
        <MDTypography variant="p">{row.paid_amount}</MDTypography>
      ),
      assigned_amount: visibleColumns.assigned_amount && (
        <MDTypography variant="p">{row.assigned_amount}</MDTypography>
      ),
      collection_name: visibleColumns.collection_name && (
        <MDTypography variant="p">{row.collection_name}</MDTypography>
      ),
      concession_amount: visibleColumns.concession_amount && (
        <MDTypography variant="p">{row.concession_amount}</MDTypography>
      ),
      unpaid_amount: visibleColumns.unpaid_amount && (
        <MDTypography variant="p">{row.unpaid_amount}</MDTypography>
      ),
    })),
  };

  return (
    <>
      <Grid container px={3} display="flex" justifyContent={"center"}>
        <Grid item xs={12} sm={6} display="flex" justifyContent={"center"}>
          <StudentCard data={props.mainData} />
        </Grid>
      </Grid>
      <IconButton onClick={handleColumnSelectorOpen}>
        <ViewColumnIcon />
      </IconButton>
      <DataTable table={dataTableData} />
      <Dialog open={openColumnSelector} onClose={handleColumnSelectorClose}>
        <DialogTitle>Select Columns</DialogTitle>
        <DialogContent>
          {(Object.keys(visibleColumns) as ColumnName[]).map((columnName) => (
            <FormControlLabel
              key={columnName}
              control={
                <Switch
                  checked={visibleColumns[columnName]}
                  onChange={() => handleColumnToggle(columnName)}
                />
              }
              label={columnName.replace(/_/g, " ").toUpperCase()}
            />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UnPaidFees;
