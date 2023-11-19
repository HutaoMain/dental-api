import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import useAuthStore from "./zustand/AuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";
import ViewTreatmentRecord from "./pages/ViewTreatmentRecord";
import NotFound from "./pages/NotFound";
import OTP from "./components/OTP";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="overflow-x-hidden">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/" />} />
        <Route
          path="/appointments"
          element={user ? <Appointments /> : <Navigate to="/" />}
        />
        <Route
          path="/users/:id"
          element={user ? <ViewTreatmentRecord /> : <Navigate to="/" />}
        />
        <Route path="/otp" element={<OTP />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </div>
  );
}

export default App;
