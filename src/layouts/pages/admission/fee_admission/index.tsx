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

const initialValues = {
  amount: "",
};

const Fee = () => {
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox p={3}>
          <MDBox
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MDTypography variant="h4" fontWeight="bold" color="secondary">
              Fee Details
            </MDTypography>
          </MDBox>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={4}>
              <FormField
                label="Amount"
                name="amount"
                value={values.amount}
                // onBlur={handleBlur}
                disabled
                required
                // error={errors.first_name && touched.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                options={["School", "Bank Details"]}
                getOptionLabel={(option) => option}
                // value={values.gender}
                // onChange={(event: any, newValue) => {
                //   handleChange({
                //     target: {
                //       name: "gender",
                //       value: newValue,
                //     },
                //   });
                // }}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    variant="standard"
                    label="Collected At "
                    name="gender"
                    // onBlur={handleBlur}

                    required
                  />
                )}
              />
            </Grid>
          </Grid>
          <MDBox>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <MDTypography variant="h6" color="secondary" style={{ marginTop: "20px" }}>
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
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" color="standard">
                      By Cash
                    </MDTypography>
                  }
                />
                <FormControlLabel
                  value="by_cheque"
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" color="standard">
                      By Cheque
                    </MDTypography>
                  }
                />
                {isCheque && (
                  <MDBox style={{ marginLeft: "40px" }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <FormField
                          label="Cheque Number"
                          name="cheque_number"
                          //   value={values.cheque_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </Grid>
                      <Grid item>
                        <FormField
                          label="Bank Name And Branch"
                          name="bank_name"
                          //   value={values.bank_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </Grid>
                      <Grid item>
                        <FormField
                          type="date"
                          label="Date"
                          name="date"
                          InputLabelProps={{ shrink: true }}
                          //   value={values.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </Grid>
                      {/* <Grid item>
                      <Autocomplete
                        options={["Received", "Realized", "Bounced"]}
                        getOptionLabel={(option) => option}
                        //   value={values.check_status}
                        onChange={(event, newValue) => {
                          handleChange({
                            target: {
                              name: "check_status",
                              value: newValue,
                            },
                          });
                        }}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            variant="standard"
                            label="Check Status"
                            name="check_status"
                            onBlur={handleBlur}
                            required
                          />
                        )}
                      />
                    </Grid> */}
                    </Grid>
                  </MDBox>
                )}
                <FormControlLabel
                  value="online_payment"
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" color="standard">
                      Online Payment
                    </MDTypography>
                  }
                />
                {isOnlinePayment && (
                  <MDBox style={{ marginLeft: "40px" }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <FormField
                          label="Online Transaction No"
                          name="cheque_number"
                          //   value={values.cheque_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </Grid>
                    </Grid>
                  </MDBox>
                )}
                <FormControlLabel
                  value="by_draft"
                  control={<Radio />}
                  label={
                    <MDTypography variant="button" color="standard">
                      By Draft
                    </MDTypography>
                  }
                />
                {isDraft && (
                  <MDBox style={{ marginLeft: "40px" }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <FormField
                          label="Draft Number"
                          name="cheque_number"
                          //   value={values.cheque_number}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </Grid>
                      <Grid item>
                        <FormField
                          label="Bank Name And Branch"
                          name="bank_name"
                          //   value={values.bank_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </Grid>
                      <Grid item>
                        <FormField
                          type="date"
                          label="Date"
                          name="date"
                          InputLabelProps={{ shrink: true }}
                          //   value={values.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                        />
                      </Grid>
                      {/* <Grid item>
                      <Autocomplete
                        options={["Received", "Realized", "Bounced"]}
                        getOptionLabel={(option) => option}
                        //   value={values.check_status}
                        onChange={(event, newValue) => {
                          handleChange({
                            target: {
                              name: "check_status",
                              value: newValue,
                            },
                          });
                        }}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            variant="standard"
                            label="Check Status"
                            name="check_status"
                            onBlur={handleBlur}
                            required
                          />
                        )}
                      />
                    </Grid> */}
                    </Grid>
                  </MDBox>
                )}
              </RadioGroup>
            </FormControl>
          </MDBox>

          <MDBox p={2}>
            <MDButton variant="gradient" color="info" style={{ marginRight: "10px" }} type="submit">
              Pay Fee
            </MDButton>
            <MDButton
              variant="gradient"
              color="info"
              style={{ marginRight: "10px" }}
              onClick={handleClearClick}
            >
              Cancel
            </MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
};

export default Fee;
