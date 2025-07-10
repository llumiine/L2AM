import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Quote from "../components/Quote";
import About from "../components/About";
import ProductGrid from "../components/ProductGrid";
import Testimonials from "../components/Testimonials";
import "../styles/Home.css";

const Home = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="home-page">
      <Hero />
      <Quote />
      <About />
      {loading ? (
        <p style={{ textAlign: "center" }}>Chargement des produits...</p>
      ) : (
        <ProductGrid products={produits} />
      )}
      <Testimonials />
    </div>
  );
};

export default Home;
