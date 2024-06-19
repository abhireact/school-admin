import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { useState } from "react";
import DataTable from "examples/Tables/DataTable";
import { TreeSelect } from "antd";
interface FeeConcessionInterface {
  columns: { Header: string; accessor: string }[];
  rows: {
    sl_no: number;
    student_name: string;
    ad_no: string;
    bill_no: string;
    installment: string;
    date: string;
    month_fee: number;
    monthley_fee: number;
    concession: number;
    fine: number;
    discount: number;
    refund: number;
    adjust: number;
    amount: number;
  }[];
}
export default function FeeCollectionByDateReport() {
  const [value, setValue] = useState([]);
  const [feeConcessionReportData, setfeeConcessionReportData] = useState<FeeConcessionInterface>({
    columns: [],
    rows: [],
  });
  const initialValues = {
    academic_year: "",
    mode_of_payment: "",
    deposite_at: "",
    section: "",
    start_date: Date,
    end_date: Date,
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      //   validationSchema: FeeDefaulterSchema,
      enableReinitialize: true,

      onSubmit: async (values, action) => {
        //
        const feeConcessionData = {
          // 			.
          columns: [
            { Header: "SL.NO", accessor: "sl_no" },
            { Header: "STUDENT NAME, CLASS & SECTION", accessor: "student_name" },
            { Header: "AD.NO", accessor: "ad_no" },
            { Header: "BILL NO", accessor: "bill_no" },
            { Header: "INSTALLMENT", accessor: "installment" },
            { Header: "Date", accessor: "date" },
            { Header: "MONTH FEE", accessor: "month_fee" },
            { Header: "MONTHLY FEE", accessor: "monthley_fee" },
            { Header: "CONCESSION", accessor: "concession" },
            { Header: "FINE", accessor: "fine" },
            { Header: "DISCOUNT", accessor: "discount" },
            { Header: "REFUND", accessor: "refund" },
            { Header: "ADJUST", accessor: "adjust" },
            { Header: "AMOUNT", accessor: "amount" },
          ],
          rows: [
            {
              sl_no: 1,
              student_name: "Prabhakar",
              ad_no: "xxxx",
              bill_no: "122333",
              installment: "X-II",
              date: "02/02/2023",
              month_fee: 1200,
              monthley_fee: 2300,
              concession: 1000,
              fine: 100,
              discount: 1000,
              refund: 10,
              adjust: 200,
              amount: 10000,
            },
          ],
        };
        setfeeConcessionReportData(feeConcessionData);
        console.log("submited", values);
      },
    });
  const onChange = (newValue: string[]) => {
    console.log("onChange ", newValue);
    setValue(newValue);
  };
  const tProps = {
    treeData: [
      {
        title: "primary",
        value: "primary",
        key: "1",
      },
      {
        title: "secondary",
        value: "secondary",
        key: "2",
      },
      {
        title: "pre primary",
        value: "pre primary",
        key: "3",
      },
    ],
    value,
    onChange,
    treeCheckable: true,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
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
                      Fee Collection By Date Report
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "academic_year", value } });
                      }}
                      options={["2023-24", "2024-25"]}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="academic_year"
                          onChange={handleChange}
                          value={values.academic_year}
                          label="Academic Year"
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDTypography variant="button">Select Wings</MDTypography>
                    <TreeSelect {...tProps} size="large" />
                  </Grid>
                </Grid>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      required
                      type="date"
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                      name="start_date"
                      sx={{ width: "100%" }}
                      onChange={handleChange}
                      value={values.start_date}
                      label="Start Date"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      required
                      type="date"
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                      name="end_date"
                      sx={{ width: "100%" }}
                      onChange={handleChange}
                      value={values.end_date}
                      label="End Date"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "mode_of_payment", value } });
                      }}
                      options={["By Cash", "By Check"]}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="mode_of_payment"
                          onChange={handleChange}
                          value={values.mode_of_payment}
                          label="Mode of Payment"
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
            {feeConcessionReportData.rows.length > 0 ? (
              <Card>
                <MDBox p={3}>
                  <DataTable
                    table={feeConcessionReportData}
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
