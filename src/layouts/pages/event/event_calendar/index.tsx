import React, { useState } from "react";
import axios from "axios";
import { EventInput } from "@fullcalendar/core";
import Calendar from "examples/Calendar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Modal from "@mui/material/Modal";
import Cookies from "js-cookie";
function getFormattedDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export default function EventCalendar() {
  const [events, setEvents] = useState<EventInput[]>([
    {
      title: "All day conference",
      start: "2024-08-04",
      end: "2024-08-06",
    },
    {
      title: "Meeting with Mary",
      start: "2024-08-04",
      end: "2024-08-11",
    },
    {
      title: "Winter Hackaton",
      start: "2021-11-22",
      end: "2021-11-25",
      className: "error",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const token = Cookies.get("token");

  const handleDateClick = (arg: any) => {
    setNewEvent({ ...newEvent, start: arg.dateStr, end: arg.dateStr });
    setIsModalOpen(true);
  };

  const handleEventDrop = (info: any) => {
    const updatedEvents = events.map((event) =>
      event.title === info.event.title
        ? { ...event, start: info.event.startStr, end: info.event.endStr }
        : event
    );
    setEvents(updatedEvents);

    // Update event in backend
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/events/${info.event.id}`,
        {
          start: info.event.startStr,
          end: info.event.endStr,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => console.error("Error updating event:", error));
  };

  const handleSubmit = () => {
    setEvents([...events, newEvent]);
    setIsModalOpen(false);

    // Post new event to backend
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/events`, newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Calendar
        initialView="dayGridMonth"
        initialDate={getFormattedDate()}
        events={events}
        selectable
        editable
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
      />
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
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <MDInput
            label="Event Title"
            value={newEvent.title}
            onChange={(e: any) => setNewEvent({ ...newEvent, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <MDInput
            label="Start Date"
            type="date"
            value={newEvent.start}
            onChange={(e: any) => setNewEvent({ ...newEvent, start: e.target.value })}
            fullWidth
            margin="normal"
          />
          <MDInput
            label="End Date"
            type="date"
            value={newEvent.end}
            onChange={(e: any) => setNewEvent({ ...newEvent, end: e.target.value })}
            fullWidth
            margin="normal"
          />
          <MDButton onClick={handleSubmit} color="primary" variant="contained">
            Add Event
          </MDButton>
        </MDBox>
      </Modal>
    </DashboardLayout>
  );
}
