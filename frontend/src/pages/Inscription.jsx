import React from "react";
import "../styles/Login.css";
import cakeImg from "../assets/fraise.png"; // Assure-toi que le chemin est correct

const Inscription = () => {
  return (
    <div className="login-page">
      <div className="login-left">
        <img src={cakeImg} alt="Illustration dessert" className="login-image" />
      </div>
      <div className="login-right">
        <h2>Inscription</h2>
        <form className="login-form">
          <label>
            Nom
            <input type="text" placeholder="Value" />
          </label>
          <label>
            Prénom
            <input type="text" placeholder="Value" />
          </label>
          <label>
            Adresse
            <input type="email" placeholder="Value" />
          </label>
          <label>
            Mot de passe
            <input type="password" placeholder="Value" />
          </label>
          <button type="submit">S'inscrire</button>
        </form>
        <p className="login-register">
          Tu as déjà un compte ? <a href="#">Connecte toi</a>
        </p>
      </div>
    </div>
  );
};

export default Inscription;
