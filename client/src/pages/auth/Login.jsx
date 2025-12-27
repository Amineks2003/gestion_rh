import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { AppContent } from "../../context/appContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedin, getUserData } = useContext(AppContent);

  const [mode, setMode] = useState("login"); // login or register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "register") {
        const { data } = await axiosInstance.post("/auth/register", { name, email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          await getUserData();
          setIsLoggedin(true);
          toast.success("Registration successful");
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axiosInstance.post("/auth/login", { email, password });
        if (data.success) {
          localStorage.setItem("token", data.token);
          await getUserData();
          setIsLoggedin(true);
          toast.success("Login successful");
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-2 sm:px-0"
      style={{ background: "linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)" }}
    >
      <div className="bg-white/40 backdrop-blur-lg border border-blue-200 p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-gray-700 text-base transition-all duration-500 hover:scale-[1.03]">
        <h2 className="text-2xl font-bold text-blue-400 text-center mb-3">
          {mode === "register" ? "Create an Account" : "Sign In"}
        </h2>
        <p className="text-center text-sm mb-4 text-blue-700">
          {mode === "register"
            ? "Create your account."
            : "Sign in to your account."}
        </p>

        <form onSubmit={submit}>
          {mode === "register" && (
            <div className="mb-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
              />
            </div>
          )}

          <div className="mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
            />
          </div>

          <div className="mb-4">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
            />
          </div>

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
            disabled={loading}
            type="submit"
            className="w-full py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-medium"
          >
            {loading ? "Signing in..." : mode === "register" ? "Register" : "Sign In"}
          </button>
        </form>

        <p className="text-gray-600 text-center text-sm mt-4">
          {mode === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "register" ? "login" : "register")}
            className="text-blue-400 underline"
          >
            {mode === "register" ? "Sign In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
