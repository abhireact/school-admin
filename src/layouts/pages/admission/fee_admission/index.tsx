import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
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
import { useState } from "react";
import TextField from "assets/theme/components/form/textField";
import { useNavigate } from "react-router-dom";

const initialValues = {
  amount: "",
  collected_at: "",
  cheque_number: "",
  bank_name: "",
  online_trans_no: "",
};

const Fee = () => {
  const navigate = useNavigate();
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [isCheque, setIsCheque] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const handleClearClick = () => {
    // setAutocompleteValue(null);
    resetForm();
  };
  const handlePaymentChange = (event: any) => {
    handleChange(event);
    setIsOnlinePayment(event.target.value === "online_payment");
    setIsCheque(event.target.value === "by_cheque");
    setIsDraft(event.target.value === "by_draft");
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: admissionformschema,
    onSubmit: async () => {},
  });
  const collectiontypes = ["School", "Bank Details"];
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                value={values.amount}
                // onChange={handleChange}
                onBlur={handleBlur}
                disabled
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
                    success={values.collected_at.length && !errors.collected_at}
                    helperText={touched.collected_at && errors.collected_at}
                  />
                )}
              />
            </Grid>
          </Grid>
          <MDBox>
            {/* <Grid item xs={12} sm={12} py={1} display="flex" justifyContent="flex-center"> */}
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
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handlePaymentChange}
              >
                <FormControlLabel
                  value="by_cash"
                  control={
                    <Radio
                    // onChange={handleChange}
                    //         name="search_by"
                    //         value="Class"
                    />
                  }
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      By Cash
                    </MDTypography>
                  }
                />
                <FormControlLabel
                  value="by_cheque"
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
                          name="bank_name"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              BankName And Branch
                            </MDTypography>
                          }
                          value={values.bank_name}
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
                          name="end_date"
                          // value={values.end_date}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Date
                            </MDTypography>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // error={touched.end_date && Boolean(errors.end_date)}
                          // helperText={touched.end_date && errors.end_date}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                )}
                <FormControlLabel
                  value="online_payment"
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
                          name="online_trans_no"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Online Transcation Number
                            </MDTypography>
                          }
                          value={values.online_trans_no}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                )}
                <FormControlLabel
                  value="by_draft"
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
                          name="cheque_number"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Draft Number
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
                          name="bank_name"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              BankName And Branch
                            </MDTypography>
                          }
                          value={values.bank_name}
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
                          name="end_date"
                          // value={values.end_date}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Date
                            </MDTypography>
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // error={touched.end_date && Boolean(errors.end_date)}
                          // helperText={touched.end_date && errors.end_date}
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                )}
              </RadioGroup>
            </FormControl>
            {/* </Grid> */}
          </MDBox>

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item mt={2}>
              <MDButton color="dark" variant="contained">
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
    </DashboardLayout>
  );
};

export default Fee;
