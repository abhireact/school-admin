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

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, editData, fetchingData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };
  const [cloneFields, setCloneFields] = useState(false);

  const calculationtypes = ["By Days", "By Months", "By Day to Day"];
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        fine_name: editData.fine_name,
        account_name: editData.account_name,
        description: editData.description,
        late_fee_calculation_type: editData.late_fee_calculation_type,
        fee_fine_dues: editData.fee_fine_dues,
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .post("http://10.0.20.200:8000/late_fee", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success(" Created successfully!");
            fetchingData();
            action.resetForm();
            handleClose();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
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
              <MDInput
                sx={{ width: "70%" }}
                variant="standard"
                name="account_name"
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Account
                  </MDTypography>
                }
                value={values.account_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.account_name && Boolean(errors.account_name)}
                success={values.account_name.length && !errors.account_name}
                helperText={touched.account_name && errors.account_name}
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
                value={values.late_fee_calculation_type}
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

            <Grid xs={12} sm={8} py={1}>
              <MDButton
                onClick={() => {
                  handleAddField();
                }}
                color="info"
                variant="outlined"
              >
                ADD +
              </MDButton>
            </Grid>

            {values.fee_fine_dues.map((clone: any, index: any) => (
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
                    handleClose();
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

export default Update;
