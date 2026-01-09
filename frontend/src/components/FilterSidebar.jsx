import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "../styles/FilterSidebar.css";

const FilterSidebar = ({ onFilterChange }) => {
  
  const [selectedTypeIds, setSelectedTypeIds] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [currentMaxPrice, setCurrentMaxPrice] = useState(200);
  
  
  const [types, setTypes] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const hasLoadedData = useRef(false);
  const isLoadingData = useRef(false);

  
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

      // Récupère les types depuis l'API
      const typesResponse = await axios.get('http://localhost:9090/api/types');
      setTypes(typesResponse.data);

      // Récupère les produits pour les autres filtres
      const produitsResponse = await axios.get('http://localhost:9090/api/produits');
      const produits = produitsResponse.data;

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

      setColors(uniqueColors);
      setSizes(uniqueSizes);
      setPriceRange(newPriceRange);
      setCurrentMaxPrice(newPriceRange.max);
      setError(null);

    } catch (err) {
      console.error('Erreur chargement filtres:', err);
      setError('Erreur de chargement');
      setTypes([]);
      setColors(["Rouge", "Beige", "Bleu", "Gris", "Vert"]);
      setSizes(["S", "M", "L", "A4"]);
    } finally {
      setLoading(false);
      hasLoadedData.current = true;
      isLoadingData.current = false;
    }
  };

  
  const handleTypeToggle = useCallback((typeId) => {
    setSelectedTypeIds(prev => {
      const newIds = prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId];
      setTimeout(() => {
        if (onFilterChange) {
          onFilterChange({
            types: newIds,
            colors: selectedColors,
            sizes: selectedSizes,
            maxPrice: currentMaxPrice,
            minPrice: priceRange.min
          });
        }
      }, 0);
      return newIds;
    });
  }, [selectedColors, selectedSizes, currentMaxPrice, priceRange.min, onFilterChange]);

  const handleItemToggle = useCallback((item, currentList, setter, filterType) => {
    setter(prev => {
      const newList = prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item];
      setTimeout(() => {
        if (onFilterChange) {
          onFilterChange({
            types: selectedTypeIds,
            colors: filterType === 'colors' ? newList : selectedColors,
            sizes: filterType === 'sizes' ? newList : selectedSizes,
            maxPrice: currentMaxPrice,
            minPrice: priceRange.min
          });
        }
      }, 0);
      return newList;
    });
  }, [selectedTypeIds, selectedColors, selectedSizes, currentMaxPrice, priceRange.min, onFilterChange]);

  const handlePriceChange = useCallback((newPrice) => {
    const price = parseInt(newPrice);
    setCurrentMaxPrice(price);
    setTimeout(() => {
      if (onFilterChange) {
        onFilterChange({
          types: selectedTypeIds,
          colors: selectedColors,
          sizes: selectedSizes,
          maxPrice: price,
          minPrice: priceRange.min
        });
      }
    }, 100);
  }, [selectedTypeIds, selectedColors, selectedSizes, priceRange.min, onFilterChange]);

  
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

  useEffect(() => {
    axios.get('http://localhost:9090/api/types')
      .then(res => setTypes(res.data))
      .catch(() => setTypes([]));
  }, []);

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

      
      <div className="filter-section">
        <h3>
          Type d'œuvre 
          {selectedTypeIds.length > 0 && (
            <span className="selected-count">({selectedTypeIds.length})</span>
          )}
        </h3>
        <div className="filter-options">
          {types.map(type => {
            const isChecked = selectedTypeIds.includes(type.idType);
            return (
              <label key={type.idType} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleTypeToggle(type.idType)}
                />
                <span className="checkmark"></span>
                <span className="filter-label">{type.libelle}</span>
              </label>
            );
          })}
        </div>
      </div>

      
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

      
      <div className="filter-actions">
        <button 
          className="reset-button" 
          onClick={resetFilters}
          title="Réinitialiser tous les filtres"
        >
          🔄 Réinitialiser
        </button>
      </div>

      
      {/* Bloc 'Filtres actifs' supprimé */}
    </aside>
  );
};

//
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