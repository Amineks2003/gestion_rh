import React from 'react'
import { Routes, Route } from "react-router-dom";
import PerformanceList from "./pages/Performance/PerformanceList";
import AddPerformance from "./pages/Performance/AddPerformance";
import EditPerformance from "./pages/Performance/EditPerformance";
import PerformanceDetails from "./pages/Performance/PerformanceDetails";
import Navbar from './components/navbar';
import Login from './pages/auth/Login';
import EmailVerify from './pages/auth/EmailVerify';
import ResetPassword from './pages/auth/ResetPassword';
import EmployeeList from './pages/Employees/EmployeeList.jsx';
import AddEmployee from './pages/Employees/AddEmployee.jsx';
import EditEmployee from './pages/Employees/EditEmployee.jsx';
import EmployeeDetails from './pages/Employees/EmployeeDetails.jsx';
import Dashboard from "./pages/dashboard.jsx";
import LeaveList from './pages/Leaves/LeaveList';
import LeaveDetails from './pages/Leaves/LeaveDetails';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/performance" element={<PerformanceList />} />
        <Route path="/performance/add" element={<AddPerformance />} />
        <Route path="/performance/edit/:id" element={<EditPerformance />} />
        <Route path="/performance/:id" element={<PerformanceDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaves" element={<LeaveList />} />
        <Route path="/leaves/:id" element={<LeaveDetails />} />
      </Routes>
    </div> 
  )
}

export default App;

