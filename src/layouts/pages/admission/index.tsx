import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import { useState, useEffect } from "react";
import Icon from "@mui/material/Icon";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const StudentAdmission = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admissions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setTableData({
        columns: [
          { Header: "NAME", accessor: "name" },
          { Header: "DATE OF BIRTH", accessor: "date_of_birth" },
          { Header: "ACADEMIC YEAR ", accessor: "academic_year" },
          { Header: "CLASS NAME", accessor: "class_name" },
          { Header: "MODE OF PAYMENT", accessor: "payment_mode" },
          { Header: "STATUS", accessor: "status" },
          { Header: "ACTIONS", accessor: "action" },
        ],
        rows: response.data?.map((item: any) => ({
          name: item.name,
          date_of_birth: item.date_of_birth,
          academic_year: item.academic_year,
          class_name: item.class_name,
          payment_mode: item.payment_mode,
          status: item.status,
          action: (
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Edit" placement="top">
                  <Icon fontSize="small">edit</Icon>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete" placement="top">
                  <Icon fontSize="small">delete</Icon>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Manage Sheadule Concession" placement="top">
                  <FormatListBulletedTwoToneIcon
                    fontSize="small"
                    // onClick={() => handleClickOpenManage(data)}
                  />
                </Tooltip>
              </Grid>
            </Grid>
          ),
        })),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Admission
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={6} mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MDButton
                variant="outlined"
                color="info"
                onClick={() => navigate("/pages/admission/AdmissionForm")}
              >
                + ADD STUDENT
              </MDButton>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            {tabledata.rows.length > 0 ? (
              <MDBox pt={3}>
                <DataTable
                  table={tabledata}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </MDBox>
            ) : null}
          </Grid>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default StudentAdmission;
