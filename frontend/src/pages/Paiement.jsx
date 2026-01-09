import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // adapte le chemin si besoin

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart(); // adapte selon ton contexte
  const user = JSON.parse(localStorage.getItem("user")); // ou via contexte
  const [cardName, setCardName] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    try {
      // 1. Paiement Stripe
      const sousTotal = cartItems.reduce((sum, item) => sum + item.prix * item.quantity, 0);
      const fraisLivraison = cartItems.length > 0 ? 5 : 0;
      const total = sousTotal + fraisLivraison;
      const amount = Math.round(total * 100); // en centimes

      console.log("Montant total (euros):", total);
      console.log("Montant envoyé à Stripe (centimes):", amount);

      if (amount < 50) {
        setError("Le montant minimum pour un paiement Stripe est de 0,50 €.");
        setIsProcessing(false);
        return;
      }

      const res = await fetch("http://localhost:9090/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });
      const data = await res.json();
      console.log("Réponse Stripe backend:", data);
      const clientSecret = data.clientSecret;

      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardName }
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        // 2. Création de la facture
        const token = user?.token || localStorage.getItem("token"); // ou localStorage.getItem("token")

        const factureRes = await fetch("http://localhost:9090/api/factures", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
          },
          body: JSON.stringify({
            datePaiement: new Date(),
            total: total,
            sousTotal: sousTotal.toFixed(2),
            livraison: fraisLivraison,
            adresse: user?.adresse,
            ville: user?.ville,
            codePostal: user?.codePostal
          })
        });
        const facture = await factureRes.json();

        // 3. Création des commandes (une par produit)
        let idCommande = null;
        for (const item of cartItems) {
          const commandeRes = await fetch("http://localhost:9090/api/commandes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` })
            },
            body: JSON.stringify({
              idUtilisateur: user?.id,
              idProduit: item.id,
              idFacture: facture.idFacture,
              quantite: item.quantity,
              prixAchat: item.prix
            })
          });
          const commande = await commandeRes.json();
          if (!idCommande) idCommande = commande.idCommande; // on prend le premier pour l'affichage
        }

        clearCart && clearCart();
        navigate(`/paiementconfirmer?commande=${idCommande}&facture=${facture.idFacture}`);
      } else {
        setError("Paiement non abouti.");
      }
    } catch (err) {
      setError("Erreur Stripe : " + err.message);
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div>
        <label>Nom sur la carte</label>
        <input
          type="text"
          placeholder="Nom sur la carte"
          value={cardName}
          onChange={e => setCardName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Carte bancaire</label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#2d3e2d',
                '::placeholder': { color: '#888' }
              }
            }
          }}
        />
      </div>
      {error && <div style={{ color: "#d4838a", fontWeight: "500" }}>{error}</div>}
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        style={{
          width: '100%',
          backgroundColor: isProcessing ? '#bfc9b6' : '#a8b89a',
          color: 'white',
          border: 'none',
          padding: '15px',
          borderRadius: '25px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          marginTop: '40px',
          transition: 'all 0.3s ease',
          opacity: isProcessing ? 0.7 : 1
        }}
      >
        {isProcessing ? 'Traitement...' : 'Payer'}
      </button>
    </form>
  );
};

const Paiement = () => {
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
            <Elements stripe={stripePromise}>
              <StripeCardForm />
            </Elements>
          </div>
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
  );
};

export default Paiement;

