import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import AddClientAppointment from "./AddClientAppointment";
import { AppointmentInterface, Transition } from "../Types";
import { useQuery } from "react-query";
import axios from "axios";
import useAuthStore from "../zustand/AuthStore";
import LoginModal from "./LoginModal";

const Calendar = () => {
  const user = useAuthStore((state) => state.user);

  const { data } = useQuery<AppointmentInterface[]>("Calendar", async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/appointment`
    );
    return response.data.map((appointment: any) => ({
      title: appointment.appointmentTime,
      date: appointment.appointmentDate,
      appointmentDate: appointment.appointmentDate,
    }));
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toggleIsOpen = (date: any) => {
    setIsOpen(!isOpen);
    setSelectedDate(date);
  };

  const date = new Date();
  const validDate = {
    start: date.setDate(date.getDate() + 1),
  };

  return (
    <div
      className="w-full max-w-[1200px] max-md:w-[98%] max-md:text-center max-md:py-10"
      id="calendar"
    >
      <h2>Book an appointment here</h2>
      <p>
        Click on your desired date for the appointment and submit your inquiry.
      </p>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={(info) => toggleIsOpen(info.date)}
          events={data}
          validRange={validDate}
        />
        <Dialog
          open={isOpen}
          onClose={toggleIsOpen}
          maxWidth="sm"
          TransitionComponent={Transition}
          keepMounted
        >
          <DialogContent>
            {user ? (
              <AddClientAppointment
                selectedDate={selectedDate}
                toggleIsOpen={toggleIsOpen}
              />
            ) : (
              <LoginModal />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Calendar;
