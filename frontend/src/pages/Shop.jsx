import React, { useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";
import "../styles/Shop.css";

const Shop = () => {
  const [produits, setProduits] = useState([]);
  const [filteredProduits, setFilteredProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState({
    types: [],
    colors: [],
    sizes: [],
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/produits");
        if (!response.ok) {
          throw new Error("Erreur de chargement des produits");
        }
        const data = await response.json();
        setProduits(data);
        setFilteredProduits(data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  // Appliquer les filtres et la recherche
  const applyFilters = () => {
    let filtered = [...produits];

    // Appliquer la recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.nom.toLowerCase().includes(searchLower) ||
          (product.description &&
            product.description.toLowerCase().includes(searchLower))
      );
    }

    // Appliquer les filtres de types
    if (currentFilters.types.length > 0) {
      const typeIds = currentFilters.types.map(typeObj => typeObj.idTypeOeuvre);
      filtered = filtered.filter((product) => 
        typeIds.includes(product.idTypeOeuvre)
      );
    }

    // Appliquer les filtres de couleurs
    if (currentFilters.colors.length > 0) {
      filtered = filtered.filter((product) => 
        currentFilters.colors.includes(product.couleur)
      );
    }

    // Appliquer les filtres de tailles
    if (currentFilters.sizes.length > 0) {
      filtered = filtered.filter((product) => 
        currentFilters.sizes.includes(product.taille)
      );
    }

    // Appliquer le filtre de prix
    filtered = filtered.filter(
      (product) => {
        const price = parseFloat(product.prix);
        return price >= currentFilters.minPrice && price <= currentFilters.maxPrice;
      }
    );
    
    setFilteredProduits(filtered);
  };

  // Effet pour appliquer les filtres quand les critères changent
  useEffect(() => {
    applyFilters();
  }, [searchTerm, currentFilters, produits]);

  // Gestionnaire de recherche
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Gestionnaire de filtres
  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
  };

  return (
    <div className="shop-container">
      <FilterSidebar onFilterChange={handleFilterChange} />
      <div className="shop-main">
        <div className="shop-header">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="results-info">
          {!loading && (
            <div className="results-count">
              <p>{filteredProduits.length} produit(s) trouvé(s)</p>
            </div>
          )}
        </div>
        {loading ? (
          <div className="loading-state">
            <p>Chargement des produits...</p>
          </div>
        ) : (
          <ProductGrid products={filteredProduits} />
        )}
      </div>
    </div>
  );
};

export default Shop;