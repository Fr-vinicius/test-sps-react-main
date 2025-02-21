import React, { useContext } from "react";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";

const Header = () => {
  const { pathname } = useLocation();
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  let pageTitle = "";

  switch (pathname) {
    case "/":
      pageTitle = "Login";
      break;
    case "/UserInfo":
      pageTitle = "Informações do usuário";
      break;
    case "/Users":
      pageTitle = "Lista de usuários";
      break;
    case "/User":
      pageTitle = "Editar usuário";
      break;
    case "/CreateUser":
      pageTitle = "Criar usuário";
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="header">
      <div>
        <h1>SPS React Test</h1>
      </div>
      <div className="pageTitle">{pageTitle}</div>

      {pathname !== "/" && token && (
        <button className="exit-button" onClick={handleLogout}>
          Sair
        </button>
      )}
    </div>
  );
};

export default Header;
