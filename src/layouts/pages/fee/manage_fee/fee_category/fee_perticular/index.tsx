import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, Link, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import EditFeePerticularAmount from "./edit_fee_perticular_amount";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
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
  const data = {
    concession_type: "aa",
    concession_name: "ccc",
    class_section: "ccc",
    fee_category: "dwxdw",
    student_category: "wdexwe",
    admission_number: 0,
    concession_amount: 0,
    account: "kotak",
  };
  const feeConcessionData = {
    //
    columns: [
      { Header: "FEE CATEGORY", accessor: "fee_category" },
      { Header: "FEE PARTICULAR", accessor: "fee_perticular" },
      { Header: "CLASS-SECTION", accessor: "section" },
      { Header: "AMOUNT", accessor: "amount" },
      { Header: "ACtion", accessor: "action" },
    ],
    rows: perticulardata.map((row, index) => ({
      fee_category: row.fee_category,
      fee_perticular: row.fee_particular,
      section: `${row.class_name} - ${row.section_name}`,
      amount: row.amount,
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Tooltip title="Edit" placement="top">
              <Icon fontSize="small" onClick={() => handleClickOpenEdit(row)}>
                edit
              </Icon>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Delete" placement="top">
              <Icon fontSize="small">delete</Icon>
            </Tooltip>
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
              Fee Amount Perticular
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/fee/create_fee_amount_perticular" variant="body2">
              <MDButton variant="outlined" color="info">
                + Create Fee Amount Perticular
              </MDButton>
            </Link>
          </Grid>
        </Grid>
        <DataTable table={feeConcessionData} isSorted={false} />
      </Card>
    </DashboardLayout>
  );
}
