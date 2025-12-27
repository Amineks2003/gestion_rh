import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Users, TrendingUp, Target } from "lucide-react";
import { fetchEmployees } from "../api/employeeApi";
import { getPerformances } from "../api/performanceApi";

const Dashboard = ({ currentUser }) => {
  const [date, setDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const empRes = await fetchEmployees();
        setEmployees(empRes.data.employees || []);

        const perfRes = await getPerformances();
        setPerformances(perfRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-blue-600">Loading dashboard...</p>
    );

  return (
    <div
      className="min-h-screen px-4 sm:px-6 md:px-8 py-6 md:py-8"
      style={{
        background: "linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)",
      }}
    >
      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-500 mb-6 md:mb-8">
        Hello, {currentUser?.name || "Admin"} 👋
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-3 space-y-6">
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <StatCard
              title="Total Employees"
              value={employees.length}
              icon={<Users />}
              color="blue"
            />
            <StatCard
              title="Performance Reviews"
              value={performances.length}
              icon={<TrendingUp />}
              color="orange"
            />
            <StatCard
              title="Objectives Achieved"
              value={performances.reduce(
                (acc, p) =>
                  acc + (p.objectives?.filter((o) => o.status === "Achieved").length || 0),
                0
              )}
              icon={<Target />}
              color="blue"
            />
          </div>

          {/* MAIN CARD */}
          <div className="bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-semibold text-blue-500 mb-2">
              Aperçu général
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Bienvenue sur votre tableau de bord RH. Vous pouvez suivre ici les
              performances globales, les employés et les objectifs de l’entreprise.
            </p>

            {/* Latest Employees */}
            <div className="bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-3 sm:p-4 mt-4">
              <h3 className="font-semibold text-blue-500 mb-2 text-sm sm:text-base">
                Latest Employees
              </h3>
              {employees.length > 0 ? (
                <ul className="space-y-1 text-sm sm:text-base">
                  {employees.slice(-5).reverse().map((emp) => (
                    <li
                      key={emp._id}
                      className="border-b py-1 flex justify-between text-gray-700"
                    >
                      <span>{emp.user?.name || "—"}</span>
                      <span className="text-gray-500">{emp.department}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">No employees found</p>
              )}
            </div>

            {/* Latest Performances */}
            <div className="bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-3 sm:p-4 mt-4">
              <h3 className="font-semibold text-blue-500 mb-2 text-sm sm:text-base">
                Latest Performance Reviews
              </h3>
              {performances.length > 0 ? (
                <ul className="space-y-1 text-sm sm:text-base">
                  {performances.slice(-5).reverse().map((p) => (
                    <li
                      key={p._id}
                      className="border-b py-1 flex justify-between text-gray-700"
                    >
                      <span>{p.employee?.user?.name || "—"}</span>
                      <span className="text-gray-500">{p.period}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">No performance reviews found</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-4 sm:p-6 shadow-xl h-fit mt-6 lg:mt-0">
          <h3 className="text-lg font-semibold text-blue-500 mb-4">
            Calendrier
          </h3>
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-xl border-none"
          />

          {/* Static Appointments Component */}
          <Appointments />
        </div>
      </div>
    </div>
  );
};

/* ------------------ STAT CARD COMPONENT ------------------ */
const StatCard = ({ title, value, icon, color }) => {
  const colorMap = {
    blue: "text-blue-500 bg-blue-100",
    orange: "text-orange-500 bg-orange-100",
  };

  return (
    <div className="bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-4 sm:p-6 shadow-xl flex items-center gap-3 sm:gap-4 w-full">
      <div className={`p-2 sm:p-3 rounded-xl ${colorMap[color]}`}>{icon}</div>
      <div>
        <p className="text-xs sm:text-sm text-gray-600">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

/* ------------------ STATIC APPOINTMENTS COMPONENT ------------------ */
const Appointments = () => {
  const appointments = [
    { time: "09:00 AM", title: "Meeting with HR" },
    { time: "11:30 AM", title: "Project Review" },
    { time: "02:00 PM", title: "1:1 with Manager" },
  ];

  return (
    <div className="bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-3 sm:p-4 shadow-xl mt-6">
      <h3 className="text-lg font-semibold text-blue-500 mb-3">Rendez-vous</h3>
      <ul className="space-y-2 text-sm sm:text-base">
        {appointments.map((appt, index) => (
          <li key={index} className="flex justify-between border-b pb-1">
            <span className="text-gray-700">{appt.time}</span>
            <span className="text-gray-500">{appt.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
