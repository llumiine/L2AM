import React from "react";
import "../styles/ProductGrid.css";
import { Link } from "react-router-dom";

export default function ProductGrid({ products }) {
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
            products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.nom}
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <h3 className="product-title">{product.nom}</h3>
                  <p className="product-price">{product.prix}€</p>

                  <div className="product-actions">
                    <Link to={`/product/${product.id}`} className="btn-voir-plus">
                      Voir plus
                    </Link>

                    <button className="btn-cart">
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}
