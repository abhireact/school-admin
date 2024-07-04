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

const FeeCollection = (props: any) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [mainData, setMainData] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

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
  const [academicdata, setAcademicdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);
  const { wings, academicyear, classes, student } = useSelector((state: any) => state);
  console.log(wings, academicyear, student, "redux Data");
  const [concessiondata, setConcessiondata] = useState(student);
  let today = new Date().toISOString().split("T")[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Set loading state to true before fetching data
    setConcessiondata(student);
    setIsLoading(false); // Set loading state to false after data is fetched
  }, []);
  console.log(concessiondata, "collection datav ");
  const Cacademic_year = Cookies.get("academic_year");
  console.log(Cacademic_year, "Cacademic_year");

  //  const {wings,academicyear,classes}=useSelector
  function filterClassData(data: any, academic_year: any) {
    let filtereddata = data
      .filter((item: any) => item.academic_year === academic_year)
      .map((item: any) => item.class_name);
    setFilteredClass(filtereddata);
  }
  const [sectiondata, setsectiondata] = useState([]);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
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
        search_by: [] as string[],
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
        (
          row: {
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
          },
          index: any
        ) => ({
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
  }, [concessiondata, values.search_by, values]);
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
            <Grid container>
              {showadvanceSearch ? (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} py={1} display="flex" justifyContent="flex-center">
                    <FormControl>
                      <MDTypography
                        variant="h5"
                        fontWeight="bold"
                        color="secondary"
                        // sx={{ marginLeft: "20px" }}
                      >
                        Search By:
                      </MDTypography>

                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        name="search_by"
                        // value={values.search_by}
                        // onChange={handleSearchByChange}
                      >
                        <FormControlLabel
                          //   value="female"
                          control={
                            <Radio
                              // checked={values.search_by.includes("Class")}
                              onChange={handleChange}
                              name="search_by"
                              value="Class"
                            />
                          }
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Class{" "}
                            </MDTypography>
                          }
                        />
                        <FormControlLabel
                          // value="male"
                          control={
                            <Radio
                              // checked={values.search_by.includes("Addmission No")}
                              onChange={handleChange}
                              name="search_by"
                              value="Admission No"
                            />
                          }
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Admission No{" "}
                            </MDTypography>
                          }
                        />
                        <FormControlLabel
                          // value="male"
                          control={
                            <Radio
                              // checked={values.search_by.includes("Addmission No")}
                              onChange={handleChange}
                              name="search_by"
                              value="Fee Code"
                            />
                          }
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Fee Code{" "}
                            </MDTypography>
                          }
                        />
                        <FormControlLabel
                          // value="male"
                          control={
                            <Radio
                              // checked={values.search_by.includes("Addmission No")}
                              onChange={handleChange}
                              name="search_by"
                              value="Name"
                            />
                          }
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Name
                            </MDTypography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3} py={1}>
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
                      disableClearable
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
                              Academic Year
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} py={1} display="flex" justifyContent="flex-start">
                    <MDInput
                      type="date"
                      onKeyDown={(e: { preventDefault: () => any }) => e.preventDefault()} // Prevent typing
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: "80%" }}
                      name="collection_date"
                      label={
                        <MDTypography variant="button" fontWeight="bold" color="secondary">
                          Collection Date{" "}
                        </MDTypography>
                      }
                      onChange={handleChange}
                      value={values.collection_date}
                      variant="standard"
                      onBlur={handleBlur}
                      error={touched.collection_date && Boolean(errors.collection_date)}
                      success={values.collection_date.length && !errors.collection_date}
                      helperText={touched.collection_date && errors.collection_date}
                    />
                  </Grid>
                </Grid>
              ) : null}

              {showadvanceSearch && values.search_by && values.search_by[0] === "C" ? (
                // Render the first set of components
                <Grid container spacing={3}>
                  {" "}
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      disableClearable
                      value={values.class_name || ""}
                      onChange={(_event, value) => {
                        setConcessiondata(
                          concessiondata.filter(
                            (item: any) => item.academic_year === values.academic_year
                            // item.class_name === values.class_name
                          )
                        );
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
                          name="class_name"
                          value={values.class_name || ""}
                          onChange={handleChange}
                          // value={values.class_name || ""} // Pass an empty string when class_name needs to be cleared
                          // onChange={(event: any, value: any) => setFieldValue("class_name", value)}
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Class
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      disableClearable
                      value={values.section_name || ""} // Pass an empty string when section_name needs to be cleared
                      // onChange={(event, value) => setFieldValue("section_name", value)}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "section_name", value } });
                        setFieldValue("section_name", value);
                        setConcessiondata(
                          concessiondata.filter(
                            (item: any) => item.class_name === values.class_name
                            // item.section_name === values.section_name
                          )
                        );
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
                              Section
                            </MDTypography>
                          }
                          {...params}
                          variant="standard"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              ) : (showadvanceSearch && values.search_by && values.search_by[0] === "A") ||
                values.search_by[0] === "F" ? (
                // Render the second set of components
                <Grid container spacing={3}>
                  {" "}
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "100%" }}
                      // value={values.wing_name || "All"}
                      // onChange={(event, value) => {
                      //   handleChange({
                      //     target: { name: "wing_name", value },
                      //   });
                      // }}
                      value={values.wing_name === "All" ? "All" : ""} // Pass an empty string when wing_name needs to be cleared
                      onChange={(event, value) => setFieldValue("wing_name", value)}
                      options={["All", ...wings?.map((acd: { wing_name: any }) => acd?.wing_name)]}
                      renderInput={(params: any) => (
                        <MDInput
                          required
                          InputLabelProps={{ shrink: true }}
                          name="wing_name"
                          placeholder="Select Wing "
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Wing Name{" "}
                            </MDTypography>
                          }
                          onChange={handleChange}
                          value={values.wing_name || "All"}
                          {...params}
                          variant="standard"
                          error={touched.wing_name && Boolean(errors.wing_name)}
                          helperText={touched.wing_name && errors.wing_name}
                        />
                      )}
                    />
                  </Grid>{" "}
                  {values.search_by && values.search_by[0] === "F" ? (
                    <Grid item xs={12} sm={4} py={1}>
                      <MDInput
                        required
                        sx={{ width: "80%" }}
                        name="fee_code"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Fee Code
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.fee_code}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.fee_code && Boolean(errors.fee_code)}
                        success={values.fee_code.length && !errors.fee_code}
                        helperText={touched.fee_code && errors.fee_code}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={4} py={1}>
                      <MDInput
                        required
                        sx={{ width: "80%" }}
                        name="admission_number"
                        label={
                          <MDTypography variant="button" fontWeight="bold" color="secondary">
                            Admission Number
                          </MDTypography>
                        }
                        onChange={handleChange}
                        value={values.admission_number}
                        variant="standard"
                        onBlur={handleBlur}
                        error={touched.admission_number && Boolean(errors.admission_number)}
                        success={values.admission_number.length && !errors.admission_number}
                        helperText={touched.admission_number && errors.admission_number}
                      />
                    </Grid>
                  )}
                </Grid>
              ) : showadvanceSearch && values.search_by && values.search_by[0] === "N" ? (
                // Render the second set of components
                <Grid container spacing={3}>
                  {" "}
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "100%" }}
                      value={values.name || ""}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "name", value },
                        });
                      }}
                      options={student.map(
                        (item: any) => `${item.first_name} ${item.middle_name} ${item.last_name}`
                      )}
                      renderInput={(params: any) => (
                        <MDInput
                          InputLabelProps={{ shrink: true }}
                          name="name"
                          placeholder="2022-23"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Name{" "}
                            </MDTypography>
                          }
                          onChange={handleChange}
                          value={values.name}
                          {...params}
                          variant="standard"
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid item xs={12} sm={4} py={1}>
                    <Autocomplete
                      disableClearable
                      sx={{ width: "100%" }}
                      value={values.father_name}
                      onChange={(event, value) => {
                        handleChange({
                          target: { name: "father_name", value },
                        });
                        setConcessiondata(
                          concessiondata.filter(
                            (item: any) =>
                              `${item.first_name} ${item.middle_name} ${item.last_name}` ==
                              values.name
                            // item.section_name === values.section_name
                          )
                        );
                      }}
                      options={student
                        .filter(
                          (item: any) =>
                            `${item.first_name} ${item.middle_name} ${item.last_name}` ==
                            values.name
                        )
                        .map((fitem: any) => fitem.father_name)}
                      // options={["ddfd"]}
                      renderInput={(params: any) => (
                        <MDInput
                          required
                          InputLabelProps={{ shrink: true }}
                          name="father_name"
                          placeholder="2022-23"
                          label={
                            <MDTypography variant="button" fontWeight="bold" color="secondary">
                              Father Name{" "}
                            </MDTypography>
                          }
                          onChange={handleChange}
                          value={values.father_name}
                          {...params}
                          variant="standard"
                          error={touched.father_name && Boolean(errors.father_name)}
                          helperText={touched.father_name && errors.father_name}
                        />
                      )}
                    />
                  </Grid>{" "}
                </Grid>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* {isLoading ? (
                "  <LoadingIndicator />"
              ) : concessiondata.length > 0 ? (
                <DataTable table={dataTableData} importbtn />
              ) : (
                "     <NoDataMessage />"
              )} */}
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
