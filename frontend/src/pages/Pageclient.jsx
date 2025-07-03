import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ajout pour la navigation
import '../styles/Pageclient.css'; // Votre CSS existant

const PageClient = () => {
    const navigate = useNavigate(); // Hook pour la navigation
    
    // État pour les données utilisateur (récupérées du localStorage et API)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // État pour le formulaire
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        adresse: '',
        ville: '',
        codePostal: '',
        ancienMotDePasse: '',
        nouveauMotDePasse: ''
    });

    // États pour l'UI
    const [activeMenu, setActiveMenu] = useState('Détails');
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Configuration API
    const API_BASE_URL = 'http://localhost:9090/api';

    // Fonction pour récupérer le token
    const getToken = () => localStorage.getItem('token');

    // Fonction pour faire des appels API
    const apiCall = async (endpoint, options = {}) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers
            };

            const token = getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers,
                ...options
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    throw new Error('Session expirée');
                }
                throw new Error(`Erreur ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erreur API:', error);
            throw error;
        }
    };

    // Chargement des données utilisateur au montage du composant
    useEffect(() => {
        loadUserData();
    }, []);

    // Charger les données de l'utilisateur connecté
    const loadUserData = async () => {
        try {
            setLoading(true);
            
            // D'abord, récupérer depuis localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUserData(user);
                
                // Initialiser le formulaire
                setFormData({
                    nom: user.nom || '',
                    prenom: user.prenom || '',
                    email: user.email || '',
                    username: user.username || '',
                    adresse: user.adresse || '',
                    ville: user.ville || '',
                    codePostal: user.codePostal || '',
                    ancienMotDePasse: '',
                    nouveauMotDePasse: ''
                });
            }

            // Ensuite, récupérer les données fraîches depuis l'API
            try {
                const freshUserData = await apiCall('/utilisateurs/me');
                setUserData(freshUserData);
                localStorage.setItem('user', JSON.stringify(freshUserData));
                
                setFormData({
                    nom: freshUserData.nom || '',
                    prenom: freshUserData.prenom || '',
                    email: freshUserData.email || '',
                    username: freshUserData.username || '',
                    adresse: freshUserData.adresse || '',
                    ville: freshUserData.ville || '',
                    codePostal: freshUserData.codePostal || '',
                    ancienMotDePasse: '',
                    nouveauMotDePasse: ''
                });
            } catch {
                console.log('Utilisation des données localStorage en cas d\'erreur API');
            }
            
        } catch (error) {
            setError('Impossible de charger les données utilisateur');
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    // Configuration des menus
    const menuItems = [
        { name: 'Compte', icon: '👤', path: '/compte' },
        { name: 'Détails', icon: '📝', path: '/details' },
        { name: 'Adresse et Commande', icon: '📦', path: '/commandes' },
        { name: 'Déconnexion', icon: '🚪', action: 'logout' }
    ];

    // Gestion des changements dans les inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validation du formulaire
    const validateForm = () => {
        const errors = [];
        
        if (!formData.nom.trim()) errors.push('Le nom est requis');
        if (!formData.prenom.trim()) errors.push('Le prénom est requis');
        if (!formData.email.trim()) errors.push('L\'email est requis');
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.push('L\'email n\'est pas valide');
        }
        
        if (showPasswordSection && formData.nouveauMotDePasse) {
            if (!formData.ancienMotDePasse) {
                errors.push('L\'ancien mot de passe est requis');
            }
            if (formData.nouveauMotDePasse.length < 8) {
                errors.push('Le nouveau mot de passe doit contenir au moins 8 caractères');
            }
        }
        
        return errors;
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (errors.length > 0) {
            alert('Erreurs de validation:\n' + errors.join('\n'));
            return;
        }

        setIsLoading(true);
        
        try {
            const updateData = {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                username: formData.username,
                adresse: formData.adresse,
                ville: formData.ville,
                codePostal: formData.codePostal
            };

            if (showPasswordSection && formData.nouveauMotDePasse) {
                updateData.mdp = formData.nouveauMotDePasse;
            }

            const updatedUser = await apiCall(`/utilisateurs/${userData.id}`, {
                method: 'PUT',
                body: JSON.stringify(updateData)
            });
            
            setUserData(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            alert('Informations mises à jour avec succès !');
            setIsEditing(false);
            setShowPasswordSection(false);
            setFormData(prev => ({
                ...prev,
                ancienMotDePasse: '',
                nouveauMotDePasse: ''
            }));
            
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            alert('Erreur lors de la mise à jour. Veuillez réessayer.');
        } finally {
            setIsLoading(false);
        }
    };

    // Gestion du clic sur les menus
    const handleMenuClick = (menuItem) => {
        if (menuItem.action === 'logout') {
            if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        } else if (menuItem.name === 'Adresse et Commande') {
            // Navigation vers la page AdresseCommande
            navigate('/adresse-commande');
        } else {
            setActiveMenu(menuItem.name);
            console.log(`Navigation vers: ${menuItem.path}`);
        }
    };

    // Annulation de l'édition
    const handleCancelEdit = () => {
        setFormData({
            nom: userData.nom || '',
            prenom: userData.prenom || '',
            email: userData.email || '',
            username: userData.username || '',
            adresse: userData.adresse || '',
            ville: userData.ville || '',
            codePostal: userData.codePostal || '',
            ancienMotDePasse: '',
            nouveauMotDePasse: ''
        });
        setIsEditing(false);
        setShowPasswordSection(false);
    };

    // Affichage du loader pendant le chargement
    if (loading) {
        return (
            <div className="page-client" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                fontSize: '18px'
            }}>
                ⏳ Chargement de votre profil...
            </div>
        );
    }

    // Affichage en cas d'erreur
    if (error) {
        return (
            <div className="page-client" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                color: '#e53e3e'
            }}>
                <h2>❌ Erreur</h2>
                <p>{error}</p>
                <button onClick={loadUserData} className="edit-button">
                    🔄 Réessayer
                </button>
            </div>
        );
    }

    // Affichage si pas de données utilisateur
    if (!userData) {
        return (
            <div className="page-client" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
                ❌ Aucune donnée utilisateur disponible
            </div>
        );
    }

    // Génération de l'image de profil par défaut
    const defaultProfileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent((userData.prenom || '') + ' ' + (userData.nom || ''))}&background=a8c4a0&color=fff&size=100`;

    return (
        <div className="page-client">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="profile-section">
                    <div className="profile-avatar">
                        <img src={defaultProfileImage} alt="Profile" />
                        <div className="profile-status">✓</div>
                    </div>
                    <h3 className="profile-name">
                        {userData.prenom} {userData.nom}
                    </h3>
                    <p className="profile-type">
                        {userData.role === 1 ? 'Administrateur' : 'Cliente premium'}
                    </p>
                    <div className="profile-badge">
                        🌟 Membre depuis {new Date().getFullYear()}
                    </div>
                </div>

                <nav className="nav-menu">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleMenuClick(item)}
                            className={`nav-item ${activeMenu === item.name ? 'active' : ''}`}
                        >
                            <span className="nav-item-icon">{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="stats-section">
                    <h4 className="stats-title">📊 Vos informations</h4>
                    <div className="stats-list">
                        <div className="stats-item">
                            <span className="stats-label">ID Utilisateur</span>
                            <span className="stats-value">#{userData.id}</span>
                        </div>
                        <div className="stats-item">
                            <span className="stats-label">Email</span>
                            <span className="stats-value" style={{ fontSize: '0.8rem' }}>
                                {userData.email}
                            </span>
                        </div>
                        <div className="stats-item">
                            <span className="stats-label">Statut</span>
                            <span className="stats-value">
                                {userData.role === 1 ? '👑 Admin' : '👤 User'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="header-section">
                    <h1 className="main-title">Mon Compte</h1>
                    <p className="main-subtitle">Gérez vos informations personnelles</p>
                </div>

                <div className="content-card">
                    <div className="card-header">
                        <h2 className="card-title">📝 Détails du compte</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`edit-button ${isEditing ? 'cancel' : ''}`}
                            disabled={isLoading}
                        >
                            {isEditing ? '❌ Annuler' : '✏️ Modifier'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Section informations personnelles */}
                        <div className="form-section personal-info">
                            <h3 className="section-title">
                                👤 Informations personnelles
                            </h3>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Prénom</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Nom d'utilisateur</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="form-input"
                                    required
                                />
                            </div>

                            {/* Section adresse */}
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Adresse</label>
                                    <input
                                        type="text"
                                        name="adresse"
                                        value={formData.adresse}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        placeholder="Votre adresse"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Ville</label>
                                    <input
                                        type="text"
                                        name="ville"
                                        value={formData.ville}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        placeholder="Votre ville"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Code Postal</label>
                                    <input
                                        type="text"
                                        name="codePostal"
                                        value={formData.codePostal}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="form-input"
                                        placeholder="Code postal"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section mot de passe */}
                        <div className="form-section security">
                            <div className="section-header">
                                <h3 className="section-title">
                                    🔒 Sécurité du compte
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                                    className="toggle-button"
                                >
                                    {showPasswordSection ? '🔼 Masquer' : '🔽 Modifier mot de passe'}
                                </button>
                            </div>

                            <div className="security-warning">
                                <p>⚠️ Dernière modification : Première connexion</p>
                            </div>

                            {showPasswordSection && (
                                <div className="password-section">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Ancien mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="ancienMotDePasse"
                                            value={formData.ancienMotDePasse}
                                            onChange={handleInputChange}
                                            placeholder="Saisissez votre mot de passe actuel"
                                            className="form-input security-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            Nouveau mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="nouveauMotDePasse"
                                            value={formData.nouveauMotDePasse}
                                            onChange={handleInputChange}
                                            placeholder="Minimum 8 caractères"
                                            className="form-input security-input"
                                        />
                                        <p className="password-hint">
                                            💡 Utilisez au moins 8 caractères avec des lettres, chiffres et symboles
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Boutons d'action */}
                        {isEditing && (
                            <div className="action-buttons">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="cancel-button"
                                    disabled={isLoading}
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    className="save-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? '⏳ Enregistrement...' : '💾 Enregistrer les modifications'}
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Informations de sécurité */}
                    {!isEditing && (
                        <div className="security-info">
                            <h4 className="security-info-title">
                                🛡️ Informations du compte
                            </h4>
                            <div className="security-info-grid">
                                <div className="security-info-item">
                                    <p>🔒 Dernière connexion</p>
                                    <p>Maintenant</p>
                                </div>
                                <div className="security-info-item">
                                    <p>📧 Email vérifié</p>
                                    <p className="verified">✅ Confirmé</p>
                                </div>
                                <div className="security-info-item">
                                    <p>🏠 Adresse complète</p>
                                    <p>
  {userData.adresse && userData.ville && userData.codePostal
      ? `${userData.adresse}, ${userData.codePostal} ${userData.ville}`
      : 'Non renseignée'}
</p>

                                </div>
                                <div className="security-info-item">
                                    <p>👤 Nom d'utilisateur</p>
                                    <p>{userData.username || 'Non défini'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageClient;