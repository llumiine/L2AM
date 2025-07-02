import React, { useState, useEffect } from "react";
import "../styles/FilterSidebar.css";

const FilterSidebar = ({ onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [price, setPrice] = useState(100);
  const [selectedSizes, setSelectedSizes] = useState([]);
  
  // États pour les données dynamiques
  const [typesOeuvre, setTypesOeuvre] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [loading, setLoading] = useState(true);

  // Récupération des données au chargement
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les types d'œuvre
        const typesResponse = await fetch("http://localhost:9090/api/types-oeuvre");
        if (typesResponse.ok) {
          const typesData = await typesResponse.json();
          setTypesOeuvre(typesData);
        }

        // Récupérer le prix maximum
        const maxPriceResponse = await fetch("http://localhost:9090/api/produits/prix-max");
        if (maxPriceResponse.ok) {
          const maxPriceData = await maxPriceResponse.json();
          const fetchedMaxPrice = Math.ceil(maxPriceData || 100);
          setMaxPrice(fetchedMaxPrice);
          setPrice(fetchedMaxPrice);
        }

        // Récupérer les tailles disponibles
        const produitsResponse = await fetch("http://localhost:9090/api/produits");
        if (produitsResponse.ok) {
          const produitsData = await produitsResponse.json();
          const uniqueSizes = [...new Set(
            produitsData
              .map(produit => produit.taille)
              .filter(taille => taille && taille.trim() !== "")
          )].sort();
          setAvailableSizes(uniqueSizes);
        }

      } catch (err) {
        console.error("Erreur lors de la récupération des données de filtrage:", err);
        // Fallback avec des données par défaut
        setTypesOeuvre([
          { idType: 1, nom: "Digital", libelle: "Digital" },
          { idType: 2, nom: "Argile", libelle: "Argile" },
          { idType: 3, nom: "Calligraphie", libelle: "Calligraphie" }
        ]);
        setAvailableSizes(["S", "M", "L", "A4"]);
        setMaxPrice(100);
        setPrice(100);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  // Fonction pour mettre à jour les filtres (compatible avec votre structure)
  const updateFilters = (newTypes = selectedTypes, newSizes = selectedSizes, newPrice = price) => {
    const filters = {
      types: newTypes,
      maxPrice: newPrice < maxPrice ? parseFloat(newPrice) : null,
      sizes: newSizes
    };
    
    console.log("Filtres envoyés:", filters);
    onFilterChange(filters);
  };

  // Gestionnaires d'événements
  const handleTypeChange = (typeId) => {
    const newTypes = selectedTypes.includes(typeId) 
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    
    setSelectedTypes(newTypes);
    updateFilters(newTypes, selectedSizes, price);
  };

  const handleSizeChange = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSizes);
    updateFilters(selectedTypes, newSizes, price);
  };

  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
    updateFilters(selectedTypes, selectedSizes, newPrice);
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setPrice(maxPrice);
    
    // Réinitialiser dans le format attendu par votre Shop
    onFilterChange({
      types: [],
      maxPrice: null,
      sizes: []
    });
  };

  if (loading) {
    return (
      <aside className="filter-sidebar">
        <div className="loading">Chargement des filtres...</div>
      </aside>
    );
  }

  return (
    <aside className="filter-sidebar">
      <div className="filter-section">
        <h3>Type d'œuvre</h3>
        {typesOeuvre.map(type => (
          <label key={type.idType} className="filter-option">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type.idType)}
              onChange={() => handleTypeChange(type.idType)}
            />
            <span className="checkmark"></span>
            {type.libelle || type.nom}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h3>Prix maximum</h3>
        <div className="price-filter">
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="price-slider"
          />
          <div className="price-display">
            <span>0€</span>
            <span className="current-price">{price}€</span>
            <span>{maxPrice}€</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Taille</h3>
        {availableSizes.map(size => (
          <label key={size} className="filter-option">
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={() => handleSizeChange(size)}
            />
            <span className="checkmark"></span>
            {size}
          </label>
        ))}
      </div>

      <div className="filter-actions">
        <button className="reset-button" onClick={resetFilters}>
          Réinitialiser
        </button>
        <div className="active-filters-count">
          {(selectedTypes.length + selectedSizes.length + (price < maxPrice ? 1 : 0)) > 0 && (
            <span>
              {selectedTypes.length + selectedSizes.length + (price < maxPrice ? 1 : 0)} filtre(s) actif(s)
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;