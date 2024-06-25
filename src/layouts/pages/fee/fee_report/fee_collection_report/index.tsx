import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import { TreeSelect, message } from "antd";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Autocomplete } from "@mui/material";
import * as Yup from "yup";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController } from "context";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
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
const validationSchema = Yup.object().shape({
  name: Yup.string(),
  start_date: Yup.string(),
  date: Yup.string(),
  end_date: Yup.string(),
  month: Yup.string(),
  mode_of_payment: Yup.string(),
  deposite_at: Yup.string(),
  based_on: Yup.string(),
  // Add any additional validation rules as needed
});

const FeeCollectionReport = (props: any) => {
  const [controller] = useMaterialUIController();

  const token = Cookies.get("token");
  const { handleShowPage, setData } = props;
  const { wings, academicyear, classes, student } = useSelector((state: any) => state);
  console.log(wings, academicyear, student, "redux Data");
  let today = new Date().toISOString().split("T")[0];
  const Cacademic_year = Cookies.get("academic_year");
  console.log(Cacademic_year, "Cacademic_year");

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik<FormValues>({
      initialValues: {
        name: "",
        start_date: "",
        date: "",
        end_date: "",
        month: "",
        mode_of_payment: "",
        deposite_at: "",
        based_on: "Daily",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        console.log(values, "values");
        const MstartDate = values.month ? `${values.month}-01` : "";
        const MendDate = values.month
          ? (() => {
              const year = parseInt(values.month.split("-")[0]);
              const month = parseInt(values.month.split("-")[1]);
              // Create a date for the first day of the next month
              const nextMonth = new Date(year, month, 1);
              // Subtract one day to get the last day of the current month
              nextMonth.setDate(nextMonth.getDate());
              return nextMonth.toISOString().split("T")[0]; // Format as YYYY-MM-DD
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
          collected_at: "All",
        };
        axios
          .post("http://10.0.20.200:8000/fee_receipts/fee_collection_list", formvalue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(" Fetched Data Successfully!");
            setData(response.data);
            action.resetForm();
            handleShowPage();
          })
          .catch(() => {
            message.error("Error on fetching data !");
          });
      },
    });
  console.log(student, "student data");
  console.log(values, "value");

  const [value, setValue] = useState([]);

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

  const dataTableData = {
    columns: [
      { Header: "SL.NO", accessor: "sl_no" },
      { Header: "STUDENT NAME, CLASS & SECTION", accessor: "student_name" },
      { Header: "AD.NO", accessor: "ad_no" },
      { Header: "TRANSACTION NO", accessor: "transaction_no" },
      { Header: "INSTALLMENT", accessor: "installment" },
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
        transaction_no: "122333",
        installment: "X-II",
        monthley_fee: 2300,
        concession: 1000,
        fine: 100,
        discount: 1000,
        refund: 10,
        adjust: 200,
        amount: 10000,
      },
      {
        sl_no: 1,
        student_name: "Prabhakar",
        ad_no: "xxxx",
        transaction_no: "122333",
        installment: "X-II",
        monthley_fee: 2300,
        concession: 1000,
        fine: 100,
        discount: 1000,
        refund: 10,
        adjust: 200,
        amount: 10000,
      },
      {
        sl_no: 1,
        student_name: "Prabhakar",
        ad_no: "xxxx",
        transaction_no: "122333",
        installment: "X-II",
        monthley_fee: 2300,
        concession: 1000,
        fine: 100,
        discount: 1000,
        refund: 10,
        adjust: 200,
        amount: 10000,
      },
      {
        sl_no: 1,
        student_name: "Prabhakar",
        ad_no: "xxxx",
        transaction_no: "122333",
        installment: "X-II",
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
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
                {/* <Grid item xs={12} sm={6}>
                  <MDTypography variant="button">Select Wings</MDTypography>
                  <TreeSelect {...tProps} size="large" />
                </Grid> */}
                {values.based_on == "Daily" ? (
                  <Grid item xs={12} sm={3}>
                    <MDInput
                      required
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
                    options={["By Cash", "By Cheque"]}
                    renderInput={(params) => (
                      <MDInput
                        required
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
                    options={["School", "Online"]}
                    renderInput={(params) => (
                      <MDInput
                        required
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
            {dataTableData ? (
              <Grid container mt={2}>
                {/* <DataTable table={dataTableData} /> */}
              </Grid>
            ) : null}
          </MDBox>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default FeeCollectionReport;
