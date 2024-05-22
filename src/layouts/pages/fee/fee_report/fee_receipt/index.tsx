import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "examples/Tables/DataTable";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
import { useSelector } from "react-redux";
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
export default function FeeReceiptReport() {
  const [studentdata, setStudentdata] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { classes, student } = useSelector((state: any) => state);
  const [feereceiptReportData, setfeeReceiptReportData] = useState<FeeReceiptInterface>({
    columns: [],
    rows: [],
  });
  const initialValues = {
    academic_year: "",
    class_name: "",
    section_name: "",
    student: "",
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
                    <Tooltip title="Download Pdf" placement="top">
                      <Icon fontSize="medium">
                        <FileDownloadIcon />
                      </Icon>
                    </Tooltip>
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Card>
              <MDBox p={3}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="h4" fontWeight="bold" color="secondary">
                      Fee Receipt Report
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
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

// [
//   {
//     receipt_number: 242568,
//     collection_name: "March Month Fee",
//     due_date: "2024-03-25",
//     total_amount: 9700,
//     submit_date: "2024-03-15",
//     paid_amount: 9700,
//     mode_of_payment: "online_payment",
//   },
//   {
//     receipt_number: 248216,
//     collection_name: "April Month Fee",
//     due_date: "2024-04-10",
//     total_amount: 9700,
//     submit_date: "2024-04-06",
//     paid_amount: 9700,
//     mode_of_payment: "online_payment",
//   },
// ];
