import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect } from "react";
import axios from "axios";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";
import Update from "./update";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card } from "@mui/material";
import Cookies from "js-cookie";
import { Popconfirm, Tooltip, message } from "antd";

const token = Cookies.get("token");
const ExcessFee = () => {
  const { t } = useTranslation();

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

  const confirm = async (data: any) => {
    console.log(data, "confirm data");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/excess_fee`, {
        data: data,
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

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
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
          <Tooltip title="Edit" placement="top">
            <IconButton
              onClick={() => {
                handleOpenupdate(index);
              }}
            >
              <CreateRoundedIcon fontSize="small" color="secondary" />
            </IconButton>
          </Tooltip>
          <IconButton>
            <Popconfirm
              title="Delete"
              description="Are you sure you want to delete it? ?"
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
      <I18nextProvider i18n={createTrans}>
        {!updatepage && (
          <>
            <Card>
              <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item pt={2} pl={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    {t("excess_fee")}
                  </MDTypography>
                </Grid>
              </Grid>
              <DataTable table={dataTableData} canSearch isSorted={false} />
            </Card>
          </>
        )}

        <>
          {updatepage && (
            <Update handleClose={setUpdatepage} editData={editData} fetchingData={fetchLateFees} />
          )}
        </>
      </I18nextProvider>
    </DashboardLayout>
  );
};

export default ExcessFee;
