import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createUserAPI,
  deleteUserAPI,
  editUserInfoAPI,
  getUserInfoAPI,
} from "../../services/UserService";
import "./styles.css";
import { AuthContext } from "../../services/AuthContext";
import Snackbar from "../../components/Snackbar/Snackbar";

const CreateUser = () => {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const userId = location.state?.userId;

  const { userType, id } = useContext(AuthContext);
  const isAdm = userType === "admin";
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function getUserInfo() {
    setLoading(true);
    try {
      const response = await getUserInfoAPI(isAdm ? userId : id);
      if (response) {
        setUsers([response]);
        setName(response.name);
        setEmail(response.email);
        setPassword(response.password);
        setType(response.type);
      } else {
        ShowSnackBar("Usuário não encontrado.");
      }
    } catch (error) {
      ShowSnackBar("Erro ao buscar usuário. Verifique o ID.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateUser() {
    setLoading(true);
    try {
      const response = await createUserAPI(name, email, password, type);

      if (response) {
        ShowSnackBar("Usuário criado com sucesso.");
        navigate("/Users");
      } else {
        ShowSnackBar("Não foi possível criar o usuário, tente novamente.");
      }
    } catch (error) {
      ShowSnackBar(error.message);
    } finally {
      setLoading(false);
    }
  }

  function ShowSnackBar(text) {
    setSnackMessage(text);
    setTimeout(() => setSnackMessage(""), 3000);
  }

  return (
    <div className="home">
      <div className="user__item">
        <div className="user__container">
          <div className="search_container">
            <form className="search_container">
              <label className="label">
                Nome
                <input
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </label>
              <label className="label">
                E-mail
                <input
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </label>
              {isAdm && (
                <label className="label">
                  Tipo
                  <input
                    className="input"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    disabled={loading}
                  />
                </label>
              )}
              <label className="label">
                Senha
                <input
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </label>
              <button
                disabled={loading}
                className="send-button"
                type="button"
                onClick={handleCreateUser}
              >
                {loading ? <span className="loader"></span> : "Salvar"}
              </button>
            </form>
          </div>
        </div>

        <Snackbar message={snackMessage} />
      </div>
    </div>
  );
};

export default CreateUser;
