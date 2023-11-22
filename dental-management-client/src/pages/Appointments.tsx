import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AppointmentInterface } from "../Types";
import axios from "axios";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuthStore from "../zustand/AuthStore";

const Appointments = () => {
  const user = useAuthStore((state) => state.user);

  const { data } = useQuery<AppointmentInterface[]>({
    queryKey: ["Appointments"],
    queryFn: () =>
      axios
        .get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/appointment/getByDoctorEmail/doctorEmail/${user}`
        )
        .then((res) => res.data),
  });

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleSendTextMessage = async (
    number: string,
    dentalClinic: string,
    doctorName: string,
    appointmentDate: string,
    appointmentTime: string,
    itemId: string
  ) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [itemId]: true,
    }));
    const appointmentDateString =
      dayjs(appointmentDate).format("dddd, MMMM Do");

    const apiParameters = {
      apikey: import.meta.env.VITE_APP_SEMAPHORE_API_KEY,
      number: number,
      message: `Hello from ${dentalClinic} Your next appointment with ${doctorName} is confirmed for ${appointmentDateString} at ${appointmentTime}. See you soon!.`,
    };

    try {
      fetch(`https://api.semaphore.co/api/v4/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(apiParameters),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((output) => {
          console.log(output);
          setLoadingStates((prevLoadingStates) => ({
            ...prevLoadingStates,
            [itemId]: false,
          }));
          toast("Successfully sent the text message!", {
            type: "success",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          setLoadingStates((prevLoadingStates) => ({
            ...prevLoadingStates,
            [itemId]: false,
          }));
          console.log(error);
          toast("Failed to send the text message!", {
            type: "error",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (error) {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [itemId]: false, // Set loading state to false on success
      }));
      console.log(error);
    }
  };

  return (
    <div className="flex items-center w-full mt-5 flex-col">
      <div className="pb-5">
        <h1 className="font-bold text-[20px]">Patient Appointments</h1>
      </div>
      <TableContainer className="max-w-[1280px]">
        <Table>
          <TableHead className="bg-[#374151]">
            <TableRow>
              <TableCell align="center">
                <span className="text-white font-bold">Email</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Appointment Date</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Contact Number</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Appointment Time</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Selected Service</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Clinic Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Doctor Name</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="assessment-tablebody">
            {data?.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">
                  {dayjs(item.appointmentDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="center">{item.contactNumber}</TableCell>
                <TableCell align="center">
                  <span className="capitalize">{item.appointmentTime}</span>
                </TableCell>
                <TableCell align="center">{item.service}</TableCell>
                <TableCell align="center">{item.clinicName}</TableCell>
                <TableCell align="center">{item.doctorName}</TableCell>
                <TableCell align="center">
                  <button
                    className="border border-black rounded-md p-2"
                    onClick={() =>
                      handleSendTextMessage(
                        item.contactNumber,
                        item.clinicName,
                        item.doctorName,
                        item.appointmentDate,
                        item.appointmentTime,
                        item._id // Pass the item ID to the function
                      )
                    }
                    disabled={loadingStates[item._id]} //
                  >
                    {loadingStates[item._id]
                      ? "Please wait.."
                      : "Send Text Message"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Appointments;
