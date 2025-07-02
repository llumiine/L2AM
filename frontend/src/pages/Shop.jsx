import React, { useState, useEffect, useCallback } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import "../styles/Shop.css";

const Shop = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    types: [],
    maxPrice: null,
    sizes: [],
  });

  // Fonction pour charger les produits avec les filtres
  const fetchProduits = useCallback(async () => {
    try {
      setLoading(true);

      // Construction des paramètres de requête
      const params = new URLSearchParams();
      if (filters.types.length > 0) {
        filters.types.forEach((type) => params.append("types", type));
      }
      if (filters.maxPrice) {
        params.append("maxPrice", filters.maxPrice);
      }
      if (filters.sizes.length > 0) {
        filters.sizes.forEach((size) => params.append("sizes", size));
      }

      const response = await fetch(
        `http://localhost:9090/api/produits?${params}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des produits");
      }
      const data = await response.json();
      setProduits(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [filters]);

  // Charger les produits au montage et quand les filtres changent
  useEffect(() => {
    fetchProduits();
  }, [fetchProduits]);

  // Gestionnaire de changement des filtres
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <div className="shop">Chargement...</div>;
  }

  if (error) {
    return <div className="shop">Erreur: {error}</div>;
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <SearchBar />
        <SortBar />
      </div>
      <div className="shop-content">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <ProductGrid products={produits} />
      </div>
    </div>
  );
};

export default Shop;
