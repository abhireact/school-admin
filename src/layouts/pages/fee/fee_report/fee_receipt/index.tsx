import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete, IconButton } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import React, { useEffect, useMemo, useRef, useState } from "react";
import DataTable from "examples/Tables/DataTable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useReactToPrint } from "react-to-print";
import DeleteIcon from "@mui/icons-material/Delete";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
const token = Cookies.get("token");
import { useSelector } from "react-redux";
import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import StudentCard from "../../fee_collection/student_card";
const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
const { confirm } = Modal;

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
export default function FeeReceiptReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptNo, setReceiptNo] = useState();
  const [studentdata, setStudentdata] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { classes, student } = useSelector((state: any) => state);
  const [pdfData, setPdfData] = useState(null);
  const [allReciptData, setAllRecieptData] = useState<AllReceiptData>();
  const [feereceiptReportData, setfeeReceiptReportData] = useState<FeeReceiptInterface>({
    columns: [],
    rows: [],
  });
  const initialValues = {
    academic_year: Cacademic_year,
    class_name: "",
    section_name: "",
    student: "",
    reason: "",
  };
  const tableRef = useRef();
  const hiddenText = "This is computer generated fee receipt and no signature required.";
  const handlePrint2 = useReactToPrint({
    content: () => tableRef.current,
  });
  const handlePrint = (receipt_no: number) => {
    axios
      .post(
        "http://10.0.20.200:8000/fee_receipts/receipt_no",
        { receipt_no },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response.data);
        setAllRecieptData(response.data);
        if (response.status == 200) {
          const feeRecieptData = {
            columns: [
              { Header: "SL.NO", accessor: "sl_no" },
              { Header: "Collection Name", accessor: "collection_name" },
              // { Header: "Particular Name", accessor: "particular_name" },
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
        console.error("Error fetching data:", error);
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      //   validationSchema: FeeDefaulterSchema,
      enableReinitialize: true,

      onSubmit: async (values, action) => {
        const postvalues = {
          academic_year: values.academic_year,
          class_name: values.class_name,
          section_name: values.section_name,
          student_user_name: values.student.substring(0, values.student.indexOf("-")),
        };
        axios
          .post("http://10.0.20.200:8000/fee_receipts", postvalues, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response.data, "responcedata");
            action.resetForm();
            const feeReceiptData = {
              columns: [
                { Header: "RECEIPT NO", accessor: "receipt_no" },
                { Header: "COLLECTION NAME", accessor: "collection_name" },
                { Header: "DUE DATE", accessor: "due_date" },
                { Header: "TOTAL AMOUNT", accessor: "total_amount" },
                { Header: "SUBMIT DATE", accessor: "submit_date" },
                { Header: "PAID AMOUNT", accessor: "paid_amount" },
                { Header: "MOD OF PAYMENT", accessor: "mod_of_payment" },
                { Header: "GENERATE PDF", accessor: "generate_pdf" },
              ],
              rows: response.data.map(
                (
                  data: {
                    receipt_number: number;
                    collection_name: string;
                    due_date: string;
                    total_amount: number;
                    submit_date: string;
                    paid_amount: number;
                    mode_of_payment: string;
                  },
                  index: any
                ) => ({
                  receipt_no: data.receipt_number,
                  collection_name: data.collection_name,
                  due_date: data.due_date,
                  total_amount: data.total_amount,
                  submit_date: data.submit_date,
                  paid_amount: data.paid_amount,
                  mod_of_payment: data.mode_of_payment,
                  generate_pdf: (
                    <>
                      <Tooltip title="Download reciept" placement="top">
                        <IconButton
                          onClick={() => {
                            handlePrint(data.receipt_number);
                          }}
                        >
                          <FileDownloadIcon fontSize="small" color="secondary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <IconButton onClick={() => showModal(data.receipt_number)}>
                          <DeleteIcon fontSize="small" color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ),
                })
              ),
            };
            setfeeReceiptReportData(feeReceiptData);
            console.log("submited", values);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      },
    });
  console.log(feereceiptReportData, "concession DAtaa");

  // Delete Logic
  const showModal = (receipt_no: any) => {
    setReceiptNo(receipt_no);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(receiptNo, values.reason, "ok");

    axios
      .delete(`http://10.0.20.200:8000/fee_receipts/receipt_no`, {
        data: {
          reason: values.reason,
          receipt_no: receiptNo,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        message.success("Deleted Successfully");
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filteredStudentData = useMemo(() => {
    if (values.academic_year && values.class_name && values.section_name) {
      return student
        .filter(
          (item: any) =>
            item.academic_year === values.academic_year &&
            item.class_name === values.class_name &&
            item.section_name === values.section_name
        )
        .map((item: any) => ({
          title: `${item.first_name} ${item.middle_name} ${item.last_name}`,
          key: item.user_id,
        }));
    }
    return [];
  }, [values.academic_year, values.class_name, values.section_name, student]);
  useEffect(() => {
    setStudentdata(filteredStudentData);
    console.log(filteredStudentData, "Filtered student data");
  }, [filteredStudentData]);
  console.log(pdfData, "pdf data");

  // student Data
  function formatFullName(firstName: string, middleName: string, lastName: string): string {
    return [firstName, middleName, lastName].filter(Boolean).join(" ");
  }

  function formatStudentDataForPdf(studentData: StudentData) {
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
      admission_no: studentData?.admission_no,
      payment_date: studentData?.payment_date,
      guardians: guardianNames?.join(" & "),
    };
  }
  const formattedData = formatStudentDataForPdf(allReciptData?.student_data);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Modal
        title="Are You Sure to Delete this !"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Grid item xs={12} sm={10}>
          <Autocomplete
            onChange={(_event, value) => {
              handleChange({ target: { name: "reason", value } });
            }}
            options={["Invalid Amount", "Invalid Date", "Invalid Cheque/DD number", "Other"]}
            renderInput={(params) => (
              <MDInput
                required
                name="reason"
                onChange={handleChange}
                value={values.reason}
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Select Reason
                  </MDTypography>
                }
                {...params}
                variant="standard"
              />
            )}
          />
        </Grid>
      </Modal>
      {pdfData !== null ? (
        <>
          <MDBox ref={tableRef} className="hidden-text">
            <PdfGenerator
              data={pdfData.rows}
              hiddenText={hiddenText}
              isPdfMode={true}
              additionalInfo={formattedData}
              extraData={{
                leftData: {
                  type: "normal",

                  // ... your left data
                  data: allReciptData?.payment_details,
                },
                rightData: {
                  // ... your right data
                  type: "table",
                  data: allReciptData?.amounts,
                },
              }}
            />
          </MDBox>
        </>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <MDBox p={3}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Fee Reciept Report
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disabled
                      defaultValue={Cacademic_year}
                      // value={values.academic_year || Cacademic_year}
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
                          name="academic_year"
                          onChange={handleChange}
                          value={values.academic_year || Cacademic_year}
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
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "section_name", value } });
                      }}
                      options={
                        values.class_name !== ""
                          ? classes
                              .filter(
                                (item: any) =>
                                  item.academic_year === values.academic_year &&
                                  item.class_name === values.class_name
                              )[0]
                              .section_data.map((item: any) => item.section_name)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="section_name"
                          onChange={handleChange}
                          value={values.section_name}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Section
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
                        handleChange({ target: { name: "student", value } });
                      }}
                      options={
                        values.section_name !== ""
                          ? studentdata.map((item: any) => `${item.key}-${item.title}`)
                          : []
                      }
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="student"
                          onChange={handleChange}
                          value={values.student}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Student
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                  <Grid item ml={2}>
                    <MDButton color="info" variant="contained" type="submit">
                      Show Data
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} pt={2}>
            {feereceiptReportData.rows.length > 0 ? (
              <Card>
                <MDBox p={3}>
                  <DataTable
                    table={feereceiptReportData}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    canSearch
                  />
                </MDBox>
              </Card>
            ) : null}
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
}
