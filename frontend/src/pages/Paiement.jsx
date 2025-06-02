import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Paiement = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [addressOption, setAddressOption] = useState("same");

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
          Paiement
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Payment Method Section */}
          <div>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '20px',
              color: '#2d3e2d'
            }}>
              Méthode de paiement
            </h2>
            
            <div style={{
              backgroundColor: '#d4838a',
              color: 'white',
              padding: '15px 20px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{ fontSize: '20px' }}>💳</div>
              <span style={{ fontWeight: '500' }}>Carte de crédit</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Card inputs */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Numéro de carte"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '16px'
                }}>🔒</div>
              </div>

              <input
                type="text"
                placeholder="Nom sur la carte"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              />

              <div style={{ display: 'flex', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                />
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 15px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}>ℹ️</div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address Section */}
          <div>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              marginBottom: '20px',
              color: '#2d3e2d'
            }}>
              Adresse de facturation
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#555'
              }}>
                <input
                  type="radio"
                  name="address"
                  value="same"
                  checked={addressOption === 'same'}
                  onChange={(e) => setAddressOption(e.target.value)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#d4838a'
                  }}
                />
                Identique à l'adresse de livraison
              </label>

              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#555'
              }}>
                <input
                  type="radio"
                  name="address"
                  value="different"
                  checked={addressOption === 'different'}
                  onChange={(e) => setAddressOption(e.target.value)}
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#d4838a'
                  }}
                />
                Utiliser une adresse différente pour la facturation
              </label>
            </div>

            <button 
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
                marginTop: '40px',
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

export default Paiement;