import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Icon from "@mui/material/Icon";
import { Grid, IconButton, Link, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DataTable from "examples/Tables/DataTable";
import EditFeePerticularAmount from "./update";
import Create from "./create";
import axios from "axios";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import { Popconfirm, message } from "antd";
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

  const confirm = async (data: any) => {
    console.log(data, "confirm data");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/create_fine`, {
        data: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted Successfully");
        fetchData();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      message.error(error.response?.data?.detail || "An error occurred");
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
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
              <IconButton
                onClick={() => {
                  handleClickOpenEdit(row);
                }}
              >
                <CreateRoundedIcon fontSize="small" color="secondary" />
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
            <DataTable table={feeConcessionData} canSearch />
          </>
        )}
      </Card>
    </DashboardLayout>
  );
}
