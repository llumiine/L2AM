import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/ProductGrid.css";

export default function ProductGrid({ products = [] }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState({});

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (
        window.confirm(
          "Vous devez être connecté pour ajouter des articles au panier. Voulez-vous vous connecter ?"
        )
      ) {
        navigate("/login");
      }
      return;
    }

    addToCart(product);
    alert("Produit ajouté au panier !");
  };

  const getImageUrl = (product) => {
    if (!product?.image) return null;
    
    if (/^https?:\/\//.test(product.image)) {
      return product.image;
    }
    
    return `http://localhost:9090/images/${product.image}`;
  };

  const getFallbackImage = (product) => {
    if (!product) return null;
    
    const typeImages = {
      1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzNmNTFiNSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QXJ0IERpZ2l0YWw8L3RleHQ+PC9zdmc+',
      2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1N2MwMCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QXJnaWxlPC90ZXh0Pjwvc3ZnPg==',
      3: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzljMjdiMCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q2FsbGlncmFwaGllPC90ZXh0Pjwvc3ZnPg=='
    };
    return typeImages[product.idTypeOeuvre] || 
           'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2E4YzRhMCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QXJ0PC90ZXh0Pjwvc3ZnPg==';
  };

  const handleImageError = (productId) => {
    console.log(`Erreur image pour le produit ${productId}`);
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  return (
    <section className="product-section">
      <div className="product-container">
        <div className="product-header">
          <h2 className="section-title">Les plus populaires</h2>
          <div className="title-underline"></div>
        </div>

        <div className="products-grid">
          {products.length === 0 ? (
            <p>Aucun produit ne correspond aux filtres.</p>
          ) : (
            products.map((product) => {
              const imageUrl = getImageUrl(product);
              const fallbackUrl = getFallbackImage(product);
              const hasError = imageErrors[product.id];
              const finalImageUrl = (!imageUrl || hasError) ? fallbackUrl : imageUrl;

              return (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={finalImageUrl}
                      alt={product.nom}
                      className="product-image"
                      onError={() => handleImageError(product.id)}
                    />
                    
                    {(!imageUrl || hasError) && (
                      <div className="fallback-badge">
                        Image d'exemple
                      </div>
                    )}
                  </div>

                  <div className="product-info">
                    <h3 className="product-title">{product.nom}</h3>
                    <p className="product-price">{product.prix}€</p>

                    <div className="product-actions">
                      <Link to={`/product/${product.id}`} className="btn-voir-plus">
                        Voir plus
                      </Link>
                      <button
                        className="btn-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}