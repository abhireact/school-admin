import { useEffect, useRef, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Grid, Tooltip, Autocomplete, Card } from "@mui/material";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useReactToPrint } from "react-to-print";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";

import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import { message } from "antd";
import { commonacademicyear } from "layouts/pages/fee/common_validationschema";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface FeeReceiptInterface {
  columns: { Header: string; accessor: string }[];
  rows: {
    receipt_no: number;
    collection_name: string;
    due_date: string;
    total_amount: number;
    submit_date: string;
    paid_amount: number;
    mod_of_payment: string;
    generate_pdf: any;
  }[];
}
interface Particular {
  particular_name: string;
  amount: number;
  discount: number;
  total: number;
}

interface Collection {
  collection_name: string;
  particulars: Particular[];
}

interface Amounts {
  total: number;
  discount: number;
  concession: number;
  late_fee: number;
  refund: number;
  adjust: number;
  grand_total: number;
}

interface Guardian {
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface StudentData {
  first_name: string;
  middle_name: string;
  last_name: string;
  admission_no: string;
  payment_date: string;
  guardians: Guardian[];
}

interface PaymentDetails {
  mode_of_payment: string;
  paid_at: string;
  date: string;
  cheque_no?: string;
  bank_name?: string;
}

interface AllReceiptData {
  receipt_no: number;
  collections: Collection[];
  amounts: Amounts;
  student_data: StudentData;
  payment_details: PaymentDetails;
}

const token = Cookies.get("token");
const Cacademic_year = Cookies.get("academic_year");
const initialValues = {
  academic_year: Cacademic_year,
  class_name: "",
};
export default function ManageFeeAdmission() {
  const navigate = useNavigate();
  const { classes } = useSelector((state: any) => state);
  const [managedata, setManageFeeData] = useState([]);
  const [allReciptData, setAllRecieptData] = useState<AllReceiptData>();
  const [pdfData, setPdfData] = useState(null);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admissions/manage_admission`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setManageFeeData(response.data);
      }
    } catch (error) {
      setManageFeeData([]);
      message.error("No data for this section");
    }
    setFetchAttempted(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: commonacademicyear,
    enableReinitialize: true,
    onSubmit: async () => {
      fetchData();
    },
  });

  const tableRef = useRef();
  const hiddenText = "This is computer generated fee receipt and no signature required.";
  const handlePrint2 = useReactToPrint({
    content: () => tableRef.current,
  });

  const handlePrint = (receipt_no: number) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/fee_receipts/receipt_no`,
        { receipt_no },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAllRecieptData(response.data);
        if (response.status == 200) {
          const feeRecieptData = {
            columns: [
              { Header: "SL.NO", accessor: "sl_no" },
              { Header: "Collection Name", accessor: "collection_name" },
              { Header: "Amount", accessor: "amount" },
              { Header: "DISCOUNT", accessor: "discount" },
              { Header: "Total", accessor: "total" },
            ],
            rows: response?.data?.collections.map(
              (
                data: {
                  collection_name: any;
                  particulars: any;
                  particular_name: any;
                  last_name: string;
                  amount: any;
                  total: any;
                  discount: any;
                },
                index: any
              ) => ({
                sl_no: index + 1,
                collection_name: data.collection_name,
                particular_name: data.particulars.map(
                  (x: { particular_name: any }) => x.particular_name
                ),
                amount: data.particulars.map((x: { amount: any }) => x.amount),
                total: data.particulars.map((x: { total: any }) => x.total),
                discount: data.particulars.map((x: { discount: any }) => x.discount),
              })
            ),
          };
          setPdfData(feeRecieptData);
          setTimeout(() => {
            handlePrint2();
            message.success("Fee Receipt Generated Successfully");
          }, 0);
        }
      })
      .catch((error) => {
        alert("Error fetching data:");
      });
  };

  const handlePaymentAdmission = (data: any) => {
    navigate("/pages/admission/manage_admission/pay_fee", {
      state: {
        academicYear: values.academic_year,
        className: values.class_name,
        id: data.id,
        name: data.name,
      },
    });
  };

  const manageFeeData = {
    columns: [
      { Header: "Name", accessor: "name" },
      { Header: "DATE OF BIRTH", accessor: "date_of_birth" },
      { Header: "RECEIPT NO.", accessor: "receipt_no" },
      { Header: "STATUS", accessor: "status" },
      { Header: "FORM No.", accessor: "form_no" },
      { Header: "ACTIONS", accessor: "action" },
    ],
    rows: managedata.map((data) => ({
      date_of_birth: formatDate(data.date_of_birth),
      name: data.name,
      status: data.status,
      form_no: data.form_no,
      receipt_no: data.receipt_no,
      action: (
        <Grid container spacing={1}>
          <Grid item>
            {data.status === "No Paid" ? (
              <Tooltip
                title="View Fees"
                placement="top"
                onClick={() => {
                  handlePaymentAdmission(data);
                }}
              >
                <PaidOutlinedIcon fontSize="small" color="inherit" />
              </Tooltip>
            ) : (
              <Tooltip
                title="Fee Receipt"
                placement="top"
                onClick={() => {
                  handlePrint(data.receipt_no);
                }}
              >
                <FileDownloadIcon fontSize="small" color="secondary" />
              </Tooltip>
            )}
          </Grid>
        </Grid>
      ),
    })),
  };

  function formatFullName(firstName: string, middleName: string, lastName: string): string {
    return [firstName, middleName, lastName].filter(Boolean).join(" ");
  }

  function formatStudentDataForPdf(
    studentData: StudentData,
    academicYear: string,
    className: string
  ) {
    const fullName = formatFullName(
      studentData?.first_name,
      studentData?.middle_name,
      studentData?.last_name
    );

    const guardianNames = studentData?.guardians?.map((guardian) =>
      formatFullName(guardian?.first_name, guardian?.middle_name, guardian?.last_name)
    );

    return {
      bill_no: allReciptData?.receipt_no,
      name: fullName,
      father_name: guardianNames?.join(" / "),
      course: className,
      form_no: allReciptData?.receipt_no,
      admission_date: studentData?.payment_date,
      receipt_no: allReciptData?.receipt_no,
      paid_at: studentData?.payment_date,
      transaction_no: allReciptData?.receipt_no,
      academic_year: academicYear,
      class_name: className,
    };
  }

  useEffect(() => {
    // Reset managedata and pdfData when the component mounts
    setManageFeeData([]);
    setPdfData(null);
  }, []);

  useEffect(() => {
    if (allReciptData) {
      const formattedData = formatStudentDataForPdf(
        allReciptData?.student_data,
        values.academic_year,
        values.class_name
      );

      setPdfData({
        rows: manageFeeData.rows,
        ...formattedData,
      });
    }
  }, [allReciptData]);

  return (
    <DashboardLayout>
      {pdfData !== null ? (
        <>
          <MDBox ref={tableRef} className="hidden-text">
            <PdfGenerator
              data={pdfData.rows}
              hiddenText={hiddenText}
              isPdfMode={true}
              additionalInfo={pdfData}
              extraData={{
                leftData: {
                  type: "normal",
                  data: allReciptData?.payment_details,
                },
                rightData: {
                  type: "table",
                  data: allReciptData?.amounts,
                },
              }}
            />
          </MDBox>
        </>
      ) : null}
      <form onSubmit={handleSubmit}>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container px={3} pt={3}>
                <Grid item xs={12} sm={6} mt={2}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Manage Fees
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    defaultValue={Cacademic_year}
                    disabled
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "academic_year", value } });
                    }}
                    options={
                      classes
                        ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        defaultValue={Cacademic_year}
                        name="academic_year"
                        onChange={handleChange}
                        value={values.academic_year}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Academic Year
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "class_name", value } });
                    }}
                    options={
                      values.academic_year !== ""
                        ? classes
                            .filter((item: any) => item.academic_year === values.academic_year)
                            .map((item: any) => item.class_name)
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="class_name"
                        onChange={handleChange}
                        value={values.class_name}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Class
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  ml={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <MDButton color="info" variant="contained" type="submit" onClick={fetchData}>
                    Show Data
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
            {fetchAttempted && managedata.length === 0 ? (
              <MDTypography variant="h6" align="center" p={3}>
                No data available
              </MDTypography>
            ) : (
              managedata.length > 0 && (
                <Card>
                  <DataTable table={manageFeeData} canSearch />
                </Card>
              )
            )}
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
