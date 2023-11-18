export interface RegistrationInterface {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface AppointmentInterface {
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  email: string;
  address: string;
  contactNumber: string;
  gender: string;
  createdAt: string;
  doctorName: string;
  clinicName: string;
}

export interface UserInterface {
  _id: string;
  clinicName: string;
  birthdate: string;
  assistantName: string;
  graduateSchool: string;
  fullname: string;
  address: string;
  contactNumber: string;
  gender: string;
  email: string;
  role: string;
  profilePicture: string;
}

export interface UserInterface {
  _id: string;
  clinicName: string;
  birthdate: string;
  assistantName: string;
  graduateSchool: string;
  fullname: string;
  address: string;
  contactNumber: string;
  gender: string;
  email: string;
  role: string;
  profilePicture: string;
}

// reusable transition effect only
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// The chart configuration file

// The data for the line chart
export const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // the x-axis labels
  datasets: [
    // an array of objects, each representing a line in the chart
    {
      id: 1, // the id of the doctor
      label: "Dr. Smith", // the label for the line
      data: [3, 4, 5, 6, 7, 8], // the y-axis values
      fill: false, // do not fill the area under the line
      backgroundColor: "rgb(255, 99, 132)", // the color of the line and the points
      borderColor: "rgba(255, 99, 132, 0.2)", // the color of the border around the points
    },
    {
      id: 2,
      label: "Dr. Jones",
      data: [2, 3, 4, 5, 6, 7],
      fill: false,
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgba(54, 162, 235, 0.2)",
    },
    {
      id: 3,
      label: "Dr. Lee",
      data: [4, 5, 6, 7, 8, 9],
      fill: false,
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "rgba(75, 192, 192, 0.2)",
    },
    {
      id: 4,
      label: "Dr. Patel",
      data: [1, 2, 3, 4, 5, 6],
      fill: false,
      backgroundColor: "rgb(255, 205, 86)",
      borderColor: "rgba(255, 205, 86, 0.2)",
    },
  ],
};

// The options for the line chart
export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
        },
      },
    ],
  },
};
