import React from "react";
import "../styles/Propos.css";
const portrait = "https://i.pravatar.cc/300?img=68";

const Propos = () => {
  return (
    <div className="propos-page">
      <div className="propos-container">
        <div className="propos-left">
          <img src={portrait} alt="Portrait" className="propos-image" />
        </div>
        <div className="propos-right">
          <h1>À propos de moi</h1>
          <p>
            Bienvenue chez <strong>L2AM</strong>, une boutique artisanale où chaque création est pensée avec passion,
            précision et sensibilité.
          </p>
          <p>
            Je suis une créatrice indépendante, amoureuse des textures et des couleurs, qui façonne à la main des pièces uniques,
            en argile et peinture acrylique.
          </p>
          <p>
            Mon objectif est simple : proposer des objets qui ont une âme, qui racontent une histoire, et qui font sourire.
          </p>
          <p>
            Merci pour votre curiosité, votre soutien, et votre présence ici 💛
          </p>
        </div>
      </div>
    </div>
  );
};

export default Propos;
