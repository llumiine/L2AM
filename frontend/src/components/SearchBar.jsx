import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");
    const [activeSort, setActiveSort] = useState("note");

    const handleSearch = (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        console.log("Recherche:", searchValue);
        if (onSearch) {
            onSearch(searchValue);
        }
    };

    const handleSortChange = (sortType) => {
        setActiveSort(sortType);
        console.log("Tri sélectionné:", sortType);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value); // Recherche en temps réel
        }
    };

    return (
        <div className="search-bar-container">
            {/* Barre de recherche principale */}
            <form onSubmit={handleSearch} className="search-input-container">
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    className="search-input"
                    value={searchValue}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21L16.65 16.65"/>
                    </svg>
                </button>
            </form>

            {/* Boutons de tri */}
            <div className="sort-buttons">
                <button
                    className={`sort-btn ${activeSort === "note" ? "active" : ""}`}
                    onClick={() => handleSortChange("note")}
                >
                    <span className="checkmark">✓</span>
                    Note
                </button>

                <button
                    className={`sort-btn ${activeSort === "desc" ? "active" : ""}`}
                    onClick={() => handleSortChange("desc")}
                >
                    Ordre décroissant
                </button>

                <button
                    className={`sort-btn ${activeSort === "asc" ? "active" : ""}`}
                    onClick={() => handleSortChange("asc")}
                >
                    Ordre croissant
                </button>
            </div>
        </div>
    );
};

export default SearchBar;