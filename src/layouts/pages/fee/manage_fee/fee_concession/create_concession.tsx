import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useFormik } from "formik";
import { Grid, Card, Link, Autocomplete, FormControlLabel } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Checkbox from "@mui/material/Checkbox";
import { Tree } from "antd";
import MDBox from "components/MDBox";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { useSelector } from "react-redux";
import type { TreeProps } from "antd";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/fee_module";

const token = Cookies.get("token");
interface SectionData {
  section_name: string;
  start_date: string;
  end_date: string;
}

interface Class {
  wing_name: string;
  class_name: string;
  section_data: SectionData[];
}

interface TreeNode {
  title: string;
  key: string;
  children?: TreeNode[];
}
const Cacademic_year = Cookies.get("academic_year");
console.log(Cacademic_year, "Cacademic_year");
export default function CreateConcession() {
  const { t } = useTranslation();
  const [feecategorydata, setFeecategorydata] = useState([]);
  const [result, setResult] = useState([]);
  const [checked, setChecked] = useState([]);
  const [studentdata, setStudentdata] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const { classes, account, studentcategory, student } = useSelector((state: any) => state);
  const initialValues = {
    concession_type: "",
    concession_name: "",
    class_section: "",
    fee_category: "",
    student_category: "",
    admission_number: 0,
    concession_amount: "",
    concession_percent: "",
    academic_year: Cacademic_year,
    class_name: "",
    section_name: "",
    account: "",
    is_percent: false,
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    // validationSchema: createschema,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      const checkedSectionKeys =
        values.concession_type != "student"
          ? checkedKeys
              .filter((key) => key.toString().includes("section:"))
              .map((item) => {
                const [classKey, sectionKey] = item.toString().split(",");
                const classValue = classKey.split(":")[1];
                const sectionValue = sectionKey.split(":")[1];
                return { class_name: classValue, section_name: sectionValue };
              })
          : [];
      const section_value = {
        discount_type: values.concession_type.replace(/\s+/g, "_").toLowerCase(),
        academic_year: values.academic_year,
        name: values.concession_name,
        account_name: values.account,
        discount: values.concession_amount,
        fee_category: values.fee_category,
        user_id: values.concession_type === "Student" ? checkedKeys : [],
        class_name: values.class_name,
        section_name: values.section_name,
        classes: checkedSectionKeys,
        student_category: values.student_category,
        percentage: values.is_percent,
      };
      axios
        .post("http://10.0.20.200:8000/fee_concession", section_value, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          message.success(response.data.message);
          const newInitialValues = {
            concession_type: values.concession_type, // Retain the concession_type value
            concession_name: "", // Reset other fields
            class_section: "",
            fee_category: "",
            student_category: "",
            admission_number: 0,
            concession_amount: "",
            concession_percent: "",
            academic_year: "",
            class_name: "",
            section_name: "",
            account: "",
            is_percent: false,
          };
          resetForm({ values: newInitialValues });
        })
        .catch((error) => {
          message.error("Error fetching data:", error);
        });
    },
  });
  useEffect(() => {
    axios
      .get("http://10.0.20.200:8000/fee_category", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFeecategorydata(Array.from(new Set(response.data.map((item: any) => item.name))));
      })
      .catch((error) => {
        message.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    setResult([]); // Clear result data
    setChecked([]); // Clear checked data
    setStudentdata([]); // Clear student data
    setSelectedTab(0); // Reset selected tab
    setExpandedKeys([]); // Clear expanded keys
    setCheckedKeys([]); // Clear checked keys
    setSelectedKeys([]); // Clear selected keys
    setAutoExpandParent(true); // Reset autoExpandParent
  }, [values.concession_type]);

  const filteredStudentData = useMemo(() => {
    if (values.academic_year && values.class_name && values.section_name) {
      return student
        .filter(
          (item: any) =>
            item.academic_year === values.academic_year &&
            item.class_name === values.class_name &&
            item.section_name === values.section_name
        )
        .map((item: any) => ({
          title: `${item.first_name} ${item.middle_name} ${item.last_name}(${item.user_id})`,
          key: item.user_id,
        }));
    }
    return [];
  }, [values.academic_year, values.class_name, values.section_name, student]);
  useEffect(() => {
    setStudentdata(filteredStudentData);
    console.log(filteredStudentData, "Filtered student data");
  }, [filteredStudentData]);
  console.log(studentdata, "student data");
  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };
  useEffect(() => {
    const filteredClassData = classes.filter(
      (item: any) => item.academic_year === values.academic_year
    );
    const result: TreeNode[] = [];
    const wingMap: { [key: string]: TreeNode } = {};
    console.log(classes, "inside use effect");
    filteredClassData.forEach(({ wing_name, class_name, section_data }: Class, index: number) => {
      if (!wingMap[wing_name]) {
        wingMap[wing_name] = {
          title: wing_name,
          key: `wing-${wing_name}`,
          children: [],
        };
        result.push(wingMap[wing_name]);
      }

      const wing = wingMap[wing_name];

      if (!wing.children?.find((child) => child.title === class_name)) {
        wing.children?.push({
          title: class_name,
          key: `wing-${wing_name},class-${class_name}`,
          children: [],
        });
      }
      const classItem = wing.children?.find((child) => child.title === class_name);
      section_data.forEach((section: any) => {
        if (classItem && classItem.children) {
          classItem.children.push({
            title: `section ${section.section_name}`,
            key: `class:${class_name},section:${section.section_name}`,
          });
        }
      });
    });

    setResult(result);
  }, [values.academic_year, values.student_category, values.fee_category]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <I18nextProvider i18n={createTrans}>
        <Card>
          <MDBox p={3}>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    {t("create_fee_concession")}
                  </MDTypography>
                </Grid>
              </Grid>
              <MDBox>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      value={values.concession_type}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "concession_type", value } });
                      }}
                      options={["Student", "Section", "Student Category"]}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="concession_type"
                          onChange={handleChange}
                          value={values.concession_type}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              {t("concession_type")}
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
              {values.concession_type == "Student" ||
              values.concession_type == "Section" ||
              values.concession_type == "Student Category" ? (
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      required
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          {t("concession_name")}
                        </MDTypography>
                      }
                      sx={{ width: "100%" }}
                      variant="standard"
                      name="concession_name"
                      value={values.concession_name}
                      onChange={handleChange}
                    />
                  </Grid>
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
                      value={values.academic_year}
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

                  {/* student  */}
                  {values.concession_type == "Student" && (
                    <>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "class_name", value } });
                          }}
                          options={
                            values.academic_year !== ""
                              ? classes
                                  .filter(
                                    (item: any) => item.academic_year === values.academic_year
                                  )
                                  .map((item: any) => item.class_name)
                              : []
                          }
                          value={values.class_name}
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
                          value={values.section_name}
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
                    </>
                  )}
                  {/* student category  */}
                  {values.concession_type == "Student Category" && (
                    <Grid item xs={12} sm={4}>
                      <Autocomplete
                        onChange={(_event, value) => {
                          handleChange({ target: { name: "student_category", value } });
                        }}
                        options={
                          studentcategory
                            ? studentcategory.map((item: any) => item.category_name)
                            : []
                        }
                        value={values.student_category}
                        renderInput={(params) => (
                          <MDInput
                            required
                            name="student_category"
                            onChange={handleChange}
                            value={values.student_category}
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                {t("student_category")}
                              </MDTypography>
                            }
                            {...params}
                            variant="standard"
                          />
                        )}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "account", value } });
                      }}
                      value={values.account}
                      options={account ? account.map((item: any) => item.account_name) : []}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="account"
                          onChange={handleChange}
                          value={values.account}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              {t("account")}
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
                        handleChange({ target: { name: "fee_category", value } });
                      }}
                      value={values.fee_category}
                      options={feecategorydata}
                      renderInput={(params) => (
                        <MDInput
                          required
                          name="fee_category"
                          onChange={handleChange}
                          value={values.fee_category}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              {t("fee_category")}
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid container sm={4} p={2} spacing={3}>
                    <Grid item xs={12} sm={5} marginTop={2}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.is_percent}
                            onChange={handleChange}
                            name="is_percent"
                          />
                        }
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            {t("is_percent")}
                          </MDTypography>
                        }
                      />
                    </Grid>

                    {values.is_percent == true ? (
                      <Grid item xs={12} sm={7}>
                        <MDInput
                          type="number"
                          inputProps={{
                            min: 0,
                            max: 100,
                            pattern: "[0-9]*",
                          }}
                          required
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Concession %
                            </MDTypography>
                          }
                          sx={{ width: "100%" }}
                          error={
                            parseInt(values.concession_amount) < 0 ||
                            parseInt(values.concession_amount) > 100
                          }
                          helperText={
                            parseInt(values.concession_amount) < 0
                              ? "Concession % must be greater than or equal to 0"
                              : parseInt(values.concession_amount) > 100
                              ? "Concession % must be less than or equal to 100"
                              : ""
                          }
                          variant="standard"
                          name="concession_amount"
                          value={values.concession_amount}
                          onChange={handleChange}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={7}>
                        <MDInput
                          type="number"
                          required
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              {t("concession_amount")}
                            </MDTypography>
                          }
                          sx={{ width: "100%" }}
                          inputProps={{
                            min: 1,
                            pattern: "[0-9]*",
                          }}
                          variant="standard"
                          name="concession_amount"
                          value={values.concession_amount}
                          onChange={handleChange}
                          error={parseInt(values.concession_amount) < 1}
                          helperText={
                            parseInt(values.concession_amount) < 1
                              ? "Concession Amount must be greater than or equal to 1"
                              : // : parseInt(values.concession_amount) > 100
                                // ? "Concession % must be less than or equal to 100"
                                ""
                          }
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} p={3} style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {values.concession_type == "Student" ? (
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        {t("select_student")}
                      </MDTypography>
                    ) : (
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        {t("select_wings")}
                      </MDTypography>
                    )}
                    <Tree
                      checkable
                      onExpand={onExpand}
                      expandedKeys={expandedKeys}
                      autoExpandParent={autoExpandParent}
                      onCheck={onCheck}
                      checkedKeys={checkedKeys}
                      onSelect={onSelect}
                      selectedKeys={selectedKeys}
                      treeData={values.concession_type == "Student" ? studentdata : result}
                    />
                  </Grid>
                </Grid>
              ) : null}
              <Grid container sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
                <Grid item>
                  <Link href="fee_concession" variant="body2">
                    <MDButton color="dark" variant="contained">
                      {t("back")}
                    </MDButton>
                  </Link>
                </Grid>
                <Grid item ml={2}>
                  <MDButton color="info" variant="contained" type="submit">
                    {t("save")}
                  </MDButton>
                </Grid>
              </Grid>
            </form>
          </MDBox>
        </Card>
      </I18nextProvider>
    </DashboardLayout>
  );
}
