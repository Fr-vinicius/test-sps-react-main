import React, { useState } from "react";
import "./styles.css";
import UserList from "../../components/UserList/UserList.jsx";
import { Link } from "react-router-dom";

function Users() {
  return (
    <div className="home">
      <div className="header__container">
        <h1>Clique para editar um usuário</h1>
        <Link to={"/CreateUser"} className="search-button">
          Criar novo usuário
        </Link>
      </div>
      <UserList />
    </div>
  );
}

export default Users;
