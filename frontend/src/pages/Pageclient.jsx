import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pageclient.css';

const PageClient = () => {
    const navigate = useNavigate(); // Hook pour la navigation
    
    
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
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

    
    const [activeMenu, setActiveMenu] = useState('Détails');
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    
    const API_BASE_URL = 'http://localhost:9090/api';

    
    const getToken = () => localStorage.getItem('token');

    
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

    
    useEffect(() => {
        loadUserData();
    }, []);

    
    const loadUserData = async () => {
        try {
            setLoading(true);
            
            
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                setUserData(user);
                
                
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
    const menuItems = [
        { name: "Détails", icon: "📝" },
        { name: "Adresse et Commande", icon: "📦" },
        { name: "Déconnexion", icon: "🚪" },
    ];

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    
    const validateForm = () => {
        const errors = [];
        if (!formData.nom) errors.push('Le nom est requis');
        if (!formData.prenom) errors.push('Le prénom est requis');
        if (!formData.email) errors.push('L\'email est requis');
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.push('Email invalide');
        if (showPasswordSection && formData.nouveauMotDePasse && formData.nouveauMotDePasse.length < 8) {
            errors.push('Le nouveau mot de passe doit contenir au moins 8 caractères');
        }
        return errors;
    };

    

const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
        alert('Erreurs de validation:\n' + errors.join('\n'));
        return;
    }

    setIsLoading(true);
    
    try {
        
        if (showPasswordSection && formData.nouveauMotDePasse) {
            try {
                await apiCall('/utilisateurs/changer-mot-de-passe', {
                    method: 'POST',
                    body: JSON.stringify({
                        ancienMotDePasse: formData.ancienMotDePasse,
                        nouveauMotDePasse: formData.nouveauMotDePasse
                    })
                });
                
                console.log('Mot de passe modifié avec succès');
            } catch (passwordError) {
                
                console.error('Erreur changement mot de passe:', passwordError);
                let errorMessage = 'Erreur lors du changement de mot de passe';
                
                if (passwordError.message.includes('400') || passwordError.message.includes('incorrect')) {
                    errorMessage = 'L\'ancien mot de passe est incorrect';
                } else if (passwordError.message.includes('8 caractères')) {
                    errorMessage = 'Le nouveau mot de passe doit contenir au moins 8 caractères';
                }
                
                throw new Error(errorMessage);
            }
        }

        
        const updateData = {
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            username: formData.username,
            adresse: formData.adresse,
            ville: formData.ville,
            codePostal: formData.codePostal
        };

        const updatedUser = await apiCall(`/utilisateurs/${userData.id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData)
        });
        
        setUserData(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        
        const successMessage = showPasswordSection && formData.nouveauMotDePasse 
            ? 'Informations et mot de passe mis à jour avec succès !' 
            : 'Informations mises à jour avec succès !';
            
        alert(successMessage);
        setIsEditing(false);
        setShowPasswordSection(false);
        setFormData(prev => ({
            ...prev,
            ancienMotDePasse: '',
            nouveauMotDePasse: ''
        }));
        
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        alert(error.message || 'Erreur lors de la mise à jour. Veuillez réessayer.');
    } finally {
        setIsLoading(false);
    }
};


//
const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (!formData.ancienMotDePasse || !formData.nouveauMotDePasse) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    setIsLoading(true);
    try {
        await apiCall('/utilisateurs/changer-mot-de-passe', {
            method: 'POST',
            body: JSON.stringify({
                ancienMotDePasse: formData.ancienMotDePasse,
                nouveauMotDePasse: formData.nouveauMotDePasse
            })
        });

        alert('Mot de passe modifié avec succès !');
        setFormData(prev => ({
            ...prev,
            ancienMotDePasse: '',
            nouveauMotDePasse: ''
        }));
        setShowPasswordSection(false);
    } catch (error) {
        alert('Erreur lors de la modification du mot de passe : ' + 
              (error.message || 'Veuillez réessayer'));
    } finally {
        setIsLoading(false);
    }
};
    
   
    const handleMenuClick = (item) => {
        setActiveMenu(item.name);
        switch (item.name) {
            case "Détails":
                
                break;
            case "Adresse et Commande":
                navigate('/adresse-commande');
                break;
            case "Déconnexion":
                if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
                break;
            default:
                break;
        }
    };

    
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

    
    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                backgroundColor: '#f8f9fa',
                fontSize: '18px'
            }}>
                ⏳ Chargement de votre profil...
            </div>
        );
    }

    
    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                backgroundColor: '#f8f9fa',
                color: '#e53e3e'
            }}>
                <h2>❌ Erreur</h2>
                <p>{error}</p>
                <button onClick={loadUserData} style={{
                    background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                    color: 'white',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginTop: '1rem'
                }}>
                    🔄 Réessayer
                </button>
            </div>
        );
    }

    
    if (!userData) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f8f9fa'
            }}>
                ❌ Aucune donnée utilisateur disponible
            </div>
        );
    }

    return (
        <div style={{
            display: "flex",
            minHeight: "100vh",
            fontFamily: "system-ui, -apple-system, sans-serif",
            backgroundColor: "#f8f9fa",
        }}>
            
            <div style={{
                width: "320px",
                background: "linear-gradient(135deg, #a8c4a0, #8fb085)",
                color: "white",
                padding: "2rem",
                boxShadow: "4px 0 20px rgba(168, 196, 160, 0.3)",
            }}>
                <div style={{
                    textAlign: "center",
                    marginBottom: "3rem",
                }}>
                    <div style={{
                        width: "100px",
                        height: "100px",
                        margin: "0 auto 1.5rem",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "4px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "#a8c4a0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        {userData?.avatar ? (
                            <img
                                src={userData.avatar}
                                alt="Profile"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <span style={{ fontSize: "3rem", color: "white" }}>👤</span>
                        )}
                    </div>
                    <h3 style={{
                        fontSize: "1.4rem",
                        fontWeight: "700",
                        color: "white",
                        marginBottom: "0.5rem",
                    }}>
                        {userData?.nom && userData?.prenom
                            ? `${userData.prenom} ${userData.nom}`
                            : userData?.email || "Utilisateur"}
                    </h3>
                    <p style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.9rem",
                    }}>
                        {userData?.role === 1 ? "Administrateur" : "Client"}
                    </p>
                </div>

                <nav style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                }}>
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleMenuClick(item)}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                padding: "1.2rem 1.5rem",
                                background:
                                    activeMenu === item.name
                                        ? "rgba(255, 255, 255, 0.2)"
                                        : "transparent",
                                color: "white",
                                border:
                                    activeMenu === item.name
                                        ? "2px solid rgba(255, 255, 255, 0.3)"
                                        : "2px solid transparent",
                                borderRadius: "12px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                fontSize: "1rem",
                                fontWeight: activeMenu === item.name ? "600" : "500",
                                textAlign: "left",
                            }}
                            onMouseOver={(e) => {
                                if (activeMenu !== item.name) {
                                    e.target.style.background = "rgba(255, 255, 255, 0.1)";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (activeMenu !== item.name) {
                                    e.target.style.background = "transparent";
                                }
                            }}
                        >
                            <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div style={{
                flex: 1,
                padding: "3rem",
                maxWidth: "1000px",
            }}>
                <div style={{
                    marginBottom: "3rem",
                }}>
                    <h1 style={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        color: "#2c3e2d",
                        textAlign: "center",
                        marginBottom: "0.5rem",
                    }}>
                        Mon Compte
                    </h1>
                    <p style={{
                        textAlign: "center",
                        color: "#7a8a77",
                        fontSize: "1.1rem",
                    }}>
                        Gérez vos informations personnelles
                    </p>
                </div>

                <div style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "2.5rem",
                    boxShadow: "0 8px 30px rgba(168, 196, 160, 0.15)",
                    border: "1px solid #e8f5e8",
                }}>
                    
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
                                    <form onSubmit={handlePasswordChange}>
                                        <div className="form-group">
                                            <label className="form-label">
                                                Ancien mot de passe
                                            </label>
                                            <div className="password-input-wrapper">
                                                <input
                                                    type={showOldPassword ? "text" : "password"}
                                                    name="ancienMotDePasse"
                                                    value={formData.ancienMotDePasse}
                                                    onChange={handleInputChange}
                                                    placeholder="Saisissez votre mot de passe actuel"
                                                    className="form-input security-input"
                                                    required
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                                    className="password-toggle-btn"
                                                >
                                                    {showOldPassword ? "👁️" : "👁️‍🗨️"}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">
                                                Nouveau mot de passe
                                            </label>
                                            <div className="password-input-wrapper">
                                                <input
                                                    type={showNewPassword ? "text" : "password"}
                                                    name="nouveauMotDePasse"
                                                    value={formData.nouveauMotDePasse}
                                                    onChange={handleInputChange}
                                                    placeholder="Minimum 8 caractères"
                                                    className="form-input security-input"
                                                    required
                                                    minLength={8}
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="password-toggle-btn"
                                                >
                                                    {showNewPassword ? "👁️" : "👁️‍🗨️"}
                                                </button>
                                            </div>
                                            <p className="password-hint">
                                                Utilisez au moins 8 caractères
                                            </p>
                                            <button
                                                type="submit"
                                                className="validate-password-btn"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? "⏳ Modification..." : "🔄 Modifier le mot de passe"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        
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