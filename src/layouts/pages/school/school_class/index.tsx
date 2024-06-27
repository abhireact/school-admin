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
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Create from "./create";
import Update from "./update";
import ManageSection from "./manage_section";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import * as XLSX from "xlsx";
const token = Cookies.get("token");

const Class = () => {
  // To fetch rbac from redux:  Start
  // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
  // console.log("rbac user", rbacData);
  //End

  // Fetch rbac  Date from useEffect: Start
  console.log(process.env.baseURL, "environment variable");

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
    function transformData(data: any) {
      const result: any[] = [];

      data.forEach((item: any) => {
        const { academic_year, wing_name, class_name, class_code, section_data } = item;

        section_data.forEach((section: any) => {
          const { section_name, start_date, end_date } = section;
          const formattedStartDate = start_date.split(" ")[0];
          const formattedEndDate = end_date.split(" ")[0];

          result.push({
            academic_year,
            wing_name,
            class_name,
            class_code,
            section_name,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
          });
        });
      });

      return result;
    }
    const modifiedData = transformData(data);
    const worksheet = XLSX.utils.json_to_sheet(modifiedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${"class"}.xlsx`, { bookType: "xlsx", type: "binary" });

    setIsExporting(false);
    console.log("export excel data", modifiedData);
  };

  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    console.log(data[index], "maindata");

    setOpenupdate(true);
    setEditData(data[index]);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End

  const [managepage, setManagepage] = useState(false);

  const [manageSection, setManageSection] = useState([]);
  const [indexnumber, setIndexnumber] = useState(0);

  const handleManagePage = (index: number) => {
    setIndexnumber(index);
    setManageSection(data[index]);
    console.log("manage section data", data[index]);
    setManagepage(true);
  };

  const fetchClasses = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        if (managepage) {
          setManageSection(response.data[indexnumber]);
          console.log("successfull section change", data[indexnumber]);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchClasses();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mg_class`, {
        data: { class_name: name },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        message.success("Deleted successFully");
        // Filter out the deleted user from the data
        const updatedData = data.filter((row) => row.username !== name);
        setData(updatedData); // Update the state with the new data
      }
    } catch (error: any) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error(error.response.data.detail);
    }
  };
  const dataTableData = {
    columns: [
      { Header: "Class", accessor: "class_name" },
      { Header: "Wings", accessor: "wing_name" },
      { Header: "Code", accessor: "class_code" },
      { Header: "Academic Year", accessor: "academic_year" },

      { Header: "Action", accessor: "action" },
    ],

    rows: data.map((row, index) => ({
      academic_year: row.academic_year,

      action: (
        <MDTypography variant="p">
          {rbacData ? (
            rbacData?.find((element: string) => element === "classupdate") ? (
              <>
                {" "}
                <Tooltip title="Edit Class">
                  <IconButton
                    onClick={() => {
                      handleOpenupdate(index);
                    }}
                  >
                    <CreateRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Manage Section">
                  <IconButton onClick={() => handleManagePage(index)}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {rbacData ? (
            rbacData?.find((element: string) => element === "classdelete") ? (
              <IconButton>
                <Popconfirm
                  title="Delete"
                  description="Are you sure to Delete it ?"
                  placement="topLeft"
                  onConfirm={() => handleDelete(row.class_name)} // Pass index to confirm function
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

      class_name: row.class_name,
      class_code: row.class_code,
      wing_name: row.wing_name,
    })),
  };
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  interface SessionData {
    academic_year: string;
    wing_name: string;
    class_name: string;
    class_code: string;

    section_name: string;
    start_date: string;
    end_date: string;
    index: 0;
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleClassExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        academic_year: item[0],
        wing_name: item[1],
        class_name: item[2],
        class_code: item[3],

        section_name: item[4],
        start_date: XLSX.SSF.format("yyyy-mm-dd", item[5]),
        end_date: XLSX.SSF.format("yyyy-mm-dd", item[6]),
        index: 0,
      }));

      // Do something with the transformedData
      console.log(transformedData, "json data from class excel ");
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/mg_class/bulk_upload`, transformedData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          message.success("Classes created successfully!");

          fetchClasses();
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

      {showpage ? (
        <Create handleShowPage={handleShowPage} fetchData={fetchClasses} />
      ) : (
        <>
          {managepage ? (
            <ManageSection
              handleManagePage={setManagepage}
              fetchData={fetchClasses}
              editData={manageSection}
            />
          ) : (
            <>
              <Card>
                <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Grid item pt={2} pl={2}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Class
                    </MDTypography>
                  </Grid>
                  <Grid item pt={2} pr={2}>
                    {rbacData ? (
                      rbacData?.find((element: string) => element === "classcreate") ? (
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
                            onChange={handleClassExcel}
                            style={{ display: "none" }}
                          />
                          &nbsp; &nbsp; &nbsp;
                          <MDButton
                            variant="outlined"
                            color="info"
                            type="submit"
                            onClick={handleShowPage}
                          >
                            + New Class
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
              <Dialog open={openupdate} onClose={handleCloseupdate}>
                <Update
                  setOpenupdate={setOpenupdate}
                  editData={editData}
                  fetchData={fetchClasses}
                />
              </Dialog>
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default Class;
