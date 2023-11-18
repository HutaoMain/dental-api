import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  BarElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { AppointmentInterface, UserInterface } from "../Types"; // import the chart configuration from another file
import axios from "axios";
import { useQuery } from "react-query";
import StatCard from "../components/StatCard";
import dayjs from "dayjs";

ChartJs.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

interface DailyAppointmentCountInterface {
  _id: string;
  count: number;
}

const Dashboard = () => {
  const [userData, setUserData] = useState<UserInterface[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [dailyAppointmentCount, setDailyAppointmentCount] =
    useState<DailyAppointmentCountInterface[]>();

  const { data } = useQuery<AppointmentInterface[]>({
    queryKey: ["Dashboard"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/appointment`)
        .then((res) => res.data),
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/list`
      );
      setUserData(response.data);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/appointment/monthly/data`
      );
      setDailyAppointmentCount(res.data);
    };
    fetchData();
  }, [data]);

  const doctors = userData?.filter((user) => user.role === "doctor");
  const staff = userData?.filter((user) => user.role === "staff");

  const appointmentToday = data?.filter(
    (appointment) =>
      appointment.appointmentDate === dayjs().format("YYYY-MM-DD")
  );

  const handleDoctorSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDoctor(event.target.value);
  };

  const graph = {
    labels: dailyAppointmentCount?.map((item) => item._id),
    datasets: [
      {
        label: selectedDoctor
          ? `Appointments for ${selectedDoctor}`
          : "All Appointments",
        data: dailyAppointmentCount?.map((item) => item.count),
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex items-center flex-col">
      <h2 className="text-2xl font-semibold text-gray-70 w-full max-w-7xl my-5">
        Dental Clinic Dashboard
      </h2>
      <div className="max-w-[1200px] w-full flex justify-between py-5">
        <StatCard label="Total Doctors" value={doctors?.length} />
        <StatCard label="Total Staffs" value={staff?.length} />
        <StatCard label="Total Appointments" value={data?.length} />
        <StatCard
          label="Expected Appointments Today"
          value={appointmentToday?.length}
        />
      </div>
      <div className="flex flex-col w-[1200px] items-center">
        <select
          className="w-full mb-4 pl-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={handleDoctorSelection}
          value={selectedDoctor || ""}
        >
          <option value="">All</option>
          {doctors?.map((doctor) => (
            <option key={doctor.email} value={doctor.email}>
              {doctor.fullname}
            </option>
          ))}
        </select>
        <div className="w-[1200px]">
          <Bar data={graph} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
