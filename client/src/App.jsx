import React from 'react'
import Dashboard from './pages/dashboard'
import { Routes, Route } from "react-router-dom";
import PerformanceList from "./pages/Performance/PerformanceList";
import AddPerformance from "./pages/Performance/AddPerformance";
import EditPerformance from "./pages/Performance/EditPerformance";
import PerformanceDetails from "./pages/Performance/PerformanceDetails";
import Navbar from './components/navbar';

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
      </Routes>
    </div> 
  )
}



export default App;

