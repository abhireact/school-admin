import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { EventInput } from "@fullcalendar/core";
import Calendar from "examples/Calendar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import IconButton from "@mui/material/IconButton";
import MDInput from "components/MDInput";
import Modal from "@mui/material/Modal";
import Cookies from "js-cookie";
import { Autocomplete, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import { message } from "antd";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";

function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EventCalendar() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventInput[]>([]);
  const [eventTypeData, setEventTypeData] = useState([]);
  const [eventCommittees, setEventCommittees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    event_type: "",
    committee_name: "",
    event_description: "",
    event_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const token = Cookies.get("token");

  const fetchEventDates = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_calender`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const formattedEvents = response.data.map((event: any) => ({
          ...event,
          start: `${event.event_date}T${event.start_time}`,
          end: `${event.end_date}T${event.end_time}`,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

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
      .get(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_committee`, {
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
    fetchEventDates();
    fetchEventTypes();
    fetchEventCommittees();
  }, []);

  const handleDateClick = (arg: any) => {
    setNewEvent({ ...newEvent, event_date: arg.dateStr, end_date: arg.dateStr });
    setIsModalOpen(true);
  };

  const handleEventChange = (info: any) => {
    const oldEvent = info.oldEvent;
    const newEvent = info.event;

    const updatedEvent = {
      old_title: oldEvent.title,
      title: newEvent.title,
      event_type: newEvent.extendedProps.event_type,
      committee_name: newEvent.extendedProps.committee_name,
      event_description: newEvent.extendedProps.event_description,
      old_event_date: oldEvent.startStr.split("T")[0],
      event_date: newEvent.startStr.split("T")[0],
      old_end_date: oldEvent.endStr.split("T")[0],
      end_date: newEvent.endStr.split("T")[0],
      start_time: newEvent.startStr.split("T")[1].slice(0, 5),
      end_time: newEvent.endStr.split("T")[1].slice(0, 5),
    };

    if (info.revert) {
      if (oldEvent.end !== newEvent.end) {
        updatedEvent.end_date = newEvent.endStr.split("T")[0];
        updatedEvent.end_time = newEvent.endStr.split("T")[1].slice(0, 5);
      }
    }

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_calender`, updatedEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchEventDates();
      })
      .catch((error: any) => {
        console.log(error, "error while updating event");
        message.error(error.response.data.detail);
        info.revert();
      });
  };

  const handleSubmit = () => {
    if (newEvent.end_date < newEvent.event_date) {
      message.error("End Date cannot be earlier than Start Date.");
      return;
    }
    if (newEvent.end_time < newEvent.start_time) {
      message.error("End Time cannot be earlier than Start Time.");
      return;
    }
    const eventToSubmit = {
      title: newEvent.title,
      event_type: newEvent.event_type,
      committee_name: newEvent.committee_name,
      event_description: newEvent.event_description,
      event_date: newEvent.event_date,
      end_date: newEvent.end_date,
      start_time: newEvent.start_time,
      end_time: newEvent.end_time,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/mg_event/mg_event_calender`, eventToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        fetchEventDates();
        setNewEvent({
          title: "",
          event_type: "",
          committee_name: "",
          event_description: "",
          event_date: "",
          end_date: "",
          start_time: "",
          end_time: "",
        });
        setIsModalOpen(false);
      })
      .catch((error: any) => {
        console.log(error, "error while creating event");
        message.error(error.response.data.detail);
      });
  };

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    setIsEventDetailsOpen(true);
  };

  const handleCloseEventDetails = () => {
    setIsEventDetailsOpen(false);
  };

  const renderEventContent = (eventInfo: any) => {
    return <div>{eventInfo.event.title}</div>;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <MDBox mx={2}>
          <Grid container m={2} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item>
              <MDTypography variant="h4" fontWeight="bold" color="secondary">
                Event Calendar
              </MDTypography>
            </Grid>
            <Grid item>
              <MDButton
                color="info"
                variant="outlined"
                onClick={() => navigate("/event/event_list")}
              >
                <TableRowsRoundedIcon />
                &nbsp; Event List
              </MDButton>
              &nbsp;&nbsp; &nbsp;&nbsp;
            </Grid>
          </Grid>
          <MDBox sx={{ overflow: "hidden" }}>
            <Calendar
              initialView="dayGridMonth"
              initialDate={getFormattedDate()}
              events={events}
              selectable
              editable
              dateClick={handleDateClick}
              eventDrop={handleEventChange}
              eventResize={handleEventChange}
              eventClick={handleEventClick} // Add eventClick handler
              eventContent={renderEventContent}
            />
          </MDBox>
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <MDBox
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #ffffff",
                boxShadow: 24,
                p: 2,
              }}
            >
              <Grid container spacing={1}>
                <Grid item sm={12} xs={12}>
                  <MDInput
                    label="Title"
                    value={newEvent.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <MDInput
                    label="Event Description"
                    value={newEvent.event_description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewEvent({ ...newEvent, event_description: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    disableClearable
                    value={newEvent.event_type}
                    onChange={(_, newValue) => setNewEvent({ ...newEvent, event_type: newValue })}
                    options={eventTypeData.map((item: any) => item.event_name)}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        required
                        name="event_type"
                        placeholder="Select Event Type"
                        variant="outlined"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    disableClearable
                    value={newEvent.committee_name}
                    onChange={(_, newValue) =>
                      setNewEvent({ ...newEvent, committee_name: newValue })
                    }
                    options={eventCommittees.map((item: any) => item.committee_name)}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        required
                        name="committee_name"
                        placeholder="Select Committee"
                        variant="outlined"
                        margin="normal"
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
                    value={newEvent.event_date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewEvent({ ...newEvent, event_date: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    onKeyDown={(e: React.KeyboardEvent) => e.preventDefault()}
                    value={newEvent.end_date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewEvent({ ...newEvent, end_date: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="Start Time"
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    value={newEvent.start_time}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewEvent({ ...newEvent, start_time: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="End Time"
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    value={newEvent.end_time}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setNewEvent({ ...newEvent, end_time: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item sm={12} xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <MDButton onClick={handleSubmit} color="dark" variant="contained">
                    Add Event
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Modal>
          <Modal
            open={isEventDetailsOpen}
            onClose={handleCloseEventDetails}
            aria-labelledby="event-details-modal-title"
            aria-describedby="event-details-modal-description"
          >
            <MDBox
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #ffffff",
                boxShadow: 24,
                p: 2,
              }}
            >
              <Grid container spacing={1}>
                <Grid
                  item
                  sm={12}
                  my={-2}
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton onClick={handleCloseEventDetails}>
                    <CancelPresentationSharpIcon />
                  </IconButton>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <MDInput
                    label="Title"
                    value={selectedEvent?.title || ""}
                    fullWidth
                    margin="normal"
                    disabled
                    variant="standard"
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <MDInput
                    label="Description"
                    value={selectedEvent?.extendedProps.event_description || ""}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    disabled
                    variant="standard"
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="Event Type"
                    value={selectedEvent?.extendedProps.event_type || ""}
                    fullWidth
                    margin="normal"
                    disabled
                    variant="standard"
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="Committee"
                    value={selectedEvent?.extendedProps.committee_name || ""}
                    fullWidth
                    margin="normal"
                    disabled
                    variant="standard"
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    value={selectedEvent?.startStr.split("T")[0] || ""}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    disabled
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    value={selectedEvent?.endStr.split("T")[0] || ""}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    disabled
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="Start Time"
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    value={selectedEvent?.startStr.split("T")[1].slice(0, 5) || ""}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    disabled
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <MDInput
                    label="End Time"
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    value={selectedEvent?.endStr.split("T")[1].slice(0, 5) || ""}
                    fullWidth
                    margin="normal"
                    variant="standard"
                    disabled
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Modal>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}
