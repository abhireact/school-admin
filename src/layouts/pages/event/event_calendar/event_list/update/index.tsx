// import FormControl from "@mui/material/FormControl";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Radio from "@mui/material/Radio";

import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { message } from "antd";

import axios from "axios";
import Cookies from "js-cookie";
import * as Yup from "yup";
// import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

const Update = (props: any) => {
  const { setOpenupdate, fetchData, editData } = props;
  const token = Cookies.get("token");
  console.log(editData, "edit data ");
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };
  const [eventTypeData, setEventTypeData] = useState([]);
  const [eventCommittees, setEventCommittees] = useState([]);

  const fetchEventTypes = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_type`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEventTypeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event types:", error);
      });
  };

  const fetchEventCommittees = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_event_committee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEventCommittees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event committees:", error);
      });
  };

  useEffect(() => {
    fetchEventTypes();
    fetchEventCommittees();
  }, []);
  // editData to give intial values
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        old_title: editData.title,
        old_event_date: editData.event_date,
        old_end_date: editData.end_date,
        title: editData.title,
        event_type: editData.event_type,
        committee_name: editData.committee_name,
        event_description: editData.event_description,
        event_date: editData.event_date,
        end_date: editData.end_date,
        start_time: editData.start_time,
        end_time: editData.end_time,
      },

      onSubmit: (values, action) => {
        if (values.end_date < values.event_date) {
          message.error("End Date cannot be earlier than Start Date.");
          return;
        }
        if (values.end_time < values.start_time) {
          message.error("End Time cannot be earlier than Start Time.");
          return;
        }
        axios
          .put(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_calender`, values, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            message.success("Updated  Successfully!");
            fetchData();
            handleCloseupdate();
          })
          .catch((error: any) => {
            message.error(error.response.data.detail);
          });

        action.resetForm();
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <MDBox pt={4} px={4} pb={1}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <MDInput
              label="Title"
              value={values.title}
              name="title"
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              error={touched.title && Boolean(errors.title)}
              success={values.title && !errors.title}
              helperText={touched.title && errors.title}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <MDInput
              label="Event Description"
              value={values.event_description}
              onChange={handleChange}
              fullWidth
              name="event_description"
              margin="normal"
              multiline
              rows={3}
              variant="outlined"
              error={touched.event_description && Boolean(errors.event_description)}
              success={values.event_description && !errors.event_description}
              helperText={touched.event_description && errors.event_description}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              sx={{ width: "100%" }}
              value={values.event_type}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "event_type", value },
                });
              }}
              disableClearable
              options={eventTypeData.map((acd) => acd.event_name)}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="event_type"
                  required
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Event Type
                    </MDTypography>
                  }
                  //onChange={handleChange}
                  variant="standard"
                  value={values.event_type}
                  {...params}
                  error={touched.event_type && Boolean(errors.event_type)}
                  success={values.event_type && !errors.event_type}
                  helperText={touched.event_type && errors.event_type}
                />
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              sx={{ width: "100%" }}
              value={values.committee_name}
              onChange={(event, value) => {
                handleChange({
                  target: { name: "committee_name", value },
                });
              }}
              disableClearable
              options={eventCommittees.map((acd) => acd.committee_name)}
              renderInput={(params: any) => (
                <MDInput
                  InputLabelProps={{ shrink: true }}
                  name="committee_name"
                  required
                  label={
                    <MDTypography variant="button" fontWeight="bold" color="secondary">
                      Event Committee
                    </MDTypography>
                  }
                  //onChange={handleChange}
                  value={values.committee_name}
                  {...params}
                  variant="standard"
                  error={touched.committee_name && Boolean(errors.committee_name)}
                  success={values.committee_name && !errors.committee_name}
                  helperText={touched.committee_name && errors.committee_name}
                />
              )}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <MDInput
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              onKeyDown={(e: React.KeyboardEvent) => e.preventDefault()}
              value={values.event_date}
              name="event_date"
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              error={touched.event_date && Boolean(errors.event_date)}
              success={values.event_date && !errors.event_date}
              helperText={touched.event_date && errors.event_date}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <MDInput
              label="End Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              onKeyDown={(e: React.KeyboardEvent) => e.preventDefault()}
              value={values.end_date}
              name="end_date"
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              error={touched.end_date && Boolean(errors.end_date)}
              success={values.end_date && !errors.end_date}
              helperText={touched.end_date && errors.end_date}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <MDInput
              label="Start Time"
              InputLabelProps={{ shrink: true }}
              type="time"
              value={values.start_time}
              name="start_time"
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              error={touched.start_time && Boolean(errors.start_time)}
              success={values.start_time && !errors.start_time}
              helperText={touched.start_time && errors.start_time}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <MDInput
              label="End Time"
              InputLabelProps={{ shrink: true }}
              type="time"
              value={values.end_time}
              name="end_time"
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              error={touched.end_time && Boolean(errors.end_time)}
              success={values.end_time && !errors.end_time}
              helperText={touched.end_time && errors.end_time}
            />
          </Grid>

          <Grid item container xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Grid item mt={2}>
              <MDButton color="dark" variant="contained" onClick={handleCloseupdate}>
                Back
              </MDButton>
            </Grid>
            <Grid item mt={2} ml={2}>
              <MDButton color="info" variant="contained" type="submit">
                Save
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </form>
  );
};

export default Update;
