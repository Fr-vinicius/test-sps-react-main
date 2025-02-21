import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserAPI } from "../../services/UserService";
import "./styles.css";
import { AuthContext } from "../../services/AuthContext";
import Snackbar from "../../components/Snackbar/Snackbar";

const CreateUser = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const { userType } = useContext(AuthContext);
  const isAdm = userType === "admin";
  const navigate = useNavigate();

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
                className="create__send-button"
                type="button"
                onClick={handleCreateUser}
              >
                {loading ? <span className="loader"></span> : "Salvar"}
              </button>
              <Link
                to={"/Users"}
                disabled={loading}
                className="create__back-button"
              >
                voltar
              </Link>
            </form>
          </div>
        </div>

        <Snackbar message={snackMessage} />
      </div>
    </div>
  );
};

export default CreateUser;
