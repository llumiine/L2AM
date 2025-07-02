import React, { useEffect, useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import ProductGrid from "../components/ProductGrid";
import "../styles/Shop.css";

const Shop = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Récupérer les produits depuis le backend
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/produits");
        if (!response.ok) {
          throw new Error("Erreur de chargement des produits");
        }
        const data = await response.json();
        setProduits(data);
      } catch (err) {
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  return (
    <div className="shop-container">
      <FilterSidebar />
      <div className="shop-main">
        <SearchBar />
        <SortBar />
        {loading ? (
          <p>Chargement des produits...</p>
        ) : (
          <ProductGrid products={produits} />
        )}
      </div>
    </div>
  );
};

export default Shop;
