import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteUserAPI,
  editUserInfoAPI,
  getUserInfoAPI,
} from "../../services/UserService";
import "./styles.css";
import { AuthContext } from "../../services/AuthContext";
import Snackbar from "../../components/Snackbar/Snackbar";
import Modal from "../../components/Modal/Modal";

const UserEdit = () => {
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
  useEffect(() => {
    getUserInfo();
  }, []);

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

  async function handleEditUser() {
    setLoading(true);
    try {
      const response = await editUserInfoAPI(
        userId,
        name,
        email,
        password,
        type
      );

      if (response) {
        ShowSnackBar("Usuário atualizado com sucesso.");
        getUserInfo();
      } else {
        ShowSnackBar("Não foi possível atualizar o usuário, tente novamente.");
      }
    } catch (error) {
      ShowSnackBar(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteUser() {
    setLoading(true);
    try {
      const response = await deleteUserAPI(userId);

      if (response) {
        ShowSnackBar("Usuário removido com sucesso!");
        setIsModalOpen(false);
        localStorage.removeItem("Token");
        localStorage.removeItem("id");
        if (!isAdm) logout();
      } else {
        ShowSnackBar("Não foi possível remover o usuário, tente novamente.");
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
                  placeholder="Aterar nome"
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </label>
              <label className="label">
                E-mail
                <input
                  className="input"
                  value={email}
                  placeholder="Alterar email"
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
                    placeholder="Alterar tipo do usuário"
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
                  placeholder="Alterar senha"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </label>
              <button
                disabled={loading}
                className="send-button"
                type="button"
                onClick={handleEditUser}
              >
                {loading ? <span className="loader"></span> : "Salvar"}
              </button>
              <button
                disabled={loading}
                className="delete-button"
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                {loading ? <span className="loader"></span> : "Excluir usuário"}
              </button>
              <Link
                to={"/Users"}
                disabled={loading}
                className="delete-button"
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                voltar
              </Link>
            </form>
          </div>
        </div>

        <Snackbar message={snackMessage} />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="modal-content">
            <h2 className="modal_text">Deseja deletar o usuário?</h2>
          </div>
          <div className="modal-footer">
            <button className="send-button" onClick={handleDeleteUser}>
              Confirmar
            </button>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserEdit;
