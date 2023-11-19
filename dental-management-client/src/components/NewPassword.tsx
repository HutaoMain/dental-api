import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  contactNumber: string;
}

const NewPassword = ({ contactNumber }: Props) => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNewPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
    if (passwordMatch) {
      setPasswordMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(newPassword === e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (newPassword === confirmPassword) {
      try {
        await axios.put(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/user/updateByContactNumber/${contactNumber}`,
          {
            password: newPassword,
          }
        );
        setLoading(false);
        alert("Password changed successfully!");
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setLoading(false);
      // Passwords don't match
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="max-w-[400px] border shadow-[0_0_5px_rgba(0,0,0,0.2)] bg-white text-center mx-auto my-0 p-5 rounded-[5px] border-solid border-[#ccc]">
      <h2 className="text-2xl text-[#333] mb-5">Change Password</h2>
      <div>
        <div className="text-left mb-[15px]">
          <label className="block text-[#555] mb-[5px]">New Password</label>
          <input
            className="w-[90%] border p-2.5 rounded-[5px] border-solid border-[#ccc]"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="text-left mb-[15px]">
          <label className="block text-[#555] mb-[5px]">Confirm Password</label>
          <input
            className="w-[90%] border p-2.5 rounded-[5px] border-solid border-[#ccc]"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {!passwordMatch && (
          <p className="text-[#ff0000] font-[bold] mt-2.5">
            Passwords do not match.
          </p>
        )}
        <button
          className="bg-[#0074cc] text-white cursor-pointer transition-[background-color] duration-[0.3s] px-5 py-2.5 rounded-[5px] border-[none] hover:bg-[#005aa7]"
          onClick={handleSubmit}
        >
          {loading ? "Please wait.." : "Change Password"}
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
