import React from "react";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Rechercher une œuvre..."
        className="search-input"
      />
      <button className="search-button">
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
