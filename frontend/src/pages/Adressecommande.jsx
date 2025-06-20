import React, { useState } from 'react';
import '../styles/Adressecommande.css';

const AdresseCommande = () => {
    const [activeMenu, setActiveMenu] = useState('Adresse et Commande');
    const [adresse, setAdresse] = useState('');
    const [showAddressForm, setShowAddressForm] = useState(false);

    const menuItems = [
        { name: 'Compte', active: false, icon: '👤' },
        { name: 'Détails', active: false, icon: '📝' },
        { name: 'Adresse et Commande', active: true, icon: '📦' },
        { name: 'Déconnexion', active: false, icon: '🚪' }
    ];

    const commandes = [
        {
            id: 'COMMANDE #2039',
            date: '15 Jan 2024',
            status: 'Livrée',
            total: '45.50€',
            produits: ['Trésor suspendu', 'Porte-bijoux artisanal'],
            adresse: 'Paris, France'
        },
        {
            id: 'COMMANDE #1140',
            date: '08 Jan 2024',
            status: 'En cours',
            total: '32.80€',
            produits: ['Création personnalisée'],
            adresse: 'Lyon, France'
        }
    ];

    const handleAdresseSubmit = (e) => {
        e.preventDefault();
        console.log('Adresse mise à jour:', adresse);
        alert('Adresse mise à jour avec succès !');
        setShowAddressForm(false);
    };

    const voirCommande = (commandeId) => {
        console.log('Voir détails de:', commandeId);
        alert(`Affichage des détails de ${commandeId}`);
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
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
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
                        fontSize: '0.9rem'
                    }}>
                        Cliente premium
                    </p>
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
            </div>

            {/* Main Content avec style DA */}
            <div style={{
                flex: 1,
                padding: '3rem',
                maxWidth: '1000px'
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
                        Gérez vos informations et commandes
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem'
                }}>
                    {/* Section Adresse améliorée */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                        border: '1px solid #e8f5e8'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem'
                        }}>
                            <h2 style={{
                                fontSize: '1.8rem',
                                fontWeight: '700',
                                color: '#2c3e2d',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem'
                            }}>
                                🏠 Adresse de livraison
                            </h2>
                            <button
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                style={{
                                    background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
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
                                {showAddressForm ? '🔼 Masquer' : '✏️ Modifier'}
                            </button>
                        </div>

                        <div style={{
                            background: '#f8fdf8',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            borderLeft: '4px solid #a8c4a0',
                            marginBottom: showAddressForm ? '2rem' : '0'
                        }}>
                            <p style={{
                                color: '#5a6c57',
                                fontSize: '1rem',
                                lineHeight: '1.6'
                            }}>
                                <strong>Adresse actuelle :</strong><br />
                                123 Rue de l'Artisanat<br />
                                75011 Paris, France
                            </p>
                        </div>

                        {showAddressForm && (
                            <form onSubmit={handleAdresseSubmit} style={{
                                animation: 'slideDown 0.3s ease-out'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.8rem'
                                }}>
                                    <label style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        color: '#2c3e2d'
                                    }}>
                                        Nouvelle adresse
                                    </label>
                                    <textarea
                                        value={adresse}
                                        onChange={(e) => setAdresse(e.target.value)}
                                        placeholder="Entrez votre nouvelle adresse complète..."
                                        style={{
                                            padding: '1rem',
                                            border: '2px solid #e8f5e8',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            color: '#2c3e2d',
                                            resize: 'vertical',
                                            minHeight: '100px',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#a8c4a0'}
                                        onBlur={(e) => e.target.style.borderColor = '#e8f5e8'}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '1rem 2rem',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            marginTop: '1rem',
                                            alignSelf: 'flex-start',
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
                                        💾 Sauvegarder l'adresse
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Section Commandes améliorée */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                        border: '1px solid #e8f5e8'
                    }}>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            color: '#2c3e2d',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem'
                        }}>
                            📦 Mes Commandes
                        </h2>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            {commandes.map((commande, index) => (
                                <div key={index} style={{
                                    background: '#f8fdf8',
                                    border: '2px solid #e8f5e8',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = '#a8c4a0';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(168, 196, 160, 0.2)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = '#e8f5e8';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                fontSize: '1.3rem',
                                                fontWeight: '700',
                                                color: '#2c3e2d',
                                                marginBottom: '0.8rem'
                                            }}>
                                                {commande.id}
                                            </h3>
                                            
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                gap: '1rem',
                                                marginBottom: '1rem'
                                            }}>
                                                <div>
                                                    <span style={{
                                                        fontSize: '0.85rem',
                                                        color: '#7a8a77',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        📅 Date
                                                    </span>
                                                    <p style={{
                                                        fontSize: '1rem',
                                                        color: '#2c3e2d',
                                                        fontWeight: '600',
                                                        marginTop: '0.3rem'
                                                    }}>
                                                        {commande.date}
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    <span style={{
                                                        fontSize: '0.85rem',
                                                        color: '#7a8a77',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        💰 Total
                                                    </span>
                                                    <p style={{
                                                        fontSize: '1.2rem',
                                                        color: '#2c3e2d',
                                                        fontWeight: '700',
                                                        marginTop: '0.3rem'
                                                    }}>
                                                        {commande.total}
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    <span style={{
                                                        fontSize: '0.85rem',
                                                        color: '#7a8a77',
                                                        fontWeight: '600',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        📍 Livraison
                                                    </span>
                                                    <p style={{
                                                        fontSize: '1rem',
                                                        color: '#5a6c57',
                                                        marginTop: '0.3rem'
                                                    }}>
                                                        {commande.adresse}
                                                    </p>
                                                </div>
                                            </div>

                                            <div style={{ marginBottom: '1rem' }}>
                                                <span style={{
                                                    fontSize: '0.85rem',
                                                    color: '#7a8a77',
                                                    fontWeight: '600',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.5px'
                                                }}>
                                                    🛍️ Produits
                                                </span>
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '0.5rem',
                                                    marginTop: '0.5rem'
                                                }}>
                                                    {commande.produits.map((produit, pIndex) => (
                                                        <span key={pIndex} style={{
                                                            background: 'rgba(168, 196, 160, 0.2)',
                                                            color: '#2c3e2d',
                                                            padding: '0.3rem 0.8rem',
                                                            borderRadius: '15px',
                                                            fontSize: '0.85rem',
                                                            fontWeight: '500'
                                                        }}>
                                                            {produit}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            gap: '1rem'
                                        }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.6rem 1.2rem',
                                                borderRadius: '20px',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                color: 'white',
                                                background: commande.status === 'Livrée' 
                                                    ? 'linear-gradient(135deg, #48bb78, #38a169)'
                                                    : 'linear-gradient(135deg, #ed8936, #dd6b20)'
                                            }}>
                                                {commande.status === 'Livrée' ? '✅' : '🚚'}
                                                {commande.status}
                                            </span>

                                            <button
                                                onClick={() => voirCommande(commande.id)}
                                                style={{
                                                    background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '0.8rem 1.5rem',
                                                    borderRadius: '10px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    boxShadow: '0 4px 12px rgba(168, 196, 160, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    minWidth: '100px'
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
                                                👁️ Voir détails
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer de section */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: '#f8fdf8',
                            borderRadius: '12px',
                            border: '1px solid #e8f5e8'
                        }}>
                            <p style={{
                                color: '#7a8a77',
                                marginBottom: '1rem'
                            }}>
                                Besoin d'aide avec une commande ?
                            </p>
                            <button style={{
                                background: 'none',
                                color: '#a8c4a0',
                                border: '2px solid #a8c4a0',
                                padding: '0.8rem 1.5rem',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = '#a8c4a0';
                                e.target.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = 'none';
                                e.target.style.color = '#a8c4a0';
                            }}>
                                📞 Contacter le support
                            </button>
                        </div>
                    </div>
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

export default AdresseCommande;