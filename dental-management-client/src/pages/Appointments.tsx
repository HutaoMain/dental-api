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

const Appointments = () => {
  const { data } = useQuery<AppointmentInterface[]>({
    queryKey: ["Appointments"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/appointment`)
        .then((res) => res.data),
  });

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
            </TableRow>
          </TableHead>
          <TableBody className="assessment-tablebody">
            {data?.map((item) => (
              <>
                <TableRow key={item.email}>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    {dayjs(item.appointmentDate).format("YYYY-MM-DD")}
                  </TableCell>
                  {/* <TableCell align="center">{item.contactNumber}</TableCell> */}
                  <TableCell align="center">
                    <span className="capitalize">{item.appointmentTime}</span>
                  </TableCell>
                  <TableCell align="center">{item.reason}</TableCell>
                  <TableCell align="center">{item.clinicName}</TableCell>
                  <TableCell align="center">{item.doctorName}</TableCell>
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
