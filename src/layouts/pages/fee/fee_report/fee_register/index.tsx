import React, { useState } from "react";
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

const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");

const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),
});
interface FeeDetail {
  student_name: string;
  academic_year: string;
  wing_name: string;
  class_name: string;
  section_name: string;
  admission_number: string;
  tranx_num: string | null;
  date_of_cheque: string | null;
  date_of_draft: string | null;
  cheque_number: string | null;
  draft_number: string | null;
  bankname_and_branch: string;
  collected_at: string;
  payment_mode: string;
  installment: string;
  date: string;
  concession: number;
  fine: number;
  late: number;
  discount: number;
  refund: number;
  adjust: number;
  amount: number;
  "Month Fee": number;
  "Monthly Fee": number;
}
interface TableRow {
  sl_no: number;
  student_name: string;
  guardian_name: string;
  admission_number: string;
  date: React.ReactNode;
  payment_mode: React.ReactNode;
  amount: React.ReactNode;
  late: React.ReactNode;
  concession: React.ReactNode;
  fine: React.ReactNode;
  discount: React.ReactNode;
  refund: React.ReactNode;
  adjust: React.ReactNode;
  monthly_fee: React.ReactNode;
  month_fee: React.ReactNode;
}
interface StudentFeeData {
  student_name: string;
  guardian_name: string;
  is_archive: number;
  fees: FeeDetail[];
}
const FeeRegister = (props: any) => {
  const token = Cookies.get("token");
  const { classes } = useSelector((state: any) => state);
  const { handleShowPage } = props;
  const [data, setData] = useState<StudentFeeData[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSectionChange = async (value: unknown) => {
    handleChange({ target: { name: "section_name", value } });
    if (value) {
      await handleAPICall({
        ...values,
        section_name: value,
      });
    }
  };

  const handleAPICall = async (currentValues: {
    section_name: unknown;
    class_name: string;
    academic_year: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://10.0.20.200:8000/fee_register`, currentValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      handleShowPage();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      message.success("Fetched Data Successfully!");
    }
  };
  const FeeRegisterdata = () => {
    if (!data) return { columns: [], rows: [] };

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

      // { Header: "Total", accessor: "total" },
    ];

    let grandTotalAmount = 0;
    let grandTotalLateFee = 0;
    let grandTotalConcession = 0;
    let grandTotalFine = 0;
    let grandTotalDiscount = 0;
    let grandTotalRefund = 0;
    let grandTotalAdjust = 0;
    let grandTotalMonthlyFee = 0;
    let grandTotalMonthFee = 0;
    let grandTotal = 0;

    const rows: TableRow[] = data.map((student: StudentFeeData, index: number) => {
      const studentTotalAmount = student.fees.reduce((sum, fee) => sum + fee.amount, 0);
      const studentTotalLateFee = student.fees.reduce((sum, fee) => sum + fee.late, 0);
      const studentTotalConcession = student.fees.reduce((sum, fee) => sum + fee.concession, 0);
      const studentTotalFine = student.fees.reduce((sum, fee) => sum + fee.fine, 0);
      const studentTotalDiscount = student.fees.reduce((sum, fee) => sum + fee.discount, 0);
      const studentTotalRefund = student.fees.reduce((sum, fee) => sum + fee.refund, 0);
      const studentTotalAdjust = student.fees.reduce((sum, fee) => sum + fee.adjust, 0);
      const studentTotalMonthlyFee = student.fees.reduce((sum, fee) => sum + fee["Monthly Fee"], 0);
      const studentTotalMonthFee = student.fees.reduce((sum, fee) => sum + fee["Month Fee"], 0);
      // const studentTotal =
      //   studentTotalAmount +
      //   studentTotalLateFee +
      //   studentTotalFine -
      //   studentTotalConcession -
      //   studentTotalDiscount -
      //   studentTotalRefund +
      //   studentTotalAdjust;

      grandTotalAmount += studentTotalAmount;
      grandTotalLateFee += studentTotalLateFee;
      grandTotalConcession += studentTotalConcession;
      grandTotalFine += studentTotalFine;
      grandTotalDiscount += studentTotalDiscount;
      grandTotalRefund += studentTotalRefund;
      grandTotalAdjust += studentTotalAdjust;
      grandTotalMonthlyFee += studentTotalMonthlyFee;
      grandTotalMonthFee += studentTotalMonthFee;
      // grandTotal += studentTotal;

      return {
        sl_no: index + 1,
        student_name: student.student_name,
        guardian_name: student.guardian_name,
        admission_number: student.fees[0]?.admission_number || "",
        date: student.fees.map((fee, i) => <li key={i}>{fee.date}</li>),
        payment_mode: student.fees.map((fee, i) => <li key={i}>{fee.payment_mode}</li>),
        amount: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.amount.toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalAmount.toFixed(2)}</strong>
          </>
        ),
        late: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.late.toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalLateFee.toFixed(2)}</strong>
          </>
        ),
        concession: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.concession.toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalConcession.toFixed(2)}</strong>
          </>
        ),
        fine: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.fine.toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalFine.toFixed(2)}</strong>
          </>
        ),
        discount: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.discount.toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalDiscount.toFixed(2)}</strong>
          </>
        ),
        refund: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.refund.toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalRefund.toFixed(2)}</strong>
          </>
        ),
        adjust: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee.adjust.toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalAdjust.toFixed(2)}</strong>
          </>
        ),
        monthly_fee: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee["Monthly Fee"].toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalMonthlyFee.toFixed(2)}</strong>
          </>
        ),
        month_fee: (
          <>
            {student.fees.map((fee, i) => (
              <li key={i}>{fee["Month Fee"].toFixed(2)}</li>
            ))}
            <strong>Total: {studentTotalMonthFee.toFixed(2)}</strong>
          </>
        ),
        // total: (
        //   <>
        //     {student.fees.map((fee, i) => (
        //       <li key={i}>
        //         {(
        //           fee.amount +
        //           fee.late +
        //           fee.fine -
        //           fee.concession -
        //           fee.discount -
        //           fee.refund +
        //           fee.adjust
        //         ).toFixed(2)}
        //       </li>
        //     ))}
        //     <strong>Total: {studentTotal.toFixed(2)}</strong>
        //   </>
        // ),
      };
    });

    // Add a grand total row
    rows.push({
      sl_no: data.length + 1,
      student_name: "",
      guardian_name: "",
      admission_number: "",
      date: "",
      payment_mode: <strong>Grand Total:</strong>,
      amount: <strong>{grandTotalAmount.toFixed(2)}</strong>,
      late: <strong>{grandTotalLateFee.toFixed(2)}</strong>,
      concession: <strong>{grandTotalConcession.toFixed(2)}</strong>,
      fine: <strong>{grandTotalFine.toFixed(2)}</strong>,
      discount: <strong>{grandTotalDiscount.toFixed(2)}</strong>,
      refund: <strong>{grandTotalRefund.toFixed(2)}</strong>,
      adjust: <strong>{grandTotalAdjust.toFixed(2)}</strong>,
      monthly_fee: <strong>{grandTotalMonthlyFee.toFixed(2)}</strong>,
      month_fee: <strong>{grandTotalMonthFee.toFixed(2)}</strong>,
      // total: <strong>{grandTotal.toFixed(2)}</strong>,
    });

    return { columns, rows };
  };

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

                <DataTable table={FeeRegisterdata()} />
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
                        handleShowPage();
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
