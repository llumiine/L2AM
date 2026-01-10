import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import cakeImg from "../assets/fraise.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
    // Fonction de validation du format email
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  const [mdp, setMdp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Veuillez saisir une adresse email valide.");
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await axios.post("http://localhost:9090/api/auth/login", {
        email,
        mdp,
      });

      const utilisateur = response.data.utilisateur;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(utilisateur));

      if (utilisateur.role === 1) {
        console.log("Connexion admin réussie");
        navigate("/gestionadmin");
      } else {
        console.log("Connexion utilisateur réussie");
        navigate("/pageclient");
      }

    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Email ou mot de passe incorrect");
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
            <small style={{ color: "#b00020" }}>{emailError}</small>
          </label>
          <label>
            Mot de passe
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                required
                placeholder="Votre mot de passe"
                className="password-input"
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </label>
          <div className="login-forgot">
            <a href="#">Mot de passe oublié ?</a>
          </div>
          <button type="submit">Connexion</button>
        </form>
        <p className="login-register">
          Tu n'as pas de compte ?{" "}
          <Link to="/register">Inscris-toi maintenant</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;