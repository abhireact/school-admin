import React, { useCallback, useMemo, useRef, useState } from "react";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message, Spin } from "antd";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import DataTable from "examples/Tables/DataTable";
import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import { useReactToPrint } from "react-to-print";

const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");

const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),
});

const FeeRegister = (props: any) => {
  const token = Cookies.get("token");
  const { classes } = useSelector((state: any) => state);
  const { handleShowPage } = props;
  const [data, setData] = useState<StudentFeeData[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      class_name: "",
      academic_year: Cacademic_year,
      section_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      console.log(values, "values");
    },
  });
  const handleAPICall = useCallback(
    async (currentValues: { section_name: unknown; class_name: string; academic_year: string }) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/fee_register`,
          currentValues,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        setShowTable(true);
        handleShowPage();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        message.success("Fetched Data Successfully!");
      }
    },
    [token, handleShowPage]
  );
  const handleSectionChange = useCallback(
    async (value: unknown) => {
      handleChange({ target: { name: "section_name", value } });
      if (value) {
        await handleAPICall({
          ...values,
          section_name: value,
        });
      }
    },
    [handleChange, handleAPICall, values]
  );

  // Define types
  type GrandTotals = {
    amount: number;
    late: number;
    concession: number;
    fine: number;
    discount: number;
    refund: number;
    adjust: number;
    monthlyFee: number;
    monthFee: number;
  };

  type FeeDetail = {
    amount: number;
    late: number;
    concession: number;
    fine: number;
    discount: number;
    refund: number;
    adjust: number;
    "Monthly Fee": number;
    "Month Fee": number;
    date: string;
    payment_mode: string;
    admission_number: string;
  };

  type StudentFeeData = {
    student_name: string;
    guardian_name: string;
    fees: FeeDetail[];
  };

  type RowData = {
    sl_no: number;
    student_name: string;
    guardian_name: string;
    admission_number: string;
    date: string | JSX.Element | string[];
    payment_mode: string | JSX.Element | string[];
    amount: JSX.Element | (string | number)[];
    late: JSX.Element | (string | number)[];
    concession: JSX.Element | (string | number)[];
    fine: JSX.Element | (string | number)[];
    discount: JSX.Element | (string | number)[];
    refund: JSX.Element | (string | number)[];
    adjust: JSX.Element | (string | number)[];
    monthly_fee: JSX.Element | (string | number)[];
    month_fee: JSX.Element | (string | number)[];
  };

  const feeRegisterData = useMemo(() => {
    if (!data) return { columns: [], rows: [], pdfRows: [] };

    // Move the entire content of FeeRegisterdata function here
    // ...
    const columns = [
      { Header: "SL.NO", accessor: "sl_no" },
      { Header: "Student Name", accessor: "student_name" },
      { Header: "Guardian Name", accessor: "guardian_name" },
      { Header: "Admission Number", accessor: "admission_number" },
      { Header: "Date", accessor: "date" },
      { Header: "Payment Mode", accessor: "payment_mode" },
      { Header: "Monthly Fee", accessor: "monthly_fee" },
      { Header: "Month Fee", accessor: "month_fee" },
      { Header: "Late Fee", accessor: "late" },
      { Header: "Concession", accessor: "concession" },
      { Header: "Fine", accessor: "fine" },
      { Header: "Discount", accessor: "discount" },
      { Header: "Refund", accessor: "refund" },
      { Header: "Adjust", accessor: "adjust" },
      { Header: "Amount", accessor: "amount" },
    ];

    let grandTotals: GrandTotals = {
      amount: 0,
      late: 0,
      concession: 0,
      fine: 0,
      discount: 0,
      refund: 0,
      adjust: 0,
      monthlyFee: 0,
      monthFee: 0,
    };

    const createRowData = (
      student: StudentFeeData,
      index: number,
      includeHtml: boolean
    ): RowData => {
      const totals: GrandTotals = {
        amount: student.fees.reduce((sum, fee) => sum + fee.amount, 0),
        late: student.fees.reduce((sum, fee) => sum + fee.late, 0),
        concession: student.fees.reduce((sum, fee) => sum + fee.concession, 0),
        fine: student.fees.reduce((sum, fee) => sum + fee.fine, 0),
        discount: student.fees.reduce((sum, fee) => sum + fee.discount, 0),
        refund: student.fees.reduce((sum, fee) => sum + fee.refund, 0),
        adjust: student.fees.reduce((sum, fee) => sum + fee.adjust, 0),
        monthlyFee: student.fees.reduce((sum, fee) => sum + fee["Monthly Fee"], 0),
        monthFee: student.fees.reduce((sum, fee) => sum + fee["Month Fee"], 0),
      };

      // Update grand totals
      Object.keys(grandTotals).forEach((key) => {
        grandTotals[key as keyof GrandTotals] += totals[key as keyof GrandTotals];
      });

      const formatField = (
        fees: FeeDetail[],
        field: keyof FeeDetail
      ): JSX.Element | (string | number)[] => {
        const values = fees.map((fee) => {
          const value = fee[field];
          return typeof value === "number" ? Number(value.toFixed(2)) : value;
        });

        const total =
          totals[
            field === "Monthly Fee"
              ? "monthlyFee"
              : field === "Month Fee"
              ? "monthFee"
              : (field as keyof GrandTotals)
          ];

        if (includeHtml) {
          return (
            <React.Fragment>
              <ul>
                {values.map((value, i) => (
                  <li key={i}>{value}</li>
                ))}
              </ul>
              <strong>Total: {typeof total === "number" ? total.toFixed(2) : total}</strong>
            </React.Fragment>
          );
        } else {
          return [
            ...values,
            typeof total === "number" ? `Total:${Number(total.toFixed(2))}` : `Total:${total}`,
          ];
        }
      };

      return {
        sl_no: index + 1,
        student_name: student.student_name,
        guardian_name: student.guardian_name,
        admission_number: student.fees[0]?.admission_number || "",
        date: includeHtml ? (
          <ul>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.date}</li>
            ))}
          </ul>
        ) : (
          student.fees.map((fee) => fee.date)
        ),
        payment_mode: includeHtml ? (
          <ul>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.payment_mode}</li>
            ))}
          </ul>
        ) : (
          student.fees.map((fee) => fee.payment_mode)
        ),
        amount: formatField(student.fees, "amount"),
        late: formatField(student.fees, "late"),
        concession: formatField(student.fees, "concession"),
        fine: formatField(student.fees, "fine"),
        discount: formatField(student.fees, "discount"),
        refund: formatField(student.fees, "refund"),
        adjust: formatField(student.fees, "adjust"),
        monthly_fee: formatField(student.fees, "Monthly Fee"),
        month_fee: formatField(student.fees, "Month Fee"),
      };
    };

    const rows: RowData[] = data.map((student, index) => createRowData(student, index, true));
    const pdfRows: RowData[] = data.map((student, index) => createRowData(student, index, false));

    // Add grand total row
    const addGrandTotalRow = (includeHtml: boolean): RowData => {
      const formatGrandTotal = (field: keyof GrandTotals): JSX.Element | (string | number)[] => {
        const value = Number(grandTotals[field].toFixed(2));
        return includeHtml ? <strong>{value}</strong> : [value];
      };

      return {
        sl_no: data.length + 1,
        student_name: "",
        guardian_name: "",
        admission_number: "",
        date: "",
        payment_mode: includeHtml ? <strong>Grand Total:</strong> : ["Grand Total:"],
        amount: formatGrandTotal("amount"),
        late: formatGrandTotal("late"),
        concession: formatGrandTotal("concession"),
        fine: formatGrandTotal("fine"),
        discount: formatGrandTotal("discount"),
        refund: formatGrandTotal("refund"),
        adjust: formatGrandTotal("adjust"),
        monthly_fee: formatGrandTotal("monthlyFee"),
        month_fee: formatGrandTotal("monthFee"),
      };
    };

    rows.push(addGrandTotalRow(true));
    pdfRows.push(addGrandTotalRow(false));

    return { columns, rows, pdfRows };
  }, [data]);
  const tableRef = useRef();
  // const hiddenText = "This text is hidden on the main page but will be visible in the PDF.";
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });
  const dataTableData = useMemo(() => {
    return feeRegisterData
      ? { columns: feeRegisterData.columns, rows: feeRegisterData.rows }
      : { columns: [], rows: [] };
  }, [feeRegisterData]);

  console.log(feeRegisterData, "fee register data");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Spin spinning={isLoading}>
        <form onSubmit={handleSubmit}>
          <Card>
            <MDBox p={3}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    Fee Register Report
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container pt={2}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "academic_year", value } });
                    }}
                    disabled
                    defaultValue={Cacademic_year}
                    options={
                      classes
                        ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        defaultValue="Cacademic_year"
                        name="academic_year"
                        onChange={handleChange}
                        disabled
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
                        name="class"
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
                      handleSectionChange(value);
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
                {/* {feeRegisterData?.pdfRows ? (
                  <>
                    <MDBox ref={tableRef} className="hidden-text">
                      <PdfGenerator
                        data={feeRegisterData?.pdfRows}
                        // hiddenText={hiddenText}
                        isPdfMode={true}
                        hiddenText={""}
                        additionalInfo={undefined}
                      />
                    </MDBox>
                    <MDBox>
                      <MDButton onClick={handlePrint}>Print</MDButton>
                    </MDBox>
                  </>
                ) : null} */}
                {dataTableData && showTable ? (
                  <DataTable
                    table={{
                      columns: feeRegisterData.columns,
                      rows: feeRegisterData.rows,
                      pdfRows: feeRegisterData.pdfRows,
                    }}
                    selectColumnBtn
                    importbtn
                    pdfGeneratorProps={{
                      isPdfMode: false,
                      hiddenText: "",
                      additionalInfo: undefined,
                    }}
                  />
                ) : null}

                <Grid
                  item
                  container
                  xs={12}
                  sm={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Grid item mt={4}>
                    <MDButton
                      color="dark"
                      variant="contained"
                      onClick={() => {
                        history.back();
                      }}
                    >
                      Back
                    </MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </form>
      </Spin>
    </DashboardLayout>
  );
};

export default FeeRegister;
