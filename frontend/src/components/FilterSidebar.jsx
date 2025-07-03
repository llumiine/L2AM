import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "../styles/FilterSidebar.css";

const FilterSidebar = ({ onFilterChange }) => {
  // États pour les sélections
  const [selectedTypeIds, setSelectedTypeIds] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [currentMaxPrice, setCurrentMaxPrice] = useState(200);
  
  // États pour les données dynamiques
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Contrôle du chargement unique
  const hasLoadedData = useRef(false);
  const isLoadingData = useRef(false);

  // Charger les données une seule fois
  useEffect(() => {
    if (hasLoadedData.current || isLoadingData.current) {
      return;
    }
    loadFilterData();
  }, []);

  const loadFilterData = async () => {
    if (isLoadingData.current) return;
    
    isLoadingData.current = true;
    
    try {
      setLoading(true);
      
      // Récupérer les produits
      const produitsResponse = await axios.get('http://localhost:9090/api/produits');
      const produits = produitsResponse.data;
      
      // Types par défaut
      const defaultTypes = [
        { idTypeOeuvre: 1, libelle: "Digital", nom: null },
        { idTypeOeuvre: 2, libelle: "Argile", nom: null },
        { idTypeOeuvre: 3, libelle: "Calligraphie", nom: null }
      ];
      
      // Extraction des données depuis les produits
      const uniqueColors = [...new Set(
        produits.map(p => p.couleur).filter(c => c && c.trim())
      )];
      
      const uniqueSizes = [...new Set(
        produits.map(p => p.taille).filter(t => t && t.trim())
      )];
      
      const prices = produits.map(p => parseFloat(p.prix)).filter(p => !isNaN(p));
      const newPriceRange = prices.length > 0 ? 
        { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) } :
        { min: 0, max: 200 };
      
      // Mise à jour des états
      setTypes(defaultTypes);
      setColors(uniqueColors);
      setSizes(uniqueSizes);
      setPriceRange(newPriceRange);
      setCurrentMaxPrice(newPriceRange.max);
      setError(null);
      
    } catch (err) {
      console.error('Erreur chargement filtres:', err);
      setError('Erreur de chargement');
      
      // Données par défaut en cas d'erreur
      setTypes([
        { idTypeOeuvre: 1, libelle: "Digital", nom: null },
        { idTypeOeuvre: 2, libelle: "Argile", nom: null },
        { idTypeOeuvre: 3, libelle: "Calligraphie", nom: null }
      ]);
      setColors(["Rouge", "Beige", "Bleu", "Gris", "Vert"]);
      setSizes(["S", "M", "L", "A4"]);
      
    } finally {
      setLoading(false);
      hasLoadedData.current = true;
      isLoadingData.current = false;
    }
  };

  // Handlers mémorisés pour éviter les re-renders
  const handleTypeToggle = useCallback((typeId) => {
    setSelectedTypeIds(prev => {
      const newIds = prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId];
      
      // Notification avec timeout pour éviter les appels multiples
      setTimeout(() => {
        const selectedTypeObjects = types.filter(t => newIds.includes(t.idTypeOeuvre));
        if (onFilterChange) {
          onFilterChange({
            types: selectedTypeObjects,
            colors: selectedColors,
            sizes: selectedSizes,
            maxPrice: currentMaxPrice,
            minPrice: priceRange.min
          });
        }
      }, 0);
      
      return newIds;
    });
  }, [types, selectedColors, selectedSizes, currentMaxPrice, priceRange.min, onFilterChange]);

  const handleItemToggle = useCallback((item, currentList, setter, filterType) => {
    setter(prev => {
      const newList = prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item];
      
      // Notification avec timeout
      setTimeout(() => {
        if (onFilterChange) {
          const selectedTypeObjects = types.filter(t => selectedTypeIds.includes(t.idTypeOeuvre));
          onFilterChange({
            types: selectedTypeObjects,
            colors: filterType === 'colors' ? newList : selectedColors,
            sizes: filterType === 'sizes' ? newList : selectedSizes,
            maxPrice: currentMaxPrice,
            minPrice: priceRange.min
          });
        }
      }, 0);
      
      return newList;
    });
  }, [types, selectedTypeIds, selectedColors, selectedSizes, currentMaxPrice, priceRange.min, onFilterChange]);

  const handlePriceChange = useCallback((newPrice) => {
    const price = parseInt(newPrice);
    setCurrentMaxPrice(price);
    
    // Notification avec timeout
    setTimeout(() => {
      if (onFilterChange) {
        const selectedTypeObjects = types.filter(t => selectedTypeIds.includes(t.idTypeOeuvre));
        onFilterChange({
          types: selectedTypeObjects,
          colors: selectedColors,
          sizes: selectedSizes,
          maxPrice: price,
          minPrice: priceRange.min
        });
      }
    }, 100); // Délai plus long pour le prix (éviter trop d'appels)
  }, [types, selectedTypeIds, selectedColors, selectedSizes, priceRange.min, onFilterChange]);

  // Reset des filtres
  const resetFilters = useCallback(() => {
    setSelectedTypeIds([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setCurrentMaxPrice(priceRange.max);
    
    if (onFilterChange) {
      onFilterChange({
        types: [],
        colors: [],
        sizes: [],
        maxPrice: priceRange.max,
        minPrice: priceRange.min
      });
    }
  }, [priceRange.max, priceRange.min, onFilterChange]);

  if (loading) {
    return (
      <aside className="filter-sidebar">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Chargement des filtres...</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="filter-sidebar">
      {error && (
        <div className="error-message">⚠️ {error}</div>
      )}

      {/* Types d'œuvre */}
      <div className="filter-section">
        <h3>
          Type d'œuvre 
          {selectedTypeIds.length > 0 && (
            <span className="selected-count">({selectedTypeIds.length})</span>
          )}
        </h3>
        <div className="filter-options">
          {types.map(type => {
            const isChecked = selectedTypeIds.includes(type.idTypeOeuvre);
            return (
              <label key={type.idTypeOeuvre} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleTypeToggle(type.idTypeOeuvre)}
                />
                <span className="checkmark"></span>
                <span className="filter-label">{type.libelle}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Couleurs */}
      <div className="filter-section">
        <h3>
          Couleur 
          {selectedColors.length > 0 && (
            <span className="selected-count">({selectedColors.length})</span>
          )}
        </h3>
        <div className="filter-options">
          {colors.map(color => (
            <label key={color} className="filter-checkbox color-option">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => handleItemToggle(color, selectedColors, setSelectedColors, 'colors')}
              />
              <span className="checkmark"></span>
              <span 
                className="color-dot" 
                style={{ backgroundColor: getColorCode(color) }}
                title={color}
              ></span>
              <span className="filter-label">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tailles */}
      <div className="filter-section">
        <h3>
          Taille 
          {selectedSizes.length > 0 && (
            <span className="selected-count">({selectedSizes.length})</span>
          )}
        </h3>
        <div className="filter-options">
          {sizes.map(size => (
            <label key={size} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleItemToggle(size, selectedSizes, setSelectedSizes, 'sizes')}
              />
              <span className="checkmark"></span>
              <span className="filter-label">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div className="filter-section">
        <h3>Prix (jusqu'à {currentMaxPrice}€)</h3>
        <div className="price-filter">
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={currentMaxPrice}
            onChange={e => handlePriceChange(e.target.value)}
            className="price-slider"
          />
          <div className="price-display">
            <span>{priceRange.min}€</span>
            <span className="current-price">{currentMaxPrice}€</span>
            <span>{priceRange.max}€</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="filter-actions">
        <button 
          className="reset-button" 
          onClick={resetFilters}
          title="Réinitialiser tous les filtres"
        >
          🔄 Réinitialiser
        </button>
      </div>

      {/* Filtres actifs */}
      {(selectedTypeIds.length > 0 || selectedColors.length > 0 || selectedSizes.length > 0) && (
        <div className="active-filters-summary">
          <h4>Filtres actifs:</h4>
          <div className="active-filters-list">
            {selectedTypeIds.map(typeId => {
              const type = types.find(t => t.idTypeOeuvre === typeId);
              return type ? (
                <span key={typeId} className="filter-tag">
                  {type.libelle}
                  <button onClick={() => handleTypeToggle(typeId)}>×</button>
                </span>
              ) : null;
            })}
            
            {selectedColors.map(color => (
              <span key={color} className="filter-tag">
                {color}
                <button onClick={() => handleItemToggle(color, selectedColors, setSelectedColors, 'colors')}>×</button>
              </span>
            ))}
            
            {selectedSizes.map(size => (
              <span key={size} className="filter-tag">
                {size}
                <button onClick={() => handleItemToggle(size, selectedSizes, setSelectedSizes, 'sizes')}>×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

// Fonction utilitaire pour les couleurs
const getColorCode = (colorName) => {
  const colorMap = {
    'Rouge': '#ff4757',
    'Beige': '#f39c12',
    'Bleu': '#3742fa',
    'Gris': '#808080',
    'Vert': '#2ed573',
    'Jaune': '#ffa502',
    'Noir': '#2f3542',
    'Blanc': '#f1f2f6',
    'Rose': '#ff6b9d',
    'Violet': '#a55eea',
    'Orange': '#ff6348',
    'Marron': '#8b4513',
    'Cyan': '#00d2d3'
  };
  
  return colorMap[colorName] || '#999999';
};

export default FilterSidebar;