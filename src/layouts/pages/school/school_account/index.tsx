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
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Create from "./create";
import Update from "./update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Card, Tooltip, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";

const token = Cookies.get("token");
const SchoolAccount = () => {
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
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = () => {
    setIsExporting(true);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${"accounts"}.xlsx`, { bookType: "xlsx", type: "binary" });

    setIsExporting(false);
    console.log("export excel data", data);
  };

  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  //Create Dialog Box Start

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //End
  const fetchAccountData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accounts`, {
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
    fetchAccountData();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_accounts`, {
        data: {
          account_name: name.account_name,
          description: name.description,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        fetchAccountData();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Account", accessor: "account_name" },
      { Header: "Description", accessor: "description" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "schoolaccountupdate") ? (
              <IconButton
                onClick={() => {
                  handleOpenupdate(index);
                }}
              >
                <CreateRoundedIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {rbacData ? (
            rbacData?.find((element: string) => element === "schoolaccountdelete") ? (
              <IconButton>
                <Popconfirm
                  title="Delete"
                  description="Are you sure to Delete it ?"
                  placement="topLeft"
                  onConfirm={() => handleDelete(row)} // Pass index to confirm function
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete" placement="top">
                    <DeleteIcon />
                  </Tooltip>
                </Popconfirm>
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </MDTypography>
      ),
      description: row.description,
      account_name: row.account_name,
    })),
  };
  interface SessionData {
    account_name: string;
    description: string | null;
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAccountExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Check if the file is in .xlsx format
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (fileExtension !== "xlsx") {
      message.error("Please upload Excel file in .xlsx format.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 });

      // Transform the data to the desired format
      const transformedData: SessionData[] = jsonData.map((item: any) => ({
        account_name: item[0],
        description: item[1],
      }));

      // Do something with the transformedData
      console.log(transformedData, "json data from accounts excel ");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_accounts`, transformedData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Accounts created successfully!");

          fetchAccountData();
        })
        .catch((error: any) => {
          message.error(error.response.data.detail);
        });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Account
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}>
            {rbacData ? (
              rbacData?.find((element: string) => element === "schoolaccountcreate") ? (
                <>
                  {" "}
                  <MDButton
                    variant="contained"
                    disabled={data.length < 1}
                    color="dark"
                    type="submit"
                    onClick={handleExport}
                  >
                    {isExporting ? "Exporting..." : "Export to Excel"}
                  </MDButton>
                  &nbsp; &nbsp; &nbsp;
                  <MDButton variant="contained" color="info" onClick={handleFileInputClick}>
                    Import&nbsp;
                    <FileUploadIcon />
                  </MDButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAccountExcel}
                    style={{ display: "none" }}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <MDButton variant="outlined" color="info" type="submit" onClick={handleOpen}>
                    + New Account
                  </MDButton>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <DataTable table={dataTableData} canSearch />
      </Card>
      <Dialog open={openupdate} onClose={handleCloseupdate} maxWidth="md">
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchingData={fetchAccountData} />
      </Dialog>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <Create handleClose={handleClose} fetchingData={fetchAccountData} />
      </Dialog>
    </DashboardLayout>
  );
};

export default SchoolAccount;
