import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserInfoAPI, getUsersAPI } from "../../services/UserService";
import "./styles.css";
import { AuthContext } from "../../services/AuthContext";
import Snackbar from "../Snackbar/Snackbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const { pathname } = useLocation();
  const { userType, id } = useContext(AuthContext);
  const isAdm = userType === "admin";

  useEffect(() => {
    if (!isAdm) {
      getUserInfo(id);
    } else {
      if (pathname === "/Users") {
        getUsers();
      }
    }
  }, []);

  async function getUsers() {
    setLoading(true);
    try {
      const response = await getUsersAPI();
      if (response) {
        setUsers(response);
      }
    } catch (error) {
      ShowSnackBar("Erro ao carregar usuários. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function getUserInfo() {
    setLoading(true);
    try {
      const response = await getUserInfoAPI(isAdm ? userId : id);
      if (response) {
        setUsers([response]);
      } else {
        ShowSnackBar("Usuário não encontrado.");
      }
    } catch (error) {
      ShowSnackBar("Erro ao buscar usuário. Verifique o ID.");
    } finally {
      setLoading(false);
    }
  }

  function ShowSnackBar(text) {
    setSnackMessage(text);
    setTimeout(() => setSnackMessage(""), 3000);
  }

  return (
    <div className="user__item">
      <div className="user__container">
        {isAdm && (
          <div className="search-container">
            <input
              className="search-input"
              value={userId}
              placeholder="Insira o ID do usuário"
              onChange={(e) => setUserId(e.target.value)}
              disabled={loading}
            />
            <button
              disabled={userId.length < 15 || loading}
              className="send-button"
              type="button"
              onClick={getUserInfo}
            >
              {loading ? <span className="loader"></span> : "Procurar"}
            </button>
          </div>
        )}

        {loading ? (
          <p className="loading-text">Carregando usuários...</p>
        ) : (
          users.map((item, index) => (
            <Link
              to="/UserInfo"
              key={index}
              state={{ userId: item.id }}
              className="user-item"
              id={item.id}
            >
              <p>Nome: {item.name}</p>
              <p>Email: {item.email}</p>
              <p>Tipo: {item.type}</p>
              {pathname === "/UserInfo" && <p>Senha: {item.password}</p>}
            </Link>
          ))
        )}
      </div>

      <Snackbar message={snackMessage} />
    </div>
  );
};

export default UserList;
