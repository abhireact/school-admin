import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Icon from "@mui/material/Icon";
import { Grid, Tooltip, Card } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const StudentAdmission = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); 
  };

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
          { Header: "ACADEMIC YEAR ", accessor: "academic_year" },
          { Header: "FATHER NAME", accessor: "father_name" },
          { Header: "STUDENT NAME", accessor: "name" },
          { Header: "DATE OF BIRTH", accessor: "date_of_birth" },
          { Header: "CLASS NAME", accessor: "class_name" },
          { Header: "MODE OF PAYMENT", accessor: "payment_mode" },
          { Header: "STATUS", accessor: "status" },
          { Header: "ACTIONS", accessor: "action" },
        ],
        rows: response.data?.map((item: any) => ({
          name: item.name,
          father_name: item.father_name,
          date_of_birth: formatDate(item.date_of_birth),
          academic_year: item.academic_year,
          class_name: item.class_name,
          payment_mode: item.payment_mode,
          status: item.status,
          action: (
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Edit" placement="top">
                  <EditOutlinedIcon fontSize="small" onClick={() => handleEditAdmission(item)} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Show" placement="top">
                  <VisibilityIcon fontSize="small" onClick={() => handleShowAdmission(item)} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Fee Details" placement="top">
                  <PaidOutlinedIcon
                    fontSize="small"
                    color={item.status === "Success" ? "disabled" : "inherit"}
                    {...(item.status !== "Success" && {
                      onClick: () => handlePaymentAdmission(item),
                    })}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Delete" placement="top" onClick={() => handleDeleteAdmission(item)}>
                  <Icon fontSize="small">delete</Icon>
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

  const handleShowAdmission = async (item: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admissions/retrive`,
        {
          id: item.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/pages/admission/show_admission", {
        state: {
          templateData: response.data,
        },
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleEditAdmission = async (item: any) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admissions/retrive`,
        {
          id: item.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/pages/admission/edit_admission", {
        state: {
          editData: response.data,
        },
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handlePaymentAdmission = (item: any) => {
    navigate("/pages/admission/fee", {
      state: {
        academicYear: item.academic_year,
        className: item.class_name,
        id: item.id,
      },
    });
  };

  const handleDeleteAdmission = async (item: any) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admissions`, {
        data: {
          id: item.id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete response:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
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
