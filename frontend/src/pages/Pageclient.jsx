import React, { useState } from 'react';
import '../styles/Pageclient.css';

const PageClient = () => {
    const [activeMenu, setActiveMenu] = useState('Détails');
    const [formData, setFormData] = useState({
        nom: 'Havertz',
        prenom: 'Sofia',
        email: 'sofia.havertz@email.com',
        ancienMotDePasse: '',
        nouveauMotDePasse: ''
    });
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const menuItems = [
        { name: 'Compte', active: false, icon: '👤' },
        { name: 'Détails', active: true, icon: '📝' },
        { name: 'Adresse et Commande', active: false, icon: '📦' },
        { name: 'Déconnexion', active: false, icon: '🚪' }
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
        setIsEditing(false);
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#f8f9fa'
        }}>
            {/* Sidebar avec style DA */}
            <div style={{
                width: '320px',
                background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                color: 'white',
                padding: '2rem',
                boxShadow: '4px 0 20px rgba(168, 196, 160, 0.3)'
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        margin: '0 auto 1.5rem',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=100&h=100&fit=crop&crop=face"
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            background: '#48bb78',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: '3px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem'
                        }}>
                            ✓
                        </div>
                    </div>
                    <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '0.5rem'
                    }}>
                        Sofia Havertz
                    </h3>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.9rem',
                        marginBottom: '0.5rem'
                    }}>
                        Cliente premium
                    </p>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        display: 'inline-block'
                    }}>
                        🌟 Membre depuis 2023
                    </div>
                </div>

                <nav style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                }}>
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveMenu(item.name)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1.2rem 1.5rem',
                                background: activeMenu === item.name 
                                    ? 'rgba(255, 255, 255, 0.2)' 
                                    : 'transparent',
                                color: 'white',
                                border: activeMenu === item.name 
                                    ? '2px solid rgba(255, 255, 255, 0.3)' 
                                    : '2px solid transparent',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontSize: '1rem',
                                fontWeight: activeMenu === item.name ? '600' : '500',
                                textAlign: 'left'
                            }}
                            onMouseOver={(e) => {
                                if (activeMenu !== item.name) {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (activeMenu !== item.name) {
                                    e.target.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Stats sidebar */}
                <div style={{
                    marginTop: '3rem',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        color: 'white'
                    }}>
                        📊 Vos statistiques
                    </h4>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                                Commandes
                            </span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>
                                12
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                                Total dépensé
                            </span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>
                                284€
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content avec style DA */}
            <div style={{
                flex: 1,
                padding: '3rem',
                maxWidth: '800px'
            }}>
                <div style={{
                    marginBottom: '3rem'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#2c3e2d',
                        textAlign: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        Mon Compte
                    </h1>
                    <p style={{
                        textAlign: 'center',
                        color: '#7a8a77',
                        fontSize: '1.1rem'
                    }}>
                        Gérez vos informations personnelles
                    </p>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '3rem',
                    boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                    border: '1px solid #e8f5e8'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2.5rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            color: '#2c3e2d',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem'
                        }}>
                            📝 Détails du compte
                        </h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            style={{
                                background: isEditing 
                                    ? 'linear-gradient(135deg, #ed8936, #dd6b20)'
                                    : 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                                color: 'white',
                                border: 'none',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                boxShadow: '0 4px 12px rgba(168, 196, 160, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 18px rgba(168, 196, 160, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(168, 196, 160, 0.3)';
                            }}
                        >
                            {isEditing ? '❌ Annuler' : '✏️ Modifier'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Section informations personnelles */}
                        <div style={{
                            background: '#f8fdf8',
                            padding: '2rem',
                            borderRadius: '16px',
                            borderLeft: '4px solid #a8c4a0',
                            marginBottom: '2.5rem'
                        }}>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                👤 Informations personnelles
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1.5rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#2c3e2d',
                                        marginBottom: '0.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: isEditing ? '2px solid #e8f5e8' : '2px solid #f0f8f0',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            color: isEditing ? '#2c3e2d' : '#7a8a77',
                                            background: isEditing ? 'white' : '#f8fdf8',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => isEditing && (e.target.style.borderColor = '#a8c4a0')}
                                        onBlur={(e) => isEditing && (e.target.style.borderColor = '#e8f5e8')}
                                    />
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#2c3e2d',
                                        marginBottom: '0.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: isEditing ? '2px solid #e8f5e8' : '2px solid #f0f8f0',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            color: isEditing ? '#2c3e2d' : '#7a8a77',
                                            background: isEditing ? 'white' : '#f8fdf8',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => isEditing && (e.target.style.borderColor = '#a8c4a0')}
                                        onBlur={(e) => isEditing && (e.target.style.borderColor = '#e8f5e8')}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#2c3e2d',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        border: isEditing ? '2px solid #e8f5e8' : '2px solid #f0f8f0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        color: isEditing ? '#2c3e2d' : '#7a8a77',
                                        background: isEditing ? 'white' : '#f8fdf8',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => isEditing && (e.target.style.borderColor = '#a8c4a0')}
                                    onBlur={(e) => isEditing && (e.target.style.borderColor = '#e8f5e8')}
                                />
                            </div>
                        </div>

                        {/* Section mot de passe */}
                        <div style={{
                            background: '#f8fdf8',
                            padding: '2rem',
                            borderRadius: '16px',
                            borderLeft: '4px solid #ed8936',
                            marginBottom: '2.5rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '600',
                                    color: '#2c3e2d',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    🔒 Sécurité du compte
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                                    style={{
                                        background: 'none',
                                        color: '#ed8936',
                                        border: '2px solid #ed8936',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#ed8936';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'none';
                                        e.target.style.color = '#ed8936';
                                    }}
                                >
                                    {showPasswordSection ? '🔼 Masquer' : '🔽 Modifier mot de passe'}
                                </button>
                            </div>

                            <div style={{
                                background: 'rgba(237, 137, 54, 0.1)',
                                padding: '1rem',
                                borderRadius: '10px',
                                marginBottom: showPasswordSection ? '1.5rem' : '0'
                            }}>
                                <p style={{
                                    color: '#c53030',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    margin: 0
                                }}>
                                    ⚠️ Dernière modification : Il y a 3 mois
                                </p>
                            </div>

                            {showPasswordSection && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem',
                                    animation: 'slideDown 0.3s ease-out'
                                }}>
                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            color: '#2c3e2d',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Ancien mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="ancienMotDePasse"
                                            value={formData.ancienMotDePasse}
                                            onChange={handleInputChange}
                                            placeholder="Saisissez votre mot de passe actuel"
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                border: '2px solid #e8f5e8',
                                                borderRadius: '12px',
                                                fontSize: '1rem',
                                                color: '#2c3e2d',
                                                transition: 'border-color 0.3s ease'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#ed8936'}
                                            onBlur={(e) => e.target.style.borderColor = '#e8f5e8'}
                                        />
                                    </div>

                                    <div>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            color: '#2c3e2d',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            Nouveau mot de passe
                                        </label>
                                        <input
                                            type="password"
                                            name="nouveauMotDePasse"
                                            value={formData.nouveauMotDePasse}
                                            onChange={handleInputChange}
                                            placeholder="Minimum 8 caractères"
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                border: '2px solid #e8f5e8',
                                                borderRadius: '12px',
                                                fontSize: '1rem',
                                                color: '#2c3e2d',
                                                transition: 'border-color 0.3s ease'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#ed8936'}
                                            onBlur={(e) => e.target.style.borderColor = '#e8f5e8'}
                                        />
                                        <p style={{
                                            fontSize: '0.8rem',
                                            color: '#7a8a77',
                                            marginTop: '0.5rem'
                                        }}>
                                            💡 Utilisez au moins 8 caractères avec des lettres, chiffres et symboles
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Boutons d'action */}
                        {isEditing && (
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-end'
                            }}>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    style={{
                                        background: 'none',
                                        color: '#7a8a77',
                                        border: '2px solid #e8f5e8',
                                        padding: '1rem 2rem',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.borderColor = '#7a8a77';
                                        e.target.style.background = '#f8fdf8';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.borderColor = '#e8f5e8';
                                        e.target.style.background = 'none';
                                    }}
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    style={{
                                        background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '1rem 2rem',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 15px rgba(168, 196, 160, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(168, 196, 160, 0.4)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(168, 196, 160, 0.3)';
                                    }}
                                >
                                    💾 Enregistrer les modifications
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Informations de sécurité */}
                    {!isEditing && (
                        <div style={{
                            background: '#f0f8f0',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #e8f5e8',
                            marginTop: '2rem'
                        }}>
                            <h4 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                🛡️ Sécurité du compte
                            </h4>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem'
                            }}>
                                <div>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        color: '#7a8a77',
                                        margin: 0
                                    }}>
                                        🔒 Dernière connexion
                                    </p>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#2c3e2d',
                                        margin: '0.3rem 0 0 0'
                                    }}>
                                        Aujourd'hui à 14:32
                                    </p>
                                </div>
                                <div>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        color: '#7a8a77',
                                        margin: 0
                                    }}>
                                        📧 Email vérifié
                                    </p>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#48bb78',
                                        margin: '0.3rem 0 0 0'
                                    }}>
                                        ✅ Confirmé
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>
                {`
                    @keyframes slideDown {
                        from {
                            opacity: 0;
                            max-height: 0;
                            transform: translateY(-10px);
                        }
                        to {
                            opacity: 1;
                            max-height: 500px;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default PageClient;