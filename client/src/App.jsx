import React from 'react'
import Dashboard from './pages/dashboard'
import { Routes, Route } from "react-router-dom";
import PerformanceList from "./pages/Performance/PerformanceList";
import AddPerformance from "./pages/Performance/AddPerformance";
import EditPerformance from "./pages/Performance/EditPerformance";
import PerformanceDetails from "./pages/Performance/PerformanceDetails";
import Navbar from './components/navbar';
import Login from './pages/auth/Login';
import EmailVerify from './pages/auth/EmailVerify';
import ResetPassword from './pages/auth/ResetPassword';
//import Home from './pages/auth/Home';

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
      </Routes>
    </div> 
  )
}



export default App;

