export const Cards = [
  {
    id: 1,
    title: "Enhanced Customer Experiences",
    content:
      "Serve customers faster and give them back their time with a modern service experience."
  },
  {
    id: 2,
    title: "Simplified Employee Workflows",
    content:
      "Empower employees to focus on great service instead of crowded lobbies"
  }
];

export const Steps = [
  {
    title: "Welcome to Queue Management System",
    description:
      "A modern solution to help you skip the long lines and book appointments effortlessly."
  },
  {
    title: "Choose Your Role",
    description: "Are you a Customer or an Employee? Select accordingly to proceed."
  },
  {
    title: "Book an Appointment",
    description:
      "Fill in your details like name, email, organisation, department, and date accordingly. You'll receive a confirmation email along with a QR Code."
  },
  {
    title: "Scan QR Code on Visit",
    description:
      "Use the QR Code at the service center for easy check-in. No paperwork or waiting!"
  },
  {
    title: "Track Queue in Real-Time",
    description:
      "Admins and employees can view and manage the real-time queue easily from their dashboard."
  }
];

export const Features = [
  {
    icon: "🕒",
    title: "Real-Time Queue Tracking",
    desc: "Stay updated with live queue progress on your phone."
  },
  {
    icon: "📧",
    title: "Instant Email + QR",
    desc: "Receive confirmation & QR code for easy check-in."
  }
];

export const ImpactStats = [
  { label: "50%+", subLabel: "Reduced Waiting Time" },
  { label: "2x", subLabel: "Faster Check-in" },
];

export const Bank = [
  { name: "Customer Service" },
  { name: "Cash Deposit & Withdrawal Counters" },
  { name: "Loan Department" },
  { name: "Locker Services" }
];

export const Government = [
  { name: "Regional Transport Office" },
  { name: "Passport Seva Kendra" },
  { name: "Municipal Corporations" },
  { name: "Income Tax" }
];

export const Hospital = [
  { name: "OPD" },
  { name: "Diagnostic & Lab Services" },
  { name: "Vaccination Center / Immunization Unit" }
];

export const sub_dept = { Bank, Hospital, Government };

import { FaLandmark, FaPiggyBank, FaSchool, FaHospital } from "react-icons/fa";

export const CardProduct = [
  { id: 1, name: "Government", icon: FaLandmark },
  { id: 2, name: "Institutions", icon: FaSchool },
  { id: 3, name: "Bank", icon: FaPiggyBank },
  { id: 4, name: "Hospital", icon:FaHospital  }
];
