import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PanierService } from "../utils/panier";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeCardForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Appel backend pour obtenir le clientSecret
    const total = 1000; // Remplace par le montant réel du panier en centimes
    const res = await fetch("http://localhost:9090/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });
    const { clientSecret, numeroCommande } = await res.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: cardName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      PanierService.viderPanier();
      localStorage.setItem('numeroCommande', numeroCommande); // numéro généré côté backend ou frontend
      if (onPaymentSuccess) onPaymentSuccess();
      navigate(`/paiementconfirmer?commande=${numeroCommande}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div style={{ position: "relative" }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#2d3e2d',
                '::placeholder': { color: '#888' },
                backgroundColor: 'white',
              },
              invalid: { color: '#d4838a' },
            }
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
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        type="submit"
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
      >
        Payer
      </button>
    </form>
  );
};

const Paiement = () => {
  const [addressOption, setAddressOption] = useState("same");

  return (
    <Elements stripe={stripePromise}>
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
            {/* Méthode de paiement */}
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
              <StripeCardForm onPaymentSuccess={() => {}} />
            </div>
            {/* Adresse de facturation */}
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
            </div>
          </div>
        </main>
      </div>
    </Elements>
  );
};

export default Paiement;

