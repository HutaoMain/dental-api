import dayjs, { Dayjs } from "dayjs";
import { Button, MobileStepper, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import useAuthStore from "../zustand/AuthStore";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { UserInterface } from "../Types";

const steps = 5;

const Modal = ({ selectedDate, toggleIsOpen }: any) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const user = useAuthStore((state) => state.user);

  const [time, setTime] = useState<Dayjs | null>(dayjs(new Date()));
  const [fullName, setFullName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>();
  const [reason, setReason] = useState<string>();
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [doctorData, setDoctorData] = useState<UserInterface>();

  console.log("selectedEmail", selectedEmail);

  const { data } = useQuery<UserInterface[]>({
    queryKey: ["Modal"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/list`)
        .then((res) => res.data),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedEmail) return;

      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${selectedEmail}`
      );
      setDoctorData(res.data);
    };
    fetchData();
  }, [selectedEmail]);

  const doctors = data?.filter((item) => item.role === "doctor");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmitAppointment = async () => {
    const appointmentData = {
      email: user,
      contactNumber: contactNumber,
      appointmentDate: dayjs(selectedDate).format("YYYY-MM-DD"),
      appointmentTime: dayjs(time).format("hh:mmA"),
      reason: reason,
      clinicName: doctorData?.clinicName,
      doctorName: doctorData?.fullname,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/create`,
        appointmentData
      );
      toast("Successful Registration!", {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(fullName);

  return (
    <div>
      {activeStep === 0 && (
        <div className="flex flex-col w-[300px] items-center pb-5">
          <label>Selected Date: </label>
          <span className="text-[20px]">
            {dayjs(selectedDate).format("YYYY-MM-DD")}
          </span>
        </div>
      )}
      {activeStep === 1 && (
        <div className="flex flex-col w-[300px] items-center pb-5">
          <select
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="border border-black p-2 m-2"
          >
            <option value="">Please select dental clinic here.</option>
            {doctors?.map((item) => (
              <option key={item.email} value={item.email}>
                {item.clinicName}
              </option>
            ))}
          </select>
          <p>Clinic Name: {doctorData?.clinicName}</p>
          <p>Doctor Name: {doctorData?.fullname}</p>
          <p>Name of Assistant: {doctorData?.assistantName}</p>
          <p>Contact: {doctorData?.contactNumber}</p>
        </div>
      )}
      {activeStep === 2 && (
        <div className="flex flex-col w-[300px] items-center pb-5">
          <label className="pb-3">Time of Appointment:</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopTimePicker
              value={time}
              onChange={(newValue) => setTime(newValue)}
              timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            />
          </LocalizationProvider>
        </div>
      )}
      {activeStep === 3 && (
        <div className="flex flex-col gap-3 w-[300px] items-center pb-5">
          <input
            type="text"
            placeholder="Fullname"
            value={fullName}
            className="w-full border border-black p-3"
            onChange={(event) => {
              const inputValue = event.target.value;

              // Check if the input contains any numbers
              if (/\d/.test(inputValue)) {
                alert("Please enter only letters (no numbers)");
                return setFullName("");
              }

              // If no numbers are found, update the state
              setFullName(inputValue);
            }}
          />
          <input
            type="text"
            maxLength={11}
            minLength={11}
            placeholder="Contact Number"
            value={contactNumber}
            className="w-full border border-black  p-3"
            onChange={(e) => {
              const inputValue = e.target.value;

              if (/[a-zA-Z]/.test(inputValue)) {
                alert("Please enter only numbers (no letters)");
                return setContactNumber("");
              }

              setContactNumber(inputValue);
            }}
          />

          <textarea
            cols={30}
            rows={5}
            placeholder="Reason for appointment"
            className="w-full border border-black  p-3"
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
        </div>
      )}
      {activeStep === 4 && (
        <div className="flex flex-col gap-3 w-[300px] items-center justify-center text-center pb-5">
          <span>Are you sure you want to submit your appointment?</span>
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
            onClick={handleSubmitAppointment}
          >
            Submit Appointment
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg"
            onClick={toggleIsOpen}
          >
            Cancel Appointment
          </button>
        </div>
      )}

      <MobileStepper
        variant="progress"
        steps={steps}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 4}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
};

export default Modal;
