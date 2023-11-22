import { Dialog, DialogContent } from "@mui/material";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { Transition, UserInterface } from "../Types";
import useAuthStore from "../zustand/AuthStore";
import { useQuery } from "react-query";

const Navbar = ({ user }: any) => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const { data } = useQuery<UserInterface>({
    queryKey: ["Navbar"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/api/user/${user}`).then(
        (res) => res.json()
      ),
  });

  const clearUser = useAuthStore((state) => state.clearUser);

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      <nav className="bg-[#29B3FF]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Cotabato Dental Clinics
            </span>
          </a>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-white">{user}</span>
                <button
                  className="px-7 py-2 rounded-xl bg-[#FBC00E] hover:bg-[#FFD774] text-[12px]"
                  onClick={clearUser}
                >
                  logout
                </button>
              </div>
            ) : (
              <button
                className="px-7 py-2 rounded-xl bg-[#FBC00E] hover:bg-[#FFD774] text-[12px]"
                onClick={toggleLoginModal}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              {data?.role === "doctor" ? (
                <>
                  <li>
                    <a
                      href="/"
                      className="text-white hover:underline"
                      aria-current="page"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/dashboard"
                      className="text-white hover:underline"
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </li>

                  <li>
                    <a
                      href="/appointments"
                      className="text-white hover:underline"
                    >
                      Appointments
                    </a>
                  </li>
                </>
              ) : null}

              {data?.role === "user" && (
                <li>
                  <a
                    href="/client-appointments"
                    className="text-white hover:underline"
                  >
                    Appointments
                  </a>
                </li>
              )}

              {data?.role === "admin" ? (
                <li>
                  <a href="/doctors" className="text-white hover:underline">
                    Doctors
                  </a>
                </li>
              ) : data?.role === "doctor" ? (
                <li>
                  <a href="/patients" className="text-white hover:underline">
                    Patients
                  </a>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
        <Dialog
          open={isLoginOpen}
          onClose={toggleLoginModal}
          TransitionComponent={Transition}
          keepMounted
        >
          <DialogContent>
            <LoginModal toggleLoginModal={toggleLoginModal} />
          </DialogContent>
        </Dialog>
      </nav>
    </>
  );
};

export default Navbar;
