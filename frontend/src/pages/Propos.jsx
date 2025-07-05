import React from "react";
import "../styles/Propos.css";

// Nouvelle photo d'artiste plus esthétique et professionnelle
const portrait = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face";

const Propos = () => {
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

              <div className="stats-section">
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Créations réalisées</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Clients satisfaits</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Années d'expérience</span>
                </div>
              </div>

              <div className="cta-section">
                <button className="cta-button primary">
                  <span>Découvrir mes créations</span>
                  <span className="button-arrow">→</span>
                </button>
                <button className="cta-button secondary">
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