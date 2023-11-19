import { ITreatmentRecord, Transition } from "../Types";
import {
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import AddTreatmentRecord from "../components/AddTreatmentRecord";
import { useReactToPrint } from "react-to-print";

const ViewTreatmentRecord = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [treatmentRecord, setTreatmentRecord] = useState<ITreatmentRecord[]>();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/treatment-record/userId/${id.trim()}`
      );
      setTreatmentRecord(res.data);
    };
    fetch();

    console.log(id);
  }, [id]);

  const filtered = treatmentRecord?.filter((item) => {
    return item.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleIsOpen = () => {
    setIsOpen(false);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="flex items-center w-full mt-5 flex-col">
      <div className="pb-5">
        <h1 className="font-bold text-[20px]">View Treatment Record</h1>
      </div>
      <div className="flex items-center gap-10 mb-5 max-w-[1280px] w-full">
        <div className=" border-[#ccc] border-[3px] pl-2 rounded-lg w-[300px]">
          <Search />
          <input
            className="px-3 py-2 w-[150px] outline-none"
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="border border-black p-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Add Treatment Record
        </button>
        <button
          className="border border-black p-2 rounded-md"
          onClick={handlePrint}
        >
          Print this out!
        </button>
        <Dialog
          open={isOpen}
          onClose={toggleIsOpen}
          maxWidth="sm"
          TransitionComponent={Transition}
        >
          <DialogContent>
            <AddTreatmentRecord toggleIsOpen={toggleIsOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <div
        className="flex items-center w-full mt-5 flex-col"
        ref={componentRef}
      >
        <TableContainer className="max-w-[1280px]">
          <Table>
            <TableHead className="bg-[#374151]">
              <TableRow>
                <TableCell align="center">
                  <span className="text-white font-bold">Patient Email</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white font-bold">Tooth Number</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white font-bold">Procedure</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white font-bold">Dentist</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white font-bold">Amount Charge</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white font-bold">Amount Paid</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white font-bold">Balance</span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-white font-bold">Next Appointment</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="assessment-tablebody">
              {filtered?.map((item, key) => (
                <TableRow key={key}>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.toothNumber}</TableCell>
                  <TableCell align="center">{item.procedure}</TableCell>
                  <TableCell align="center">{item.dentist}</TableCell>
                  <TableCell align="center">{item.amountCharge}</TableCell>
                  <TableCell align="center">{item.amountPaid}</TableCell>
                  <TableCell align="center">{item.balance}</TableCell>
                  <TableCell align="center">
                    {dayjs(item.nextAppointment).format("YYYY-MM-DD")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ViewTreatmentRecord;
