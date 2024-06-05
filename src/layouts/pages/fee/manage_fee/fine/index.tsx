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
import EditFeePerticularAmount from "./update";
import Create from "./create";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
export default function ManageFeeAmountPerticular() {
  const [editdata, setEditdata] = useState({});
  const [editopen, setEditOpen] = useState(false);
  const [particulardata, setParticulardata] = useState([]);
  const [CreatePage, ShowCreatePage] = useState(false);
  const handleCreatePage = () => {
    ShowCreatePage(!CreatePage);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/create_fine`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setParticulardata(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(particulardata, "perticular amount daftaaaaaa");
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

  const feeConcessionData = {
    //
    columns: [
      { Header: "FEE NAME", accessor: "fine_name" },
      { Header: "DESCRIPTION", accessor: "description" },
      { Header: "FINE FROM", accessor: "fine_from" },
      { Header: "AMOUNT", accessor: "amount" },
      { Header: "ACtion", accessor: "action" },
    ],
    rows: particulardata.map((row, index) => ({
      fine_name: row.fine_name,
      description: row.description,
      fine_from: row.fine_from,
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
        {CreatePage ? (
          <Create handleClose={handleCreatePage} fetchData={fetchData} />
        ) : (
          <>
            {" "}
            <Dialog open={editopen} onClose={handleClickCloseEdit} maxWidth="md">
              <EditFeePerticularAmount editData={editdata} handleClose={handleEditSuccess} />
            </Dialog>
            <Grid container p={3}>
              <Grid item xs={12} sm={6} mt={2}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Fine Particular
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <MDButton variant="outlined" color="info" onClick={() => handleCreatePage()}>
                  + Create New Fine Particular
                </MDButton>
              </Grid>
            </Grid>
            <DataTable table={feeConcessionData} isSorted={false} canSearch />
          </>
        )}
      </Card>
    </DashboardLayout>
  );
}
