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
import Divider from "@mui/material/Divider";
import FormField from "layouts/pages/account/components/FormField";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useFormik } from "formik";
import MDInput from "components/MDInput";
import { Radio, FormControlLabel } from "@mui/material";
import Icon from "@mui/material/Icon";
import Cookies from "js-cookie";
import { message } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
const token = Cookies.get("token");

export default function Priority(props: any) {
  const [particularFields, setParticularFields] = useState([
    {
      school_name: props.sub_name,
      sms_configeration_name: "",
      sender_id_value: "",
      priority: 0,
      vendor_name: "",
    },
  ]);
  console.log(props, "props data");
  const [configuration, setConfiguration] = useState([]);
  const prioritypropvalue = props.data;
  const initialValues = {
    school_name: "",
    priority: "",
  };

  const [clonedFields, setClonedFields] = useState([]);
  useEffect(() => {
    if (prioritypropvalue.length > 0) {
      const existing_priority = prioritypropvalue.map((field: any) => ({
        school_name: props.sub_name,
        priority: field.priority,
        sms_configeration_name: field.sms_configeration_name,
        sender_id_value: field.sender_id_value,
        vendor_name: field.vendor_name,
      }));
      setParticularFields(existing_priority);
    }
  }, []);
  console.log(particularFields, "existing perticular hhjuh");
  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/mg_sms_configuration/school_incharge", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setConfiguration(response.data);
        console.log(response.data, "configurationnnnnn");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(props.data, "props valuesss");

  const { handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      axios
        .post("http://10.0.20.200:8000/mg_sms_priority", particularFields, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success(response.data.message);
          props.onSuccess();
        })
        .catch((error) => {
          message.error(error.response.data.detail);
        });
    },
  });

  const addParticularField = () => {
    setParticularFields([
      ...particularFields,
      {
        school_name: props.sub_name,
        sms_configeration_name: "",
        sender_id_value: "",
        priority: 0,
        vendor_name: "  ",
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

          {particularFields.map((particular, index) => (
            <>
              <Grid container key={index} p={2}>
                <Grid item xs={12} sm={10}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        value={particularFields[index].sms_configeration_name}
                        onChange={(e, selectedValue) => {
                          // Use the second parameter to get the selected value
                          const updatedFields = [...particularFields];
                          updatedFields[index].sms_configeration_name = selectedValue;
                          updatedFields[index].vendor_name = configuration.find(
                            (obj) => obj.url === selectedValue
                          ).vendor_name;
                          setParticularFields(updatedFields);
                        }}
                        options={configuration.map((item) => item.url)}
                        renderInput={(params) => (
                          <MDInput
                            required
                            name={`SMS Configuration`}
                            value={particularFields[index].sms_configeration_name}
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
                      <MDInput
                        required
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {`Sender ID`}
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
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        disabled
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {`Vendor Name`}
                          </MDTypography>
                        }
                        sx={{ width: "100%" }}
                        name={`value${index}`}
                        value={particularFields[index].vendor_name}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <MDInput
                        required
                        type="number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {`Priority`}
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
                  </Grid>
                </Grid>
                {index != 0 ? (
                  <Grid item xs={12} sm={2}>
                    <Icon color="secondary" onClick={() => removeParticularField(index)}>
                      delete
                    </Icon>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={2}>
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
                <Divider />
              </Grid>
            </>
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
