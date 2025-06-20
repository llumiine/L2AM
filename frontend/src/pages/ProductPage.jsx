import React, { useState } from 'react';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(false);

  const handleAddToCart = () => {
    alert(`Ajouté au panier : ${quantity} exemplaire(s)`);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Contenu principal avec style DA */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '3rem 2rem',
        minHeight: '80vh'
      }}>
        {/* Section produit avec style DA */}
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
          {/* Image du produit avec style DA */}
          <div style={{ flexShrink: 0, width: '450px' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=450&h=350&fit=crop"
                alt="Trésor suspendu" 
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
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '1.3rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}>
                🤍
              </div>
            </div>
          </div>
          
          {/* Informations produit avec style DA */}
          <div style={{
            flex: 1,
            paddingLeft: '1.5rem'
          }}>
            {/* Badge fait main */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: '25px',
                fontSize: '0.85rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(168, 196, 160, 0.3)'
              }}>
                ✨ Création artisanale
              </span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2c3e2d',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Trésor suspendu
            </h1>

            {/* Rating avec style DA */}
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
            
            {/* Prix avec style DA */}
            <div style={{
              marginBottom: '2.5rem'
            }}>
              <p style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#2c3e2d',
                lineHeight: '1',
                marginBottom: '0.5rem'
              }}>
                20€
              </p>
              <p style={{
                color: '#7a8a77',
                fontSize: '1rem'
              }}>
                Livraison gratuite incluse
              </p>
            </div>

            {/* Section quantité avec style DA */}
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
                  padding: '1rem 1.2rem',
                  fontSize: '1rem',
                  border: '2px solid #e8f5e8',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  color: '#2c3e2d',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a8c4a0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 1rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '3rem'
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Bouton avec style DA */}
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
                marginBottom: '2rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(168, 196, 160, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(168, 196, 160, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(168, 196, 160, 0.4)';
              }}
            >
              Ajouter au panier
            </button>

            {/* Accordion avec style DA */}
            <div style={{
              border: '2px solid #e8f5e8',
              borderRadius: '12px',
              background: 'white',
              overflow: 'hidden'
            }}>
              <button 
                onClick={() => setShowDescription(!showDescription)}
                style={{
                  width: '100%',
                  padding: '1.2rem 1.5rem',
                  background: 'linear-gradient(135deg, #f8fdf8, #f0f8f0)',
                  border: 'none',
                  fontSize: '1rem',
                  color: '#2c3e2d',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🎨 Porte-bijoux artisanal
                </span>
                <span style={{
                  fontSize: '1rem',
                  color: '#7a8a77',
                  transform: showDescription ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </span>
              </button>
              {showDescription && (
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  fontSize: '1rem',
                  color: '#5a6c57',
                  lineHeight: '1.7',
                  borderTop: '1px solid #f0f8f0'
                }}>
                  <p style={{ marginBottom: '1rem' }}>
                    <strong>Fait main en argile et peinture acrylique</strong>
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    Cette création unique allie fonctionnalité et esthétisme. 
                    Chaque pièce est façonnée à la main avec soin et attention aux détails.
                  </p>
                  
                  <div style={{
                    background: '#f8fdf8',
                    padding: '1rem',
                    borderRadius: '8px',
                    borderLeft: '4px solid #a8c4a0'
                  }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#2c3e2d' }}>Caractéristiques :</p>
                    <ul style={{ paddingLeft: '1rem', lineHeight: '1.8' }}>
                      <li>Argile naturelle sélectionnée</li>
                      <li>Peinture acrylique non toxique</li>
                      <li>Finition mate élégante</li>
                      <li>Entretien facile</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section avis avec style DA */}
        <div style={{ 
          maxWidth: '1100px', 
          margin: '0 auto',
          marginTop: '5rem' // Ajout de la marge supérieure
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: '700',
              color: '#2c3e2d',
              marginBottom: '1rem'
            }}>
              Derniers avis
            </h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#f6ad55', fontSize: '1.3rem' }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2c3e2d' }}>4.8/5</span>
              <span style={{ color: '#7a8a77' }}>• 127 avis</span>
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}>
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
                boxShadow: '0 4px 15px rgba(168, 196, 160, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(168, 196, 160, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(168, 196, 160, 0.1)';
              }}>
                
                <div style={{
                  display: 'flex',
                  gap: '1px',
                  marginBottom: '1rem'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{
                      color: i < review.stars ? '#f6ad55' : '#e8f5e8',
                      fontSize: '1rem'
                    }}>
                      ★
                    </span>
                  ))}
                </div>
                
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#2c3e2d',
                  marginBottom: '0.5rem'
                }}>
                  Review title
                </h3>
                
                <p style={{
                  color: '#5a6c57',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  marginBottom: '1rem'
                }}>
                  {review.comment}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderTop: '1px solid #f8fdf8',
                  paddingTop: '1rem'
                }}>
                  <img 
                    src={`https://i.pravatar.cc/32?img=${index + 25}`} 
                    alt={review.name} 
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #e8f5e8'
                    }}
                  />
                  <div>
                    <p style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: '#2c3e2d',
                      marginBottom: '0.1rem'
                    }}>
                      {review.name}
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#7a8a77'
                    }}>
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