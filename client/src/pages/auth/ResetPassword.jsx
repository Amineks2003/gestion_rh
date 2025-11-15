import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/auth/send-reset-otp', { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((el) => el.value.trim());
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/auth/reset-password', { email, otp, newPassword });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-2 sm:px-0"
      style={{
        background: 'linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)'
      }}
    >
      <div className="bg-white/40 backdrop-blur-lg border border-blue-200 p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-gray-700 text-base">
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail}>
            <h1 className="text-2xl font-bold text-blue-400 text-center mb-3">Réinitialiser le mot de passe</h1>
            <p className="text-center text-sm mb-4 text-blue-700">Saisissez votre adresse e-mail enregistrée.</p>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
              />
            </div>
            <button
              disabled={loading}
              className="w-full py-2 px-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold"
            >
              {loading ? 'Envoi...' : 'Envoyer le code'}
            </button>
          </form>
        )}

        {isEmailSent && !isOtpSubmitted && (
          <form onSubmit={onSubmitOtp} onPaste={handlePaste}>
            <h1 className="text-2xl font-bold text-blue-400 text-center mb-3">Code de réinitialisation</h1>
            <p className="text-center text-sm mb-4 text-blue-700">Saisissez le code à 6 chiffres envoyé à votre e-mail.</p>
            <div className="flex justify-center gap-3 mb-8">
              {Array(6).fill(0).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength={1}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 bg-blue-200 text-blue-800 text-center text-xl rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              ))}
            </div>
            <button className="w-full py-2 px-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold">
              Valider le code
            </button>
          </form>
        )}

        {isEmailSent && isOtpSubmitted && (
          <form onSubmit={onSubmitNewPassword}>
            <h1 className="text-2xl font-bold text-blue-400 text-center mb-3">Nouveau mot de passe</h1>
            <p className="text-center text-sm mb-4 text-blue-700">Saisissez votre nouveau mot de passe.</p>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl bg-blue-100 text-gray-800 outline-none"
              />
            </div>
            <button
              disabled={loading}
              className="w-full py-2 px-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold"
            >
              {loading ? '...' : 'Réinitialiser le mot de passe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
