import React, { createContext, useState } from "react";

// Crée le contexte
export const AppContext = createContext();

// Crée le Provider
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
