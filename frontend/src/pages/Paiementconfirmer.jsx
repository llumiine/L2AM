import React from 'react';
import './PaiementConfirmer.css';

const PaiementConfirmer = () => {
    const handleRetourAccueil = () => {
        // Redirection vers la page d'accueil
        console.log('Retour à la page d\'accueil');
        // window.location.href = '/';
        alert('Redirection vers la page d\'accueil');
    };

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                {/* Icône de confirmation */}
                <div className="check-icon">
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="check-svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#a8c4a0"
                            strokeWidth="2"
                            fill="none"
                        />
                        <path
                            d="m9 12 2 2 4-4"
                            stroke="#a8c4a0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Titre principal */}
                <h1 className="confirmation-title">Paiement Confirmé</h1>

                {/* Sous-titre */}
                <p className="confirmation-subtitle">COMMANDE 20155</p>

                {/* Message de confirmation */}
                <div className="confirmation-message">
                    <p>
                        Merci Marthe d'avoir acheté chez Learn'Eat. Maintenant que votre
                        commande est confirmée, elle vous sera d'être expédiée sous 3
                        à 4 jours ouvrables. Nous vous tiendrons informé jusqu'à jour du
                        mises à jour de votre commande.
                    </p>
                </div>

                {/* Bouton de retour */}
                <button
                    onClick={handleRetourAccueil}
                    className="retour-button"
                >
                    Retourner à la page d'accueil
                </button>
            </div>
        </div>
    );
};

export default PaiementConfirmer;