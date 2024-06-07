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

export default function Priority(props: any) {
  const [particularFields, setParticularFields] = useState([{
    school_name: "",
    sms_configeration_name: "",
    sender_id_value: "",
    priority: 0,
    vendor_name: "",
  }]);
  const prioritypropvalue = props.data;
  const initialValues = {
    school_name: "SAKSHARIKA VIDYA VARSHINI",
    priority: "",
  };

  const [clonedFields, setClonedFields] = useState([]);
  useEffect(() => {
    if (prioritypropvalue.length > 0) {
      const existing_priority = prioritypropvalue.map((field: any) => ({
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

  const { handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(clonedFields, values, "submitted values");
      message.success("Successfully Assigned");
    },
  });

  const addParticularField = () => {
    setParticularFields([
      ...particularFields,
      {
        school_name: "",
        sms_configeration_name: "",
        sender_id_value: "",
        priority: 0,
        vendor_name: "",
      },
    ]);
  };

  const removeParticularField = (index: any) => {
    if (index != 0) {
      const updatedFields = [...particularFields];
      updatedFields.splice(index, 1);
      setParticularFields(updatedFields);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container spacing={3} p={3}>
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
          {/* <Grid item xs={12} sm={12}>
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
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
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
                  onChange={(_event, value) => handleCloneFieldChange(index, "vendor_name", value)}
                  options={["", "SendSMS", "SDFG", "AAAA", "SMS WORLD", "CALLCUM"]}
                  renderInput={(params) => (
                    <MDInput
                      required
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
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
            <Grid item xs={12} sm={12}>
              <MDButton color="info" variant="outlined" size="small" onClick={addPriorityField}>
                Add Priority Field
              </MDButton>
            </Grid>
          </Grid> */}

          {particularFields.map((particular, index) => (
            <Grid container spacing={3} key={index} p={2}>
              <Grid item xs={10} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {`SMS Configuration ${index}`}
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name={`particular${index}`}
                  value={particularFields[index].sms_configeration_name}
                  variant="standard"
                  onChange={(e: any) => {
                    const updatedFields = [...particularFields];
                    updatedFields[index].sms_configeration_name = e.target.value;
                    setParticularFields(updatedFields);
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {`Sender ID ${index}`}
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name={`value${index}`}
                  value={particularFields[index].sender_id_value}
                  variant="standard"
                  onChange={(e: any) => {
                    const updatedFields = [...particularFields];
                    updatedFields[index].sender_id_value = e.target.value;
                    setParticularFields(updatedFields);
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {`riority${index}`}
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name={`value${index}`}
                  value={particularFields[index].priority}
                  variant="standard"
                  onChange={(e: any) => {
                    const updatedFields = [...particularFields];
                    updatedFields[index].priority = e.target.value;
                    setParticularFields(updatedFields);
                  }}
                />
              </Grid>
              {index != 0 ? (
                <Grid item xs={2} sm={2}>
                  <Icon color="secondary" onClick={() => removeParticularField(index)}>
                    delete
                  </Icon>
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <MDButton
                    color="info"
                    variant="text"
                    style={{ fontSize: "16px" }}
                    onClick={addParticularField}
                    pl={2}
                  >
                    {"ADD +"}
                  </MDButton>
                </Grid>
              )}
            </Grid>
          ))}

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
