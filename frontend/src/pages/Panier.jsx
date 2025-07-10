import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext'; // AJOUT

const Panier = () => {
  const navigate = useNavigate();
  const { cartItems, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const getImageUrl = (item) => {
    if (!item?.image) {
      return null;
    }
    return `/images/${item.image}`;
  };

  const getFallbackImage = (item) => {
    if (!item) return "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=120&h=120&fit=crop&crop=center";
    
    const typeImages = {
      1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzNmNTFiNSIvPjx0ZXh0IHg9IjYwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFydCBEaWdpdGFsPC90ZXh0Pjwvc3ZnPg==',
      2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2Y1N2MwMCIvPjx0ZXh0IHg9IjYwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFyZ2lsZTwvdGV4dD48L3N2Zz4=',
      3: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzljMjdiMCIvPjx0ZXh0IHg9IjYwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhbGxpZ3JhcGhpZTwvdGV4dD48L3N2Zz4='
    };
    
    return typeImages[item.idTypeOeuvre] || 
           "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=120&h=120&fit=crop&crop=center";
  };

  const handleQuantiteChange = (id, type) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = type === 'add' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const sousTotal = cartItems.reduce((sum, item) => sum + (item.prix * item.quantity), 0);
  const fraisLivraison = cartItems.length > 0 ? 5 : 0; 
  const total = sousTotal + fraisLivraison;

  const handlePaiement = () => {
    navigate("/paiement");
  };

  if (cartItems.length === 0) {
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
            backgroundColor: 'white',
            padding: '60px 40px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              marginBottom: '15px',
              color: '#2d3e2d'
            }}>
              Votre panier est vide
            </h2>
            <p style={{ 
              color: '#666', 
              marginBottom: '30px',
              fontSize: '16px'
            }}>
              Ajoutez des produits à votre panier pour les voir apparaître ici.
            </p>
            <button
              onClick={() => navigate('/shop')}
              style={{
                backgroundColor: '#a8b89a',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#96a488'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#a8b89a'}
            >
              Continuer mes achats
            </button>
          </div>
        </main>
      </div>
    );
  }

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
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#2d3e2d'
          }}>
            Mon Panier ({cartCount} article{cartCount > 1 ? 's' : ''})
          </h1>
          
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              🗑️ Vider le panier
            </button>
          )}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '40px',
          alignItems: 'start'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartItems.map(item => (
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
                  src={getImageUrl(item) || getFallbackImage(item)}
                  alt={item.nom}
                  onError={(e) => {
                    console.log('Erreur chargement image dans panier, utilisation du fallback');
                    e.target.src = getFallbackImage(item);
                  }}
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
                  {item.description && (
                    <p style={{ 
                      fontSize: '14px', 
                      color: '#666',
                      marginTop: '5px'
                    }}>
                      {item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description}
                    </p>
                  )}
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
                    {item.quantity}
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

                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: '#2d3e2d',
                  minWidth: '60px',
                  textAlign: 'right'
                }}>
                  {(item.prix * item.quantity).toFixed(2)}€
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
                <span>Sous-total ({cartCount} article{cartCount > 1 ? 's' : ''})</span>
                <span style={{ fontWeight: '500' }}>{sousTotal.toFixed(2)}€</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '16px',
                color: '#666'
              }}>
                <span>Livraison</span>
                <span style={{ fontWeight: '500' }}>
                  {fraisLivraison === 0 ? 'Gratuite' : `${fraisLivraison}€`}
                </span>
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
                <span>{total.toFixed(2)}€</span>
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
              Payer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Panier;