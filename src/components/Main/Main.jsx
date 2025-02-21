import React, { useContext, useState } from "react";
import { loginAPI } from "../../services/UserService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext.jsx";
import Snackbar from "../../components/Snackbar/Snackbar";
import "./styles.css";

const Main = () => {
  const navigate = useNavigate();
  const { contextLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  async function handleSignIn() {
    if (!email || !password) {
      ShowSnackBar("Preencha e-mail e senha para continuar!");
      return;
    }

    setLoading(true);

    try {
      const response = await loginAPI(email, password);

      if (response?.Token) {
        contextLogin(response.Token, response.type, response.id);
        if (response.type === "admin") {
          navigate("/Users");
        } else {
          navigate("/User");
        }
      } else {
        ShowSnackBar(
          "Houve um problema com o login, verifique suas credenciais."
        );
      }
    } catch (error) {
      ShowSnackBar("Erro ao tentar fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function ShowSnackBar(text) {
    setSnackMessage(text);
    setTimeout(() => setSnackMessage(""), 3000);
  }

  return (
    <div className="main">
      <div className="login__container">
        <form className="form__container">
          <label className="label">
            Email
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </label>
          <label className="label">
            Senha
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </label>

          <div className="button__container">
            <button
              className="signIn-button"
              type="button"
              onClick={handleSignIn}
              disabled={loading || password.length < 4 || email.length < 4}
            >
              {loading ? <span className="loader"></span> : "Entrar"}
            </button>
          </div>
        </form>
      </div>

      <Snackbar message={snackMessage} />
    </div>
  );
};

export default Main;
