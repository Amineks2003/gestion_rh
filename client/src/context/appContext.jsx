import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

// Contexte utilisé par les pages (nommage compatible avec le reste du projet)
export const AppContent = createContext();

// Backwards-compatible names: export aliases so other files importing
// `AppContext` / `AppContextProvider` still work.
export const AppContext = AppContent;

export const AppContentProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const backendUrl = axiosInstance.defaults.baseURL || "";

  // Récupère les données utilisateur si un cookie de session existe
  const getUserData = async () => {
    try {
      const { data } = await axiosInstance.get("/user/data");
      if (data?.success) {
        setUserData(data.userData);
        setIsLoggedin(true);
        return data.userData;
      }
    } catch (error) {
      setUserData(null);
      setIsLoggedin(false);
    }
  };

  const logoutLocal = () => {
    setUserData(null);
    setIsLoggedin(false);
  };

  useEffect(() => {
    // Essaye d'initialiser l'état utilisateur au démarrage de l'app
    // Only if we have a token cookie (don't spam with CORS errors on fresh page load)
    if (document.cookie.includes('token')) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        logoutLocal,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};

// Alias the provider with the legacy name
export const AppContextProvider = AppContentProvider;
