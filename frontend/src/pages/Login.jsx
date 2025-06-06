import React from "react";
import { Link } from "react-router-dom"; // Ajoutez cet import
import "../styles/Login.css";
import cakeImg from "../assets/fraise.png"; // Assurez-vous que ce fichier existe

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-left">
        <img src={cakeImg} alt="Illustration dessert" className="login-image" />
      </div>
      <div className="login-right">
        <h2>Connexion</h2>
        <form className="login-form">
          <label>
            Mail
            <input type="email" placeholder="Value" />
          </label>
          <label>
            Mot de passe
            <input type="password" placeholder="Value" />
          </label>
          <div className="login-forgot">
            <a href="#">Mot de passe oublié ?</a>
          </div>
          <button type="submit">Connexion</button>
        </form>
        <p className="login-register">
          Tu n'as pas de compte ? <Link to="/register">Inscris-toi maintenant</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
