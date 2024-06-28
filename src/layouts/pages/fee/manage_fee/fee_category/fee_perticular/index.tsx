import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, IconButton, Link, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import EditFeePerticularAmount from "./edit_fee_perticular_amount";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Popconfirm, message } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const token = Cookies.get("token");
export default function ManageFeeAmountPerticular() {
  const location = useLocation();
  const category_data = location.state || {};
  const [editdata, setEditdata] = useState({});
  const [editopen, setEditOpen] = useState(false);
  const [perticulardata, setPerticulardata] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://10.0.20.200:8000/fee_particular/search`,
        { category_name: category_data.name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setPerticulardata(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(perticulardata, "perticular amount daftaaaaaa");
  const handleClickOpenEdit = (data: any) => {
    setEditdata(data);
    setEditOpen(true);
  };
  const handleClickCloseEdit = () => {
    setEditOpen(false);
  };
  const handleEditSuccess = () => {
    fetchData();
    handleClickCloseEdit();
  };

  const confirm = async (data: any) => {
    console.log(data, "confirm data");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/fee_particular`, {
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted Successfully");
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };
  const feeConcessionData = {
    //
    columns: [
      { Header: "Academic Year", accessor: "academic_year" },

      { Header: "FEE CATEGORY", accessor: "fee_category" },
      { Header: "FEE PARTICULAR", accessor: "fee_perticular" },
      { Header: "CLASS-SECTION", accessor: "section" },
      { Header: "AMOUNT", accessor: "amount" },
      { Header: "ACtion", accessor: "action" },
    ],
    rows: perticulardata.map((row, index) => ({
      fee_category: row.fee_category,
      academic_year: row.academic_year,
      fee_perticular: row.fee_particular,
      section: `${row.class_name} - ${row.section_name}`,
      amount: row.amount,
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Tooltip title="Edit" placement="top">
              <IconButton disabled={!row.is_editable} onClick={() => handleClickOpenEdit(row)}>
                <EditIcon fontSize="small" color="secondary" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <IconButton>
              <Popconfirm
                title="Delete"
                description="Are you sure to Delete it ?"
                placement="topLeft"
                onConfirm={() => confirm(row)} // Pass index to confirm function
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete" placement="top">
                  <DeleteIcon fontSize="small" color="secondary" />
                </Tooltip>
              </Popconfirm>
            </IconButton>
          </Grid>
        </Grid>
      ),
    })),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Dialog open={editopen} onClose={handleClickCloseEdit}>
          <EditFeePerticularAmount data={editdata} onSuccess={handleEditSuccess} />
        </Dialog>
        <Grid container p={3}>
          <Grid item xs={12} sm={6} mt={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Fee Amount Particular
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/fee/create_fee_amount_perticular" variant="body2">
              <MDButton variant="outlined" color="info">
                + Create Fee Amount Particular
              </MDButton>
            </Link>
          </Grid>
        </Grid>
        <DataTable table={feeConcessionData} canSearch />
      </Card>
    </DashboardLayout>
  );
}
