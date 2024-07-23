import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect, useRef } from "react";
import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import { useReactToPrint } from "react-to-print";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import Icon from "@mui/material/Icon";
import { Grid, Tooltip, Card } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { Popconfirm, message } from "antd";

const StudentAdmission = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [tabledata, setTableData] = useState<{ columns: any[]; rows: any[] }>({
    columns: [],
    rows: [],
  });
  const [allRecieptData, setAllRecieptData] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const capitalizeFirstLetters = (string: any) => {
    if (!string) return string;
    return string
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admissions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
          name: capitalizeFirstLetters(item.name),
          father_name: capitalizeFirstLetters(item.father_name),
          date_of_birth: formatDate(item.date_of_birth),
          academic_year: item.academic_year,
          class_name: item.class_name,
          payment_mode: capitalizeFirstLetters(item.payment_mode),
          status: item.status,
          action: (
            <Grid container spacing={1}>
              <Grid item>
                <Tooltip title="Show" placement="top">
                  <VisibilityIcon fontSize="small" onClick={() => handleShowAdmission(item)} />
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Fee Details" placement="top">
                  <PaidOutlinedIcon
                    fontSize="small"
                    color={item.status === "Pending" ? "inherit" : "disabled"}
                    {...(item.status === "Pending" && {
                      onClick: () => handlePaymentAdmission(item),
                    })}
                  />
                </Tooltip>
              </Grid>
              <Grid item>
                <Popconfirm
                  title="Delete"
                  description="Are you sure you want to delete it? ?"
                  placement="topLeft"
                  onConfirm={() => handleDeleteAdmission(item)}
                  // onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete" placement="top">
                    <Icon fontSize="small">delete</Icon>
                  </Tooltip>
                </Popconfirm>
              </Grid>
              <Grid item>
                <Tooltip
                  title="View Fees"
                  placement="top"
                  onClick={() => {
                    handlePrint(item);
                  }}
                >
                  <FileDownloadIcon fontSize="small" color="secondary" />
                </Tooltip>
              </Grid>
            </Grid>
          ),
        })),
      });
    } catch (error) {
      alert("Error fetching data:");
    }
  };

  const handleShowAdmission = (item: any) => {
    navigate("/pages/admission/show_admission", {
      state: {
        id: item.id,
      },
    });
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
      fetchData();
    } catch (error) {
      alert("Error deleting data:");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableRef = useRef();
  const hiddenText = "This is computer generated fee receipt and no signature required.";
  const handlePrint2 = useReactToPrint({
    content: () => tableRef.current,
  });

  const handlePrint = (item: any) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admissions/fee_receipt`,
        { id: item.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAllRecieptData(response.data);
        if (response.status === 200) {
          const feeRecieptData = {
            columns: [
              { Header: "Particular", accessor: "particular" },
              { Header: "Fee Payable", accessor: "fee_payable" },
              { Header: "Fee Paid", accessor: "fee_paid" },
            ],
            rows: [
              {
                particular: response.data.particular,
                fee_payable: response.data.fee_payable,
                fee_paid: response.data.fee_paid,
              },
            ],
          };
          setPdfData(feeRecieptData);
          setTimeout(() => {
            handlePrint2();
            message.success("Fee Receipt Generated Successfully");
          }, 0);
        }
      })
      .catch((error) => {
      });
  };

  return (
    <DashboardLayout>
      {pdfData !== null ? (
        <>
          <MDBox ref={tableRef} className="hidden-text">
            <PdfGenerator
              data={pdfData.rows}
              hiddenText={hiddenText}
              isPdfMode={true}
              additionalInfo={{
                student_name: allRecieptData.student_name,
                father_name: allRecieptData.father_name,
                course: allRecieptData.course,
                form_no: allRecieptData.form_no,
                admission_date: formatDate(allRecieptData.admission_date),
                receipt_no: allRecieptData.receipt_no,
                paid_at: allRecieptData.paid_at || "N/A",
                transaction_no: allRecieptData.transaction_no || "N/A",
              }}
            />
          </MDBox>
        </>
      ) : null}
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
                  canSearch
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
