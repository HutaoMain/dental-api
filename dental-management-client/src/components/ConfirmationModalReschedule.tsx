import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  paramsId: string;
  toggleCloseConfirmation: () => void;
}

const ConfirmationModalReschedule = ({
  paramsId,
  toggleCloseConfirmation,
}: Props) => {
  console.log("reschedule params ID ito: ", paramsId);

  // const navigate = useNavigate();

  const handleCancelAppointment = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/delete/${paramsId}`
      );
      toast(`You will now go to calendar for your reschedule of appointment!`, {
        type: "success",
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.href = "/";
        const calendarSection = document.getElementById("calendar");
        if (calendarSection) {
          calendarSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orderConfirmationModal flex items-center flex-col gap-20">
      <div className="flex items-center gap-5">
        <button
          className=" bg-green-500 text-white font-bold w-[200px] h-[60px] border-none text-lg cursor-pointer rounded-md"
          onClick={handleCancelAppointment}
        >
          Proceed to Reschedule your Appointment
        </button>
        <button
          className=" bg-red-500 text-white font-bold w-[200px] h-[60px] border-none text-lg cursor-pointer rounded-md"
          onClick={toggleCloseConfirmation}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModalReschedule;
