import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { Drawer, message } from "antd";
import { useState, useEffect, useMemo, SetStateAction } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";

import { useSelector } from "react-redux";
import { FormControlLabel, FormControl, Radio, RadioGroup, IconButton } from "@mui/material";
import * as Yup from "yup";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useMaterialUIController } from "context";
import PaidFees from "./paid_fee";
import UnPaidFees from "./unpaid_fee";
import PayFee from "./pay_fee/index";
const validationSchema = Yup.object().shape({
  class_name: Yup.string().required("Required *"),
  subject_name: Yup.string().required("Required *"),
  collection_date: Yup.date()
    .test("year-range", "Incorrect format", function (value) {
      if (value) {
        const year = value.getFullYear();
        return year >= 2000 && year <= 3000;
      }
      return true;
    })
    .required("Required"),

  academic_year: Yup.string()
    .matches(/^\d{4}-\d{2}$/, "YYYY-YY format")
    .required("Required *"),
});
interface FormValues {
  class_name: string;
  wing_name: string;
  name: string;
  father_name: string;
  academic_year: string;
  admission_number: string;
  fee_code: string;
  section_name: string;
  collection_date: string;
  adm_no_or_fee_code: string;
  search_by: string;
}
const FeeCollection = (props: any) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [mainData, setMainData] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isloading, setLoading] = useState(false);
  const showDrawer = (titleData: SetStateAction<string>, index: any) => {
    console.log(titleData, index, "drawer data");
    setMainData(index);
    setOpen(true);
    setTitle(titleData);
  };
  const onClose = () => {
    setOpen(false);
  };
  const token = Cookies.get("token");
  const { handleShowPage, setData } = props;
  const [showadvanceSearch, setShowadvanceSearch] = useState(true);

  const { wings, academicyear, classes, student } = useSelector((state: any) => state);
  console.log(wings, academicyear, student, "redux Data");
  const [concessiondata, setConcessiondata] = useState(student);
  let today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    setConcessiondata(student);
    setLoading(false); // Set loading state to false after data is fetched
  }, []);
  console.log(concessiondata, "collection datav ");
  const Cacademic_year = Cookies.get("academic_year");
  console.log(Cacademic_year, "Cacademic_year");

  //  const {wings,academicyear,classes}=useSelector

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik<FormValues>({
      initialValues: {
        class_name: "",
        wing_name: "All",
        name: "",
        father_name: "",
        academic_year: Cacademic_year,
        admission_number: "",
        fee_code: "",
        section_name: "",
        collection_date: today,
        adm_no_or_fee_code: "",
        search_by: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, action) => {
        console.log(values, "values");

        axios
          .post("http://10.0.20.200:8000/fee_collection", values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            message.success(" Fetched Data Successfully!");
            setData(response.data);
            action.resetForm();
            handleShowPage();
          })
          .catch(() => {
            message.error("Error on fetching data !");
          });
      },
    });
  console.log(student, "student data");

  console.log(values, "values");
  const filteredStudentData = useMemo(() => {
    if (values.academic_year && values.class_name && values.section_name) {
      return student.filter(
        (item: any) =>
          item.academic_year === values.academic_year &&
          item.class_name === values.class_name &&
          item.section_name === values.section_name
      );
    }
    return [];
  }, [values.academic_year, values.class_name, values.section_name, student]);
  const filteredStudentDataByAdm = useMemo(() => {
    if (values.academic_year && values.admission_number) {
      return student.filter(
        (item: any) =>
          item.academic_year === values.academic_year &&
          item.admission_number === values.admission_number
      );
    }
    return [];
  }, [values.academic_year, values.admission_number, student]);
  const filteredStudentDataByFeeCode = useMemo(() => {
    if (values.academic_year && values.fee_code) {
      return student.filter(
        (item: any) =>
          item.academic_year === values.academic_year && item.fee_code === values.fee_code
      );
    }
    return [];
  }, [values.academic_year, values.fee_code, student]);
  const filteredStudentDataByName = useMemo(() => {
    if (values.father_name && values.name) {
      return student.filter((item: any) => item.father_name === values.father_name);
    }
    return [];
  }, [values.name, values.father_name, student]);
  useEffect(() => {
    setConcessiondata(filteredStudentData);
    console.log(filteredStudentData, "Filtered student data by class and sec");
  }, [filteredStudentData]);
  useEffect(() => {
    setConcessiondata(filteredStudentDataByAdm);
    console.log(filteredStudentDataByAdm, "Filtered student data by adm");
  }, [filteredStudentDataByAdm]);
  useEffect(() => {
    setConcessiondata(filteredStudentDataByFeeCode);
    console.log(filteredStudentDataByFeeCode, "Filtered student data by fee code");
  }, [filteredStudentDataByFeeCode]);
  useEffect(() => {
    setConcessiondata(filteredStudentDataByName);
    console.log(filteredStudentDataByName, "Filtered student data by name");
  }, [filteredStudentDataByName]);
  useEffect(() => {});
  const dataTableData = useMemo(() => {
    const origionalData = showadvanceSearch ? concessiondata : student;
    return {
      columns: [
        { Header: "Student Name", accessor: "full_name" },
        { Header: "User ID", accessor: "user_id" },
        { Header: "Admission Number", accessor: "admission_number" },
        { Header: "Class & Section", accessor: "class_name" },
        { Header: "FATHER NAME", accessor: "father_name" },
        { Header: "Action", accessor: "action" },
      ],
      rows: origionalData?.map(
        (row: {
          father_name: any;
          admission_number: any;
          user_id: any;
          first_name: any;
          middle_name: null;
          last_name: any;
          class_name: any;
          gender: any;
          section_name: any;
          mobile_number: any;
        }) => ({
          admission_number: row.admission_number,
          user_id: row.user_id,
          action: (
            <MDTypography variant="p">
              <IconButton onClick={() => showDrawer("Paid Fees", row)}>
                <PaidIcon />
              </IconButton>
              <IconButton onClick={() => showDrawer("Unpaid Fees", row)}>
                <RequestQuoteIcon />
              </IconButton>
              <IconButton onClick={() => showDrawer("Pay Fee", row)}>
                <PaymentsIcon />
              </IconButton>
            </MDTypography>
          ),
          full_name: `${row.first_name} ${row.middle_name == null ? "" : row.middle_name} ${
            row.last_name
          }`,
          class_name: `${row.class_name} - ${row.section_name}`,
          father_name: row.father_name,
        })
      ),
    };
  }, [concessiondata, values.search_by, values.collection_date, values]);
  console.log(mainData, "mainData");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <form onSubmit={handleSubmit}>
          {" "}
          <Grid container p={3}>
            <Grid item xs={12} sm={6}>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Fee Collection
              </MDTypography>
            </Grid>
          </Grid>
          <MDBox p={4}>
            <Grid container spacing={3}>
              {showadvanceSearch && (
                <>
                  <Grid item xs={12} sm={6} py={1} display="flex" justifyContent="flex-center">
                    <FormControl>
                      <MDTypography variant="h5" fontWeight="bold" color="secondary">
                        Search By:
                      </MDTypography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        name="search_by"
                        value={values.search_by}
                        onChange={(e) => {
                          handleChange(e);
                          // Clear fields when changing radio button
                          setFieldValue("class_name", "");
                          setFieldValue("section_name", "");
                          setFieldValue("wing_name", "");
                          setFieldValue("fee_code", "");
                          setFieldValue("admission_number", "");
                          setFieldValue("name", "");
                          setFieldValue("father_name", "");
                        }}
                      >
                        {["Class", "Admission No", "Fee Code", "Name"].map((option) => (
                          <FormControlLabel
                            key={option}
                            control={<Radio />}
                            value={option}
                            label={
                              <MDTypography variant="button" fontWeight="bold" color="secondary">
                                {option}
                              </MDTypography>
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3} py={1}>
                    <Autocomplete
                      onChange={(_event, value) =>
                        handleChange({ target: { name: "academic_year", value } })
                      }
                      options={Array.from(
                        new Set(classes?.map((item: any) => item.academic_year) || [])
                      )}
                      value={values.academic_year}
                      disabled
                      disableClearable
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          required
                          name="academic_year"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Academic Year
                            </MDTypography>
                          }
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} py={1}>
                    <MDInput
                      type="date"
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: "80%" }}
                      name="collection_date"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Collection Date
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.collection_date}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.collection_date && Boolean(errors.collection_date)}
                      helperText={touched.collection_date && errors.collection_date}
                    />
                  </Grid>
                </>
              )}

              {showadvanceSearch && (
                <Grid container spacing={3} p={2}>
                  {values.search_by === "Class" && (
                    <>
                      <Grid item xs={12} sm={4} py={1}>
                        <Autocomplete
                          disableClearable
                          value={values.class_name || ""}
                          onChange={(_event, value) => {
                            setConcessiondata(
                              concessiondata.filter(
                                (item: any) => item.academic_year === values.academic_year
                              )
                            );
                            handleChange({ target: { name: "class_name", value } });
                          }}
                          options={classes
                            .filter((item: any) => item.academic_year === values.academic_year)
                            .map((item: any) => item.class_name)}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              required
                              name="class_name"
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Class
                                </MDTypography>
                              }
                              variant="standard"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} py={1}>
                        <Autocomplete
                          disableClearable
                          value={values.section_name || ""}
                          onChange={(_event, value) => {
                            handleChange({ target: { name: "section_name", value } });
                            setFieldValue("section_name", value);
                            setConcessiondata(
                              concessiondata.filter(
                                (item: any) => item.class_name === values.class_name
                              )
                            );
                          }}
                          options={
                            classes
                              .find(
                                (item: any) =>
                                  item.academic_year === values.academic_year &&
                                  item.class_name === values.class_name
                              )
                              ?.section_data.map((item: any) => item.section_name) || []
                          }
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              required
                              name="section_name"
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Section
                                </MDTypography>
                              }
                              variant="standard"
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}

                  {(values.search_by === "Admission No" || values.search_by === "Fee Code") && (
                    <>
                      <Grid item xs={12} sm={4} py={1}>
                        <Autocomplete
                          disableClearable
                          value={values.wing_name === "All" ? "All" : values.wing_name}
                          onChange={(event, value) => setFieldValue("wing_name", value)}
                          options={[
                            "All",
                            ...wings?.map((acd: { wing_name: any }) => acd?.wing_name),
                          ]}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              required
                              name="wing_name"
                              placeholder="Select Wing"
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Wing Name
                                </MDTypography>
                              }
                              variant="standard"
                              error={touched.wing_name && Boolean(errors.wing_name)}
                              helperText={touched.wing_name && errors.wing_name}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} py={1}>
                        <MDInput
                          required
                          sx={{ width: "80%" }}
                          name={values.search_by === "Fee Code" ? "fee_code" : "admission_number"}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              {values.search_by === "Fee Code" ? "Fee Code" : "Admission Number"}
                            </MDTypography>
                          }
                          onChange={handleChange}
                          value={
                            values.search_by === "Fee Code"
                              ? values.fee_code
                              : values.admission_number
                          }
                          variant="standard"
                          onBlur={handleBlur}
                          error={
                            touched[
                              values.search_by === "Fee Code" ? "fee_code" : "admission_number"
                            ] &&
                            Boolean(
                              errors[
                                values.search_by === "Fee Code" ? "fee_code" : "admission_number"
                              ]
                            )
                          }
                          helperText={
                            touched[
                              values.search_by === "Fee Code" ? "fee_code" : "admission_number"
                            ] &&
                            errors[
                              values.search_by === "Fee Code" ? "fee_code" : "admission_number"
                            ]
                          }
                        />
                      </Grid>
                    </>
                  )}

                  {values.search_by === "Name" && (
                    <>
                      <Grid item xs={12} sm={4} py={1}>
                        <Autocomplete
                          disableClearable
                          value={values.name || ""}
                          onChange={(event, value) =>
                            handleChange({ target: { name: "name", value } })
                          }
                          options={student.map(
                            (item: any) =>
                              `${item.first_name} ${item.middle_name} ${item.last_name}`
                          )}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              name="name"
                              placeholder="Select Name"
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Name
                                </MDTypography>
                              }
                              variant="standard"
                              error={touched.name && Boolean(errors.name)}
                              helperText={touched.name && errors.name}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4} py={1}>
                        <Autocomplete
                          disableClearable
                          value={values.father_name || ""}
                          onChange={(event, value) => {
                            handleChange({ target: { name: "father_name", value } });
                            setConcessiondata(
                              concessiondata.filter(
                                (item: any) =>
                                  `${item.first_name} ${item.middle_name} ${item.last_name}` ===
                                  values.name
                              )
                            );
                          }}
                          options={student
                            .filter(
                              (item: any) =>
                                `${item.first_name} ${item.middle_name} ${item.last_name}` ===
                                values.name
                            )
                            .map((fitem: any) => fitem.father_name)}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              required
                              name="father_name"
                              placeholder="Select Father's Name"
                              label={
                                <MDTypography variant="button" fontWeight="bold" color="secondary">
                                  Father&apos;s Name
                                </MDTypography>
                              }
                              variant="standard"
                              error={touched.father_name && Boolean(errors.father_name)}
                              helperText={touched.father_name && errors.father_name}
                            />
                          )}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <DataTable table={dataTableData} selectColumnBtn importbtn />
            </Grid>
          </MDBox>
        </form>
      </Card>
      <Drawer
        //   zIndex={5}
        title={title}
        placement="right"
        onClose={onClose}
        open={open}
        width={1100}
        style={{
          background: darkMode ? "#202940" : "white",
          paddingTop: "10%",
        }}
      >
        {/* verticle table bar  */}
        <MDBox
          sx={{
            bgcolor: "background.paper",
            // width: 500,
            position: "relative",
            minHeight: 200,
          }}
        >
          {(() => {
            switch (title) {
              case "Paid Fees":
                return <PaidFees mainData={mainData} collection_date={values.collection_date} />;
              case "Unpaid Fees":
                return <UnPaidFees mainData={mainData} collection_date={values.collection_date} />;
              case "Pay Fee":
                return <PayFee mainData={mainData} collection_date={values.collection_date} />;

              default:
                return null;
            }
          })()}
        </MDBox>
      </Drawer>
    </DashboardLayout>
  );
};

export default FeeCollection;
