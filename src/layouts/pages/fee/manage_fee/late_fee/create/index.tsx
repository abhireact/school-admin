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
import { IconButton } from "@mui/material";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  fine_name: Yup.string().required("Required *"),
  account_name: Yup.string(),
  late_fee_calculation_type: Yup.string().required("Required *"),
});

const Create = (props: any) => {
  const { t } = useTranslation();

  const token = Cookies.get("token");

  const { handleShowPage, fetchingData } = props;
  const [cloneFields, setCloneFields] = useState(false);
  const [accountData, setAccountData] = useState([]);

  const calculationtypes = ["By Days", "By Months", "By Day to Day"];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_accounts`, {
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
        // due_date: [{ day_after_due_date: "", amount: "" }],
        due_date: [{ day_after_due_date: "", amount: "" }],
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/late_fee`, values, {
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
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  // const handleAddField = () => {
  //   setFieldValue("due_date", [...values.due_date, { day_after_due_date: "", amount: "" }]);
  // };

  // const handleRemoveField = (index: number) => {
  //   const newDues = [...values.due_date];
  //   newDues.splice(index, 1);
  //   setFieldValue("due_date", newDues);
  // };
  // Function to add a new particular field
  const addParticular = () => {
    setFieldValue("due_date", [...values.due_date, { day_after_due_date: "", amount: "" }]);
  };

  const removeParticular = (index: number) => {
    const newparticular = [...values.due_date];
    newparticular.splice(index, 1);
    setFieldValue("due_date", newparticular);
  };
  return (
    <I18nextProvider i18n={createTrans}>
      <form onSubmit={handleSubmit}>
        <Card>
          {" "}
          <MDBox p={4}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  {t("create_late_fee")}
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} py={1}>
                <MDInput
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="fine_name"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("fine_name")}
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
                  sx={{ width: "100%" }}
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
                          {t("account")}
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
                  rows={2}
                  sx={{ width: "100%" }}
                  variant="standard"
                  name="description"
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("description")}
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
              <Grid item xs={12} sm={4} py={1}>
                <Autocomplete
                  sx={{ width: "100%" }}
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
                          {t("late_fee_calculation_type")}
                        </MDTypography>
                      }
                      InputLabelProps={{ shrink: true }}
                      name="late_fee_calculation_type"
                      onChange={handleChange}
                      value={values.late_fee_calculation_type}
                      {...params}
                      variant="standard"
                      error={
                        touched.late_fee_calculation_type &&
                        Boolean(errors.late_fee_calculation_type)
                      }
                      success={
                        values.late_fee_calculation_type.length && !errors.late_fee_calculation_type
                      }
                      helperText={
                        touched.late_fee_calculation_type && errors.late_fee_calculation_type
                      }
                    />
                  )}
                />
              </Grid>
              {values.late_fee_calculation_type &&
                values.due_date.map((day_after_due_date, index) => (
                  <Grid item container sm={12} key={index} spacing={3}>
                    <Grid item xs={12} sm={4} py={1}>
                      <MDInput
                        placeholder="Enter Days After Due Date"
                        sx={{ width: "100%" }}
                        variant="standard"
                        name={`due_date.${index}.day_after_due_date`}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {t("days_after_due_date")}
                          </MDTypography>
                        }
                        required
                        value={day_after_due_date.day_after_due_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} py={1}>
                      <MDInput
                        placeholder="Enter Amount"
                        sx={{ width: "100%" }}
                        variant="standard"
                        name={`due_date.${index}.amount`}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {t("amount")}
                          </MDTypography>
                        }
                        required
                        value={day_after_due_date.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={4}
                      py={1}
                      mt={2}
                      // sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {index == values.due_date.length - 1 && (
                        <IconButton
                          onClick={() => addParticular()}
                          disabled={values.late_fee_calculation_type !== "By Days"}
                        >
                          <AddIcon />
                        </IconButton>
                      )}

                      <IconButton
                        onClick={() => removeParticular(index)}
                        disabled={values.due_date.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
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
                    {t("back")}
                  </MDButton>
                </Grid>
                <Grid item mt={2} ml={2}>
                  <MDButton color="info" variant="contained" type="submit">
                    {t("save")}
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </form>
    </I18nextProvider>
  );
};

export default Create;
