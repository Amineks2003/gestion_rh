import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Users, TrendingUp, Target, Plus, Trash2, CalendarDays, X, Check, Eye, Clock, MapPin, FileText } from "lucide-react";
import { fetchEmployees } from "../api/employeeApi";
import { getPerformances } from "../api/performanceApi";
import { useNavigate } from "react-router-dom";

// Custom CSS for larger calendar
const calendarStyles = `
  .dashboard-calendar {
    width: 100% !important;
    max-width: 100% !important;
    font-size: 1rem !important;
  }
  .dashboard-calendar .react-calendar__tile {
    padding: 0.75em 0.5em !important;
    font-size: 0.95rem !important;
  }
  .dashboard-calendar .react-calendar__month-view__weekdays__weekday {
    font-size: 0.85rem !important;
    padding: 0.5em !important;
  }
  .dashboard-calendar .react-calendar__navigation button {
    font-size: 1.1rem !important;
    min-width: 44px !important;
  }
  .dashboard-calendar .react-calendar__tile--active {
    background: #377eb7 !important;
    border-radius: 8px !important;
  }
  .dashboard-calendar .react-calendar__tile--now {
    background: #e8f4f8 !important;
    border-radius: 8px !important;
  }
  .dashboard-calendar .react-calendar__tile:hover {
    background: #bff4ff !important;
    border-radius: 8px !important;
  }
`;

const Dashboard = ({ currentUser }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [performances, setPerformances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState([
    { id: 1, time: "09:00 AM", title: "Meeting with HR", location: "Conference Room A", description: "Discuss quarterly goals and team updates" },
    { id: 2, time: "11:30 AM", title: "Project Review", location: "Online - Zoom", description: "Review project milestones and deliverables" },
    { id: 3, time: "02:00 PM", title: "1:1 with Manager", location: "Manager's Office", description: "Weekly sync and feedback session" },
  ]);
  const [showAddMeeting, setShowAddMeeting] = useState(false);
  const [newMeeting, setNewMeeting] = useState({ time: "", title: "", location: "", description: "" });
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  
  // Objectives state
  const [objectives, setObjectives] = useState([
    { id: 1, title: "Complete Q4 Reports", completed: false },
    { id: 2, title: "Team Training Session", completed: true },
    { id: 3, title: "Update Documentation", completed: false },
    { id: 4, title: "Client Presentation", completed: true },
  ]);
  const [showAddObjective, setShowAddObjective] = useState(false);
  const [newObjective, setNewObjective] = useState("");
  const [showObjectivesModal, setShowObjectivesModal] = useState(false);

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

  // Objectives handlers
  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, { id: Date.now(), title: newObjective, completed: false }]);
      setNewObjective("");
      setShowAddObjective(false);
    }
  };

  const handleDeleteObjective = (id) => {
    setObjectives(objectives.filter(o => o.id !== id));
  };

  const handleToggleObjective = (id) => {
    setObjectives(objectives.map(o => o.id === id ? { ...o, completed: !o.completed } : o));
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-6 md:px-8 py-6 md:py-8"
      style={{
        background: "linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)",
      }}
    >
      {/* Custom Calendar Styles */}
      <style>{calendarStyles}</style>

      {/* Objectives Modal */}
      {showObjectivesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-[#f6f7f0] to-[#e8f4f8]">
              <h2 className="text-xl font-bold text-[#377eb7]">Objectives Management</h2>
              <button
                onClick={() => setShowObjectivesModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {/* Add Objective */}
              <div className="mb-4">
                {showAddObjective ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter objective title..."
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddObjective()}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#377eb7]"
                      autoFocus
                    />
                    <button
                      onClick={handleAddObjective}
                      className="px-4 py-2 bg-[#377eb7] text-white rounded-lg hover:bg-[#2a6a9e] transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => { setShowAddObjective(false); setNewObjective(""); }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddObjective(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Objective
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1 p-3 bg-green-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-green-600">{objectives.filter(o => o.completed).length}</p>
                  <p className="text-sm text-green-700">Completed</p>
                </div>
                <div className="flex-1 p-3 bg-orange-50 rounded-xl text-center">
                  <p className="text-2xl font-bold text-orange-600">{objectives.filter(o => !o.completed).length}</p>
                  <p className="text-sm text-orange-700">Pending</p>
                </div>
              </div>

              {/* Objectives List */}
              <div className="space-y-2">
                {objectives.length > 0 ? (
                  objectives.map((obj) => (
                    <div
                      key={obj.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        obj.completed 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <button
                        onClick={() => handleToggleObjective(obj.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          obj.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-[#377eb7]'
                        }`}
                      >
                        {obj.completed && <Check className="w-4 h-4" />}
                      </button>
                      <span className={`flex-1 ${obj.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {obj.title}
                      </span>
                      <button
                        onClick={() => handleDeleteObjective(obj.id)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No objectives yet. Add one to get started!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Details Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b bg-gradient-to-r from-[#f6f7f0] to-[#e8f4f8]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#377eb7]">Meeting Details</h2>
                <button
                  onClick={() => setSelectedMeeting(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{selectedMeeting.title}</h3>
              
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-5 h-5 text-[#377eb7]" />
                <span>{selectedMeeting.time}</span>
              </div>
              
              {selectedMeeting.location && (
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#377eb7]" />
                  <span>{selectedMeeting.location}</span>
                </div>
              )}
              
              {selectedMeeting.description && (
                <div className="flex items-start gap-3 text-gray-600">
                  <FileText className="w-5 h-5 text-[#377eb7] mt-0.5" />
                  <span>{selectedMeeting.description}</span>
                </div>
              )}

              <button
                onClick={() => setSelectedMeeting(null)}
                className="w-full mt-4 px-4 py-2 bg-[#377eb7] text-white rounded-xl hover:bg-[#2a6a9e] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-500 mb-6 md:mb-8">
        Hello 👋
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
              onClick={() => navigate("/performance")}
              clickable
            />
            <StatCard
              title="Objectives Achieved"
              value={objectives.filter(o => o.completed).length}
              icon={<Target />}
              color="blue"
              onClick={() => setShowObjectivesModal(true)}
              clickable
            />
          </div>

          {/* MAIN CARD */}
          <div className="bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-semibold text-blue-500 mb-2">
              General Overview
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              Welcome to your HR dashboard. Here you can track overall performance,
              employees, and company objectives.
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
                      <span>{emp.name || "—"}</span>
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
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-blue-500 text-sm sm:text-base">
                  Latest Performance Reviews
                </h3>
                <button
                  onClick={() => navigate("/performance")}
                  className="text-sm text-[#377eb7] hover:underline"
                >
                  View All
                </button>
              </div>
              {performances.length > 0 ? (
                <ul className="space-y-1 text-sm sm:text-base">
                  {performances.slice(-5).reverse().map((p) => (
                    <li
                      key={p._id}
                      className="border-b py-1 flex justify-between items-center text-gray-700 hover:bg-white/50 rounded-lg px-2 cursor-pointer transition-colors"
                      onClick={() => navigate(`/performance/${p._id}`)}
                    >
                      <span>{p.employee.name || "—"}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">{p.period}</span>
                        <Eye className="w-4 h-4 text-[#377eb7]" />
                      </div>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-500">
              Calendar
            </h3>
            <button
              onClick={() => setDate(new Date())}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#377eb7] text-white text-sm rounded-lg hover:bg-[#2a6a9e] transition-colors"
              title="Go to today"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Today</span>
            </button>
          </div>
          <div className="calendar-container">
            <style>{`
              .calendar-container .react-calendar {
                width: 100% !important;
                max-width: 100%;
                font-size: 1rem;
                border: none;
                border-radius: 12px;
                background: transparent;
              }
              .calendar-container .react-calendar__tile {
                padding: 0.75em 0.5em;
                font-size: 0.95rem;
              }
              .calendar-container .react-calendar__navigation button {
                font-size: 1.1rem;
                min-width: 44px;
              }
              .calendar-container .react-calendar__tile--active {
                background: #377eb7 !important;
                border-radius: 8px;
              }
              .calendar-container .react-calendar__tile--now {
                background: #e8f4f8;
                border-radius: 8px;
              }
              .calendar-container .react-calendar__tile:hover {
                background: #bff4ff;
                border-radius: 8px;
              }
            `}</style>
            <Calendar
              onChange={setDate}
              value={date}
              className="rounded-xl border-none"
            />
          </div>

          {/* Meetings Component */}
          <Appointments 
            meetings={meetings}
            setMeetings={setMeetings}
            showAddMeeting={showAddMeeting}
            setShowAddMeeting={setShowAddMeeting}
            newMeeting={newMeeting}
            setNewMeeting={setNewMeeting}
            selectedMeeting={selectedMeeting}
            setSelectedMeeting={setSelectedMeeting}
          />
        </div>
      </div>
    </div>
  );
};

/* ------------------ STAT CARD COMPONENT ------------------ */
const StatCard = ({ title, value, icon, color, onClick, clickable }) => {
  const colorMap = {
    blue: "text-blue-500 bg-blue-100",
    orange: "text-orange-500 bg-orange-100",
  };

  return (
    <div 
      className={`bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-4 sm:p-6 shadow-xl flex items-center gap-3 sm:gap-4 w-full ${clickable ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all' : ''}`}
      onClick={onClick}
    >
      <div className={`p-2 sm:p-3 rounded-xl ${colorMap[color]}`}>{icon}</div>
      <div>
        <p className="text-xs sm:text-sm text-gray-600">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
      </div>
      {clickable && <Eye className="w-5 h-5 text-gray-400 ml-auto" />}
    </div>
  );
};

/* ------------------ MEETINGS COMPONENT ------------------ */
const Appointments = ({ meetings, setMeetings, showAddMeeting, setShowAddMeeting, newMeeting, setNewMeeting, selectedMeeting, setSelectedMeeting }) => {
  const handleAddMeeting = () => {
    if (newMeeting.time.trim() && newMeeting.title.trim()) {
      const meeting = {
        id: Date.now(),
        time: newMeeting.time,
        title: newMeeting.title,
        location: newMeeting.location || "",
        description: newMeeting.description || "",
      };
      setMeetings([...meetings, meeting]);
      setNewMeeting({ time: "", title: "", location: "", description: "" });
      setShowAddMeeting(false);
    }
  };

  const handleDeleteMeeting = (e, id) => {
    e.stopPropagation();
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-white/40 backdrop-blur-lg border border-blue-200 rounded-2xl p-3 sm:p-4 shadow-xl mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-blue-500">Meetings</h3>
        <button
          onClick={() => setShowAddMeeting(!showAddMeeting)}
          className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
          title="Add meeting"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {/* Add Meeting Form */}
      {showAddMeeting && (
        <div className="mb-4 p-3 bg-white/60 rounded-xl border border-blue-100 space-y-2">
          <input
            type="text"
            placeholder="Time (e.g., 10:00 AM)"
            value={newMeeting.time}
            onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#377eb7]"
          />
          <input
            type="text"
            placeholder="Meeting title"
            value={newMeeting.title}
            onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#377eb7]"
          />
          <input
            type="text"
            placeholder="Location (optional)"
            value={newMeeting.location}
            onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#377eb7]"
          />
          <textarea
            placeholder="Description (optional)"
            value={newMeeting.description}
            onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#377eb7] resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddMeeting}
              className="flex-1 px-3 py-1.5 bg-[#377eb7] text-white text-sm rounded-lg hover:bg-[#2a6a9e] transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowAddMeeting(false);
                setNewMeeting({ time: "", title: "", location: "", description: "" });
              }}
              className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Meetings List */}
      {meetings.length > 0 ? (
        <ul className="space-y-2 text-sm sm:text-base">
          {meetings.map((meeting) => (
            <li 
              key={meeting.id} 
              className="flex items-center justify-between border-b pb-1 group cursor-pointer hover:bg-white/50 rounded-lg px-2 py-1 transition-colors"
              onClick={() => setSelectedMeeting(meeting)}
            >
              <div className="flex-1 flex justify-between mr-2">
                <span className="text-gray-700 font-medium">{meeting.time}</span>
                <span className="text-gray-500 truncate">{meeting.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-[#377eb7] opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={(e) => handleDeleteMeeting(e, meeting.id)}
                  className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete meeting"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm text-center py-2">No meetings scheduled</p>
      )}
    </div>
  );
};

export default Dashboard;
