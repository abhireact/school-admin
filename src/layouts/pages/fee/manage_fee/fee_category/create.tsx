import React from "react";
import { useFormik } from "formik";
import { createschema } from "./createschema";
import { Grid, Card, IconButton } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import MDInput from "components/MDInput";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";

const token = Cookies.get("token");
interface Particular {
  particular_name: string;
  start_date: Date;
  end_date: Date;
}

interface FormValues {
  particular_types: Particular[];
}
export default function CreateFeeCategory(props: any) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    description: "",

    particular_types: [{ particular_name: "" }],
  };

  const data = useSelector((state: any) => state);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: createschema,
      enableReinitialize: true,
      onSubmit: async (values, action) => {
        action.resetForm();
      },
    });
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post("http://10.0.20.200:8000/fee_category", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      if (response.status === 200) {
        message.success(" Created Successfully");
        props.onSuccess();
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  // Function to add a new particular field
  const addParticular = () => {
    setFieldValue("particular_types", [...values.particular_types, { particular_name: "" }]);
  };

  const removeParticular = (index: number) => {
    const newparticular = [...values.particular_types];
    newparticular.splice(index, 1);
    setFieldValue("particular_types", newparticular);
  };
  return (
    <I18nextProvider i18n={createTrans}>
      <form onSubmit={handleSubmit}>
        <Card>
          <Grid xs={12} sm={12} p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  {t("create_fee_category")}
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={3} p={2}>
              <Grid item xs={12} sm={6}>
                <MDInput
                  sx={{ width: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("fee_category")}
                    </MDTypography>
                  }
                  required
                  name="name"
                  value={values.name}
                  placeholder="Enter Fee Category Name"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  success={values.name.length && !errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  sx={{ width: "100%" }}
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      {t("description")}
                    </MDTypography>
                  }
                  name="description"
                  value={values.description}
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>

              {values.particular_types.map((particular_name, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6}>
                    <MDInput
                      placeholder="Enter Particular Name"
                      sx={{ width: "100%" }}
                      variant="standard"
                      name={`particular_types.${index}.particular_name`}
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          {t("particular_name")}
                        </MDTypography>
                      }
                      required
                      value={particular_name.particular_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} mt={2}>
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
                </React.Fragment>
              ))}
            </Grid>

            {/* {particularFields.map((particular, index) => (
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
                {/* <Link href="fee_category" variant="body2"> */}
                <MDButton
                  color="dark"
                  variant="contained"
                  onClick={() => navigate("/fee_category")}
                >
                  {t("back")}
                </MDButton>
                {/* </Link> */}
              </Grid>
              <Grid item ml={2}>
                <MDButton color="info" variant="contained" type="submit" onClick={handleFormSubmit}>
                  {t("save")}
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </form>
    </I18nextProvider>
  );
}
