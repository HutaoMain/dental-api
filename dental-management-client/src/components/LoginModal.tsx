import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@mui/material";
import useAuthStore from "../zustand/AuthStore";
import { LoginInterface, Transition } from "../Types";
import RegistrationModal from "./RegistrationModal";
import { useNavigate } from "react-router";

const LoginModal = ({ toggleLoginModal }: any) => {
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<LoginInterface>({
    email: "",
    password: "",
  });
  const [regIsOpen, setRegIsOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleRegistrationModal = () => {
    setRegIsOpen(!regIsOpen);
    toggleLoginModal();
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
        credentials
      );

      setUser(credentials.email);
      toggleLoginModal();
    } catch (err) {
      console.log(err);
      setErrors("Incorrect email or password.");
    }
  };

  const handleForgotPasswordNavigation = async () => {
    navigate("/otp");
    toggleLoginModal();
  };

  return (
    <div className="w-[280px] h-[400px] bg-neutral-100 flex flex-col items-center justify-center p-6 rounded-lg">
      <p className="text-center mb-3">Welcome to Cotabato Dental Clinics</p>
      <hr className="w-full mb-5" />
      <div className="flex items-center flex-col">
        <label>
          Email
          <input
            className="w-full rounded border mb-4 p-2 border-solid border-[#ccc]"
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChangeHandler}
          />
        </label>
      </div>
      <div className="flex items-center flex-col">
        <label>
          Password
          <input
            className="w-full rounded border p-2 border-solid border-[#ccc]"
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
          />
        </label>
        {errors && (
          <div style={{ padding: "5px 0" }}>
            <span style={{ color: "red" }}>{errors}</span>
          </div>
        )}

        <div className="w-full text-left pt-2 pb-2">
          <span
            className="cursor-pointer"
            onClick={handleForgotPasswordNavigation}
          >
            Forgot Password?
          </span>
        </div>

        <button
          className="rounded bg-[#114b66] text-white w-[100%] cursor-pointer px-4 py-2 border-[none] hover:bg-[#257aa1]"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="my-2.5">
          No account? Register{" "}
          <a onClick={toggleRegistrationModal}>
            <u style={{ cursor: "pointer" }}>here</u>
          </a>
        </p>
      </div>
      <Dialog
        open={regIsOpen}
        onClose={toggleRegistrationModal}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent>
          <RegistrationModal
            toggleRegistrationModal={toggleRegistrationModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
