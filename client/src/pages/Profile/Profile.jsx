import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProfile, updateProfile } from "../../api/profileApi"; // Adjust path if needed


const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // <--- NEW: Controls Edit Mode

  // State matches your EXACT database schema
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",
    salary: "",    
    hireDate: "",  
  });

  // Keep a copy of original data to revert if user clicks "Cancel"
  const [originalData, setOriginalData] = useState({}); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchProfile(id);
        const userData = response.data; 

        const formattedData = {
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          department: userData.department || "",
          position: userData.position || "",
          salary: userData.salary || "",
          hireDate: userData.hireDate 
            ? new Date(userData.hireDate).toISOString().split('T')[0] 
            : "",
        };

        setFormData(formattedData);
        setOriginalData(formattedData); // Save copy
      } catch (err) {
        console.error("Profile load error:", err); 
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setSuccess(null);
    setError(null);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData(originalData); // Revert changes
    setIsEditing(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await updateProfile(id, formData);
      setSuccess("Profile updated successfully!");
      setOriginalData(formData); // Update the "original" copy
      setIsEditing(false); // Turn off edit mode
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "U";
  };

  // --- STYLING HELPERS ---
  // If editing: White background, border. If viewing: Transparent blue, no border.
  const inputClass = isEditing 
    ? "bg-white border border-blue-200 text-blue-900 shadow-sm focus:ring-2 focus:ring-blue-400" 
    : "bg-transparent border-transparent text-blue-800 cursor-default";
  
  const readOnlyClass = "bg-transparent border-transparent text-blue-800 cursor-not-allowed"; // Always locked fields

  if (loading) return <div className="text-center p-10 text-blue-600 font-bold">Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white/70 rounded-2xl shadow-lg border border-blue-200 backdrop-blur-sm relative">
      
      {/* Edit Toggle Button (Top Right) */}
      {!isEditing && (
        <button 
          onClick={toggleEdit}
          className="absolute top-8 right-8 text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition"
        >
          ✎ Edit Profile
        </button>
      )}

      {/* Header */}
      <div className="flex items-center gap-5 mb-8 border-b border-blue-100 pb-6">
        <div className="min-w-[80px] min-h-[80px] rounded-full bg-gradient-to-tr from-blue-200 to-blue-50 flex items-center justify-center text-blue-600 font-bold text-3xl border border-white shadow-sm">
          {getInitials(formData.name)}
        </div>
        <div>
           <h2 className="text-3xl font-bold text-blue-900">{formData.name || "My Profile"}</h2>
           <p className="text-blue-500 text-sm">{formData.position} &bull; {formData.department}</p>
        </div>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-xl border border-red-200 text-center">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded-xl border border-blue-200 text-center">{success}</div>}

      <form onSubmit={handleSubmit}>
        
        {/* --- Section 1: User Account Info --- */}
        <h3 className="text-lg font-bold text-blue-800 mb-4 pb-1 border-b border-blue-100">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-blue-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full px-4 py-2 rounded-xl transition duration-200 outline-none ${inputClass}`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full px-4 py-2 rounded-xl transition duration-200 outline-none ${inputClass}`}
              required
            />
          </div>
        </div>

        {/* --- Section 2: Contact Info --- */}
        <h3 className="text-lg font-bold text-blue-800 mb-4 pb-1 border-b border-blue-100">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-blue-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full px-4 py-2 rounded-xl transition duration-200 outline-none ${inputClass}`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full px-4 py-2 rounded-xl transition duration-200 outline-none ${inputClass}`}
            />
          </div>
        </div>

        {/* --- Section 3: Job Details --- */}
        <h3 className="text-lg font-bold text-blue-800 mb-4 pb-1 border-b border-blue-100">Job Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-blue-700 mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full px-4 py-2 rounded-xl transition duration-200 outline-none ${inputClass}`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-700 mb-1">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full px-4 py-2 rounded-xl transition duration-200 outline-none ${inputClass}`}
            />
          </div>
          
          {/* Always Read-Only Fields */}
          <div>
            <label className="block text-sm font-bold text-blue-700 mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              readOnly 
              className={`mt-1 block w-full px-4 py-2 rounded-xl transition duration-200 outline-none ${readOnlyClass}`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-blue-700 mb-1">Hire Date</label>
            <input
              type="date"
              name="hireDate"
              value={formData.hireDate}
              readOnly
              className={`mt-1 block w-full px-4 py-2 rounded-xl transition duration-200 outline-none ${readOnlyClass}`}
            />
          </div>
        </div>

        {/* Buttons: Only visible when editing */}
        {isEditing && (
          <div className="mt-8 flex gap-4 justify-end border-t border-blue-100 pt-6">
            <button
              onClick={handleCancel}
              className="bg-white text-blue-600 border border-blue-200 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-blue-500/30"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;