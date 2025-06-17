import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import cakeImg from "../assets/fraise.png";

const Inscription = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:9090/api/auth/register", {
        username,
        password,
      });
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
          <img src={cakeImg} alt="Illustration dessert" className="login-image" />
        </div>
        <div className="login-right">
          <h2>Inscription</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Nom d'utilisateur
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nom d'utilisateur"
                  required
              />
            </label>
            <label>
              Mot de passe
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  required
              />
            </label>
            <button type="submit">S'inscrire</button>
          </form>
          <p className="login-register">
            Tu as déjà un compte ? <a href="#">Connecte-toi</a>
          </p>
        </div>
      </div>
  );
};

export default Inscription;
