import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { IconButton, Tooltip } from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Create from "./create";
import Update from "./update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Card } from "@mui/material";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { Popconfirm, Table } from "antd";

const token = Cookies.get("token");

interface Employee {
  user_name: string;
  name: string;
  is_selected: boolean;
}

interface AcademicYearData {
  academic_year: string;
  start_date: string;
  end_date: string;
}

const Academic = () => {
  const [rbacData, setRbacData] = useState<string[]>([]);
  const [data, setData] = useState<AcademicYearData[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = () => {
    setIsExporting(true);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${"academic_year"}.xlsx`, { bookType: "xlsx", type: "binary" });

    setIsExporting(false);
    console.log("export excel data", data);
  };
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<AcademicYearData | null>(null);
  const [openupdate, setOpenupdate] = useState(false);

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
  }, []);

  const FetchAcademicYear = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
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
    FetchAcademicYear();
  }, []);

  const handleDelete = async (academicYear: string) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, {
        data: { academic_year: academicYear },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successfully");
        const updatedData = data.filter((row) => row.academic_year !== academicYear);
        setData(updatedData);
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      message.error(error.response.data.detail);
    }
  };

  const dataTableData = {
    columns: [
      { Header: "Academic Year", accessor: "academic_year" },
      { Header: "Start Date", accessor: "start_date" },
      { Header: "End Date", accessor: "end_date" },
      { Header: "Action", accessor: "action" },
    ],
    rows: data.map((row, index) => ({
      academic_year: row.academic_year,
      start_date: row.start_date,
      end_date: row.end_date,
      action: (
        <MDTypography variant="p">
          {rbacData.includes("academicupdate") && (
            <IconButton onClick={() => handleOpenupdate(index)}>
              <CreateRoundedIcon />
            </IconButton>
          )}
          {rbacData.includes("academicdelete") && (
            <IconButton>
              <Popconfirm
                title="Delete"
                description="Are you sure you want to delete it? ?"
                placement="topLeft"
                onConfirm={() => handleDelete(row.academic_year)} // Pass index to confirm function
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Delete" placement="top">
                  <DeleteIcon />
                </Tooltip>
              </Popconfirm>
            </IconButton>
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

  const handleAcademicYearImport = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      const transformedData: AcademicYearData[] = jsonData.map((item: any) => ({
        academic_year: item[0],
        start_date: XLSX.SSF.format("yyyy-mm-dd", item[1]),
        end_date: XLSX.SSF.format("yyyy-mm-dd", item[2]),
      }));

      console.log(transformedData, "json data from academic year excel ");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_accademic_year`, transformedData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Academic years created successfully!");
          FetchAcademicYear();
        })
        .catch((error: any) => {
          message.error(error.response.data.detail);
        });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenupdate = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "maindata");
    setEditData(main_data);
    setOpenupdate(true);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item pt={2} pl={2}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Academic Year
            </MDTypography>
          </Grid>
          <Grid item pt={2} pr={2}>
            {rbacData.includes("academiccreate") && (
              <>
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
                  onChange={handleAcademicYearImport}
                  style={{ display: "none" }}
                />
                &nbsp; &nbsp; &nbsp;
                <MDButton variant="outlined" color="info" type="submit" onClick={handleOpen}>
                  + New Academic Year
                </MDButton>
              </>
            )}
          </Grid>
        </Grid>
        <DataTable table={dataTableData} canSearch />
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <Create setOpen={setOpen} fetchData={FetchAcademicYear} maxWidth="xl" />
      </Dialog>
      <Dialog open={openupdate} onClose={handleCloseupdate}>
        <Update setOpenupdate={setOpenupdate} editData={editData} fetchData={FetchAcademicYear} />
      </Dialog>
    </DashboardLayout>
  );
};

export default Academic;
