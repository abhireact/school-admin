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
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";

const token = Cookies.get("token");

const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
const validationSchema = Yup.object().shape({
  academic_year: Yup.string().required("Required *"),
  class_name: Yup.string().required("Required *"),
  section_name: Yup.string().required("Required *"),
});

const ManageSchedule = (props: any) => {
  const { manageData, handleClose } = props;
  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const [filteredSection, setFilteredSection] = useState([]);

  console.log(filteredSection, "section name");

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        academic_year: Cacademic_year,
        class_name: "",
        section_name: "",
        fine_name: manageData.fine_name,
      },
      validationSchema: validationSchema,

      onSubmit: (values: any, action: { resetForm: () => void }) => {
        console.log(" values", values);
        action.resetForm();
      },
    });

  // call api to show collection data
  useEffect(() => {
    if (values.section_name) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/late_fee/collection`, values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          console.log("data response", response.data);
        })
        .catch((error: any) => {
          message.error(error.response.data.detail);
        });
    }
  }, [values.section_name]);

  const handleCheckboxChange = (index: number) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].select = !updatedData[index].select;
      return updatedData;
    });
  };
  const handleSelectAll = () => {
    setData((prevData) => prevData.map((item) => ({ ...item, select: true })));
    console.log(data, "all checkbox");
    setAllCheck(true);
    setNoneCheck(false);
  };

  const handleSelectNone = () => {
    setData((prevData) => prevData.map((item) => ({ ...item, select: false })));
    console.log(data, "none checkbox");
    setAllCheck(false);
    setNoneCheck(true);
  };
  const [allCheck, setAllCheck] = useState(false);
  const [noneCheck, setNoneCheck] = useState(false);

  const handleCollectionSubmit = () => {
    const sendValues = { ...values, collections: data };
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/late_fee/collection`, sendValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        message.success("Updated Successfully");
      })
      .catch((error: any) => {
        message.error(error.response.data.detail);
      });
  };
  return (
    <>
      <I18nextProvider i18n={createTrans}>
        <Card>
          <form onSubmit={handleSubmit}>
            <Grid container p={3}>
              <Grid item xs={12} sm={6}>
                <MDTypography variant="h4" fontWeight="bold" color="secondary">
                  {t("manage_late_fee")}
                </MDTypography>
              </Grid>
            </Grid>
            <MDBox p={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "academic_year", value } });
                    }}
                    defaultValue={Cacademic_year}
                    options={
                      classes
                        ? Array.from(new Set(classes.map((item: any) => item.academic_year)))
                        : []
                    }
                    disabled
                    renderInput={(params) => (
                      <MDInput
                        required
                        defaultValue="Cacademic_year"
                        name="academic_year"
                        onChange={handleChange}
                        disabled
                        value={values.academic_year}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {t("academic_year")}
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
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "class_name", value } });
                    }}
                    options={
                      values.academic_year !== ""
                        ? classes
                            .filter((item: any) => item.academic_year === values.academic_year)
                            .map((item: any) => item.class_name)
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="class"
                        onChange={handleChange}
                        value={values.class_name}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {t("class")}
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
                    onChange={(_event, value) => {
                      handleChange({ target: { name: "section_name", value } });
                    }}
                    options={
                      values.class_name !== ""
                        ? classes
                            .filter(
                              (item: any) =>
                                item.academic_year === values.academic_year &&
                                item.class_name === values.class_name
                            )[0]
                            .section_data.map((item: any) => item.section_name)
                        : []
                    }
                    renderInput={(params) => (
                      <MDInput
                        required
                        name="section_name"
                        onChange={handleChange}
                        value={values.section_name}
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {t("section")}
                          </MDTypography>
                        }
                        {...params}
                        variant="standard"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </form>

          {data.length == 0 ? (
            ""
          ) : (
            <>
              <MDBox p={4}>
                <Grid container>
                  <Grid item sm={12} xs={12}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <td
                            style={{
                              fontSize: "15px",
                              textAlign: "left",
                            }}
                          >
                            {" "}
                            <b>{t("fee_collection_name")}</b>
                          </td>
                          <td
                            style={{
                              fontSize: "15px",
                              textAlign: "left",
                            }}
                          >
                            <b>Select</b>: &nbsp;All
                            <Checkbox checked={allCheck} onChange={() => handleSelectAll()} />
                            &nbsp; None
                            <Checkbox checked={noneCheck} onChange={() => handleSelectNone()} />
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((datainfo, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "left" }}>
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                {datainfo.collection_name}
                              </MDTypography>
                            </td>
                            <td>
                              <Checkbox
                                checked={datainfo.select}
                                onChange={() => handleCheckboxChange(index)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={12}
                    sm={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                    mr={2}
                  >
                    <Grid item mt={2} mr={2}>
                      <MDButton
                        color="dark"
                        variant="contained"
                        onClick={() => {
                          handleClose(false);
                        }}
                      >
                        {t("back")}
                      </MDButton>
                    </Grid>
                    <Grid item mt={2}>
                      <MDButton
                        color="info"
                        variant="contained"
                        type="submit"
                        onClick={() => handleCollectionSubmit()}
                      >
                        {t("save")}
                      </MDButton>
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </>
          )}
        </Card>
      </I18nextProvider>
    </>
  );
};
export default ManageSchedule;
