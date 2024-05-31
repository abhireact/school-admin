import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { createschema } from "./createschema";
import { Grid, Card, Link, Autocomplete } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const token = Cookies.get("token");
export default function EditFeeCategory(props: any) {
  const [particularFields, setParticularFields] = useState([]);
  const [existingParticularFields, setexistingParticularFields] = useState(["string", "string"]);
  const propdata = props.data;
  const initialValues = {
    old_name: propdata.name,
    name: propdata.name,
    description: propdata.description,
    existing_perticular: propdata.particular_types.map(
      (data: { particular_name: string }, index: number) => ({
        old_particular_name: data.particular_name,
        particular_name: data.particular_name,
      })
    ),
    particulars: [] as string[],
    first_perticular: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        console.log(particularFields, "new particularsssssss");
        const newperticular = particularFields.map((data: string, index: number) => ({
          old_particular_name: "",
          particular_name: data,
        }));
        newperticular.unshift({
          old_particular_name: "",
          particular_name: values.first_perticular,
        });
        const newperticulatnotempty = values.first_perticular == "" ? [] : newperticular;
        const updatedValue = {
          old_name: values.old_name,
          name: values.name,
          description: values.description,
          particular_types: [...values.existing_perticular, ...newperticulatnotempty],
        };
        axios
          .put("http://10.0.20.200:8000/fee_category", updatedValue, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // console.log(response, "responseeeeeeeeeeeeeee");
            message.success(response.data.message);
            props.onSuccess();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        console.log(values);
      },
    });
  // Function to add a new particular field
  const addParticularField = () => {
    setParticularFields([...particularFields, ""]);
  };

  // Function to remove a particular field
  const removeParticularField = (index: any) => {
    const updatedFields = [...particularFields];
    updatedFields.splice(index, 1);
    setParticularFields(updatedFields);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid xs={12} sm={12} p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Edit Fee Category
              </MDTypography>
            </Grid>
          </Grid>
          <MDBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Name
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="name"
                  value={values.name}
                  placeholder="Enter Fee Category Name"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Description
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name="description"
                  value={values.description}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <MDTypography variant="h6" fontWeight="bold" color="secondary" pt={2}>
              Existing Particulars
            </MDTypography>
            <Grid container spacing={3}>
              {values.existing_perticular.map((particular: any, index: number) => (
                <Grid item xs={10} sm={6} key={index}>
                  <MDInput
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        {`Particular ${index + 1}`}
                      </MDTypography>
                    }
                    sx={{ width: "100%" }}
                    disabled
                    value={particular.particular_name}
                    variant="standard"
                  />
                </Grid>
              ))}
            </Grid>
            <MDTypography variant="h6" fontWeight="bold" color="secondary" pt={2}>
              Add New Particulars
            </MDTypography>
            <Grid container spacing={3}>
              <Grid item xs={10} sm={6}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Particular
                    </MDTypography>
                  }
                  sx={{ width: "100%" }}
                  name={`first_perticular`}
                  // value={values.first_perticular}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
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
            </Grid>

            {particularFields.map((particular, index) => (
              <Grid container spacing={3} key={index}>
                <Grid item xs={10} sm={6}>
                  <MDInput
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        {`Particular ${index + 2}`}
                      </MDTypography>
                    }
                    sx={{ width: "100%" }}
                    name={`particulars.${index}`}
                    value={particular}
                    variant="standard"
                    onChange={(e: any) => {
                      const updatedFields = [...particularFields];
                      updatedFields[index] = e.target.value;
                      setParticularFields(updatedFields);
                    }}
                  />
                </Grid>
                <Grid item xs={2} sm={6}>
                  <Icon color="secondary" onClick={() => removeParticularField(index)}>
                    delete
                  </Icon>
                </Grid>
              </Grid>
            ))}
            <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={4}>
              <Grid item>
                <Link href="fee_category" variant="body2">
                  <MDButton color="dark" variant="contained" onClick={() => props.onSuccess()}>
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
          </MDBox>
        </Grid>
      </Card>
    </form>
  );
}
