import React, { useState } from "react";
import "../styles/FilterSidebar.css";

const FilterSidebar = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [price, setPrice] = useState(100);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const types = [
    "Peinture traditionnelle",
    "Illustration digitale",
    "Art abstrait",
    "Calligraphy",
  ];

  const sizes = ["Petit format", "Moyen format", "Grand format"];

  const toggleCheckbox = (item, list, setList) => {
    setList(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setPrice(100);
  };

  const handleFilter = () => {
    console.log("Types:", selectedTypes);
    console.log("Taille:", selectedSizes);
    console.log("Prix maximum:", price);
  };

  return (
    <aside className="filter-sidebar">
      <h3>Type d'œuvre</h3>
      {types.map(type => (
        <label key={type}>
          <input
            type="checkbox"
            checked={selectedTypes.includes(type)}
            onChange={() => toggleCheckbox(type, selectedTypes, setSelectedTypes)}
          />
          {type}
        </label>
      ))}

      <h3>Prix (jusqu’à {price}€)</h3>
      <input
        type="range"
        min="0"
        max="100"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <h3>Taille</h3>
      {sizes.map(size => (
        <label key={size}>
          <input
            type="checkbox"
            checked={selectedSizes.includes(size)}
            onChange={() => toggleCheckbox(size, selectedSizes, setSelectedSizes)}
          />
          {size}
        </label>
      ))}

      <div className="filter-actions">
        <button className="filter-button" onClick={handleFilter}>Filtrer</button>
        <button className="reset-button" onClick={resetFilters}>Réinitialiser</button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
