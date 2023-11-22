import axios from "axios";
import { useState, useEffect } from "react";
import { FileUpload } from "@mui/icons-material";
import { UserInterface } from "../Types";

interface Prop {
  toggleIsOpen: () => void;
  userEmail: string;
  paramsId: string;
}

const UpdateDoctor = ({ toggleIsOpen, userEmail, paramsId }: Prop) => {
  const [clinicName, setClinicName] = useState<string>("");
  const [dentistName, setDentistName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [graduateSchool, setGraduateSchool] = useState<string>("");
  const [assistantName, setAssistantName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [ImageFile, setImageFile] = useState<string>("");
  const [userData, setUserData] = useState<UserInterface>();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/user/${userEmail}`
      );
      setUserData(res.data);
    };
    fetch();
  }, [userEmail]);

  console.log("paramsId", paramsId);

  const fileTypeChecking = (e: any) => {
    var fileInput = document.getElementById("file-upload") as HTMLInputElement;
    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  console.log(clinicName);

  const handleSubmitDoctor = async () => {
    try {
      if (ImageFile) {
        const data = new FormData();
        data.append("file", ImageFile);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
          data
        );
        const { url } = uploadRes.data;

        await axios.put(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/user/update/doctor/${paramsId}`,
          {
            profilePicture: url,
            clinicName: clinicName ? clinicName : userData?.clinicName,
            fullname: dentistName ? dentistName : userData?.fullname,
            birthdate: birthday ? birthday : userData?.birthdate,
            assistantName: assistantName
              ? assistantName
              : userData?.assistantName,
            graduateSchool: graduateSchool
              ? graduateSchool
              : userData?.graduateSchool,
            email: email ? email : userData?.email,
            role: "doctor",
            contactNumber: contact ? contact : userData?.contactNumber,
          }
        );
        window.location.reload();
      } else {
        await axios.put(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/user/update/doctor/${paramsId}`,
          {
            clinicName: clinicName ? clinicName : userData?.clinicName,
            fullname: dentistName ? dentistName : userData?.fullname,
            birthdate: birthday ? birthday : userData?.birthdate,
            assistantName: assistantName
              ? assistantName
              : userData?.assistantName,
            graduateSchool: graduateSchool
              ? graduateSchool
              : userData?.graduateSchool,
            email: email ? email : userData?.email,
            role: "doctor",
            contactNumber: contact ? contact : userData?.contactNumber,
          }
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Dental Clinic Information</h2>

      <div className="flex flex-col items-center mb-3">
        <img
          src={
            ImageFile
              ? URL.createObjectURL(
                  new Blob([ImageFile], { type: "image/jpeg" })
                )
              : userData?.profilePicture
          }
          alt="AddImage"
          className="w-[150px] h-[150px] object-contain"
        />
        <label
          htmlFor="file-upload"
          className="text-xs text-center w-[300px] p-3 border-dashed border-[1px] mt-2"
        >
          <FileUpload /> Upload the image of Doctor here..
          <input
            type="file"
            id="file-upload"
            onChange={fileTypeChecking}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Dental Clinic Name */}
      <div className="mb-4">
        <label
          htmlFor="clinicName"
          className="block text-sm font-medium text-gray-700"
        >
          Dental Clinic Name:
        </label>
        <input
          onChange={(e) => setClinicName(e.target.value)}
          defaultValue={userData?.clinicName}
          type="text"
          id="clinicName"
          name="clinicName"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* Dentist Name */}
      <div className="mb-4">
        <label
          htmlFor="dentistName"
          className="block text-sm font-medium text-gray-700"
        >
          Dentist Name:
        </label>
        <input
          onChange={(e) => setDentistName(e.target.value)}
          defaultValue={userData?.fullname}
          type="text"
          id="dentistName"
          name="dentistName"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* Email of Clinic */}
      {/* <div className="mb-4">
        <label
          htmlFor="clinicEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Password:
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div> */}

      {/* Birthdate */}
      <div className="mb-4">
        <label
          htmlFor="birthdate"
          className="block text-sm font-medium text-gray-700"
        >
          Birthdate:
        </label>
        <input
          onChange={(e) => setBirthday(e.target.value)}
          defaultValue={userData?.birthdate}
          type="date"
          id="birthdate"
          name="birthdate"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* Email of Clinic */}
      <div className="mb-4">
        <label
          htmlFor="clinicEmail"
          className="block text-sm font-medium text-gray-700"
        >
          Email of Clinic:
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={userData?.email}
          type="email"
          id="clinicEmail"
          name="clinicEmail"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* Graduate School */}
      <div className="mb-4">
        <label
          htmlFor="graduateSchool"
          className="block text-sm font-medium text-gray-700"
        >
          Graduate School:
        </label>
        <input
          defaultValue={userData?.graduateSchool}
          onChange={(e) => setGraduateSchool(e.target.value)}
          type="text"
          id="graduateSchool"
          name="graduateSchool"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* Name of Assistant / Staff */}
      <div className="mb-4">
        <label
          htmlFor="assistantName"
          className="block text-sm font-medium text-gray-700"
        >
          Name of Assistant / Staff:
        </label>
        <input
          defaultValue={userData?.assistantName}
          onChange={(e) => setAssistantName(e.target.value)}
          type="text"
          id="assistantName"
          name="assistantName"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>

      {/* Contact Information */}
      <div className="mb-4">
        <label
          htmlFor="assistantName"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Number:
        </label>
        <input
          defaultValue={userData?.contactNumber}
          onChange={(e) => setContact(e.target.value)}
          type="text"
          id="contactNumber"
          name="contactNumber"
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      {/* Submit and Cancel Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleSubmitDoctor}
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
        <button
          onClick={toggleIsOpen}
          type="button"
          className="px-4 py-2 bg-gray-400 text-gray-800 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateDoctor;
