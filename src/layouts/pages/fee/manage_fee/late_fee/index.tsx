import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect } from "react";
import axios from "axios";
import Create from "./create";
import Update from "./update";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import BuildIcon from "@mui/icons-material/Build";
import { Card } from "@mui/material";
import Cookies from "js-cookie";
import ManageSchedule from "./manageschedule";
import { Popconfirm, message } from "antd";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";

const token = Cookies.get("token");
const LateFine = () => {
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
  const [manageData, setManageData] = useState(null);

  const handleManageSchedule = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");

    setManageData(main_data);
    setManageSchedule(true);
  };
  const handleCloseupdate = () => {
    setUpdatepage(false);
  }; //End
  const fetchLateFees = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/late_fee`, {
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
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/late_fee`, {
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
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/late_fee`, {
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
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  const [manageSchedule, setManageSchedule] = useState(false);
  const dataTableData = {
    columns: [
      { Header: "Fine ", accessor: "fine_name" },
      { Header: "Account ", accessor: "account_name" },
      { Header: "Late Fee Calculation Type", accessor: "late_fee_calculation_type" },
      { Header: "Description", accessor: "description" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <>
          <Tooltip title="Update">
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

          <Tooltip title="Manage Schedule">
            <IconButton
              onClick={() => {
                handleManageSchedule(index);
              }}
            >
              <BuildIcon fontSize="small" color="secondary" />
            </IconButton>
          </Tooltip>
        </>
      ),
      account_name: row.account_name,
      fine_name: row.fine_name,
      description: row.description,
      late_fee_calculation_type: row.late_fee_calculation_type,
    })),
  };
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <I18nextProvider i18n={createTrans}>
        {manageSchedule ? (
          <ManageSchedule manageData={manageData} handleClose={setManageSchedule} />
        ) : (
          <>
            {showpage ? (
              <Create handleShowPage={handleShowPage} fetchingData={fetchLateFees} />
            ) : (
              <>
                {updatepage ? (
                  <Update
                    setOpen={setUpdatepage}
                    editData={editData}
                    fetchingData={fetchLateFees}
                  />
                ) : (
                  <Card>
                    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Grid item pt={2} pl={2}>
                        <MDTypography variant="h4" fontWeight="bold" color="secondary">
                          {t("late_fee")}
                        </MDTypography>
                      </Grid>
                      <Grid item pt={2} pr={2}>
                        <MDButton
                          variant="outlined"
                          color="info"
                          type="submit"
                          onClick={handleShowPage}
                        >
                          + {t("new_late_fee")}
                        </MDButton>
                      </Grid>
                    </Grid>
                    <DataTable table={dataTableData} />
                  </Card>
                )}
              </>
            )}
          </>
        )}
      </I18nextProvider>
    </DashboardLayout>
  );
};

export default LateFine;
