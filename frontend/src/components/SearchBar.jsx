import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const [activeSort, setActiveSort] = useState("note");

    const handleSearch = () => {
        console.log("Recherche:", searchValue);
    };

    const handleSortChange = (sortType) => {
        setActiveSort(sortType);
        console.log("Tri sélectionné:", sortType);
    };

    return (
        <div className="search-bar-container">
            {/* Barre de recherche principale */}
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Valeur"
                    className="search-input"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21L16.65 16.65"/>
                    </svg>
                </button>
            </div>

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