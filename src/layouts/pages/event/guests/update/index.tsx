import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import { FormControlLabel, FormControl, Radio, RadioGroup, Checkbox } from "@mui/material";

const Update = (props: any) => {
  const token = Cookies.get("token");

  const { setOpenupdate, editData, fetchData } = props;
  const handleClose = () => {
    setOpenupdate(false);
  };
  const [eventData, setEventData] = useState([]);
  const fetchEventCalendar = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_calender`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEventData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event types:", error);
      });
  };
  useEffect(() => {
    fetchEventCalendar();
  }, []);

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        old_guest_name: editData.guest_name,
        guest_name: editData.guest_name,
        guest_details: editData.guest_details,
        mobile_no: editData.mobile_no,
        email_id: editData.email_id,
        status: editData.status,
        event_name: editData.event_name,
      },
      // validationSchema: validationSchema,
      onSubmit: (values, action) => {
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_guest`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            fetchData();
            handleClose();
            message.success("Updated Successfully!");
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <MDBox p={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MDInput
              required
              sx={{ width: "90%" }}
              variant="standard"
              name="guest_name"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Guest Name
                </MDTypography>
              }
              value={values.guest_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.guest_name && Boolean(errors.guest_name)}
              success={values.guest_name.length && !errors.guest_name}
              helperText={touched.guest_name && errors.guest_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              sx={{ width: "90%" }}
              value={values.event_name}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "event_name", value },
                });
              }}
              disableClearable
              options={eventData.map((acd) => acd.title)}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="event_name"
                  required
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Event Name
                    </MDTypography>
                  }
                  //onChange={handleChange}
                  value={values.event_name}
                  {...params}
                  variant="standard"
                  error={touched.event_name && Boolean(errors.event_name)}
                  success={values.event_name && !errors.event_name}
                  helperText={touched.event_name && errors.event_name}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              required
              sx={{ width: "90%" }}
              variant="standard"
              name="mobile_no"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Mobile Number
                </MDTypography>
              }
              value={values.mobile_no}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.mobile_no && Boolean(errors.mobile_no)}
              success={values.mobile_no.length && !errors.mobile_no}
              helperText={touched.mobile_no && errors.mobile_no}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              sx={{ width: "90%" }}
              variant="standard"
              name="email_id"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Email ID
                </MDTypography>
              }
              value={values.email_id}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email_id && Boolean(errors.email_id)}
              success={values.email_id.length && !errors.email_id}
              helperText={touched.email_id && errors.email_id}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              rows={3}
              multiline
              sx={{ width: "90%" }}
              variant="standard"
              name="guest_details"
              label={
                <MDTypography variant="button" fontWeight="bold" color="secondary">
                  Guest Details
                </MDTypography>
              }
              value={values.guest_details}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.guest_details && Boolean(errors.guest_details)}
              success={values.guest_details.length && !errors.guest_details}
              helperText={touched.guest_details && errors.guest_details}
            />
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <Autocomplete
              sx={{ width: "90%" }}
              value={values.status}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "status", value },
                });
              }}
              disableClearable
              options={["Invited", "Will Attend", "Not Attend"]}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="status"
                  required
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Status
                    </MDTypography>
                  }
                  //onChange={handleChange}
                  value={values.status}
                  {...params}
                  variant="standard"
                  error={touched.status && Boolean(errors.status)}
                  success={values.status && !errors.status}
                  helperText={touched.status && errors.status}
                />
              )}
            />
          </Grid>
          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item>
              <MDButton
                color="dark"
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Back
              </MDButton>
            </Grid>
            <Grid item ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save&nbsp; <SaveIcon />
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
