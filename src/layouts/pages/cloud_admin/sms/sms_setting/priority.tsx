import React, { useEffect, useState } from "react";
import {
  Grid,
  Tooltip,
  Autocomplete,
  Card,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import FormField from "layouts/pages/account/components/FormField";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import MDInput from "components/MDInput";
import { Radio, FormControlLabel } from "@mui/material";
import Icon from "@mui/material/Icon";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");

export default function Priority(props: any) {
  const prioritypropvalue = props.data;
  const initialValues = {
    school_name: "SAKSHARIKA VIDYA VARSHINI",
    priority: "",
  };

  const [clonedFields, setClonedFields] = useState([]);
  useEffect(() => {
    if (prioritypropvalue.length > 0) {
      const existing_priority = prioritypropvalue.map((field: any, index: number) => ({
        priority: field.priority,
        sms_configeration__name: field.sms_configeration__name,
        sender_id_value: field.sender_id_value,
        vendor_name: field.vendor_name,
      }));
      setClonedFields(existing_priority);
    } else {
      setClonedFields([
        {
          priority: 0,
          sms_configeration__name: "",
          sender_id_value: "",
          vendor_name: "",
        },
      ]);
    }
  }, []);
  console.log(props.data, "props valuesss");
  const handleCloneFieldChange = (index: number, field: any, value: any) => {
    const updatedFields = [...clonedFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setClonedFields(updatedFields);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(clonedFields, values, "submitted values");
        message.success("Successfully Assigned");
      },
    });

  const addPriorityField = () => {
    setClonedFields([
      ...clonedFields,
      {
        priority: 0,
        sms_configeration__name: "",
        sender_id_value: "",
        vendor_name: "",
      },
    ]);
  };

  const removePriorityField = (index: any) => {
    const updatedFields = [...clonedFields];
    updatedFields.splice(index, 1);
    setClonedFields(updatedFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container xs={12} sm={12} pl={3} py={3}>
          <Grid item xs={12} sm={12} p={2}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Sms Priority
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h6" fontWeight="bold" color="dark">
                {props.sc_name}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="SMS WORLD"
                name="priority"
                onChange={handleChange}
              >
                {clonedFields.map((field, index) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={
                      <React.Fragment key={index}>
                        <Grid container spacing={3} p={2}>
                          <Grid item xs={12} sm={4}>
                            <Autocomplete
                              value={clonedFields[index].sms_configeration__name}
                              onChange={(_event, value) =>
                                handleCloneFieldChange(index, "sms_configeration__name", value)
                              }
                              options={[
                                "",
                                "http://smsw.co.in/API/WebSMS/Http/v1.0a/index.php",
                                "http://www.smsjust.com/sms/user/urlsms.php",
                                "http://sms2.callcum.org:6005",
                              ]}
                              renderInput={(params) => (
                                <MDInput
                                  required
                                  label={
                                    <MDTypography
                                      variant="button"
                                      fontWeight="bold"
                                      color="secondary"
                                    >
                                      SMS Configuration
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
                              value={clonedFields[index].vendor_name}
                              onChange={(_event, value) =>
                                handleCloneFieldChange(index, "vendor_name", value)
                              }
                              options={["", "SendSMS", "SDFG", "AAAA", "SMS WORLD", "CALLCUM"]}
                              renderInput={(params) => (
                                <MDInput
                                  required
                                  label={
                                    <MDTypography
                                      variant="button"
                                      fontWeight="bold"
                                      color="secondary"
                                    >
                                      Vendor Name
                                    </MDTypography>
                                  }
                                  {...params}
                                  variant="standard"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <MDInput
                              sx={{ width: "100%" }}
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Sender Id Value
                                </MDTypography>
                              }
                              value={clonedFields[index].sender_id_value}
                              onChange={(e: any) =>
                                handleCloneFieldChange(index, "sender_id_value", e.target.value)
                              }
                              variant="standard"
                            />
                          </Grid>
                          <Grid item xs={2} sm={1}>
                            <Icon color="secondary" onClick={() => removePriorityField(index)}>
                              delete
                            </Icon>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Grid item xs={12} sm={12}>
              <MDButton color="info" variant="outlined" size="small" onClick={addPriorityField}>
                Add Priority Field
              </MDButton>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            px={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
            mt={4}
          >
            <Grid item>
              <MDButton color="dark" variant="contained" onClick={() => props.onSuccess()}>
                Back
              </MDButton>
            </Grid>
            <Grid item ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </form>
  );
}
