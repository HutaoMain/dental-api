import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Transition, UserInterface } from "../Types";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import AddDoctor from "../components/AddDoctor";
import ViewDoctor from "../components/ViewDoctor";
import { Link } from "react-router-dom";
import UpdateDoctor from "../components/UpdateDoctor";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [paramsId, setParamsId] = useState<string>("");

  const { data } = useQuery<UserInterface[]>({
    queryKey: ["Doctors"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/getDoctors/doctor`)
        .then((res) => res.data),
  });

  const toggleIsOpen = () => {
    setIsOpen(false);
  };

  const filtered = data?.filter((item) => {
    return item.fullname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Create an array of boolean values to track dialog visibility for each row
  const [openViewDoctorArray, setOpenViewDoctorArray] = useState<boolean[]>(
    data?.map(() => false) || []
  );

  const [openUpdateArray, setOpenUpdateArray] = useState<boolean[]>(
    data?.map(() => false) || []
  );

  const toggleViewDoctor = (index: number) => {
    const updatedArray = [...openViewDoctorArray];
    updatedArray[index] = !updatedArray[index];
    setOpenViewDoctorArray(updatedArray);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/user/delete/${id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleUpdateDoctor = (index: number, paramsId: string) => {
    const updatedArray = [...openUpdateArray];
    updatedArray[index] = !updatedArray[index];
    setOpenUpdateArray(updatedArray);
    setParamsId(paramsId);
  };

  return (
    <div className="flex items-center w-full mt-5 flex-col">
      <div className="flex items-center gap-10 mb-5 max-w-[1280px] w-full">
        <div className=" border-[#ccc] border-[3px] pl-2 rounded-lg w-[300px]">
          <Search />
          <input
            className="px-3 py-2 w-[150px] outline-none"
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="border border-black p-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Add Doctor
        </button>
      </div>
      <TableContainer className="max-w-[1280px]">
        <Table>
          <TableHead className="bg-[#374151]">
            <TableRow>
              <TableCell align="center">
                <span className="text-white font-bold">Email</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Fullname</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Role</span>
              </TableCell>
              <TableCell align="center">
                <span className="text-white font-bold">Action Button</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="assessment-tablebody">
            {filtered?.map((item, index) => (
              <TableRow key={item.email}>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.fullname}</TableCell>
                <TableCell align="center">
                  <span className="capitalize">{item.role}</span>
                </TableCell>
                <TableCell align="center" width={200}>
                  {item.role === "doctor" ? (
                    <div className="flex gap-2 items-end justify-end">
                      <button
                        className="px-2 py-2 rounded-xl bg-[#FBC00E] hover:bg-[#FFD774] w-[100px] text-[#ffffff]"
                        onClick={() => toggleViewDoctor(index)}
                      >
                        View Doctor Details
                      </button>
                      <button
                        className="px-2 py-2 rounded-xl bg-[#3498db] hover:bg-[#4fa3e0] w-[100px] text-[#ffffff]"
                        onClick={() => toggleUpdateDoctor(index, item._id)}
                      >
                        Update Doctor
                      </button>
                      <button
                        className="px-2 py-2 rounded-xl bg-[#e74c3c] hover:bg-[#ff6f6f] w-[100px] text-[#ffffff]"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete Doctor
                      </button>
                    </div>
                  ) : (
                    <Link to={`/users/${item._id}`}>
                      <button className="px-5 py-2 rounded-xl bg-[#FBC00E] hover:bg-[#FFD774] w-[200px]">
                        View Treatment Record
                      </button>
                    </Link>
                  )}
                </TableCell>

                <Dialog
                  open={
                    openViewDoctorArray[index]
                      ? openViewDoctorArray[index]
                      : isOpen
                  }
                  onClose={() => toggleViewDoctor(index)}
                  maxWidth="sm"
                  TransitionComponent={Transition}
                  keepMounted
                >
                  <DialogContent>
                    <ViewDoctor
                      toggleIsOpen={() => toggleViewDoctor(index)}
                      email={item.email}
                    />
                  </DialogContent>
                </Dialog>

                {/* update */}
                <Dialog
                  open={
                    openUpdateArray[index] ? openUpdateArray[index] : isOpen
                  }
                  onClose={() => toggleUpdateDoctor(index, item._id)}
                  maxWidth="sm"
                  TransitionComponent={Transition}
                  keepMounted
                >
                  <DialogContent>
                    <UpdateDoctor
                      toggleIsOpen={() => toggleUpdateDoctor(index, item._id)}
                      userEmail={item.email}
                      paramsId={paramsId}
                    />
                  </DialogContent>
                </Dialog>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isOpen}
        onClose={toggleIsOpen}
        maxWidth="sm"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogContent>
          <AddDoctor toggleIsOpen={toggleIsOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Doctors;
