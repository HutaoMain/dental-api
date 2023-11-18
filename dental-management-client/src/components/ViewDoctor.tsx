import { useQuery } from "react-query";
import axios from "axios";
import { UserInterface } from "../Types";

interface Prop {
  email: string;
  toggleIsOpen: () => void;
}

const ViewDoctor = ({ email, toggleIsOpen }: Prop) => {
  const { data } = useQuery<UserInterface>({
    queryKey: ["ViewDoctor", email],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/${email}`)
        .then((res) => res.data),
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">View Doctor Information</h2>

      {/* Profile Picture */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture:
        </label>
        <img
          src={data.profilePicture}
          alt="Doctor Profile"
          className="mt-2 rounded-md w-32 h-32"
        />
      </div>

      {/* Clinic Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Clinic Name:
        </label>
        <p className="mt-1">{data.clinicName}</p>
      </div>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Full Name:
        </label>
        <p className="mt-1">{data.fullname}</p>
      </div>

      {/* Birthdate */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Birthdate:
        </label>
        <p className="mt-1">{data.birthdate}</p>
      </div>

      {/* Assistant Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Assistant Name:
        </label>
        <p className="mt-1">{data.assistantName}</p>
      </div>

      {/* Graduate School */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Graduate School:
        </label>
        <p className="mt-1">{data.graduateSchool}</p>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <p className="mt-1">{data.email}</p>
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role:</label>
        <p className="mt-1">{data.role}</p>
      </div>

      {/* Contact Number */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Contact Number:
        </label>
        <p className="mt-1">{data.contactNumber}</p>
      </div>

      <button className="border border-black py-1 px-5" onClick={toggleIsOpen}>
        Close
      </button>
    </div>
  );
};

export default ViewDoctor;
