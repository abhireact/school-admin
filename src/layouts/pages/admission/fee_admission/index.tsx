import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { message } from "antd";
import Cookies from "js-cookie";

import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useLocation, useNavigate } from "react-router-dom";

const token = Cookies.get("token");

const Fee = () => {
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [isCheque, setIsCheque] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [filterapi, setFilterApi] = useState([]);
  const [amountFromEditData, setAmountFromEditData] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admissions/settings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setFilterApi(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const location = useLocation();
  const { academicYear, className, id } = location.state;

  // Function to filter amount from editData based on academic year and class_name
  useEffect(() => {
    if (academicYear && className && filterapi.length > 0) {
      const academicYearData = filterapi.find((item) => item.academic_year === academicYear);

      if (academicYearData) {
        const classDetail = academicYearData.details.find(
          (detail: { class_name: any }) => detail.class_name === className
        );

        if (classDetail) {
          setAmountFromEditData(classDetail.amount || 0);
        } else {
          setAmountFromEditData(0);
        }
      }
    }
  }, [academicYear, className, filterapi]);

  const initialValues = {
    id: id,
    amount: amountFromEditData,
    collected_at: "",
    payment_mode: "",
    cheque_number: "",
    cheque_date: "",
    bank_branch: "",
    cheque_status: "",
    online_transaction_no: "",
    draft_number: "",
    draft_date: "",
  };

  const handlePaymentChange = (event: any) => {
    handleChange(event);
    setIsOnlinePayment(event.target.value === "Online Payment");
    setIsCheque(event.target.value === "By Cheque");
    setIsDraft(event.target.value === "By Draft");
  };
  console.log("amountFromEditData", amountFromEditData);

  const handleFormSubmit = async (values: any) => {
    try {
      const allValues = {
        ...values,
        amount: amountFromEditData,
        id: id,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admissions/pay_fee`,
        allValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Payment successful");
      navigate("/pages/admission/studentAdmission");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigate = useNavigate();

  const collectiontypes = ["School", "Bank Details"];

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <MDBox p={4}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  Fee Details
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} py={1}>
                <MDInput
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="amount"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Amount
                    </MDTypography>
                  }
                  value={amountFromEditData}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "100%" }}
                  onChange={(event, value) => {
                    handleChange({
                      target: { name: "collected_at", value },
                    });
                  }}
                  disableClearable
                  options={collectiontypes}
                  renderInput={(params: any) => (
                    <MDInput
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Collected At
                        </MDTypography>
                      }
                      InputLabelProps={{ shrink: true }}
                      name="collected_at"
                      onChange={handleChange}
                      value={values.collected_at}
                      {...params}
                      variant="standard"
                      error={touched.collected_at && Boolean(errors.collected_at)}
                      helperText={touched.collected_at && errors.collected_at}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <MDBox>
              <FormControl>
                <FormLabel>
                  <MDTypography
                    variant="h6"
                    fontWeight="bold"
                    color="secondary"
                    sx={{ marginLeft: "20px" }}
                    style={{ marginTop: "20px" }}
                  >
                    Payment Details
                  </MDTypography>
                </FormLabel>
                <RadioGroup name="payment_mode" onChange={handlePaymentChange}>
                  <FormControlLabel
                    value="By Cash"
                    control={<Radio />}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        By Cash
                      </MDTypography>
                    }
                  />
                  <FormControlLabel
                    value="By NEFT"
                    control={<Radio />}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        By NEFT
                      </MDTypography>
                    }
                  />
                  <FormControlLabel
                    value="By Cheque"
                    control={<Radio />}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        By Cheque
                      </MDTypography>
                    }
                  />
                  {isCheque && (
                    <MDBox style={{ marginLeft: "40px" }}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="cheque_number"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Cheque Number
                              </MDTypography>
                            }
                            value={values.cheque_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="bank_branch"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                BankName And Branch
                              </MDTypography>
                            }
                            value={values.bank_branch}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item>
                          <MDInput
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="cheque_date"
                            value={values.cheque_date}
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Date
                              </MDTypography>
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            // error={touched.cheque_date && Boolean(errors.cheque_date)}
                            // helperText={touched.cheque_date && errors.cheque_date}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  )}
                  <FormControlLabel
                    value="Online Payment"
                    control={<Radio />}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Online Payment
                      </MDTypography>
                    }
                  />
                  {isOnlinePayment && (
                    <MDBox style={{ marginLeft: "40px" }}>
                      <Grid container spacing={2}>
                        <Grid item>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="online_transaction_no"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Online Transcation Number
                              </MDTypography>
                            }
                            value={values.online_transaction_no}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  )}
                  <FormControlLabel
                    value="By Draft"
                    control={<Radio />}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        By Draft
                      </MDTypography>
                    }
                  />
                  {isDraft && (
                    <MDBox style={{ marginLeft: "40px" }}>
                      <Grid container spacing={3}>
                        <Grid item>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="draft_number"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Draft Number
                              </MDTypography>
                            }
                            value={values.draft_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item>
                          <MDInput
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="bank_branch"
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                BankName And Branch
                              </MDTypography>
                            }
                            value={values.bank_branch}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item>
                          <MDInput
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="draft_date"
                            value={values.draft_date}
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Date
                              </MDTypography>
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                      </Grid>
                    </MDBox>
                  )}
                </RadioGroup>
              </FormControl>
            </MDBox>

            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item mt={2}>
                <MDButton color="dark" variant="contained" type="submit" onClick={handleFormSubmit}>
                  Pay Fee
                </MDButton>
              </Grid>
              <Grid item mt={2} ml={2}>
                <MDButton
                  color="info"
                  variant="contained"
                  type="submit"
                  onClick={() => navigate("/pages/admission/studentAdmission")}
                >
                  Cancel
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
};

export default Fee;
