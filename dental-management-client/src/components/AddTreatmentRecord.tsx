import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { UserInterface } from "../Types";

interface Props {
  toggleIsOpen: () => void;
}

const AddTreatmentRecord = ({ toggleIsOpen }: Props) => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [toothNumber, setToothNumber] = useState<number>(0);
  const [procedure, setProcedure] = useState<string>("");
  const [dentist, setDentist] = useState<string>("");
  const [amountCharge, setAmountCharge] = useState<number>(0);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [nextAppointment, setNextAppointment] = useState<Dayjs | null>(null);

  const [userData, setUserData] = useState<UserInterface>();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/getById/${userId}`
      );
      setUserData(res.data);
    };
    fetch();
  }, [userId]);

  console.log(userData?.email);

  const handleSubmit = async () => {
    if (
      toothNumber <= 0 ||
      amountCharge <= 0 ||
      amountPaid < 0 ||
      balance < 0 ||
      userData?.email === "" ||
      procedure === "" ||
      dentist === ""
    ) {
      // Display an error message or handle invalid form data
      console.error("Invalid form data");
      return alert("Pleasee complete your form.");
    }

    const formData = {
      userId: userId,
      email: userData?.email,
      toothNumber: toothNumber,
      procedure: procedure,
      dentist: dentist,
      amountCharge: amountCharge,
      amountPaid: amountPaid,
      balance: balance,
      nextAppointment: nextAppointment,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/treatment-record/create`,
        formData
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const disablePastDates = (date: Dayjs) => {
    return date.isBefore(dayjs());
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Treatment Record</h2>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Tooth Number
          </label>
          <input
            type="number"
            name="toothNumber"
            defaultValue={toothNumber}
            onChange={(e) => setToothNumber(parseInt(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Procedure
          </label>
          <input
            type="text"
            name="procedure"
            defaultValue={procedure}
            onChange={(e) => setProcedure(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Dentist
          </label>
          <input
            type="text"
            name="dentist"
            defaultValue={dentist}
            onChange={(e) => setDentist(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Amount Charge
          </label>
          <input
            type="number"
            name="amountCharge"
            defaultValue={amountCharge}
            onChange={(e) => setAmountCharge(parseInt(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Amount Paid
          </label>
          <input
            type="number"
            name="amountPaid"
            defaultValue={amountPaid}
            onChange={(e) => setAmountPaid(parseInt(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Balance
          </label>
          <input
            type="number"
            name="balance"
            defaultValue={balance}
            onChange={(e) => setBalance(parseInt(e.target.value))}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Next Appointment
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={nextAppointment}
              onChange={(newValue) => setNextAppointment(newValue)}
              shouldDisableDate={disablePastDates}
            />
          </LocalizationProvider>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={toggleIsOpen}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTreatmentRecord;
