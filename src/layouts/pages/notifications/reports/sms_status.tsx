import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useFormik } from "formik";
import * as yup from "yup"; // Import yup for validation
import { Grid, Card, FormLabel, Tooltip, Icon } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import axios from "axios";
import Cookies from "js-cookie";
import { Table, message } from "antd";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Drawer } from "antd";
const token = Cookies.get("token");
const current_academic_year = Cookies.get("academic_year");

// Define validation schema using yup
const validationSchema = yup.object().shape({
  start_date: yup.date().required("Start Date is required"),
  end_date: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("start_date"), "End Date must be after Start Date"),
});

const initialValues = {
  start_date: "",
  end_date: "",
};

export default function SmsStatusReport() {
  const [smsData, setSmsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoding] = useState(false);
  const [sendedData, setsendedData] = useState([]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoding(true);
      console.log("submit inside onSubmit");

      axios
        .post("http://10.0.20.200:8000/sms_notifications/reports", values, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSmsData(response.data);
          setLoding(false);
        })
        .catch((error) => {
          message.error(error.response.data.detail);
          setLoding(false);
        });
    },
  });
  const sendeddataOpen = (data: any) => {
    setsendedData(data.actions);
    setOpen(true);
  };
  const SmsSendedTableData = {
    columns: [
      { Header: "Receiver", accessor: "to_user" },
      { Header: "Mobile Number", accessor: "mobile_number" },
      { Header: "Message", accessor: "message" },
      { Header: "Status", accessor: "sms_status" },
      { Header: "Date", accessor: "to_user_date" },
    ],
    rows: sendedData.map((data, index) => ({
      to_user: data.to_user,
      mobile_number: data.mobile_number,
      message: data.message,
      sms_status: data.sms_status,
      to_user_date: data.to_user_date,
    })),
  };
  const SmsTableData = {
    columns: [
      { Header: "Receiver", accessor: "receiver_type" },
      { Header: "Message", accessor: "message" },
      { Header: "Date", accessor: "date" },
      {
        Header: "Status",
        accessor: "sms_status",
      },
      { Header: "ACTIONS", accessor: "action" },
    ],
    rows: smsData.map((data, index) => ({
      receiver_type: data.receiver_type,
      message: data.message,
      date: data.date.substring(0, 10),
      sms_status: data.sms_status,
      action: (
        <Grid container spacing={1}>
          <Grid item>
            <Tooltip title="Show" placement="top">
              <VisibilityIcon fontSize="small" onClick={() => sendeddataOpen(data)} />
            </Tooltip>
          </Grid>
        </Grid>
      ),
    })),
  };
  return (
    <DashboardLayout>
      {/* <DashboardNavbar/> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card>
              <Grid container spacing={3} p={3}>
                <Grid item xs={12} sm={12}>
                  <MDTypography variant="h4" fontWeight="bold" color="secondary">
                    SMS Status
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    type="date"
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="start_date"
                    InputLabelProps={{ shrink: true }}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        Start Date *
                      </MDTypography>
                    }
                    value={values.start_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    success={touched.start_date && !errors.start_date}
                    error={errors.start_date && touched.start_date}
                  />
                  {errors.start_date && touched.start_date && (
                    <MDTypography color="error" variant="caption">
                      {errors.start_date}
                    </MDTypography>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MDInput
                    type="date"
                    sx={{ width: "100%" }}
                    variant="standard"
                    name="end_date"
                    InputLabelProps={{ shrink: true }}
                    label={
                      <MDTypography variant="button" fontWeight="bold" color="secondary">
                        End Date *
                      </MDTypography>
                    }
                    value={values.end_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    success={touched.end_date && !errors.end_date}
                    error={errors.end_date && touched.end_date}
                  />
                  {errors.end_date && touched.end_date && (
                    <MDTypography color="error" variant="caption">
                      {errors.end_date}
                    </MDTypography>
                  )}
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Grid>
                    {loading ? (
                      <MDButton variant="text" color="info">
                        loading...
                      </MDButton>
                    ) : (
                      <MDButton type="submit" variant="outlined" color="info">
                        Show Data
                      </MDButton>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {smsData.length > 0 && (
            <Grid item xs={12} sm={12}>
              <Card>
                <DataTable
                  table={SmsTableData}
                  isSorted={false}
                  showTotalEntries={false}
                  canSearch={true}
                />
              </Card>
            </Grid>
          )}
        </Grid>
        <Drawer
          closable
          destroyOnClose
          title={
            <MDTypography variant="h6" fontWeight="bold" color="secondary">
              Receivers
            </MDTypography>
          }
          placement="right"
          size={"large"}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Grid item xs={12} sm={12}>
            {sendedData && sendedData.length > 0 ? (
              <DataTable
                table={SmsSendedTableData}
                isSorted={false}
                showTotalEntries={false}
                canSearch
              />
            ) : (
              <MDTypography variant="body1">No data available</MDTypography>
            )}
          </Grid>
        </Drawer>
      </form>
    </DashboardLayout>
  );
}
