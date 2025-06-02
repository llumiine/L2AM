import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Panier = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { 
      id: 1, 
      nom: "Délice rouge", 
      prix: 15, 
      quantite: 1, 
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=120&h=120&fit=crop&crop=center" 
    },
    { 
      id: 2, 
      nom: "Souvenirs en couleur", 
      prix: 15, 
      quantite: 1, 
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=120&h=120&fit=crop&crop=center" 
    },
    { 
      id: 3, 
      nom: "Trésor suspendu", 
      prix: 20, 
      quantite: 1, 
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=120&h=120&fit=crop&crop=center" 
    }
  ]);

  const [promoCode, setPromoCode] = useState("");

  const handleQuantiteChange = (id, type) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantite: type === 'add' ? item.quantite + 1 : Math.max(1, item.quantite - 1) }
        : item
    ));
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const sousTotal = items.reduce((sum, item) => sum + item.prix * item.quantite, 0);
  const fraisLivraison = 5;
  const total = sousTotal + fraisLivraison;

  const handlePaiement = () => {
    navigate('/paiement');
  };

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif", 
      backgroundColor: '#f8f8f8', 
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <main style={{ 
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          marginBottom: '40px',
          color: '#2d3e2d'
        }}>
          Mon Panier
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Items Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {items.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={item.image} 
                  alt={item.nom}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    marginBottom: '5px',
                    color: '#2d3e2d'
                  }}>
                    {item.nom}
                  </h3>
                  <p style={{ 
                    fontSize: '16px', 
                    fontWeight: '500',
                    color: '#2d3e2d'
                  }}>
                    {item.prix}€
                  </p>
                </div>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  padding: '5px'
                }}>
                  <button 
                    onClick={() => handleQuantiteChange(item.id, 'subtract')}
                    style={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    −
                  </button>
                  <span style={{ 
                    fontSize: '16px', 
                    fontWeight: '500', 
                    minWidth: '20px', 
                    textAlign: 'center' 
                  }}>
                    {item.quantite}
                  </span>
                  <button 
                    onClick={() => handleQuantiteChange(item.id, 'add')}
                    style={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    +
                  </button>
                </div>

                <button 
                  onClick={() => handleRemove(item.id)}
                  style={{
                    backgroundColor: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    width: '35px',
                    height: '35px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              marginBottom: '25px',
              color: '#2d3e2d'
            }}>
              Récapitulatif de la commande
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '16px',
                color: '#666'
              }}>
                <span>Sous-total</span>
                <span style={{ fontWeight: '500' }}>{sousTotal}€</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '16px',
                color: '#666'
              }}>
                <span>Livraison</span>
                <span style={{ fontWeight: '500' }}>{fraisLivraison}€</span>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '18px',
                fontWeight: '600',
                color: '#2d3e2d'
              }}>
                <span>Total</span>
                <span>{total}€</span>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              marginTop: '25px',
              marginBottom: '25px'
            }}>
              <input
                type="text"
                placeholder="Ajouter un code promo"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <button style={{
                backgroundColor: '#a8b89a',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Ajouter
              </button>
            </div>

            <button 
              onClick={handlePaiement}
              style={{
                width: '100%',
                backgroundColor: '#a8b89a',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#96a488'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#a8b89a'}
            >
              Paiement →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Panier;