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

  const applyFilters = () => {
    let filtered = [...produits];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.nom.toLowerCase().includes(searchLower) ||
          (product.description &&
            product.description.toLowerCase().includes(searchLower))
      );
    }

    if (currentFilters.types.length > 0) {
      const typeIds = currentFilters.types.map(typeObj => typeObj.idTypeOeuvre);
      filtered = filtered.filter((product) => 
        typeIds.includes(product.idTypeOeuvre)
      );
    }

    if (currentFilters.colors.length > 0) {
      filtered = filtered.filter((product) => 
        currentFilters.colors.includes(product.couleur)
      );
    }

    if (currentFilters.sizes.length > 0) {
      filtered = filtered.filter((product) => 
        currentFilters.sizes.includes(product.taille)
      );
    }

    filtered = filtered.filter(
      (product) => {
        const price = parseFloat(product.prix);
        return price >= currentFilters.minPrice && price <= currentFilters.maxPrice;
      }
    );
    
    setFilteredProduits(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, currentFilters, produits]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

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