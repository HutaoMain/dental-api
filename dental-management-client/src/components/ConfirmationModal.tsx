import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  paramsId: string;
  toggleCloseConfirmation: () => void;
}

const ConfirmationModal = ({ paramsId, toggleCloseConfirmation }: Props) => {
  const handleCancelAppointment = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/delete/${paramsId}`
      );
      toast(`Successful Cancelled your appointment with ID: ${paramsId}!`, {
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

  return (
    <div className="orderConfirmationModal flex items-center flex-col gap-20">
      <div className="flex items-center gap-5">
        <button
          onClick={handleCancelAppointment}
          className=" bg-green-500 text-white font-bold w-[200px] h-[60px] border-none text-lg cursor-pointer rounded-md"
        >
          Proceed to Cancel Appointment
        </button>
        <button
          onClick={toggleCloseConfirmation}
          className=" bg-red-500 text-white font-bold w-[200px] h-[60px] border-none text-lg cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
