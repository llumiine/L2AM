import React, { useState } from 'react';
import './PageClient.css';

const PageClient = () => {
    const [activeMenu, setActiveMenu] = useState('Détails');
    const [formData, setFormData] = useState({
        nom: 'Nom',
        prenom: 'Prénom',
        email: 'Mail',
        ancienMotDePasse: '',
        nouveauMotDePasse: ''
    });

    const menuItems = [
        { name: 'Compte', active: false },
        { name: 'Détails', active: true },
        { name: 'Adresse et Commande', active: false },
        { name: 'Déconnexion', active: false }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données mises à jour:', formData);
        alert('Informations mises à jour avec succès !');
    };

    return (
        <div className="client-container">
            {/* Sidebar */}
            <div className="client-sidebar">
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

                <nav className="client-nav">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveMenu(item.name)}
                            className={`client-nav-item ${activeMenu === item.name ? 'active' : ''}`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="client-main">
                <div className="client-header">
                    <h1>Mon Compte</h1>
                </div>

                <div className="account-content">
                    <h2 className="section-title">Détails du compte</h2>

                    <form onSubmit={handleSubmit} className="account-form">
                        {/* Informations personnelles */}
                        <div className="form-section">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nom" className="form-label">NOM</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Nom"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="prenom" className="form-label">PRÉNOM</label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Prénom"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Mail"
                                />
                            </div>
                        </div>

                        {/* Mot de passe */}
                        <div className="form-section">
                            <h3 className="subsection-title">Mot de passe</h3>

                            <div className="form-group">
                                <label htmlFor="ancienMotDePasse" className="form-label">ANCIEN MOT DE PASSE</label>
                                <input
                                    type="password"
                                    id="ancienMotDePasse"
                                    name="ancienMotDePasse"
                                    value={formData.ancienMotDePasse}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Ancien mot de passe"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nouveauMotDePasse" className="form-label">NOUVEAU MOT DE PASSE</label>
                                <input
                                    type="password"
                                    id="nouveauMotDePasse"
                                    name="nouveauMotDePasse"
                                    value={formData.nouveauMotDePasse}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Nouveau mot de passe"
                                />
                            </div>
                        </div>

                        <button type="submit" className="save-button">
                            Enregistrer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PageClient;