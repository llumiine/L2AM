import React from 'react';
import { useLocation } from "react-router-dom";
import '../styles/Paiementconfirmer.css';

const PaiementConfirmer = () => {
    // Exemple : récupération du prénom depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const prenom = user?.prenom || 'Client';

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const numeroCommande = params.get('commande') || '...';
    const numeroFacture = params.get('facture') || localStorage.getItem('idFacture') || '...';

    const handleRetourAccueil = () => {
        window.location.href = '/';
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


                {/* Sous-titre commande et facture */}
                <p className="confirmation-subtitle">COMMANDE {numeroCommande}</p>
                <p className="confirmation-subtitle" style={{fontSize:'18px', color:'#6a8c6a', marginTop:'-10px'}}>FACTURE {numeroFacture}</p>

                {/* Message de confirmation */}
                <div className="confirmation-message">
                    <p>
                        Merci {prenom} d'avoir acheté chez L2AM Studio. Maintenant que votre
                        commande est confirmée, elle vous sera expédiée sous 3
                        à 4 jours ouvrables. Nous vous tiendrons informé des mises à jour de votre commande.
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