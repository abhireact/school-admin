import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";
import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  fine_name: Yup.string().required("Required *"),
  account_name: Yup.string().required("Required *"),
  late_fee_calculation_type: Yup.string().required("Required *"),
});

const Create = (props: any) => {
  const token = Cookies.get("token");

  const { handleShowPage, fetchingData } = props;
  const [cloneFields, setCloneFields] = useState(false);
  const [accountData, setAccountData] = useState([]);

  const calculationtypes = ["By Days", "By Months", "By Day to Day"];
  useEffect(() => {
    axios
      .get("http://10.0.20.121:8000/mg_accounts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAccountData(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        fine_name: "",
        account_name: "",
        description: "",
        late_fee_calculation_type: "",
        fee_fine_dues: [{ days_after_due_date: "", amount: "" }],
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post("http://10.0.20.121:8000/fee_fine", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success(" Created successfully!");
            fetchingData();
            action.resetForm();
            handleShowPage();
          })
          .catch(() => {
            message.error("Error on creating  !");
          });
      },
    });
  const handleAddField = () => {
    setFieldValue("fee_fine_dues", [
      ...values.fee_fine_dues,
      { days_after_due_date: "", amount: "" },
    ]);
  };

  const handleRemoveField = (index: number) => {
    const newDues = [...values.fee_fine_dues];
    newDues.splice(index, 1);
    setFieldValue("fee_fine_dues", newDues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {" "}
        <MDBox p={4}>
          <Grid container>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="fine_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Fine Name
                  </MDTypography>
                }
                value={values.fine_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fine_name && Boolean(errors.fine_name)}
                success={values.fine_name.length && !errors.fine_name}
                helperText={touched.fine_name && errors.fine_name}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <Autocomplete
                disableClearable
                sx={{ width: "70%" }}
                value={values.account_name}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "account_name", value },
                  });
                }}
                options={accountData.map((acd) => acd.account_name)}
                renderInput={(params: any) => (
                  <MDInput
                    InputLabelProps={{ shrink: true }}
                    name="account_name"
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Account
                      </MDTypography>
                    }
                    onChange={handleChange}
                    value={values.account_name}
                    {...params}
                    variant="standard"
                    onBlur={handleBlur}
                    error={touched.account_name && Boolean(errors.account_name)}
                    helperText={touched.account_name && errors.account_name}
                    success={values.account_name.length && !errors.account_name}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} py={1}>
              <MDInput
                multiline
                rows={2}
                sx={{ width: "70%" }}
                variant="standard"
                name="description"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Description ...
                  </MDTypography>
                }
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                success={values.description.length && !errors.description}
              />
            </Grid>
            <Grid xs={12} sm={4} py={1}>
              <Autocomplete
                sx={{ width: "70%" }}
                onChange={(event, value) => {
                  handleChange({
                    target: { name: "late_fee_calculation_type", value },
                  });
                  setCloneFields(true);
                }}
                disableClearable
                options={calculationtypes}
                renderInput={(params: any) => (
                  <MDInput
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Late Fee Calculatin Type
                      </MDTypography>
                    }
                    InputLabelProps={{ shrink: true }}
                    name="late_fee_calculation_type"
                    onChange={handleChange}
                    value={values.late_fee_calculation_type}
                    onBlur={handleBlur}
                    error={
                      touched.late_fee_calculation_type && Boolean(errors.late_fee_calculation_type)
                    }
                    helperText={
                      touched.late_fee_calculation_type && errors.late_fee_calculation_type
                    }
                    {...params}
                    variant="standard"
                  />
                )}
              />
            </Grid>
            {cloneFields && (
              <Grid xs={12} sm={8} py={1}>
                <MDButton
                  onClick={() => {
                    handleAddField();
                  }}
                  color="info"
                  variant="text"
                  fontSize="medium"
                >
                  ADD +
                </MDButton>
              </Grid>
            )}
            {cloneFields &&
              values.fee_fine_dues.map((clone, index) => (
                <>
                  <Grid item xs={12} sm={4} py={1} key={index + "days_after_due_date"}>
                    <MDInput
                      required
                      sx={{ width: "70%" }}
                      variant="standard"
                      name={`fee_fine_dues[${index}].days_after_due_date`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Days After Due Date
                        </MDTypography>
                      }
                      value={values.fee_fine_dues[index].days_after_due_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} py={1} key={index + "amount"}>
                    <MDInput
                      required
                      sx={{ width: "70%" }}
                      variant="standard"
                      name={`fee_fine_dues[${index}].amount`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Amount
                        </MDTypography>
                      }
                      value={values.fee_fine_dues[index].amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} pt={4} key={index + "amount"}>
                    {values.fee_fine_dues.length > 1 ? (
                      <Icon
                        fontSize="medium"
                        onClick={() => {
                          handleRemoveField(index);
                        }}
                      >
                        <DeleteIcon />
                      </Icon>
                    ) : null}
                  </Grid>
                </>
              ))}

            <Grid
              item
              container
              xs={12}
              sm={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item mt={2}>
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
              <Grid item mt={2} ml={2}>
                <MDButton color="info" variant="contained" type="submit">
                  Save
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </form>
  );
};

export default Create;
