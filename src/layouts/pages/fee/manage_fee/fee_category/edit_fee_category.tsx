import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import FormField from "layouts/pages/account/components/FormField";
import { useFormik } from "formik";
import { createschema } from "./createschema";
import { Grid, Card, Link, Autocomplete, IconButton } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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
    particular_types: [{ old_particular_name: "", particular_name: "" }],

    first_perticular: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      // validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        const filteredParticularTypes = values.particular_types.filter(
          (item) => item.particular_name.trim() !== ""
        );
        const updatedValue = {
          old_name: values.old_name,
          name: values.name,
          description: values.description,
          particular_types: [...values.existing_perticular, ...filteredParticularTypes],
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
            console.error("Error deleting task:", error);
            message.error(error.response?.data?.detail || "An error occurred");
          });
        console.log(values);
      },
    });
  // Function to add a new particular field
  const addParticular = () => {
    setFieldValue("particular_types", [
      ...values.particular_types,
      { old_particular_name: "", particular_name: "" },
    ]);
  };

  const removeParticular = (index: number) => {
    const newparticular = [...values.particular_types];
    newparticular.splice(index, 1);
    setFieldValue("particular_types", newparticular);
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
          <Grid container spacing={3} p={2}>
            <Grid item xs={12} sm={6}>
              <MDInput
                label={
                  <MDTypography variant="button" fontWeight="bold" color="secondary">
                    Name
                  </MDTypography>
                }
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
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>
          <MDTypography variant="h6" fontWeight="bold" color="secondary">
            Existing Perticulars
          </MDTypography>
          <Grid container spacing={3} p={2}>
            {values.existing_perticular.map((particular: any, index: React.Key) => (
              <Grid item xs={10} sm={6} key={index}>
                <MDInput
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Particular Name
                    </MDTypography>
                  }
                  disabled
                  value={particular.particular_name}
                  variant="standard"
                />
              </Grid>
            ))}
          </Grid>
          <MDTypography variant="h6" fontWeight="bold" color="secondary">
            Add New Particulars
          </MDTypography>
          {values.particular_types.map((particular_name, index) => (
            <Grid container spacing={3} p={2} key={index}>
              <Grid item xs={12} sm={6}>
                <MDInput
                  placeholder="Enter Particular Name"
                  sx={{ width: "100%" }}
                  variant="standard"
                  name={`particular_types.${index}.particular_name`}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Particular Name
                    </MDTypography>
                  }
                  value={particular_name.particular_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                mt={2}
                // sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <IconButton
                  onClick={() => removeParticular(index)}
                  disabled={values.particular_types.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
                {index == values.particular_types.length - 1 && (
                  <IconButton onClick={() => addParticular()}>
                    <AddIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}
          {/* <Grid container spacing={3} p={2}>
            <Grid item xs={10} sm={6}>
              <FormField
                label={`Particular`}
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
            <Grid container spacing={3} key={index} p={2}>
              <Grid item xs={10} sm={6}>
                <FormField
                  label={`Particular ${index + 2}`}
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
          ))} */}
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
        </Grid>
      </Card>
    </form>
  );
}
