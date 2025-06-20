import React, { useState } from 'react';
import './AdresseCommande.css';

const AdresseCommande = () => {
    const [activeMenu, setActiveMenu] = useState('Adresse et Commande');
    const [adresse, setAdresse] = useState('');

    const menuItems = [
        { name: 'Compte', active: false },
        { name: 'Détails', active: false },
        { name: 'Adresse et Commande', active: true },
        { name: 'Déconnexion', active: false }
    ];

    const commandes = [
        {
            id: 'COMMANDE #2039',
            date: '15 Jan 2024',
            status: 'Livrée',
            total: '45.50€'
        },
        {
            id: 'COMMANDE #1140',
            date: '08 Jan 2024',
            status: 'En cours',
            total: '32.80€'
        }
    ];

    const handleAdresseSubmit = (e) => {
        e.preventDefault();
        console.log('Adresse mise à jour:', adresse);
        alert('Adresse mise à jour avec succès !');
    };

    const voirCommande = (commandeId) => {
        console.log('Voir détails de:', commandeId);
        alert(`Affichage des détails de ${commandeId}`);
    };

    return (
        <div className="adresse-container">
            {/* Sidebar */}
            <div className="adresse-sidebar">
                <div className="profile-section">
                    <div className="profile-avatar">
                        <img
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face"
                            alt="Profile"
                            className="avatar-img"
                        />
                    </div>
                    <h3 className="profile-name">Sofia Havertz</h3>
                </div>

                <nav className="adresse-nav">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveMenu(item.name)}
                            className={`adresse-nav-item ${activeMenu === item.name ? 'active' : ''}`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="adresse-main">
                <div className="adresse-header">
                    <h1>Mon Compte</h1>
                </div>

                <div className="content-wrapper">
                    {/* Section Adresse */}
                    <div className="adresse-section">
                        <h2 className="section-title">Adresse du compte</h2>

                        <form onSubmit={handleAdresseSubmit} className="adresse-form">
                            <div className="form-group">
                                <label htmlFor="adresse" className="form-label">Adresse</label>
                                <input
                                    type="text"
                                    id="adresse"
                                    name="adresse"
                                    value={adresse}
                                    onChange={(e) => setAdresse(e.target.value)}
                                    className="form-input"
                                    placeholder="Adresse"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Section Commandes */}
                    <div className="commandes-section">
                        <h2 className="section-title">Commande</h2>

                        <div className="commandes-list">
                            {commandes.map((commande, index) => (
                                <div key={index} className="commande-item">
                                    <div className="commande-info">
                                        <h3 className="commande-id">{commande.id}</h3>
                                        <div className="commande-details">
                                            <span className="commande-date">{commande.date}</span>
                                            <span className={`commande-status ${commande.status === 'Livrée' ? 'livree' : 'en-cours'}`}>
                        {commande.status}
                      </span>
                                            <span className="commande-total">{commande.total}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => voirCommande(commande.id)}
                                        className="voir-button"
                                    >
                                        Voir
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdresseCommande;