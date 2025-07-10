import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import cakeImg from "../assets/fraise.png";

const Inscription = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [mdp, setMdp] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9090/api/auth/register",
        {
          nom,
          prenom,
          adresse,
          mdp,
          email,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Inscription réussie:", response.data);
      alert("Compte créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Échec de l'inscription.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img
          src={cakeImg}
          alt="Illustration dessert"
          className="login-image"
        />
      </div>
      <div className="login-right">
        <h2>Inscription</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </label>
          <label>
            Prénom
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </label>
          <label>
            Adresse
            <input
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Nom d'utilisateur
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Mot de passe
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={mdp}
                onChange={(e) => setMdp(e.target.value)}
                required
                className="password-input"
                placeholder="Votre mot de passe"
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </label>
          <button type="submit">S'inscrire</button>
        </form>
        <p className="login-register">
          Tu as déjà un compte ? <Link to="/login">Connecte-toi</Link>
        </p>
      </div>
    </div>
  );
};

export default Inscription;
