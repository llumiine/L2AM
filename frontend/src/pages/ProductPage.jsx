import React, { useState } from "react";
import "../styles/ProductPage.css";
import productImage from "../assets/fleurbijoux.jpg"; // remplace par ton image réelle

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(false);

  const handleAddToCart = () => {
    alert(`Ajouté au panier : ${quantity} exemplaire(s)`);
  };

  return (
    <div className="product-page">
      <div className="product-main">
        <img src={productImage} alt="Trésor suspendu" className="product-image" />
        <div className="product-info">
          <h1>Trésor suspendu</h1>
          <p className="price">20€</p>
          <p className="material">Argile</p>

          <label>Quantité</label>
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>{n + 1}</option>
            ))}
          </select>

          <button onClick={handleAddToCart}>Ajouter au panier</button>

          <div className="accordion">
            <button onClick={() => setShowDescription(!showDescription)}>
              Porte-bijoux
            </button>
            {showDescription && (
              <div className="description">
                Fait main en argile et peinture acrylique
              </div>
            )}
          </div>
        </div>
      </div>

      <h2>Derniers avis</h2>
      <div className="reviews">
        {[
          { name: "Sarah", date: "01/03/2025", stars: 3 },
          { name: "Milena", date: "05/01/2025", stars: 5 },
          { name: "Catherine", date: "16/12/2024", stars: 5 },
          { name: "Michael Jackson", date: "23/11/2024", stars: 5 },
        ].map((review, index) => (
          <div className="review-card" key={index}>
            <div className="stars">{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</div>
            <h3>Review title</h3>
            <p>Review body</p>
            <div className="review-footer">
              <img src={`https://i.pravatar.cc/40?img=${index + 10}`} alt={review.name} />
              <div>
                <p>{review.name}</p>
                <p>{review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
