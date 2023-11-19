import React, { useState, useRef } from "react";
import axios from "axios";
import { DialogContent, Dialog } from "@mui/material";
import NewPassword from "./NewPassword";

const OTP = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [userContactNumber, setUserContactNumber] = useState<string>("");
  const [isOtpContact, setIsOtpContact] = useState<boolean>(false);
  const [otpNumber, setOtpNumber] = useState<number>(0);

  const toggleModal = () => {
    setOpen(!open);
  };

  const [otp, setOTP] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && value.length <= 1) {
      otp[index] = value;
      setOTP([...otp]);
      if (index < 5 && value) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOTP = otp.join("");
    try {
      if (parseInt(enteredOTP) === otpNumber) {
        alert("OTP is valid.");
        toggleModal();
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Invalid OTP. Please try again.");
      console.error("Error verifying OTP:", error);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    const randomOtp = Math.floor(100000 + Math.random() * 900000);

    console.log(randomOtp);

    try {
      await axios.post(`https://api.semaphore.co/api/v4/otp`, {
        apikey: import.meta.env.VITE_APP_SEMAPHORE_API_KEY,
        number: userContactNumber,
        message: `Your One Time Password is: ${randomOtp}`,
        code: randomOtp,
      });
      setOtpNumber(randomOtp);
      setIsOtpContact(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);

    const randomOtp = Math.floor(100000 + Math.random() * 900000);

    const countdownDuration = 60;

    const endTime = Date.now() + countdownDuration * 1000;

    const countdownInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = Math.max(0, Math.ceil((endTime - currentTime) / 1000));
      setRemainingTime(timeLeft);

      if (timeLeft === 0) {
        clearInterval(countdownInterval);
        setLoading(false);
      }
    }, 1000);

    try {
      await axios.post(`https://api.semaphore.co/api/v4/otp`, {
        apikey: import.meta.env.VITE_APP_SEMAPHORE_API_KEY,
        number: userContactNumber,
        message: `Your One Time Password is: ${randomOtp}`,
        code: randomOtp,
      });
    } catch (error) {
      console.log(error);
      clearInterval(countdownInterval);
      setRemainingTime(0);
    }
  };

  return (
    <div className="flex pt-20 justify-center h-screen w-screen">
      <div className="flex justify-center items-center flex-col h-[300px] w-[700px] shadow-[-6px_5px_5px_-2px_rgba(0,0,0,0.7)]">
        {isOtpContact ? (
          <>
            <h1 className="m-0 p-0">OTP Verification</h1>
            <span>We sent an OTP to your number: {userContactNumber}</span>
            <div className="flex items-center justify-center pt-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-8 h-8 text-[1.2rem] text-center border rounded m-2 border-solid border-[#ccc] focus:border focus:border-solid focus:border-[#007bff]"
                  value={digit}
                  ref={inputRefs[index]}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </div>
            <button
              className="bg-[#007bff] text-white rounded cursor-pointer m-4 px-4 py-2 border-[none] hover:bg-[#0056b3]"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <span>
              Didn't receive the code?{" "}
              <a style={{ cursor: "pointer" }} onClick={handleResendCode}>
                {loading ? `Please wait (${remainingTime} seconds)` : "Resend"}
              </a>
            </span>
          </>
        ) : (
          <div className="flex items-center flex-col">
            <label>
              Contact Number
              <input
                className="w-full rounded border mb-4 p-2 border-solid border-[#ccc]"
                type="text"
                placeholder="Contact Number"
                name="userContactNumber"
                onChange={(e) => setUserContactNumber(e.target.value)}
              />
            </label>
            <button
              className="rounded bg-[#114b66] text-white w-[100%] cursor-pointer px-4 py-2 border-[none] hover:bg-[#257aa1]"
              onClick={handleSendOtp}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        <Dialog open={open} maxWidth="md">
          <DialogContent>
            <NewPassword contactNumber={userContactNumber} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OTP;
