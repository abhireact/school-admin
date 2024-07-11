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
import { Autocomplete, Box, Card, Tooltip, useMediaQuery } from "@mui/material";
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
  const [data, setData] = useState([]);

  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormik({
    initialValues: {
      department: "",
      employee: "",
      name: "ANMOL",
      id: "D12345",
      designation: "Teacher",
      fromDate: "15/11/2022",
      toDate: "30/06/2024",
      description: "responsible, enthusiastic and hardworking during her work tenure.",
    },

    onSubmit: (values, action) => {},
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });
  return (
    <BaseLayout>
      <Card>
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
                <Grid my={10}>
                  <MDTypography
                    style={{ fontStyle: "italic", textDecoration: "underline" }}
                    variant="h5"
                    align="center"
                    color="dark"
                    gutterBottom
                  >
                    TO WHOMSOEVER IT MAY CONCERN
                  </MDTypography>
                  <MDTypography
                    style={{ fontStyle: "italic" }}
                    fontWeight="bold"
                    variant="subtitle2"
                    gutterBottom
                  >
                    This is to certify that Miss. ANAMIKA SINGH D/o Aman has worked as a teacher
                    role at our School from 01/04/2022 to 01/07/2024.
                  </MDTypography>
                  <MDTypography
                    style={{ fontStyle: "italic" }}
                    fontWeight="bold"
                    variant="subtitle2"
                    gutterBottom
                  >
                    We found her responsible, enthusiastic and hardworking during her work tenure.
                    She can prove to be an asset for any organization. We wish her success in her
                    future endeavors.
                  </MDTypography>
                  <MDTypography
                    style={{ fontStyle: "italic" }}
                    fontWeight="bold"
                    variant="subtitle2"
                    gutterBottom
                  >
                    This experience certificate is being issued at the request of Miss. ANAMIKA
                    SINGH
                  </MDTypography>
                  <Box display="flex" justifyContent="space-between" marginTop="40px">
                    <MDTypography
                      style={{ fontStyle: "italic" }}
                      fontWeight="bold"
                      variant="subtitle2"
                    >
                      Date : 11/07/2024
                    </MDTypography>
                    <MDTypography
                      style={{ fontStyle: "italic" }}
                      fontWeight="bold"
                      variant="subtitle2"
                      align="right"
                    >
                      Principal
                    </MDTypography>
                  </Box>
                </Grid>
              </div>
              <MDBox className="report-hidden-text" ref={certificateRef}>
                <CertificatePDF field1="" />
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
                  <MDButton color="info" variant="contained" onClick={() => handlePrint()}>
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
                        LAST DATE OF ISSUE
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
                      <MDTypography variant="h6" fontWeight="bold" color="secondary"></MDTypography>
                    </Grid>

                    <Grid item sm={3} xs={3}>
                      <MDTypography variant="h6" fontWeight="bold" color="secondary"></MDTypography>
                    </Grid>
                  </Grid>
                  <Grid mt={4}>
                    <MDButton
                      color="info"
                      variant="contained"
                      onClick={() => setShowCertificate(true)}
                    >
                      Experience Certificate
                    </MDButton>
                  </Grid>
                </>
              )}
            </>
          )}
        </MDBox>
      </Card>
    </BaseLayout>
  );
};

export default EmployeeCertificate;
