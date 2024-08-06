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
import Update from "./form";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import { Card, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const token = Cookies.get("token");
const ScholasticParticular = () => {
  const navigate = useNavigate();
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

  //Update Dialog Box Start
  const [editData, setEditData] = useState(null);
  const [openupdate, setOpenupdate] = useState(false);

  const handleOpenupdate = (index: number) => {
    // const main_data = data[index];
    const main_data = {
      name: "asss",
      best_of_count: 20,
      calculation: "pejsss",
      academic_year: "2024-2025",
      description: "asdfg",
      weightage: 20,
      index: 1,
    };
    setOpenupdate(true);
    setEditData(main_data);
  };

  const handleCloseupdate = () => {
    setOpenupdate(false);
  }; //End
  const fetchParticulars = () => {
    axios
      .get("http://10.0.20.200:8000/schol_particular", {
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
    fetchParticulars();
  }, []);

  const dataTableData = {
    columns: [
      { Header: "Name", accessor: "name" },
      { Header: "Weightage", accessor: "weightage" },
      { Header: "Academic Year", accessor: "academic_year" },
      ,
      { Header: "Best of Count", accessor: "best_of_count" },
      { Header: "Action", accessor: "action" },
    ],

    // rows: data.map((row, index) => ({
    //   action: (
    //     <MDTypography variant="p">
    //       {rbacData ? (
    //         rbacData?.find((element: string) => element === "scholastic_particularupdate") ? (
    //           <IconButton
    //             onClick={() => {
    //               handleOpenupdate(index);
    //             }}
    //           >
    //             <CreateRoundedIcon />
    //           </IconButton>
    //         ) : (
    //           ""
    //         )
    //       ) : (
    //         ""
    //       )}
    //     </MDTypography>
    //   ),
    //   weightage: <MDTypography variant="p">{row.weightage}</MDTypography>,
    //   name: <MDTypography variant="p">{row.name}</MDTypography>,

    //   academic_year: <MDTypography variant="p">{row.academic_year}</MDTypography>,

    //   best_of_count: <MDTypography variant="p">{row.best_of_count}</MDTypography>,
    // })),
    rows: [
      {
        action: (
          <MDTypography variant="p">
            {rbacData ? (
              rbacData?.find((element: string) => element === "scholastic_particularupdate") ? (
                <IconButton onClick={() => handleOpenupdate(1)}>
                  <CreateRoundedIcon />
                </IconButton>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </MDTypography>
        ),
        weightage: "20",
        name: "lll",
        academic_year: "002",
        best_of_count: "0",
      },
    ],
  };
  const [showpage, setShowpage] = useState(false);
  const handleShowPage = () => {
    setShowpage(!showpage);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Dialog open={openupdate} onClose={handleCloseupdate} maxWidth="lg">
        <Update setOpenupdate={setOpenupdate} editData={editData} />
      </Dialog>
      <Card>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={6}>
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Scholastic Particulars
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            {rbacData ? (
              rbacData?.find((element: string) => element === "scholastic_particularcreate") ? (
                <MDButton
                  variant="outlined"
                  color="info"
                  type="submit"
                  onClick={() => navigate("/Examination/scholastic_perticular_create")}
                >
                  + New Particular
                </MDButton>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <DataTable table={dataTableData} />
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
};

export default ScholasticParticular;
