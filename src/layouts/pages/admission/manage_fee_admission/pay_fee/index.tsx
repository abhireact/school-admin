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

import DataTable from "examples/Tables/DataTable";
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

interface ShowData {
  id: number;
  fee_category: string;
  particular: string;
  amount: string;
  fee_module: boolean;
}

const ManagePayFee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { academicYear, className, id, name } = location.state;
  const [showdata, setShowData] = useState<ShowData>({
    id: 0,
    fee_category: "",
    particular: "",
    amount: "",
    fee_module: true,
  });
  const [dataFetched, setDataFetched] = useState(false);

  const initialValues = {
    collected_at: "",
    payment_mode: "",
    collection_date: "",
    cheque_number: "",
    cheque_date: "",
    bank_branch: "",
    cheque_status: "",
    online_transaction_no: "",
    draft_number: "",
    draft_date: "",
    class_name: className,
    academic_year: academicYear,
    section_name: "",
    id: id,
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const formData = {
        class_name: className,
        academic_year: academicYear,
        section_name: values.section_name,
        id: id,
        details: {
          fee_module: true,
          id: showdata.id,
          fee_category: showdata.fee_category,
          particular: showdata.particular,
          amount: showdata.amount,
        },
        collection_date: values.collection_date,
        payment_details: {
          collected_at: values.collected_at,
          payment_mode: values.payment_mode,
          cheque_number: values.cheque_number || null,
          cheque_date: values.cheque_date || null,
          bank_branch: values.bank_branch || null,
          cheque_status: values.cheque_status || null,
          online_transaction_no: values.online_transaction_no || null,
          draft_number: values.draft_number || null,
          draft_date: values.draft_date || null,
        },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admissions/admission_payment`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Success");
      navigate("/pages/admission/manage_admission");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleShowData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admissions/admission_fee`,
        {
          class_name: className,
          academic_year: academicYear,
          section_name: formik.values.section_name,
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowData(response.data);
      setDataFetched(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = formik;

  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [isCheque, setIsCheque] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const handlePaymentChange = (event: any) => {
    handleChange(event);
    setIsOnlinePayment(event.target.value === "Online Payment");
    setIsCheque(event.target.value === "By Cheque");
    setIsDraft(event.target.value === "By Draft");
  };

  const manageShowData = {
    columns: [
      { Header: "Fee Category", accessor: "fee_category" },
      { Header: "Particular", accessor: "particular" },
      { Header: "Amount", accessor: "amount" },
    ],
    rows: [
      {
        fee_category: showdata.fee_category,
        particular: showdata.particular,
        amount: showdata.amount,
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid container px={3} pt={3}>
            <Grid item xs={12} sm={6} mt={2}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Fee Reports
              </MDTypography>
            </Grid>
          </Grid>
          <MDBox p={4} mb={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <MDTypography variant="button" color="secondary">
                  <b>Name : </b> {name}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <MDTypography variant="button" color="secondary">
                  <b>Class Name :</b> {className}
                </MDTypography>
              </Grid>

              <Grid item xs={12} sm={3} style={{ marginTop: "-13px" }}>
                <Autocomplete
                  sx={{ width: "100%" }}
                  onChange={(event, value) => {
                    formik.setFieldValue("section_name", value);
                  }}
                  disableClearable
                  options={["A", "B"]}
                  renderInput={(params) => (
                    <MDInput
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Section Name
                        </MDTypography>
                      }
                      InputLabelProps={{ shrink: true }}
                      name="section_name"
                      onChange={handleChange}
                      value={values.section_name}
                      {...params}
                      variant="standard"
                      error={touched.section_name && Boolean(errors.section_name)}
                      helperText={touched.section_name && errors.section_name}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <MDButton color="info" variant="contained" type="button" onClick={handleShowData}>
                  Show
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </Card>

        {dataFetched && (
          <>
            {!showdata.fee_module ? (
              <MDBox style={{ marginTop: "15px" }}>
                <Card>
                  <MDBox p={4}>
                    <MDTypography variant="h6" color="error">
                      Due to the absence of the fee module, you cannot proceed with fee payment.
                      However, if you still wish to import the student, please continue...
                    </MDTypography>
                    <MDButton
                      color="info"
                      variant="contained"
                      type="button"
                      onClick={() => handleFormSubmit(values)}
                    >
                      Import Student
                    </MDButton>
                  </MDBox>
                </Card>
              </MDBox>
            ) : (
              <>
                <Grid item xs={12} sm={12}>
                  <MDBox style={{ marginTop: "15px" }}>
                    <Card>
                      <DataTable
                        table={manageShowData}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                      />
                    </Card>
                  </MDBox>
                </Grid>
                <MDBox style={{ marginTop: "15px" }}>
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
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: "100%" }}
                            variant="standard"
                            name="collection_date"
                            value={values.collection_date}
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                Collection Date
                              </MDTypography>
                            }
                            onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            error={touched.collection_date && Boolean(errors.collection_date)}
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
                            options={["School", "Bank Details"]}
                            renderInput={(params) => (
                              <MDInput
                                label={
                                  <MDTypography
                                    variant="button"
                                    fontWeight="bold"
                                    color="secondary"
                                  >
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
                                        <MDTypography
                                          variant="button"
                                          fontWeight="bold"
                                          color="secondary"
                                        >
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
                                        <MDTypography
                                          variant="button"
                                          fontWeight="bold"
                                          color="secondary"
                                        >
                                          Bank Name And Branch
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
                                        <MDTypography
                                          variant="button"
                                          fontWeight="bold"
                                          color="secondary"
                                        >
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
                                        <MDTypography
                                          variant="button"
                                          fontWeight="bold"
                                          color="secondary"
                                        >
                                          Online Transaction Number
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
                                        <MDTypography
                                          variant="button"
                                          fontWeight="bold"
                                          color="secondary"
                                        >
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
                                        <MDTypography
                                          variant="button"
                                          fontWeight="bold"
                                          color="secondary"
                                        >
                                          Bank Name And Branch
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
                                        <MDTypography
                                          variant="button"
                                          fontWeight="bold"
                                          color="secondary"
                                        >
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
                          <MDButton
                            color="info"
                            variant="contained"
                            type="submit"
                            onClick={handleFormSubmit}
                          >
                            Pay Fee
                          </MDButton>
                        </Grid>
                        <Grid item mt={2} ml={2}>
                          <MDButton
                            color="dark"
                            variant="contained"
                            type="submit"
                            // onClick={() => navigate("/pages/admission/Fee")}
                            onClick={() => navigate("/pages/admission/manage_admission")}
                            // navigate("/pages/admission/Fee");
                          >
                            Cancel
                          </MDButton>
                        </Grid>
                      </Grid>
                    </MDBox>
                  </Card>
                </MDBox>
              </>
            )}
          </>
        )}
      </form>
    </DashboardLayout>
  );
};

export default ManagePayFee;
