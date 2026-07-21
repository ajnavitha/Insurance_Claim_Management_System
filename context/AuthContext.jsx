import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("insureapp_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("insureapp_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("insureapp_user");
    }
  }, [user]);

  const login = (userData, token) => {
    console.log("LOGIN USER:", userData);
    console.log("TOKEN:", token);

    setUser(userData);

    localStorage.setItem("insureapp_user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("role", userData.role);
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("insureapp_user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);