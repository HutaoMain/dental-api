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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Tooltip } from "react-tooltip";

const steps = 5;

const maxAppointmentsPerDay = 5;

const AddClientAppointment = ({ selectedDate, toggleIsOpen }: any) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const user = useAuthStore((state) => state.user);

  const [time, setTime] = useState<Dayjs | null>(dayjs(new Date()));
  const [fullName, setFullName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>();
  const [selectedService, setSelectedService] = useState<string>();
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [doctorData, setDoctorData] = useState<UserInterface>();
  const [appointmentCount, setAppointmentCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const roundedTime =
    Number(time?.minute()) < 1
      ? time?.startOf("hour")
      : Number(time?.add(1, "hour").startOf("hour")) + 1;

  useEffect(() => {
    // Fetch existing appointments for the selected date and doctor/clinic
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/appointment/getByEmailAndAppointmentDate/count`,
          {
            params: {
              email: user,
              appointmentDate: dayjs(selectedDate).format("YYYY-MM-DD"),
              doctorEmail: selectedEmail,
            },
          }
        );
        setAppointmentCount(response.data);
      } catch (error) {
        console.error("Error fetching appointment count:", error);
      }
    };

    fetchAppointments();
  }, [selectedEmail, selectedDate]);

  const [birthdate, setBirthdate] = useState<Dayjs | null>(null);

  const [address, setAddress] = useState<string>("");

  const isDisabledButton = appointmentCount >= maxAppointmentsPerDay;

  console.log("boolean isDisableButton", isDisabledButton);

  console.log("appointment Count", appointmentCount);

  console.log("selectedEmail", selectedEmail);

  const { data } = useQuery<UserInterface[]>({
    queryKey: ["AddClientAppointment"],
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
    setLoading(true);
    const appointmentData = {
      email: user,
      contactNumber: contactNumber,
      appointmentDate: dayjs(selectedDate).format("YYYY-MM-DD"),
      appointmentTime: dayjs(time).format("hh:mmA"),
      service: selectedService,
      clinicName: doctorData?.clinicName,
      doctorName: doctorData?.fullname,
      doctorEmail: selectedEmail,
      address: address,
      birthdate: birthdate,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/create`,
        appointmentData
      );

      toast("Successful Appointment!", {
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
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
            onChange={(e) => {
              setSelectedEmail(e.target.value);
              setSelectedService("");
            }}
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
              value={dayjs(roundedTime)}
              onChange={(newValue) => setTime(newValue)}
              timeSteps={{ hours: 1, minutes: 60, seconds: 60 }}
              sx={{ color: "white", backgroundColor: "white" }}
              minTime={dayjs().startOf("day").add(9, "hour")}
              maxTime={dayjs().startOf("day").add(17, "hour")}
            />
          </LocalizationProvider>
        </div>
      )}
      {activeStep === 3 && (
        <div className="flex flex-col gap-3 w-[300px] items-center pb-5">
          <div className="mb-2 w-full">
            <label className="block text-sm font-medium text-gray-600">
              Full name
            </label>
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
          </div>

          <div className="mb-2 w-full">
            <label className="block text-sm font-medium text-gray-600">
              Contact Number
            </label>
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
          </div>

          <div className="mb-2 w-full">
            <label className="block text-sm font-medium text-gray-600">
              Birthdate
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                value={birthdate}
                onChange={(newValue) => setBirthdate(newValue)}
              />
            </LocalizationProvider>
          </div>

          <div className="mb-1 w-full">
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <textarea
              cols={30}
              rows={5}
              placeholder="Address"
              className="w-full border border-black p-3"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-2 w-full">
            <label className="block text-sm font-medium text-gray-600">
              Services
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border border-black  p-3"
              disabled={!selectedEmail}
            >
              <option value="">Please select a service</option>
              {selectedEmail === "clangbajit05@gmail.com" && ( // Clariteeth Dental Clinic
                <>
                  <option value="Oral prophylaxis">Oral prophylaxis</option>
                  <option value="Tooth restoration">Tooth restoration</option>
                  <option value="Tooth extraction">Tooth extraction</option>
                  <option value="Oral surgery/Odontectomy">
                    Oral surgery/Odontectomy
                  </option>
                  <option value="Dentures">Dentures</option>
                  <option value="Crowns and fix bridges">
                    Crowns and fix bridges
                  </option>
                  <option value="Veneers">Veneers</option>
                  <option value="Teeth whitening">Teeth whitening</option>
                  <option value="Root canal treatment">
                    Root canal treatment
                  </option>
                  <option value="Dental x-ray (periapical x-ray)">
                    Dental x-ray
                  </option>
                  <option value="Orthodontic braces">Orthodontic braces</option>
                  <option value="Retainers">Retainers</option>
                  <option value="Fluoride application">
                    Fluoride application
                  </option>
                </>
              )}
              {selectedEmail === "markenrico30@gmail.com" && ( // Toothland Dental Clinic
                <>
                  <option value="Oral prophylaxis">Oral prophylaxis</option>
                  <option value="Tooth restoration">Tooth restoration</option>
                  <option value="Tooth extraction">Tooth extraction</option>
                  <option value="Dentures">Dentures</option>
                  <option value="Braces">Braces</option>
                  <option value="Veneers">Veneers</option>
                  <option value="Crowns and bridges">Crowns and bridges</option>
                  <option value="Endodontics">Endodontics</option>
                </>
              )}
              {selectedEmail === "dr.cajote@yahoo.com" && ( // Maguindanao Dental Clinic
                <>
                  <option value="Tooth restoration">Tooth restoration</option>
                  <option value="Tooth extraction">Tooth extraction</option>
                  <option value="Oral prophylaxis">Oral prophylaxis</option>
                  <option value="Braces">Braces</option>
                  <option value="Vaneers">Vaneers</option>
                  <option value="Jacket crown">Jacket crown</option>
                  <option value="Retainers">Retainers</option>
                  <option value="Dentures">Dentures</option>
                  <option value="Teeth whitening">Teeth whitening</option>
                </>
              )}

              {selectedEmail === "ronierluces@gmail.com" && ( // Stardent Dental Clinic
                <>
                  <option value="Tooth extraction">Tooth extraction</option>
                  <option value="Filling/Pasta">Filling/Pasta</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Braces">Braces</option>
                  <option value="Dentures">Dentures</option>
                </>
              )}
            </select>
          </div>
        </div>
      )}
      {activeStep === 4 && (
        <div className="flex flex-col gap-3 w-[300px] items-center justify-center text-center pb-5">
          <span>Are you sure you want to submit your appointment?</span>
          <button
            className={`p-3 rounded-lg ${
              isDisabledButton
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={handleSubmitAppointment}
            disabled={isDisabledButton}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={
              isDisabledButton ? "Clinic not available right now" : ""
            }
          >
            {loading ? "Please wait.." : "Submit Appointment"}
            <Tooltip id="my-tooltip" />
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

export default AddClientAppointment;
