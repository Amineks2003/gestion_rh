import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { AppContent } from "../../context/appContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedin, getUserData } = useContext(AppContent);

  const [mode, setMode] = useState("login"); // login ou register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [salary, setSalary] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data;
      if (mode === "register") {
        data = await axiosInstance.post("/auth/register", {
          name,
          email,
          password,
          phone,
          address,
          hireDate,
          salary
        });
      } else {
        data = await axiosInstance.post("/auth/login", { email, password });
      }

      if (data.data.success) {
        localStorage.setItem("token", data.data.token);
        await getUserData();
        setIsLoggedin(true);
        toast.success(mode === "register" ? "Registration successful" : "Login successful");
        navigate("/dashboard");
      } else {
        toast.error(data.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-blue-200 to-white">
      <div className="bg-white/50 backdrop-blur-lg border border-blue-200 p-8 rounded-2xl shadow-xl w-full sm:w-96">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
          {mode === "register" ? "Create an Account" : "Sign In"}
        </h2>

        <form onSubmit={submit}>
          {mode === "register" && (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full mb-3 px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full mb-3 px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
              />
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full mb-3 px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
              />
              <input
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                type="date"
                className="w-full mb-3 px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
              />
              <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                type="number"
                placeholder="Salary"
                className="w-full mb-3 px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
              />
            </>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full mb-3 px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full mb-3 px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
          />

          {mode === "login" && (
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="text-sm text-blue-600 underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-medium"
          >
            {loading ? "Processing..." : mode === "register" ? "Register" : "Sign In"}
          </button>
        </form>

        <p className="text-gray-700 text-center text-sm mt-4">
          {mode === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "register" ? "login" : "register")}
            className="text-blue-600 underline"
          >
            {mode === "register" ? "Sign In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
