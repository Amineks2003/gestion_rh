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
          toast.success("Inscription réussie");
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
          toast.success("Connexion réussie");
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
          {mode === "register" ? "Créer un compte" : "Connexion"}
        </h2>
        <p className="text-center text-sm mb-4 text-blue-700">
          {mode === "register"
            ? "Créez votre compte."
            : "Connectez-vous à votre espace."}
        </p>

        <form onSubmit={submit}>
          {mode === "register" && (
            <div className="mb-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom complet"
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
              placeholder="Mot de passe"
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
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-medium"
          >
            {loading ? "Connexion..." : mode === "register" ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <p className="text-gray-600 text-center text-sm mt-4">
          {mode === "register" ? "Déjà un compte ?" : "Pas de compte ?"}{" "}
          <button
            onClick={() => setMode(mode === "register" ? "login" : "register")}
            className="text-blue-400 underline"
          >
            {mode === "register" ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
