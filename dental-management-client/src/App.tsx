import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import useAuthStore from "./zustand/AuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Dashboard from "./pages/Dashboard";

function App() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="overflow-x-hidden">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/appointments"
          element={user ? <Appointments /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
