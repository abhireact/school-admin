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
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Create from "./create";
import Update from "./update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
const token = Cookies.get("token");
import * as XLSX from "xlsx";
import MDInput from "components/MDInput";

const Wing = () => {
  // To fetch rbac from redux:  Start
  const rbacData = useSelector((state: any) => state.rbac);
  console.log("rbac user wings", rbacData);
  //End

  const [data, setData] = useState([]);

  //Start

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //End

  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    setOpenupdate(true);
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  const fetchWings = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_wing/`, {
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
    fetchWings();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/mg_wing?wing_name=${name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        message.success("Deleted successFully");
        fetchWings();
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Wing Name", accessor: "wing_name" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      wing_name: row.wing_name,

      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "wingsupdate") ? (
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
            rbacData?.find((element: string) => element === "wingsdelete") ? (
              <IconButton
                onClick={() => {
                  handleDelete(row.wing_name);
                }}
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </MDTypography>
      ),
    })),
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleWingImport = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 });

      // Transform the data to the desired format
      const transformedData = jsonData.map((item: any) => ({ wing_name: item[0] }));

      // Do something with the transformedData
      console.log(transformedData);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_wing`, transformedData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Wings created successfully!");
          fetchWings();
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
              Wings
            </MDTypography>
          </Grid>{" "}
          <Grid item pt={2} pr={2}>
            {rbacData ? (
              rbacData?.find((element: string) => element === "wingscreate") ? (
                <>
                  <MDButton variant="contained" color="info" onClick={handleFileInputClick}>
                    Upload&nbsp;
                    <FileUploadIcon />
                  </MDButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleWingImport}
                    style={{ display: "none" }}
                  />
                  &nbsp; &nbsp; &nbsp;
                  <MDButton variant="outlined" color="info" type="submit" onClick={handleOpen}>
                    + New Wing
                  </MDButton>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}{" "}
          </Grid>
        </Grid>
        <DataTable table={dataTableData} canSearch />
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={fetchWings} maxWidth="sm" />
      </Dialog>

      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={fetchWings} />
      </Dialog>
    </DashboardLayout>
  );
};

export default Wing;
