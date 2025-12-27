import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (data.success) {
        toast.success(data.message || "Connexion réussie");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Erreur de connexion");
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
      style={{
        background: "linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)",
      }}
    >
      <div className="bg-white/40 backdrop-blur-lg border border-blue-200 p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-gray-700">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold text-blue-400 text-center mb-3">
            Connexion
          </h1>
          <p className="text-center text-sm mb-6 text-blue-700">
            Connectez-vous à votre compte
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-4">
            <Link
              to="/reset-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full py-2 px-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold transition"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
