import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MDTypography from "components/MDTypography";
import { Grid, Avatar, Dialog } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cookies from "js-cookie";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Icon from "@mui/material/Icon";
import { message } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Update from "./update";
import { I18nextProvider, useTranslation } from "react-i18next";
import createTrans from "layouts/pages/translater/student_module";
const token = Cookies.get("token");
const organisationType = "college";

function SchoolShowPage() {
  const { t } = useTranslation();
  const [schoolData, setSchoolData] = useState({
    school_name: "",
    school_code: "",
    start_time: "",
    end_time: "",
    affilicated_to: "",
    reg_num: "",
    mg_leave_calendar_start_date: "",
    address_line1: "",
    address_line2: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pin_code: "",
    country: "",
    mobile_number: "",
    fax_number: "000000000000",
    email_id: "",
    timezone: "IST",
    currency_type: "INR",

    school_logo: null,
  });
  const fetchSchoolInfo = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_school`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSchoolData(response.data);
        console.log(response.data, "school information");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchSchoolInfo();
  }, []);

  if (!schoolData) return <>loading...</>;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <I18nextProvider i18n={createTrans}>
        {open ? (
          <Update schoolData={schoolData} handleClose={handleClose} fetchData={fetchSchoolInfo} />
        ) : (
          <>
            <Grid container justifyContent={""}>
              <Grid container item sm={6} my={2} spacing={1}>
                <Grid item>
                  <MDAvatar
                    bgColor="secondary"
                    size="sm"
                    onClick={() => handleOpen()}
                    variant="square"
                  >
                    <ModeEditOutlineIcon />
                  </MDAvatar>
                </Grid>
                <Grid item>
                  <MDTypography variant="body1" color="secondary" fontWeight="bold">
                    {t("Edit")}
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid item sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <MDAvatar alt="School Logo" size="xxl" src={schoolData?.school_logo} />
              </Grid>
            </Grid>

            <MDBox pt={2}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item sm={12} py={2}>
                      <MDTypography variant="h4" color="info" fontWeight="bold">
                        {/* {organisationType == "school"}&&{t("school_details")} */}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                        gutterBottom
                      >
                        {t("school_name")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("school_code")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("start_time")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.school_name?.toUpperCase()}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.school_code}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.start_time}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("end_time")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("affiliated_to")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("affiliated_no_reg_no")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.end_time}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.affilicated_to}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.reg_num}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("leave_calender_start_date")}
                      </MDTypography>
                    </Grid>{" "}
                    <Grid item sm={4}></Grid>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.mg_leave_calendar_start_date}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </MDBox>

            <MDBox pt={2}>
              {" "}
              <Card>
                <CardContent>
                  <Grid container>
                    {" "}
                    <Grid item sm={12} py={2}>
                      <MDTypography variant="h4" color="info" fontWeight="bold">
                        {t("address_details")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("address_line_1")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("address_line_2")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("street")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.address_line1}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.address_line2}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.street}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("city")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("state")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("pincode")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.city}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.state}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.pin_code}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("landmark")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("country")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.landmark}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.country}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </MDBox>
            <MDBox pt={2}>
              {" "}
              <Card>
                <CardContent>
                  <Grid container>
                    {" "}
                    <Grid item sm={12} py={2}>
                      <MDTypography variant="h4" color="info" fontWeight="bold">
                        {t("contact_details")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("phone_number")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("email")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography
                        variant="button"
                        color="secondary"
                        fontWeight="bold"
                        component="div"
                      >
                        {t("फैक्स नंबर")}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.mobile_number}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.email_id}
                      </MDTypography>
                    </Grid>
                    <Grid item sm={4}>
                      <MDTypography variant="body2" fontWeight="bold" component="div" gutterBottom>
                        {schoolData?.fax_number}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </MDBox>
          </>
        )}
      </I18nextProvider>
    </DashboardLayout>
  );
}

export default SchoolShowPage;
