import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9090/api/produits/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    alert(`Ajouté au panier : ${quantity} exemplaire(s)`);
  };

  if (!product) return <div style={{ padding: "3rem", textAlign: "center" }}>Chargement...</div>;

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '3rem 2rem', minHeight: '80vh' }}>
        <div style={{
          display: 'flex',
          gap: '3rem',
          marginBottom: '5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          background: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e8f5e8'
        }}>
          <div style={{ flexShrink: 0, width: '450px' }}>
            <div style={{ position: 'relative' }}>              <img
  src={`http://localhost:9090/uploads/${product.image}`}

  alt={product.nom}
  style={{
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(168, 196, 160, 0.3)'
  }}
/>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                🤍
              </div>
            </div>
          </div>

          <div style={{ flex: 1, paddingLeft: '1.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '25px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                ✨ Création artisanale
              </span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2c3e2d',
              marginBottom: '1rem'
            }}>
              {product.nom}
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#f6ad55', fontSize: '1.2rem' }}>★</span>
                ))}
              </div>
              <span style={{ color: '#5a6c57', fontSize: '0.95rem', fontWeight: '500' }}>4.8 (127 avis)</span>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <p style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#2c3e2d',
                marginBottom: '0.5rem'
              }}>
                {product.prix}€
              </p>
              <p style={{ color: '#7a8a77' }}>Livraison gratuite incluse</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                color: '#2c3e2d',
                marginBottom: '0.8rem',
                fontWeight: '600'
              }}>
                Quantité
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  border: '2px solid #e8f5e8',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  color: '#2c3e2d'
                }}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '1.3rem 2rem',
                background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '2rem'
              }}
            >
              Ajouter au panier
            </button>

            <div style={{
              border: '2px solid #e8f5e8',
              borderRadius: '12px',
              background: 'white'
            }}>
              <button
                onClick={() => setShowDescription(!showDescription)}
                style={{
                  width: '100%',
                  padding: '1.2rem 1.5rem',
                  background: '#f8fdf8',
                  border: 'none',
                  fontSize: '1rem',
                  color: '#2c3e2d',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                📦 Description du produit {showDescription ? '▲' : '▼'}
              </button>
              {showDescription && (
                <div style={{
                  padding: '1.5rem',
                  fontSize: '1rem',
                  color: '#5a6c57',
                  lineHeight: '1.7',
                  borderTop: '1px solid #f0f8f0'
                }}>
                  {product.description || "Ce produit n'a pas encore de description."}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AVIS FIXES */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#2c3e2d' }}>Derniers avis</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {[
              { name: "Sarah", date: "01/03/2025", stars: 3, comment: "Joli produit, conforme à mes attentes" },
              { name: "Milena", date: "05/01/2025", stars: 5, comment: "Magnifique travail artisanal, je recommande !" },
              { name: "Catherine", date: "16/12/2024", stars: 5, comment: "Parfait pour organiser mes bijoux" },
              { name: "Michael Jackson", date: "23/11/2024", stars: 5, comment: "Cadeau parfait, ma fille adore" },
            ].map((review, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                border: '1px solid #e8f5e8',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 15px rgba(168, 196, 160, 0.1)'
              }}>
                <div style={{ display: 'flex', gap: '1px', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{
                      color: i < review.stars ? '#f6ad55' : '#e8f5e8',
                      fontSize: '1rem'
                    }}>★</span>
                  ))}
                </div>
                <p style={{ color: '#5a6c57', marginBottom: '1rem' }}>{review.comment}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src={`https://i.pravatar.cc/32?img=${index + 25}`} alt={review.name} style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid #e8f5e8'
                  }} />
                  <div>
                    <p style={{ fontWeight: '600', color: '#2c3e2d' }}>{review.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#7a8a77' }}>{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
