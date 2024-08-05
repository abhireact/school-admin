import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import DialogContent from "@mui/material/DialogContent";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import HeaderPdf from "layouts/pages/Mindcompdf/HeaderPdf";
import {
  Autocomplete,
  Box,
  Card,
  Tooltip,
  useMediaQuery,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { message, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import MDBox from "components/MDBox";
import { useFormik } from "formik";
import MDInput from "components/MDInput";
import CertificatePDF from "./pdf_certificate";
import { useReactToPrint } from "react-to-print";
const token = Cookies.get("token");
const EmployeeCertificate = () => {
  // To fetch rbac from redux:  Start
  // const rbacData = useSelector((state: any) => state.reduxData?.rbacData);
  // console.log("rbac user", rbacData);
  //End

  // Fetch rbac  Date from useEffect: Start

  const [rbacData, setRbacData] = useState([]);
  const fetchRbac = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/mg_rbac_current_user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("rbac user", response.data);
        setRbacData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRbac();
  }, [token]);
  //End
  const [employeeInfo, setEmployeeInfo] = useState([]);

  const fetchEmployees = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_employees`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployeeInfo(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const [departmentInfo, setDepartmentInfo] = useState([]);
  const fetchDepartment = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/employee_department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        setDepartmentInfo(response.data);
        console.log(response.data, "department info");
      })
      .catch((error) => {
        setDepartmentInfo([]);
        message.error(error.response.data.detail);
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartment();
  }, []);
  const [userName, setUserName] = useState("");
  const [certificateData, setCertificateData] = useState({
    employee_name: "",
    title: "",
    guardian_title: "",
    guardian_name: "",
    subjects: "",
    designation: "",
    joining_date: "",
    last_working_date: "",
    title_sub: "",
    title_sub1: "",
    title_sub2: "",
  });
  const fetchCertificateData = (user_name: string) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_employee_experience_certificate/retrive`,
        { user_name: user_name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        setCertificateData(response.data);
        console.log(response.data, "certificate data");
      })
      .catch((error) => {
        // message.error(error.response.data.detail);
        setCertificateData({
          employee_name: "",
          title: "",
          guardian_title: "",
          guardian_name: "",
          subjects: "",
          designation: "",
          joining_date: "",
          last_working_date: "",
          title_sub: "",
          title_sub1: "",
          title_sub2: "",
        });
        console.error("Error fetching data:", error);
      });
  };

  const [data, setData] = useState([]);

  const { values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        department: "",
        employee: "",
        user_name: userName,
        title: certificateData.title,
        employee_name: certificateData.employee_name,
        guardian_title: certificateData.guardian_title,
        guardian_name: certificateData.guardian_name,
        subjects: certificateData.subjects,
        designation: certificateData.designation,
        joining_date: certificateData.joining_date,
        last_working_date: certificateData.last_working_date,
        title_sub: certificateData.title_sub,
        title_sub1: certificateData.title_sub1,
        title_sub2: certificateData.title_sub2,
      },
      enableReinitialize: true,

      onSubmit: (values, action) => {
        if (issuedData.no_of_time_issued) {
          let sendData = {
            user_name: values.employee?.split("/")[0],
            title: values.title,
            employee_name: values.employee_name,
            guardian_title: values.guardian_title,
            guardian_name: values.guardian_name,
            subjects: values.subjects,
            designation: values.designation,
            joining_date: values.joining_date,
            last_working_date: values.last_working_date,
            title_sub: values.title_sub,
            title_sub1: values.title_sub1,
            title_sub2: values.title_sub2,
            issued_times: issuedData.no_of_time_issued + 1,
            date_of_issue: issuedData.date_of_issue,
          };
          axios
            .put(`${process.env.REACT_APP_BASE_URL}/mg_employee_experience_certificate`, sendData, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then(() => {
              handlePrint();
              message.success("Experience Certificate Issued");
            })
            .catch((error) => {
              message.error(error.response.data.detail);

              console.error("Error fetching data:", error);
            });
        } else {
          let sendData = {
            user_name: values.employee?.split("/")[0],
            title: values.title,
            employee_name: values.employee_name,
            guardian_title: values.guardian_title,
            guardian_name: values.guardian_name,
            subjects: values.subjects,
            designation: values.designation,
            joining_date: values.joining_date,
            last_working_date: values.last_working_date,
            title_sub: values.title_sub,
            title_sub1: values.title_sub1,
            title_sub2: values.title_sub2,
            issued_times: 1,
            date_of_issue: new Date().toISOString().split("T")[0],
          };
          axios
            .post(
              `${process.env.REACT_APP_BASE_URL}/mg_employee_experience_certificate`,
              sendData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(() => {
              handlePrint();
              message.success("Experience Certificate Issued");
            })
            .catch((error) => {
              message.error(error.response.data.detail);

              console.error("Error fetching data:", error);
            });
        }
      },
    });
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });
  const [issuedData, SetIssuedData] = useState({
    name: "",
    date_of_issue: "",
    no_of_time_issued: "",
  });
  const fetchCertificateIssued = (department: string, user_name: string) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/mg_employee_experience_certificate/get_employee_experiance`,
        { department_name: department, user_name: user_name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        SetIssuedData(response.data);
        console.log(response.data, "department info");
      })
      .catch((error) => {
        message.error(error.response.data.detail);
        console.error("Error fetching data:", error);
      });
  };

  return (
    <BaseLayout>
      <Card>
        <form onSubmit={handleSubmit}>
          <MDBox p={4}>
            <Grid container>
              <Grid item xs={12} sm={12} my={2}>
                <MDTypography variant="h4" color="secondary" fontWeight="bold">
                  Experience Certificate
                </MDTypography>
              </Grid>
            </Grid>
            {showCertificate ? (
              <>
                <div
                  style={{
                    fontFamily: "Arial, sans-serif",
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "20px",
                    border: "1px solid #ddd",
                  }}
                >
                  <Grid my={10} container>
                    <HeaderPdf isPdfMode={true} />
                    <Grid item container display="flex" justifyContent="center">
                      <MDTypography
                        style={{ fontStyle: "italic", textDecoration: "underline" }}
                        variant="h5"
                        color="dark"
                        gutterBottom
                      >
                        TO WHOMSOEVER IT MAY CONCERN
                      </MDTypography>
                    </Grid>
                    <Grid item>
                      <MDTypography
                        style={{ fontStyle: "italic" }}
                        fontWeight="bold"
                        variant="subtitle2"
                        gutterBottom
                      >
                        <Box display="flex" flexWrap="wrap" alignItems="baseline">
                          This is to certify that
                          <Select
                            value={values.title}
                            onChange={handleChange}
                            autoWidth={true}
                            name="title"
                            variant="standard"
                            sx={{
                              width: "50px",
                            }}
                          >
                            <MenuItem value={"Miss."} onClick={handleChange}>
                              Miss.
                            </MenuItem>
                            <MenuItem value={"Mr."} onClick={handleChange}>
                              Mr.
                            </MenuItem>
                          </Select>
                          <MDInput
                            required
                            onChange={handleChange}
                            sx={{
                              width: "200px",
                              margin: "0 8px",
                              "& .MuiInput-input": {
                                paddingBottom: "0",
                              },
                            }}
                            name="employee_name"
                            value={values.employee_name}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.employee_name && Boolean(errors.employee_name)}
                            helperText={touched.employee_name && errors.employee_name}
                          />
                          <Select
                            value={values.guardian_title}
                            onChange={handleChange}
                            autoWidth={true}
                            name="guardian_title"
                            variant="standard"
                            sx={{
                              width: "50px",
                              margin: "0 8px",
                              "& .MuiSelect-select": {
                                paddingBottom: "0",
                              },
                            }}
                          >
                            <MenuItem value={"S/o"} onClick={handleChange}>
                              S/o
                            </MenuItem>
                            <MenuItem value={"D/o"} onClick={handleChange}>
                              D/o
                            </MenuItem>
                          </Select>
                          <MDInput
                            required
                            onChange={handleChange}
                            sx={{
                              width: "200px",
                              margin: "0 8px",
                              "& .MuiInput-input": {
                                paddingBottom: "0",
                              },
                            }}
                            name="guardian_name"
                            value={values.guardian_name}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.guardian_name && Boolean(errors.guardian_name)}
                            helperText={touched.guardian_name && errors.guardian_name}
                          />
                          has worked as a
                          <MDInput
                            required
                            onChange={handleChange}
                            sx={{
                              width: "150px",
                              margin: "0 8px",
                              "& .MuiInput-input": {
                                paddingBottom: "0",
                              },
                            }}
                            name="subjects"
                            value={values.subjects}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.subjects && Boolean(errors.subjects)}
                            helperText={touched.subjects && errors.subjects}
                          />
                          <MDInput
                            required
                            onChange={handleChange}
                            sx={{
                              width: "150px",
                              margin: "0 8px",
                              "& .MuiInput-input": {
                                paddingBottom: "0",
                              },
                            }}
                            name="designation"
                            value={values.designation}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.designation && Boolean(errors.designation)}
                            helperText={touched.designation && errors.designation}
                          />
                          at our School from
                          <MDInput
                            required
                            onChange={handleChange}
                            sx={{
                              width: "150px",
                              margin: "0 8px",
                              "& .MuiInput-input": {
                                paddingBottom: "0",
                              },
                            }}
                            type="date"
                            name="joining_date"
                            value={values.joining_date}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.joining_date && Boolean(errors.joining_date)}
                            helperText={touched.joining_date && errors.joining_date}
                          />
                          to
                          <MDInput
                            required
                            onChange={handleChange}
                            sx={{
                              width: "150px",
                              margin: "0 8px",
                              "& .MuiInput-input": {
                                paddingBottom: "0",
                              },
                            }}
                            type="date"
                            name="last_working_date"
                            value={values.last_working_date}
                            variant="standard"
                            onBlur={handleBlur}
                            error={touched.last_working_date && Boolean(errors.last_working_date)}
                            helperText={touched.last_working_date && errors.last_working_date}
                          />
                          .
                        </Box>
                      </MDTypography>
                    </Grid>
                    <Grid item>
                      <MDTypography
                        style={{ fontStyle: "italic" }}
                        fontWeight="bold"
                        variant="subtitle2"
                        gutterBottom
                      >
                        We found
                        <Select
                          value={values.title_sub}
                          onChange={handleChange}
                          autoWidth={true}
                          name="title_sub"
                          variant="standard"
                          sx={{
                            width: "50px",
                            margin: "0 8px",
                            "& .MuiSelect-select": {
                              paddingBottom: "0",
                            },
                          }}
                        >
                          <MenuItem value={"him"} onClick={handleChange}>
                            him
                          </MenuItem>
                          <MenuItem value={"her"} onClick={handleChange}>
                            her
                          </MenuItem>
                        </Select>
                        responsible, enthusiastic and hardworking during
                        <Select
                          value={values.title_sub2}
                          onChange={handleChange}
                          autoWidth={true}
                          name="title_sub2"
                          variant="standard"
                          sx={{
                            width: "50px",
                            margin: "0 8px",
                            "& .MuiSelect-select": {
                              paddingBottom: "0",
                            },
                          }}
                        >
                          <MenuItem value={"his"} onClick={handleChange}>
                            his
                          </MenuItem>
                          <MenuItem value={"her"} onClick={handleChange}>
                            her
                          </MenuItem>
                        </Select>
                        work tenure.
                        <Select
                          value={values.title_sub1}
                          onChange={handleChange}
                          autoWidth={true}
                          name="title_sub1"
                          variant="standard"
                          sx={{
                            width: "50px",
                            margin: "0 8px",
                            "& .MuiSelect-select": {
                              paddingBottom: "0",
                            },
                          }}
                        >
                          <MenuItem value={"He"} onClick={handleChange}>
                            He
                          </MenuItem>
                          <MenuItem value={"She"} onClick={handleChange}>
                            She
                          </MenuItem>
                        </Select>
                        can prove to be an asset for any organization. We wish
                        <Select
                          value={values.title_sub}
                          onChange={handleChange}
                          autoWidth={true}
                          name="title_sub"
                          variant="standard"
                          sx={{
                            width: "50px",
                            margin: "0 8px",
                            "& .MuiSelect-select": {
                              paddingBottom: "0",
                            },
                          }}
                        >
                          <MenuItem value={"him"} onClick={handleChange}>
                            him
                          </MenuItem>
                          <MenuItem value={"her"} onClick={handleChange}>
                            her
                          </MenuItem>
                        </Select>
                        success in
                        <Select
                          value={values.title_sub2}
                          onChange={handleChange}
                          autoWidth={true}
                          name="title_sub2"
                          variant="standard"
                          sx={{
                            width: "50px",
                            margin: "0 8px",
                            "& .MuiSelect-select": {
                              paddingBottom: "0",
                            },
                          }}
                        >
                          <MenuItem value={"his"} onClick={handleChange}>
                            his
                          </MenuItem>
                          <MenuItem value={"her"} onClick={handleChange}>
                            her
                          </MenuItem>
                        </Select>
                        future endeavors.
                      </MDTypography>
                    </Grid>
                    <Grid item>
                      <MDTypography
                        style={{ fontStyle: "italic" }}
                        fontWeight="bold"
                        variant="subtitle2"
                        gutterBottom
                      >
                        This experience certificate is being issued at the request of
                        <Select
                          value={values.title}
                          onChange={handleChange}
                          autoWidth={true}
                          name="title"
                          variant="standard"
                          sx={{
                            width: "50px",
                          }}
                        >
                          <MenuItem value={"Miss."} onClick={handleChange}>
                            Miss.
                          </MenuItem>
                          <MenuItem value={"Mr."} onClick={handleChange}>
                            Mr.
                          </MenuItem>
                        </Select>
                        <MDInput
                          required
                          onChange={handleChange}
                          sx={{
                            width: "200px",
                            margin: "0 8px",
                            "& .MuiInput-input": {
                              paddingBottom: "0",
                            },
                          }}
                          name="employee_name"
                          value={values.employee_name}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.employee_name && Boolean(errors.employee_name)}
                          helperText={touched.employee_name && errors.employee_name}
                        />
                      </MDTypography>
                    </Grid>
                    <Grid container display="flex" justifyContent="space-between" marginTop="40px">
                      <Grid item>
                        <MDTypography
                          style={{ fontStyle: "italic" }}
                          fontWeight="bold"
                          variant="subtitle2"
                        >
                          Date :
                          {new Date()
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                            .replace(/\//g, "/")}
                        </MDTypography>
                      </Grid>
                      <Grid item>
                        <MDTypography
                          style={{ fontStyle: "italic" }}
                          fontWeight="bold"
                          variant="subtitle2"
                          align="right"
                        >
                          Principal
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
                <MDBox className="report-hidden-text" ref={certificateRef}>
                  <CertificatePDF values={values} />
                </MDBox>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  py={2}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <Grid item mr={2}>
                    <MDButton
                      color="dark"
                      variant="contained"
                      onClick={() => setShowCertificate(false)}
                    >
                      Back
                    </MDButton>
                  </Grid>
                  <Grid item>
                    <MDButton color="info" type="submit" variant="contained">
                      Generate PDF
                    </MDButton>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableClearable
                      value={values.department}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "department", value } });
                        setFieldValue("employee", "");

                        setData(employeeInfo.filter((info: any) => info.department == value));
                      }}
                      options={departmentInfo.map((item: any) => item.dept_name) || []}
                      renderInput={(params) => (
                        <MDInput
                          name="department"
                          //onChange={handleChange}
                          value={values.department}
                          label={"Department"}
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.department && Boolean(errors.department)}
                          success={values.department && !errors.department}
                          helperText={touched.department && errors.department}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      disableClearable
                      value={values.employee}
                      onChange={(_event, value) => {
                        handleChange({ target: { name: "employee", value } });
                        setFieldValue("employee_name", value.split("/")[1]);
                        fetchCertificateIssued(values.department, value.split("/")[0]);
                        setFieldValue("user_name", value.split("/")[0]);
                      }}
                      options={
                        data?.map((item: any) => `${item.user_id}/${item.employee_name}`) || []
                      }
                      renderInput={(params) => (
                        <MDInput
                          name="employee"
                          //onChange={handleChange}
                          value={values.employee}
                          label={"Employee"}
                          {...params}
                          variant="standard"
                          onBlur={handleBlur}
                          error={touched.employee && Boolean(errors.employee)}
                          success={values.employee && !errors.employee}
                          helperText={touched.employee && errors.employee}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                {values.employee && (
                  <>
                    <Grid container mt={4}>
                      <Grid item sm={3} xs={3}>
                        <MDTypography variant="h6" fontWeight="bold" color="dark">
                          NAME
                        </MDTypography>
                      </Grid>
                      <Grid item sm={3} xs={3}>
                        <MDTypography variant="h6" fontWeight="bold" color="dark">
                          USER ID
                        </MDTypography>
                      </Grid>
                      <Grid item sm={3} xs={3}>
                        <MDTypography variant="h6" fontWeight="bold" color="dark">
                          DATE OF ISSUE
                        </MDTypography>
                      </Grid>
                      <Grid item sm={3} xs={3}>
                        <MDTypography variant="h6" fontWeight="bold" color="dark">
                          NO. OF TIMES ISSUED
                        </MDTypography>
                      </Grid>
                      <Grid item sm={3} xs={3}>
                        <MDTypography variant="h6" fontWeight="bold" color="secondary">
                          {values.employee.split("/")[1]}
                        </MDTypography>
                      </Grid>
                      <Grid item sm={3} xs={3}>
                        <MDTypography variant="h6" fontWeight="bold" color="secondary">
                          {values.employee.split("/")[0]}
                        </MDTypography>
                      </Grid>
                      <Grid item sm={3} xs={3}>
                        <MDTypography variant="h6" fontWeight="bold" color="secondary">
                          {issuedData.date_of_issue}
                        </MDTypography>
                      </Grid>

                      <Grid item sm={3} xs={3}>
                        <MDTypography variant="h6" fontWeight="bold" color="secondary">
                          {issuedData.no_of_time_issued}
                        </MDTypography>
                      </Grid>
                    </Grid>
                    <Grid mt={4}>
                      <MDButton
                        color="info"
                        variant="contained"
                        onClick={() => {
                          fetchCertificateData(values.employee.split("/")[0]);
                          setShowCertificate(true);
                        }}
                      >
                        Experience Certificate
                      </MDButton>
                    </Grid>
                  </>
                )}
              </>
            )}
          </MDBox>
        </form>
      </Card>
    </BaseLayout>
  );
};

export default EmployeeCertificate;
