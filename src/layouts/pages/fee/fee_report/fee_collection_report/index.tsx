import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import { Spin, TreeSelect, message } from "antd";
import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useSelector } from "react-redux";
import {
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Autocomplete,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController } from "context";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useReactToPrint } from "react-to-print";
import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
interface FormValues {
  name: string;
  start_date: string;
  date: string;
  end_date: string;
  month: string;
  mode_of_payment: string;
  deposite_at: string;
  based_on: string;
}

interface Totals {
  [key: string]: number;
}
interface RowData {
  [key: string]: any;
  sl_no: number | string;
  monthley_fee?: number;
  concession?: number;
  fine?: number;
  discount?: number;
  refund?: number;
  adjust?: number;
  amount?: number;
}
const validationSchema = Yup.object().shape({});

const FeeCollectionReport = () => {
  const [controller] = useMaterialUIController();
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const { wings, academicyear, student } = useSelector((state: any) => state);
  console.log(wings, academicyear, student, "redux Data");
  let today = new Date().toISOString().split("T")[0];
  const currentMonthFormatted = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  const Cacademic_year = Cookies.get("academic_year");
  console.log(Cacademic_year, "Cacademic_year");
  const [collectionData, setCollectionData] = useState([]);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik<FormValues>({
      initialValues: {
        name: "",
        start_date: today,
        date: today,
        end_date: today,
        month: currentMonthFormatted,
        mode_of_payment: "",
        deposite_at: "All",
        based_on: "Daily",
      },
      validationSchema: validationSchema,
      onSubmit: async (values, action) => {
        console.log(values, "values");
        const MstartDate = values.month ? `${values.month}-01` : "";
        const MendDate = values.month
          ? (() => {
              const year = parseInt(values.month.split("-")[0]);
              const month = parseInt(values.month.split("-")[1]);
              const nextMonth = new Date(year, month, 1);
              nextMonth.setDate(nextMonth.getDate());
              return nextMonth.toISOString().split("T")[0];
            })()
          : "";

        const formvalue = {
          academic_year: Cacademic_year,
          start_date:
            values.based_on == "Daily"
              ? values.date
              : values.based_on == "Monthly"
              ? MstartDate
              : values.start_date,
          end_date:
            values.based_on == "Daily"
              ? values.date
              : values.based_on == "Monthly"
              ? MendDate
              : values.end_date,
          payment_mode: values.mode_of_payment,
          collected_at: values.deposite_at,
        };

        setIsLoading(true);

        try {
          const response = await axios.post(
            "http://10.0.20.200:8000/fee_receipts/fee_collection_list",
            formvalue,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          message.success("Fetched Data Successfully!");
          setCollectionData(response.data);
          action.resetForm();
        } catch (error) {
          console.error("Error fetching data:", error);
          message.error("Error on fetching data!");
        } finally {
          setIsLoading(false);
        }
      },
    });

  console.log(student, "student data");
  console.log(values, "value");

  const getColumnsWithData = (data: RowData[]) => {
    if (data.length === 0) return [];

    const columns = [
      { Header: "SL.NO", accessor: "sl_no" },
      { Header: "STUDENT NAME", accessor: "student_name" },
      { Header: "CLASS & SECTION", accessor: "class" },
      { Header: "ADM.NO", accessor: "adm_no" },
      { Header: "TRANSACTION NO", accessor: "transaction_no" },
      { Header: "Cheque NO", accessor: "cheque_no" },
      { Header: "Cheque Date", accessor: "cheque_date" },
      { Header: "Draft NO", accessor: "draft_no" },
      { Header: "Bank", accessor: "bank" },
      { Header: "INSTALLMENT", accessor: "installment" },
      { Header: "MONTHLY FEE", accessor: "monthley_fee" },
      { Header: "CONCESSION", accessor: "concession" },
      { Header: "FINE", accessor: "fine" },
      { Header: "DISCOUNT", accessor: "discount" },
      { Header: "REFUND", accessor: "refund" },
      { Header: "ADJUST", accessor: "adjust" },
      { Header: "AMOUNT", accessor: "amount" },
    ];

    return columns.filter((column) =>
      data.some(
        (row) =>
          row[column.accessor as keyof RowData] !== undefined &&
          row[column.accessor as keyof RowData] !== null &&
          row[column.accessor as keyof RowData] !== ""
      )
    );
  };
  const rows: RowData[] = collectionData.map((row, index) => ({
    sl_no: index + 1,
    adm_no: row.admission_number,
    student_name: row.student_name,
    class: `${row.class_name}-${row.section_name}`,
    transaction_no: row.tranx_num,
    installment: row.installment,
    monthley_fee: row["Monthly Fee"],
    concession: row.concession,
    fine: row.fine,
    discount: row.discount,
    refund: row.refund,
    adjust: row.adjust,
    amount: row.amount,
    cheque_no: row.cheque_number,
    cheque_date: row.date_of_cheque,
    draft_no: row.draft_number,
    bank: row.bankname_and_branch,
  }));

  const columns = getColumnsWithData(rows);

  const dataTableData = {
    columns: columns,
    rows: rows,
  };

  const totals = dataTableData.rows.reduce((acc: Totals, row: RowData) => {
    columns.forEach((column) => {
      const accessor = column.accessor as string;
      if (
        ["monthley_fee", "concession", "fine", "discount", "refund", "adjust", "amount"].includes(
          accessor
        )
      ) {
        acc[accessor] = (acc[accessor] || 0) + (parseFloat(row[accessor] as string) || 0);
      }
    });
    return acc;
  }, {} as Totals);

  // Round the totals to two decimal places
  Object.keys(totals).forEach((key) => {
    totals[key] = Number(totals[key].toFixed(2));
  });
  const totalRow: RowData = {
    sl_no: "Total",
  };

  columns.forEach((column) => {
    const accessor = column.accessor as string;
    if (
      ["monthley_fee", "concession", "fine", "discount", "refund", "adjust", "amount"].includes(
        accessor
      )
    ) {
      totalRow[accessor] = totals[accessor];
    } else if (accessor !== "sl_no") {
      totalRow[accessor] = ""; // Empty string for non-total fields
    }
  });

  dataTableData.rows.push(totalRow);

  const cleanDataForPdf = (data: { columns: any[]; rows: RowData[] }) => {
    // Get the accessors of columns that have data
    const validAccessors = data.columns.map((col) => col.accessor);

    // Clean rows
    const cleanedRows = data.rows.map((row, index) => {
      const cleanRow: RowData = { sl_no: row.sl_no };

      if (index === data.rows.length - 1) {
        // This is the total row
        validAccessors.forEach((accessor) => {
          if (accessor === "sl_no") {
            cleanRow[accessor] = "Total";
          } else if (
            [
              "monthley_fee",
              "concession",
              "fine",
              "discount",
              "refund",
              "adjust",
              "amount",
            ].includes(accessor)
          ) {
            cleanRow[accessor] = row[accessor];
          } else {
            cleanRow[accessor] = ""; // Empty string for non-total fields
          }
        });
      } else {
        // Regular rows
        validAccessors.forEach((accessor) => {
          if (row[accessor] !== undefined && row[accessor] !== null && row[accessor] !== "") {
            cleanRow[accessor] = row[accessor];
          }
        });
      }
      return cleanRow;
    });

    // Clean columns
    const cleanedColumns = data.columns.filter((col) =>
      cleanedRows.some((row) => row[col.accessor] !== undefined)
    );

    return { columns: cleanedColumns, rows: cleanedRows };
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <Spin spinning={isLoading}>
          <form onSubmit={handleSubmit}>
            {" "}
            <Grid container p={2}>
              <Grid item xs={12} sm={6}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Fee Collection Report
                </MDTypography>
              </Grid>
            </Grid>
            <MDBox p={3}>
              <Grid container>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} py={1} display="flex" justifyContent="flex-center">
                    <FormControl>
                      <MDTypography
                        variant="h5"
                        fontWeight="bold"
                        color="secondary"
                        // sx={{ marginLeft: "20px" }}
                      >
                        Based On:
                      </MDTypography>

                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        name="based_on"
                        defaultValue="Daily"
                        value={values.based_on}
                        onChange={(e) => {
                          handleChange(e);
                          // Clear fields when changing radio button
                          setFieldValue("name", "");
                          setFieldValue("start_date", "");
                          setFieldValue("end_date", "");
                          setFieldValue("date", "");
                          setFieldValue("month", "");
                          setFieldValue("deposite_at", "");
                          setFieldValue("mode_of_payment", "");
                        }}
                      >
                        <FormControlLabel
                          //   value="female"
                          control={
                            <Radio
                              // checked={values.based_on.includes("Daily")}
                              onChange={handleChange}
                              name="based_on"
                              value="Daily"
                            />
                          }
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Daily{" "}
                            </MDTypography>
                          }
                        />
                        <FormControlLabel
                          // value="male"
                          control={
                            <Radio
                              // checked={values.based_on.includes("Addmission No")}
                              onChange={handleChange}
                              name="based_on"
                              value="Monthly"
                            />
                          }
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Monthly{" "}
                            </MDTypography>
                          }
                        />
                        <FormControlLabel
                          // value="male"
                          control={
                            <Radio
                              // checked={values.based_on.includes("Addmission No")}
                              onChange={handleChange}
                              name="based_on"
                              value="Date"
                            />
                          }
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Date{" "}
                            </MDTypography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {values.based_on == "Daily" ? (
                    <Grid item xs={12} sm={3}>
                      <MDInput
                        type="date"
                        sx={{ width: "100%" }}
                        InputLabelProps={{ shrink: true }}
                        onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
                        name="date"
                        onChange={handleChange}
                        value={values.date}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Select Date
                          </MDTypography>
                        }
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.date && Boolean(errors.date)}
                        helperText={touched.date && errors.date}
                      />
                    </Grid>
                  ) : values.based_on == "Monthly" ? (
                    <Grid item xs={12} sm={3}>
                      <MDInput
                        type="month"
                        onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: "100%" }}
                        variant="standard"
                        name="month"
                        value={values.month}
                        inputProps={{
                          min: "2024-04", // This sets the minimum to January 2000
                        }}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Select Month
                          </MDTypography>
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.month && Boolean(errors.month)}
                        helperText={touched.month && errors.month}
                      />
                    </Grid>
                  ) : (
                    <>
                      <Grid item xs={12} sm={3}>
                        <MDInput
                          type="date"
                          onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                          InputLabelProps={{ shrink: true }}
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="start_date"
                          value={values.start_date}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Start Date
                            </MDTypography>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.start_date && Boolean(errors.start_date)}
                          helperText={touched.start_date && errors.start_date}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <MDInput
                          type="date"
                          onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                          InputLabelProps={{ shrink: true }}
                          sx={{ width: "100%" }}
                          variant="standard"
                          name="end_date"
                          value={values.end_date}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              End Date
                            </MDTypography>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputProps={{ min: values.start_date }}
                          error={touched.end_date && Boolean(errors.end_date)}
                          helperText={touched.end_date && errors.end_date}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "mode_of_payment", value } });
                      }}
                      value={values.mode_of_payment}
                      options={[
                        "By Cash",
                        "By Cheque",
                        "Online Payment",
                        "By Draft",
                        "By Pos",
                        "By Neft",
                      ]}
                      renderInput={(params) => (
                        <MDInput
                          name="mode_of_payment"
                          onChange={handleChange}
                          value={values.mode_of_payment}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Mode of Payment
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "deposite_at", value } });
                      }}
                      value={values.deposite_at}
                      options={["All", "School", "Online"]}
                      renderInput={(params) => (
                        <MDInput
                          name="deposite_at"
                          onChange={handleChange}
                          value={values.deposite_at}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Deposited At
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                <Grid item ml={2}>
                  <MDButton color="info" variant="contained" type="submit">
                    Show Data
                  </MDButton>
                </Grid>
              </Grid>
              {/* {collectionData.length > 0 ? (
                <MDBox>
                  <MDButton onClick={handlePrint}>Print</MDButton>
                </MDBox>
              ) : null} */}
              {collectionData.length > 0 ? (
                <Grid container mt={2}>
                  {/* <MDBox ref={tableRef} className="hidden-text">
                    <PdfGenerator
                      data={cleanDataForPdf(dataTableData).rows}
                      isPdfMode={true}
                      hiddenText={""}
                      additionalInfo={undefined}
                    />
                  </MDBox> */}
                  <DataTable
                    table={dataTableData}
                    isSorted={false}
                    canSearch
                    selectColumnBtn
                    importbtn
                    pdfGeneratorProps={{
                      isPdfMode: true,
                      hiddenText: "",
                      additionalInfo: undefined,
                    }}
                  />
                </Grid>
              ) : null}
            </MDBox>
          </form>
        </Spin>
      </Card>
    </DashboardLayout>
  );
};

export default FeeCollectionReport;
