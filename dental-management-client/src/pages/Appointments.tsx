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

const Appointments = () => {
  const { data } = useQuery<AppointmentInterface[]>({
    queryKey: ["Appointments"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/appointment`)
        .then((res) => res.data),
  });

  const handleSendTextMessage = async (
    number: string,
    dentalClinic: string,
    appointmentDate: string,
    appointmentTime: string
  ) => {
    const appointmentDateString = dayjs(appointmentDate).format("YYYY-MM-DD");
    try {
      await axios.post(`https://api.semaphore.co/api/v4/messages`, {
        apikey: import.meta.env.VITE_APP_SEMAPHORE_API_KEY,
        number: number,
        message: `Please be advice that you have scheduled appointment to ${dentalClinic} dental clinic, ${appointmentDateString} ${appointmentTime}.`,
      });
      toast("Successfully sent the text message!", {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
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
                <span className="text-white font-bold">Appointment Reason</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Clinic Name</span>
              </TableCell>{" "}
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
              <>
                <TableRow key={item._id}>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    {dayjs(item.appointmentDate).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell align="center">{item.contactNumber}</TableCell>
                  <TableCell align="center">
                    <span className="capitalize">{item.appointmentTime}</span>
                  </TableCell>
                  <TableCell align="center">{item.reason}</TableCell>
                  <TableCell align="center">{item.clinicName}</TableCell>
                  <TableCell align="center">{item.doctorName}</TableCell>
                  <TableCell align="center">
                    <button
                      className="border border-black rounded-md p-2"
                      onClick={() =>
                        handleSendTextMessage(
                          item.contactNumber,
                          item.clinicName,
                          item.appointmentDate,
                          item.appointmentTime
                        )
                      }
                    >
                      Send Text Message
                    </button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Appointments;
