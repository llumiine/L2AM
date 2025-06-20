import React, { useState } from 'react';

const Admin = () => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [showOrderDetails, setShowOrderDetails] = useState(null);

    const menuItems = [
        { name: 'Team', icon: '👥', active: false },
        { name: 'Dashboard', icon: '📊', active: true },
        { name: 'Commandes', icon: '🛒', active: false },
        { name: 'Liste des Commandes', icon: '📦', active: false },
        { name: 'Produits', icon: '🎨', active: false },
        { name: 'Déconnexion', icon: '🚪', active: false }
    ];

    const orders = [
        {
            id: 'Commande #5011',
            client: 'Marie Dubois',
            address: 'Amziali 94250',
            date: '13.09.2023 - 1:25 PM',
            price: '30€',
            status: 'Terminé',
            statusColor: '#48bb78',
            products: ['Trésor suspendu', 'Porte-bijoux'],
            paymentMethod: 'Carte bancaire'
        },
        {
            id: 'Commande #5010',
            client: 'Sophie Martin',
            address: 'Paris 75015',
            date: '12.09.2023 - 4:15 PM',
            price: '45€',
            status: 'En cours',
            statusColor: '#ed8936',
            products: ['Création personnalisée'],
            paymentMethod: 'PayPal'
        },
        {
            id: 'Commande #1234',
            client: 'Jean Dupont',
            address: 'Paris 75008',
            date: '11.09.2023 - 2:45 PM',
            price: '28€',
            status: 'Annulé',
            statusColor: '#f56565',
            products: ['Porte-bijoux argile'],
            paymentMethod: 'Virement'
        }
    ];

    const stats = {
        totalOrders: 30,
        totalRevenue: 100,
        pendingOrders: 8,
        completedOrders: 22,
        monthlyGrowth: '+15%'
    };

    const handleOrderAction = (action, orderId) => {
        console.log(`${action} sur ${orderId}`);
        alert(`Action ${action} effectuée sur ${orderId}`);
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
                width: '300px',
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
                        width: '80px',
                        height: '80px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        fontSize: '2rem',
                        border: '3px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        👥
                    </div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '0.5rem'
                    }}>
                        Team L2AM
                    </h3>
                    <p style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.9rem'
                    }}>
                        Administration
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
                            <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Stats rapides sidebar */}
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
                        📈 Aperçu rapide
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
                            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                                En cours
                            </span>
                            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#ed8936' }}>
                                {stats.pendingOrders}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                                Croissance
                            </span>
                            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#48bb78' }}>
                                {stats.monthlyGrowth}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content avec style DA */}
            <div style={{
                flex: 1,
                padding: '3rem'
            }}>
                {/* Header */}
                <div style={{
                    marginBottom: '3rem'
                }}>
                    <h1 style={{
                        fontSize: '2.8rem',
                        fontWeight: '700',
                        color: '#2c3e2d',
                        textAlign: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        Admin Dashboard
                    </h1>
                    <p style={{
                        textAlign: 'center',
                        color: '#7a8a77',
                        fontSize: '1.1rem'
                    }}>
                        Gérez votre boutique artisanale
                    </p>
                </div>

                {/* Dashboard Cards avec style DA */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                        border: '1px solid #e8f5e8',
                        borderLeft: '5px solid #a8c4a0'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <h3 style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#7a8a77',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Total de commandes
                                </h3>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '800',
                                    color: '#2c3e2d'
                                }}>
                                    {stats.totalOrders}
                                </div>
                            </div>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)'
                            }}>
                                🛒
                            </div>
                        </div>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#48bb78',
                            fontWeight: '600'
                        }}>
                            📈 +12% ce mois
                        </p>
                    </div>

                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                        border: '1px solid #e8f5e8',
                        borderLeft: '5px solid #48bb78'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <h3 style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#7a8a77',
                                    marginBottom: '0.5rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Chiffre d'affaires
                                </h3>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '800',
                                    color: '#2c3e2d'
                                }}>
                                    {stats.totalRevenue}€
                                </div>
                            </div>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, #48bb78, #38a169)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)'
                            }}>
                                💰
                            </div>
                        </div>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#48bb78',
                            fontWeight: '600'
                        }}>
                            📊 +8% ce mois
                        </p>
                    </div>
                </div>

                {/* Orders Table avec style DA */}
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                    border: '1px solid #e8f5e8',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '2rem',
                        borderBottom: '1px solid #f0f8f0',
                        background: 'linear-gradient(135deg, #f8fdf8, #f0f8f0)'
                    }}>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            color: '#2c3e2d',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem'
                        }}>
                            📦 Gestion des Commandes
                        </h2>
                        <p style={{
                            color: '#7a8a77',
                            marginTop: '0.5rem'
                        }}>
                            Suivez et gérez toutes vos commandes
                        </p>
                    </div>

                    <div style={{ overflow: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse'
                        }}>
                            <thead style={{
                                background: '#f8fdf8'
                            }}>
                                <tr>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        color: '#2c3e2d',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Commande
                                    </th>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        color: '#2c3e2d',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Client
                                    </th>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        color: '#2c3e2d',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Date & Heure
                                    </th>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        color: '#2c3e2d',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Prix
                                    </th>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        color: '#2c3e2d',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Statut
                                    </th>
                                    <th style={{
                                        padding: '1.5rem',
                                        textAlign: 'left',
                                        fontSize: '0.85rem',
                                        fontWeight: '700',
                                        color: '#2c3e2d',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index} style={{
                                        borderBottom: '1px solid #f0f8f0',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#f8fdf8';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'white';
                                    }}>
                                        <td style={{
                                            padding: '1.5rem',
                                            fontSize: '0.95rem',
                                            fontWeight: '600',
                                            color: '#2c3e2d'
                                        }}>
                                            {order.id}
                                        </td>
                                        <td style={{
                                            padding: '1.5rem'
                                        }}>
                                            <div>
                                                <div style={{
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    color: '#2c3e2d',
                                                    marginBottom: '0.2rem'
                                                }}>
                                                    {order.client}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.8rem',
                                                    color: '#7a8a77'
                                                }}>
                                                    {order.address}
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{
                                            padding: '1.5rem',
                                            fontSize: '0.85rem',
                                            color: '#5a6c57'
                                        }}>
                                            {order.date}
                                        </td>
                                        <td style={{
                                            padding: '1.5rem',
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            color: '#2c3e2d'
                                        }}>
                                            {order.price}
                                        </td>
                                        <td style={{
                                            padding: '1.5rem'
                                        }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                color: 'white',
                                                background: order.statusColor
                                            }}>
                                                {order.status === 'Terminé' && '✅'}
                                                {order.status === 'En cours' && '🚚'}
                                                {order.status === 'Annulé' && '❌'}
                                                {order.status}
                                            </span>
                                        </td>
                                        <td style={{
                                            padding: '1.5rem'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }}>
                                                <button
                                                    onClick={() => setShowOrderDetails(showOrderDetails === index ? null : index)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        background: 'none',
                                                        border: '2px solid #a8c4a0',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.background = '#a8c4a0';
                                                        e.target.style.color = 'white';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.background = 'none';
                                                        e.target.style.color = '#a8c4a0';
                                                    }}
                                                    title="Voir détails"
                                                >
                                                    👁️
                                                </button>
                                                <button
                                                    onClick={() => handleOrderAction('modifier', order.id)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        background: 'none',
                                                        border: '2px solid #48bb78',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem',
                                                        color: '#48bb78',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.background = '#48bb78';
                                                        e.target.style.color = 'white';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.background = 'none';
                                                        e.target.style.color = '#48bb78';
                                                    }}
                                                    title="Modifier"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => handleOrderAction('supprimer', order.id)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        background: 'none',
                                                        border: '2px solid #f56565',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem',
                                                        color: '#f56565',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.background = '#f56565';
                                                        e.target.style.color = 'white';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.background = 'none';
                                                        e.target.style.color = '#f56565';
                                                    }}
                                                    title="Supprimer"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Détails de commande */}
                    {showOrderDetails !== null && (
                        <div style={{
                            background: '#f8fdf8',
                            padding: '2rem',
                            borderTop: '1px solid #e8f5e8',
                            animation: 'slideDown 0.3s ease-out'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '1rem'
                            }}>
                                📋 Détails de {orders[showOrderDetails].id}
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1.5rem'
                            }}>
                                <div>
                                    <p style={{
                                        fontSize: '0.8rem',
                                        color: '#7a8a77',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Produits commandés
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.5rem'
                                    }}>
                                        {orders[showOrderDetails].products.map((product, pIndex) => (
                                            <span key={pIndex} style={{
                                                background: 'rgba(168, 196, 160, 0.2)',
                                                color: '#2c3e2d',
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '15px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500'
                                            }}>
                                                {product}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p style={{
                                        fontSize: '0.8rem',
                                        color: '#7a8a77',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Mode de paiement
                                    </p>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: '#2c3e2d',
                                        fontWeight: '500'
                                    }}>
                                        💳 {orders[showOrderDetails].paymentMethod}
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

export default Admin;