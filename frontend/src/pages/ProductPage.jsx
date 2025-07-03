import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/produits/${id}`);
        console.log('✅ Produit chargé:', response.data);
        setProduct(response.data);
      } catch (err) {
        console.error('❌ Erreur chargement produit:', err);
      }
    };

    fetchProduct();
    checkUserAuthentication();
  }, [id]);

  const checkUserAuthentication = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    setIsLoggedIn(token && userData);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    addToCart(product, parseInt(quantity));
    alert(`✅ Ajouté au panier : ${quantity} exemplaire(s) de ${product.nom}`);
  };

  // Fonction simplifiée pour obtenir l'URL de l'image
  const getImageUrl = (product) => {
    if (!product?.image) {
      return null;
    }
    
    // SOLUTION SIMPLE : Utiliser les images du dossier public/images/
    return `/images/${product.image}`;
  };

  // Image de fallback basée sur le type
  const getFallbackImage = (product) => {
    if (!product) return null;
    
    const typeImages = {
      1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDUwIiBoZWlnaHQ9IjM1MCIgZmlsbD0iIzNmNTFiNSIvPjx0ZXh0IHg9IjIyNSIgeT0iMTc1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QXJ0IERpZ2l0YWw8L3RleHQ+PC9zdmc+',
      2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDUwIiBoZWlnaHQ9IjM1MCIgZmlsbD0iI2Y1N2MwMCIvPjx0ZXh0IHg9IjIyNSIgeT0iMTc1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QXJnaWxlPC90ZXh0Pjwvc3ZnPg==',
      3: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDUwIiBoZWlnaHQ9IjM1MCIgZmlsbD0iIzljMjdiMCIvPjx0ZXh0IHg9IjIyNSIgeT0iMTc1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q2FsbGlncmFwaGllPC90ZXh0Pjwvc3ZnPg=='
    };
    
    return typeImages[product.idTypeOeuvre] || 
           'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDUwIiBoZWlnaHQ9IjM1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDUwIiBoZWlnaHQ9IjM1MCIgZmlsbD0iIzk5OTk5OSIvPjx0ZXh0IHg9IjIyNSIgeT0iMTc1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvZHVpdDwvdGV4dD48L3N2Zz4=';
  };

  const handleImageError = () => {
    console.log('❌ Erreur chargement image depuis public/images/. Utilisation du fallback.');
    setImageError(true);
  };

  if (!product) {
    return (
      <div style={{ 
        padding: "3rem", 
        textAlign: "center",
        fontSize: "1.2rem",
        color: "#5a6c57"
      }}>
        Chargement du produit...
      </div>
    );
  }

  const imageUrl = getImageUrl(product);
  const fallbackUrl = getFallbackImage(product);
  const finalImageUrl = (!imageUrl || imageError) ? fallbackUrl : imageUrl;

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
          
          {/* Section Image */}
          <div style={{ flexShrink: 0, width: '450px' }}>
            <div style={{ position: 'relative' }}>
              {/* Image du produit */}
              <img
                src={finalImageUrl}
                alt={product.nom}
                onError={handleImageError}
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: '0 12px 40px rgba(168, 196, 160, 0.3)'
                }}
              />

              {/* Badge si image de fallback */}
              {(!imageUrl || imageError) && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: 'rgba(255, 193, 7, 0.9)',
                  color: '#856404',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Image d'exemple
                </div>
              )}

              {/* Bouton favori */}
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
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer'
              }}>
                🤍
              </div>
            </div>
          </div>

          {/* Section Détails */}
          <div style={{ flex: 1, paddingLeft: '1.5rem' }}>
            {/* Badge type */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '25px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                ✨ {product.typeLibelle || 'Création artisanale'}
              </span>
            </div>

            {/* Titre */}
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2c3e2d',
              marginBottom: '1rem'
            }}>
              {product.nom}
            </h1>

            {/* Étoiles et avis */}
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
              <span style={{ color: '#5a6c57', fontSize: '0.95rem', fontWeight: '500' }}>
                4.8 (127 avis)
              </span>
            </div>

            {/* Prix */}
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

            {/* Informations produit */}
            <div style={{
              background: '#f8fdf8',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              color: '#5a6c57'
            }}>
              <p><strong>Couleur:</strong> {product.couleur || 'Non spécifiée'}</p>
              <p><strong>Taille:</strong> {product.taille || 'Unique'}</p>
              <p><strong>Stock:</strong> {product.stock || 0} disponible(s)</p>
            </div>

            {/* Message de connexion */}
            {!isLoggedIn && (
              <div style={{
                backgroundColor: '#fff3cd',
                color: '#856404',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                border: '1px solid #ffeaa7'
              }}>
                🔒 Vous devez être connecté pour ajouter des produits au panier
              </div>
            )}

            {/* Sélecteur de quantité */}
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
                disabled={!isLoggedIn || !product.stock}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  border: '2px solid #e8f5e8',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  color: '#2c3e2d',
                  cursor: (!isLoggedIn || !product.stock) ? 'not-allowed' : 'pointer'
                }}
              >
                {[...Array(Math.min(10, product.stock || 1))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* Bouton d'ajout au panier */}
            <button
              onClick={handleAddToCart}
              disabled={!isLoggedIn || !product.stock}
              style={{
                width: '100%',
                padding: '1.3rem 2rem',
                background: isLoggedIn && product.stock
                  ? 'linear-gradient(135deg, #a8c4a0, #8fb085)' 
                  : 'linear-gradient(135deg, #6c757d, #5a6268)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isLoggedIn && product.stock ? 'pointer' : 'not-allowed',
                marginBottom: '2rem',
                transition: 'all 0.3s ease',
                opacity: isLoggedIn && product.stock ? 1 : 0.7
              }}
            >
              {!isLoggedIn ? 'Se connecter pour acheter' : 
               !product.stock ? 'Rupture de stock' : 
               'Ajouter au panier'}
            </button>

            {/* Section description */}
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
                  fontWeight: '600',
                  borderRadius: showDescription ? '10px 10px 0 0' : '10px'
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
                  {product.description || "Ce magnifique produit artisanal a été créé avec soin et attention aux détails. Chaque pièce est unique et reflète l'expertise de notre atelier."}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section Avis clients */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#2c3e2d' }}>
              Derniers avis clients
            </h2>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {[
              { name: "Sarah M.", date: "01/03/2025", stars: 5, comment: "Produit magnifique, exactement comme sur la photo !" },
              { name: "Milena K.", date: "05/01/2025", stars: 5, comment: "Travail artisanal de qualité, je recommande vivement." },
              { name: "Catherine L.", date: "16/12/2024", stars: 4, comment: "Très satisfaite de mon achat, livraison rapide." },
              { name: "Alex D.", date: "23/11/2024", stars: 5, comment: "Parfait pour offrir, emballage soigné." },
            ].map((review, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                border: '1px solid #e8f5e8',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 15px rgba(168, 196, 160, 0.1)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', gap: '1px', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{
                      color: i < review.stars ? '#f6ad55' : '#e8f5e8',
                      fontSize: '1rem'
                    }}>★</span>
                  ))}
                </div>
                <p style={{ 
                  color: '#5a6c57', 
                  marginBottom: '1rem',
                  lineHeight: '1.5'
                }}>
                  "{review.comment}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, #a8c4a0, #8fb085)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', color: '#2c3e2d', margin: '0' }}>
                      {review.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#7a8a77', margin: '0' }}>
                      {review.date}
                    </p>
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