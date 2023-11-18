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
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import AddDoctor from "../components/AddDoctor";
import ViewDoctor from "../components/ViewDoctor";

const Users = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [filteredUser, setFilteredUser] = useState<UserInterface[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = useQuery<UserInterface[]>({
    queryKey: ["Users"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/list`)
        .then((res) => res.data),
  });

  const toggleIsOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const filtered = data?.filter((user) =>
      user.role.toLowerCase().includes(selectedRole.toLowerCase())
    );

    if (selectedRole !== "") {
      return setFilteredUser(filtered);
    }

    return setFilteredUser(data);
  }, [data, selectedRole]);

  const filtered = filteredUser?.filter((item) => {
    return item.fullname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Create an array of boolean values to track dialog visibility for each row
  const [openViewDoctorArray, setOpenViewDoctorArray] = useState<boolean[]>(
    filteredUser?.map(() => false) || []
  );

  const toggleViewDoctor = (index: number) => {
    const updatedArray = [...openViewDoctorArray];
    updatedArray[index] = !updatedArray[index];
    setOpenViewDoctorArray(updatedArray);
  };

  return (
    <div className="flex items-center w-full mt-5 flex-col">
      <div className="flex items-center gap-10 mb-5 max-w-[1280px] w-full">
        <div>
          <label className="text-base mr-2.5">Select Role:</label>
          <select
            className="text-base border-[3px] rounded bg-white appearance-none cursor-pointer px-3 py-2 border-solid border-[#ccc] w-[150px] text-[20px]"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
            {/* <option value="staff">Staff</option> */}
          </select>
        </div>

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
                {/* <TableCell align="center">{item.contactNumber}</TableCell> */}
                <TableCell align="center">
                  <span className="capitalize">{item.role}</span>
                </TableCell>
                <TableCell align="center">
                  {item.role === "doctor" ? (
                    <button
                      className="px-5 py-2 rounded-xl bg-[#FBC00E] hover:bg-[#FFD774] w-[200px]"
                      onClick={() => toggleViewDoctor(index)}
                    >
                      View Doctor Details
                    </button>
                  ) : (
                    <button className="px-5 py-2 rounded-xl bg-[#FBC00E] hover:bg-[#FFD774] w-[200px]">
                      View Treatment Record
                    </button>
                  )}
                </TableCell>
                {/* View Doctor */}
                <Dialog
                  open={openViewDoctorArray[index]}
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

export default Users;
