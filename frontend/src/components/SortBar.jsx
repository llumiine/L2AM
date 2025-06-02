import React from "react";
import "../styles/SortBar.css";

const SortBar = () => {
  return (
    <div className="sort-bar">
      <span className="sort-label">Trier par :</span>
      <button className="sort-button">Note</button>
      <button className="sort-button">Ordre décroissant</button>
      <button className="sort-button">Ordre croissant</button>
    </div>
  );
};

export default SortBar;
