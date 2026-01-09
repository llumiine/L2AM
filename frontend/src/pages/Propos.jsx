import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Propos.css";
import portrait from "../assets/about.jpg";

const Propos = () => {
  const navigate = useNavigate();
  const goToShop = () => navigate("/shop");
  const goToContact = () => navigate("/contact");
  return (
      <div className="propos-page">
        <div className="propos-container">
          <div className="propos-content">
            <div className="propos-left">
              <div className="image-wrapper">
                <img src={portrait} alt="Portrait de l'artiste L2AM" className="propos-image" />
                <div className="image-decoration">
                  <span className="decoration-element">✨</span>
                  <span className="decoration-element">🎨</span>
                  <span className="decoration-element">💫</span>
                </div>
              </div>
            </div>

            <div className="propos-right">
              <div className="content-header">
                <span className="section-badge">Mon histoire</span>
                <h1>À propos de moi</h1>
                <div className="title-underline"></div>
              </div>

              <div className="content-text">
                <p className="intro-text">
                  Bienvenue chez <strong className="brand-highlight">L2AM</strong>, une boutique artisanale où chaque création est pensée avec passion,
                  précision et sensibilité.
                </p>

                <p>
                  Je suis une créatrice indépendante, amoureuse des textures et des couleurs, qui façonne à la main des pièces uniques,
                  en argile et peinture acrylique.
                </p>

                <p>
                  Mon objectif est simple : proposer des objets qui ont une âme, qui racontent une histoire, et qui font sourire.
                  Chaque œuvre est une invitation à découvrir un univers artistique unique.
                </p>

                <div className="highlight-box">
                  <div className="highlight-icon">💛</div>
                  <p className="highlight-text">
                    Merci pour votre curiosité, votre soutien, et votre présence ici
                  </p>
                </div>
              </div>

              

              <div className="cta-section">
                <button className="cta-button primary" onClick={goToShop}>
                  <span>Découvrir mes créations</span>
                  <span className="button-arrow">→</span>
                </button>
                <button className="cta-button secondary" onClick={goToContact}>
                  <span>Me contacter</span>
                  <span className="button-icon">💌</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Propos;