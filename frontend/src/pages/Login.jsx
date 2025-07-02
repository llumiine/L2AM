import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import cakeImg from "../assets/fraise.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9090/api/auth/login", {
        email,
        mdp,
      });

      // Stockage du token et des infos utilisateur
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.utilisateur));      console.log("Connexion réussie :", response.data);
      alert("Connexion réussie !");

      // Redirection après connexion réussie
      navigate("/accueil");
    } catch (error) {
      console.error("Erreur de connexion :", error.response);
      alert(error.response?.data || "Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={cakeImg} alt="Illustration dessert" className="login-image" />
      </div>
      <div className="login-right">
        <h2>Connexion</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Votre email"
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              value={mdp}
              onChange={(e) => setMdp(e.target.value)}
              required
              placeholder="Votre mot de passe"
            />
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
