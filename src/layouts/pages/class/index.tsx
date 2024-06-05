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
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Create from "./create";
import Update from "./update";
import ManageSection from "./manage_section";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
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
              <Tooltip title="Delete Class">
                <IconButton
                  onClick={() => {
                    handleDelete(row.class_name);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
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
                        <MDButton
                          variant="outlined"
                          color="info"
                          type="submit"
                          onClick={() => handleShowPage()}
                        >
                          + New Class
                        </MDButton>
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
