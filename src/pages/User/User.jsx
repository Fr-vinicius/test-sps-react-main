import React from "react";
import "./styles.css";
import UserList from "../../components/UserList/UserList";

function User() {
  return (
    <div className="home">
      <h1>Clique para editar seu usuário</h1>

      <UserList />
    </div>
  );
}

export default User;
