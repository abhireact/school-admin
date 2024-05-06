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
import { useMediaQuery } from "@mui/material";
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

  const [rbacData, setRbacData] = useState([]);
  const fetchRbac = async () => {
    try {
      const response = await axios.get(`http://10.0.20.200:8000/mg_rbac_current_user`, {
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
    const main_data = data[index];
    console.log(main_data, "maindata");

    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  const fetchClasses = () => {
    axios
      .get("http://10.0.20.200:8000/mg_class", {
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
    fetchClasses();
  }, []);
  const handleDelete = async (name: any) => {
    try {
      const response = await axios.delete("http://10.0.20.200:8000/mg_class", {
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
    } catch (error: unknown) {
      console.error("Error deleting task:", error);
      const myError = error as Error;
      message.error("An unexpected error occurred");
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
      academic_year: <MDTypography variant="p">{row.academic_year}</MDTypography>,

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

      class_name: <MDTypography variant="p">{row.class_name}</MDTypography>,
      class_code: <MDTypography variant="p">{row.class_code}</MDTypography>,
      wing_name: <MDTypography variant="p">{row.wing_name}</MDTypography>,
    })),
  };
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  const [managepage, setManagepage] = useState(false);
  const [manageSection, setManageSection] = useState([]);
  const handleManagePage = (index: number) => {
    const main_data = data[index];
    console.log(main_data, "manage section data");

    setManagepage(true);
    setManageSection(main_data);
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
              {" "}
              <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                <MDTypography variant="h5" fontWeight="bold" color="secondary">
                  Class
                </MDTypography>
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
              <Dialog open={openupdate} onClose={handleCloseupdate}>
                <Update
                  setOpenupdate={setOpenupdate}
                  editData={editData}
                  fetchData={fetchClasses}
                />
              </Dialog>
              <DataTable table={dataTableData} />
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default Class;
