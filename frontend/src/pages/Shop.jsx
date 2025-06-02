import React from "react";
import FilterSidebar from "../components/FilterSidebar";
import SearchBar from "../components/SearchBar";
import SortBar from "../components/SortBar";
import ProductGrid from "../components/ProductGrid";
import "../styles/Shop.css";

const Shop = () => {
  return (
    <div className="shop-container">
      <FilterSidebar />
      <div className="shop-main">
        <SearchBar />
        <SortBar />
        <ProductGrid />
      </div>
    </div>
  );
};

export default Shop;
