import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("Token") || null);
  const [id, setId] = useState(localStorage.getItem("Id") || null);
  const [userType, setUserType] = useState(
    localStorage.getItem("UserType") || null
  );

  const contextLogin = (newToken, newUserType, newId) => {
    localStorage.setItem("Token", newToken);
    localStorage.setItem("UserType", newUserType);
    localStorage.setItem("id", newId);
    setToken(newToken);
    setUserType(newUserType);
    setId(newId);
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserType");
    localStorage.removeItem("id");
    setToken(null);
    setUserType(null);
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userType, id, contextLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
