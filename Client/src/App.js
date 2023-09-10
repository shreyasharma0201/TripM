import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminNavbar from './components/Admin-side/Navbar';
import DriverNavbar from './components/Driver-side/Navbar';
import Home from "./components/Home";
import Trip from "./components/Driver-side/Trip";
import Expense from "./components/Driver-side/Expense";
import Profile from "./components/Admin-side/Profile";
import Ddetails from "./components/Admin-side/Ddetails";
import DLVehicle from './components/Admin-side/DLVehicle';
import DLdetails from './components/Admin-side/DLdetails';
import Customer from './components/Driver-side/Customer';
import Admin from './components/Admin-side/Admin';
import AdminDashboard from './components/Admin-side/AdminDashboard';
import Logout from './components/Admin-side/Logout';
import DLogout from './components/Driver-side/Logout';
import Drivers from './components/Admin-side/Drivers';
import Add from './components/Admin-side/Add';
import Agent from './components/Admin-side/Agent';
import Vehicle from './components/Admin-side/Vehicle';
import Find from './components/Admin-side/Find';
import Agents from './components/Admin-side/Agents';
import Vehicles from './components/Admin-side/Vehicles';
import Driver from './components/Driver-side/Driver';
import DriverDashboard from './components/Driver-side/DriverDashboard';
import VehicleProfile from './components/Admin-side/VehicleProfile';
import Trips from './components/Driver-side/Trips';
import TripProfile from './components/Driver-side/TripProfile';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<AdminNavbar />} >
          <Route index element={<AdminDashboard />} />
          <Route path="add" element={<Add />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vehicles/profile/:vehicleID" element={<VehicleProfile />} />
          <Route path="add-vehicle" element={<Vehicle />} />
          <Route path="add-driver" element={<Ddetails />} />
          <Route path="add-driver/dldetails" element={<DLdetails />} />
          <Route path="add-driver/dldetails/dlvehicleclass" element={<DLVehicle />} />
          <Route path="add-agent" element={<Agent />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="drivers/profile/:driverID" element={<Profile />} />
          <Route path="find" element={<Find />} />
          <Route path="agents" element={<Agents />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/admin-login" element={<Admin />} />

        <Route path="driver" element={<DriverNavbar />} >
          <Route index element={<DriverDashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="customer/trip-details" element={<Trip />} />
          <Route path="expense" element={<Expense />} />
          <Route path="driver-logout" element={<DLogout />} />
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:tripID" element={<TripProfile />} />
        </Route>
        <Route path="/driver-login" element={<Driver />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App