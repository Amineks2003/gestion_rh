import React, { useEffect, useContext, useRef } from 'react';
import axiosInstance from '../../utils/axios';
import { AppContent } from '../../context/appContext.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const { isLoggedin, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();
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
    const paste = e.clipboardData.getData('text').slice(0, 6);
    paste.split('').forEach((char, index) => {
      if (inputRefs.current[index]) inputRefs.current[index].value = char;
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otp = inputRefs.current.map((el) => el.value.trim()).join('');
      const { data } = await axiosInstance.post('/auth/verify-account', { otp }); // plus besoin de userId
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const onResend = async () => {
    try {
      const { data } = await axiosInstance.post('/auth/send-verify-otp'); // backend récupère userId depuis token
      if (data.success) toast.success(data.message);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) navigate('/');
  }, [isLoggedin, userData, navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen px-2 sm:px-0"
      style={{
        background: 'linear-gradient(to top, #8dbee1 0%, #f6f7f0 100%)',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <form
        onSubmit={onSubmitHandler}
        className="bg-white/40 backdrop-blur-lg border border-blue-200 p-8 rounded-2xl shadow-2xl w-full sm:w-96 text-gray-700 text-base transition-all duration-500 hover:scale-[1.03]"
      >
        <h1 className="text-2xl font-bold text-blue-400 text-center mb-3">
          Vérification d'email
        </h1>
        <p className="text-center text-sm mb-4 text-blue-700">
          Saisissez le code à 6 chiffres envoyé à votre adresse e-mail.
        </p>
        <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength={1}
                key={index}
                required
                className="w-12 h-12 bg-blue-200 text-blue-800 text-center text-xl rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-2 px-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold">
          Vérifier l'email
        </button>
        <p className="text-center text-sm mt-4">
          <button type="button" className="text-blue-400 underline" onClick={onResend}>
            Renvoyer le code
          </button>
        </p>
      </form>
    </div>
  );
};

export default EmailVerify;
