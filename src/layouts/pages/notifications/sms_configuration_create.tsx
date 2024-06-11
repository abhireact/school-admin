import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import MDInput from "components/MDInput";
const token = Cookies.get("token");

export default function SMSConfigurationCreate(props: any) {
  const [particularFields, setParticularFields] = useState([{ key: "", value: "" }]);
  const [createOrEdir, setCreateOrEdir] = useState("create");
  console.log(props.data, "props data");
  useEffect(() => {
    if (props.data) {
      setCreateOrEdir("edit");
      setParticularFields(props.data.key_value);
    }
  }, []);
  const initialValues = {
    url: createOrEdir == "edit" ? props.data.url : "",
    mobile_number_attribute: createOrEdir == "edit" ? props.data.url : "",
    attribute: createOrEdir == "edit" ? props.data.msg_attribute : "",
    unicode_key: createOrEdir == "edit" ? props.data.unicode_key : "",
    unicode_value: createOrEdir == "edit" ? props.data.unicode_value : "",
    request_type: createOrEdir == "edit" ? props.data.request_type : "",
    sender_id: createOrEdir == "edit" ? props.data.sender_id : "",
    sender_id_value: createOrEdir == "edit" ? props.data.sender_id_value : "",
    vender_name: createOrEdir == "edit" ? props.data.vendor_name : "",
    english_key: createOrEdir == "edit" ? props.data.english_key : "",
    maximum_sms_Support: createOrEdir == "edit" ? props.data.maximum_sms_Support : "",
    english_value: createOrEdir == "edit" ? props.data.english_value : "",
    support_multiple_sms: createOrEdir == "edit" ? props.data.support_multiple_sms : "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const submitvalue = {
          url: values.url,
          support_multiple_sms: values.support_multiple_sms,
          maximum_sms_Support: values.maximum_sms_Support,
          mobile_number_attribute: values.mobile_number_attribute,
          msg_attribute: values.attribute,
          sender_id: values.sender_id,
          sender_id_value: values.sender_id_value,
          request_type: values.request_type,
          english_key: values.english_key,
          english_value: values.english_value,
          unicode_key: values.unicode_key,
          unicode_value: values.unicode_value,
          key_value: particularFields,
          vendor_name: values.vender_name,
        };
        const editvalue = {
          old_url: createOrEdir == "edit" ? props.data.url : "",
          old_sender_id_value: createOrEdir == "edit" ? props.data.sender_id_value : "",
          url: values.url,
          support_multiple_sms: values.support_multiple_sms,
          maximum_sms_Support: values.maximum_sms_Support,
          mobile_number_attribute: values.mobile_number_attribute,
          msg_attribute: values.attribute,
          sender_id: values.sender_id,
          sender_id_value: values.sender_id_value,
          request_type: values.request_type,
          english_key: values.english_key,
          english_value: values.english_value,
          unicode_key: values.unicode_key,
          unicode_value: values.unicode_value,
          key_value: particularFields,
          vendor_name: values.vender_name,
        };
        console.log(submitvalue, "llll");
        if (createOrEdir == "create") {
          axios
            .post("http://10.0.20.200:8000/mg_sms_configuration/school_incharge", submitvalue, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              message.success(response.data.message);
              setParticularFields([{ key: "", value: "" }]);
              action.resetForm();
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        } else {
          axios
            .put("http://10.0.20.200:8000/mg_sms_configuration/school_incharge", editvalue, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              message.success(response.data.message);
              setParticularFields([{ key: "", value: "" }]);
              props.onSuccess();
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      },
    });
  const addParticularField = () => {
    setParticularFields([...particularFields, { key: "", value: "" }]);
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
        <Grid xs={12} sm={12} p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                SMS Configuration
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={4}>
              <MDInput
                required
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Vender Id
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="vender_name"
                value={values.vender_name}
                placeholder="Enter Sender Id Value"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                required
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    URL
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="url"
                value={values.url}
                placeholder="Enter URL"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                required
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    MSG Attribute
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="attribute"
                value={values.attribute}
                placeholder="Enter Mobile attribute"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Unicode Key
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="unicode_key"
                value={values.unicode_key}
                placeholder="Enter Unicode Key"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Unicode Value
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="unicode_value"
                value={values.unicode_value}
                placeholder="Enter Unicode Value"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Request Type
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="request_type"
                value={values.request_type}
                placeholder="Enter Request Type"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Sender Id
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="sender_id"
                value={values.sender_id}
                placeholder="Enter Sender Id"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Sender Id Value
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="sender_id_value"
                value={values.sender_id_value}
                placeholder="Enter Sender Id Value"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Mobile Number Attribute
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="mobile_number_attribute"
                value={values.mobile_number_attribute}
                placeholder="Enter Mobile number attribute"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    English Key
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="english_key"
                value={values.english_key}
                placeholder="Enter English Key"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    English Value
                  </MDTypography>
                }
                sx={{ width: "100%" }}
                name="english_value"
                value={values.english_value}
                placeholder="Enter English Value"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Checkbox
                checked={values.support_multiple_sms}
                name="support_multiple_sms"
                value="true"
                onChange={handleChange}
              />
              <MDTypography variant="button" fontWeight="bold" color="secondary">
                Support Multiple SMS
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Maximum SMS Support
                  </MDTypography>
                }
                type="number"
                sx={{ width: "100%" }}
                name="maximum_sms_Support"
                value={values.maximum_sms_Support}
                placeholder="Enter Maximum SMS Support"
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {particularFields.map((particular, index) => (
            <Grid container spacing={3} key={index} p={2}>
              <Grid item xs={10} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {`Key ${index + 1}`}
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name={`particular${index}`}
                  value={particularFields[index].key}
                  variant="standard"
                  onChange={(e: any) => {
                    const updatedFields = [...particularFields];
                    updatedFields[index].key = e.target.value;
                    setParticularFields(updatedFields);
                  }}
                />
              </Grid>
              <Grid item xs={10} sm={4}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {`Value ${index + 1}`}
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name={`value${index}`}
                  value={particularFields[index].value}
                  variant="standard"
                  onChange={(e: any) => {
                    const updatedFields = [...particularFields];
                    updatedFields[index].value = e.target.value;
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
          <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={4}>
            <Grid item>
              <Link href="/notification/smsconfiguration" variant="body2">
                <MDButton color="dark" variant="contained">
                  Back
                </MDButton>
              </Link>
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
