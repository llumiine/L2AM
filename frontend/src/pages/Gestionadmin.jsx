import React, { useState } from 'react';

const Gestionadmin = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductDetails, setShowProductDetails] = useState(null);
    
    const [products, setProducts] = useState([
        {
            id: 'P001',
            name: 'Trésor suspendu',
            category: 'Bijoux',
            price: 25,
            stock: 12,
            description: 'Magnifique pendentif artisanal en argile peinte à la main avec des motifs délicats.',
            image: '🎨',
            imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
            status: 'Disponible',
            dateAdded: '2023-08-15',
            materials: ['Argile', 'Peinture acrylique', 'Vernis'],
            dimensions: '5cm x 3cm',
            weight: '15g'
        },
        {
            id: 'P002',
            name: 'Porte-bijoux',
            category: 'Accessoires',
            price: 18,
            stock: 8,
            description: 'Porte-bijoux pratique et élégant, parfait pour organiser vos précieux accessoires.',
            image: '💍',
            imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400',
            status: 'Disponible',
            dateAdded: '2023-08-20',
            materials: ['Bois', 'Feutrine'],
            dimensions: '15cm x 10cm x 8cm',
            weight: '120g'
        },
        {
            id: 'P003',
            name: 'Création personnalisée',
            category: 'Sur mesure',
            price: 35,
            stock: 0,
            description: 'Pièce unique créée selon vos désirs et spécifications.',
            image: '✨',
            imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400',
            status: 'Sur commande',
            dateAdded: '2023-09-01',
            materials: ['Variables selon demande'],
            dimensions: 'Variables',
            weight: 'Variable'
        },
        {
            id: 'P004',
            name: 'Porte-bijoux argile',
            category: 'Accessoires',
            price: 22,
            stock: 5,
            description: 'Porte-bijoux en argile avec finitions artisanales et compartiments multiples.',
            image: '🏺',
            imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
            status: 'Stock faible',
            dateAdded: '2023-08-25',
            materials: ['Argile', 'Émaux colorés'],
            dimensions: '12cm x 8cm x 6cm',
            weight: '200g'
        }
    ]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        materials: '',
        dimensions: '',
        weight: '',
        imageUrl: ''
    });

    const categories = ['Bijoux', 'Accessoires', 'Sur mesure', 'Décoration'];

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.category && newProduct.price) {
            const product = {
                id: `P${String(products.length + 1).padStart(3, '0')}`,
                name: newProduct.name,
                category: newProduct.category,
                price: parseFloat(newProduct.price),
                stock: parseInt(newProduct.stock) || 0,
                description: newProduct.description,
                image: '🎨',
                imageUrl: newProduct.imageUrl,
                status: parseInt(newProduct.stock) > 0 ? 'Disponible' : 'Rupture de stock',
                dateAdded: new Date().toISOString().split('T')[0],
                materials: newProduct.materials.split(',').map(m => m.trim()).filter(m => m),
                dimensions: newProduct.dimensions,
                weight: newProduct.weight
            };
            
            setProducts([...products, product]);
            setNewProduct({
                name: '',
                category: '',
                price: '',
                stock: '',
                description: '',
                materials: '',
                dimensions: '',
                weight: '',
                imageUrl: ''
            });
            setShowAddForm(false);
        }
    };

    const handleEditProduct = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setNewProduct({
                name: product.name,
                category: product.category,
                price: product.price.toString(),
                stock: product.stock.toString(),
                description: product.description,
                materials: product.materials.join(', '),
                dimensions: product.dimensions,
                weight: product.weight,
                imageUrl: product.imageUrl || ''
            });
            setEditingProduct(productId);
            setShowAddForm(true);
        }
    };

    const handleUpdateProduct = () => {
        if (editingProduct && newProduct.name && newProduct.category && newProduct.price) {
            const updatedProducts = products.map(product => {
                if (product.id === editingProduct) {
                    return {
                        ...product,
                        name: newProduct.name,
                        category: newProduct.category,
                        price: parseFloat(newProduct.price),
                        stock: parseInt(newProduct.stock) || 0,
                        description: newProduct.description,
                        status: parseInt(newProduct.stock) > 0 ? 'Disponible' : 'Rupture de stock',
                        imageUrl: newProduct.imageUrl,
                        materials: newProduct.materials.split(',').map(m => m.trim()).filter(m => m),
                        dimensions: newProduct.dimensions,
                        weight: newProduct.weight
                    };
                }
                return product;
            });
            
            setProducts(updatedProducts);
            setNewProduct({
                name: '',
                category: '',
                price: '',
                stock: '',
                description: '',
                materials: '',
                dimensions: '',
                weight: '',
                imageUrl: ''
            });
            setEditingProduct(null);
            setShowAddForm(false);
        }
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Disponible': return '#48bb78';
            case 'Stock faible': return '#ed8936';
            case 'Rupture de stock': return '#f56565';
            case 'Sur commande': return '#4299e1';
            default: return '#a0aec0';
        }
    };

    const totalProducts = products.length;
    const availableProducts = products.filter(p => p.status === 'Disponible').length;
    const lowStockProducts = products.filter(p => p.status === 'Stock faible').length;
    const outOfStockProducts = products.filter(p => p.status === 'Rupture de stock').length;

    const resetForm = () => {
        setNewProduct({
            name: '',
            category: '',
            price: '',
            stock: '',
            description: '',
            materials: '',
            dimensions: '',
            weight: '',
            imageUrl: ''
        });
        setEditingProduct(null);
        setShowAddForm(false);
    };

    return (
        <div style={{
            padding: '3rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#f8f9fa',
            minHeight: '100vh'
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
                    🎨 Gestion des Produits
                </h1>
                <p style={{
                    textAlign: 'center',
                    color: '#7a8a77',
                    fontSize: '1.1rem'
                }}>
                    Gérez votre catalogue de créations artisanales
                </p>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                    border: '1px solid #e8f5e8',
                    borderLeft: '5px solid #a8c4a0'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: '#7a8a77',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase'
                            }}>
                                Total Produits
                            </h3>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '800',
                                color: '#2c3e2d'
                            }}>
                                {totalProducts}
                            </div>
                        </div>
                        <div style={{
                            fontSize: '2rem'
                        }}>
                            📦
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                    border: '1px solid #e8f5e8',
                    borderLeft: '5px solid #48bb78'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: '#7a8a77',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase'
                            }}>
                                Disponibles
                            </h3>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '800',
                                color: '#2c3e2d'
                            }}>
                                {availableProducts}
                            </div>
                        </div>
                        <div style={{
                            fontSize: '2rem'
                        }}>
                            ✅
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                    border: '1px solid #e8f5e8',
                    borderLeft: '5px solid #ed8936'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: '#7a8a77',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase'
                            }}>
                                Stock faible
                            </h3>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '800',
                                color: '#2c3e2d'
                            }}>
                                {lowStockProducts}
                            </div>
                        </div>
                        <div style={{
                            fontSize: '2rem'
                        }}>
                            ⚠️
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                    border: '1px solid #e8f5e8',
                    borderLeft: '5px solid #f56565'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h3 style={{
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: '#7a8a77',
                                marginBottom: '0.5rem',
                                textTransform: 'uppercase'
                            }}>
                                Rupture
                            </h3>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '800',
                                color: '#2c3e2d'
                            }}>
                                {outOfStockProducts}
                            </div>
                        </div>
                        <div style={{
                            fontSize: '2rem'
                        }}>
                            ❌
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Product Button */}
            <div style={{
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                <button
                    onClick={() => {
                        setShowAddForm(!showAddForm);
                        if (showAddForm) {
                            resetForm();
                        }
                    }}
                    style={{
                        background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '15px',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(168, 196, 160, 0.3)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        margin: '0 auto'
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
                    ➕ {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                </button>
            </div>

            {/* Add/Edit Product Form */}
            {showAddForm && (
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    boxShadow: '0 8px 30px rgba(168, 196, 160, 0.15)',
                    border: '1px solid #e8f5e8',
                    animation: 'slideDown 0.3s ease-out'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#2c3e2d',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}>
                        {editingProduct ? '✏️ Modifier le produit' : '➕ Ajouter un nouveau produit'}
                    </h2>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '0.5rem'
                            }}>
                                Nom du produit *
                            </label>
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    border: '2px solid #e8f5e8',
                                    borderRadius: '10px',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#a8c4a0'}
                                onBlur={(e) => e.target.style.borderColor = '#e8f5e8'}
                                placeholder="Ex: Collier artisanal"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '0.5rem'
                            }}>
                                Catégorie *
                            </label>
                            <select
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    border: '2px solid #e8f5e8',
                                    borderRadius: '10px',
                                    fontSize: '1rem',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="">Choisir une catégorie</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '0.5rem'
                            }}>
                                Prix (€) *
                            </label>
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    border: '2px solid #e8f5e8',
                                    borderRadius: '10px',
                                    fontSize: '1rem'
                                }}
                                placeholder="Ex: 25"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '0.5rem'
                            }}>
                                Stock
                            </label>
                            <input
                                type="number"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    border: '2px solid #e8f5e8',
                                    borderRadius: '10px',
                                    fontSize: '1rem'
                                }}
                                placeholder="Ex: 10"
                                min="0"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '0.5rem'
                            }}>
                                Dimensions
                            </label>
                            <input
                                type="text"
                                value={newProduct.dimensions}
                                onChange={(e) => setNewProduct({...newProduct, dimensions: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    border: '2px solid #e8f5e8',
                                    borderRadius: '10px',
                                    fontSize: '1rem'
                                }}
                                placeholder="Ex: 5cm x 3cm"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#2c3e2d',
                                marginBottom: '0.5rem'
                            }}>
                                Poids
                            </label>
                            <input
                                type="text"
                                value={newProduct.weight}
                                onChange={(e) => setNewProduct({...newProduct, weight: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    border: '2px solid #e8f5e8',
                                    borderRadius: '10px',
                                    fontSize: '1rem'
                                }}
                                placeholder="Ex: 15g"
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#2c3e2d',
                            marginBottom: '0.5rem'
                        }}>
                            📸 Image du produit (URL)
                        </label>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="url"
                                    value={newProduct.imageUrl}
                                    onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        border: '2px solid #e8f5e8',
                                        borderRadius: '10px',
                                        fontSize: '1rem'
                                    }}
                                    placeholder="https://exemple.com/mon-image.jpg"
                                />
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: '#7a8a77',
                                    marginTop: '0.3rem'
                                }}>
                                    💡 Vous pouvez utiliser des images d'Unsplash, Pexels ou télécharger sur votre serveur
                                </p>
                            </div>
                            {newProduct.imageUrl && (
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '3px solid #e8f5e8',
                                    background: '#f8f9fa',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img 
                                        src={newProduct.imageUrl} 
                                        alt="Aperçu"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<div style="font-size: 0.8rem; color: #7a8a77; text-align: center;">❌<br/>Image invalide</div>';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#2c3e2d',
                            marginBottom: '0.5rem'
                        }}>
                            Description
                        </label>
                        <textarea
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                border: '2px solid #e8f5e8',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                minHeight: '100px',
                                resize: 'vertical'
                            }}
                            placeholder="Décrivez votre produit..."
                        />
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#2c3e2d',
                            marginBottom: '0.5rem'
                        }}>
                            Matériaux (séparés par des virgules)
                        </label>
                        <input
                            type="text"
                            value={newProduct.materials}
                            onChange={(e) => setNewProduct({...newProduct, materials: e.target.value})}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                border: '2px solid #e8f5e8',
                                borderRadius: '10px',
                                fontSize: '1rem'
                            }}
                            placeholder="Ex: Argile, Peinture acrylique, Vernis"
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '2rem',
                        justifyContent: 'center'
                    }}>
                        <button
                            onClick={resetForm}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'transparent',
                                border: '2px solid #a0aec0',
                                borderRadius: '10px',
                                color: '#a0aec0',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Annuler
                        </button>
                        <button
                            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {editingProduct ? 'Mettre à jour' : 'Ajouter le produit'}
                        </button>
                    </div>
                </div>
            )}

            {/* Products Table */}
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
                        📋 Catalogue des Produits
                    </h2>
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
                                    textTransform: 'uppercase'
                                }}>
                                    Produit
                                </th>
                                <th style={{
                                    padding: '1.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    color: '#2c3e2d',
                                    textTransform: 'uppercase'
                                }}>
                                    Catégorie
                                </th>
                                <th style={{
                                    padding: '1.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    color: '#2c3e2d',
                                    textTransform: 'uppercase'
                                }}>
                                    Prix
                                </th>
                                <th style={{
                                    padding: '1.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    color: '#2c3e2d',
                                    textTransform: 'uppercase'
                                }}>
                                    Stock
                                </th>
                                <th style={{
                                    padding: '1.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    color: '#2c3e2d',
                                    textTransform: 'uppercase'
                                }}>
                                    Statut
                                </th>
                                <th style={{
                                    padding: '1.5rem',
                                    textAlign: 'left',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    color: '#2c3e2d',
                                    textTransform: 'uppercase'
                                }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id} style={{
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
                                        padding: '1.5rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                border: '2px solid #e8f5e8',
                                                background: '#f8f9fa',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {product.imageUrl ? (
                                                    <img 
                                                        src={product.imageUrl} 
                                                        alt={product.name}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.parentNode.innerHTML = '<div style="font-size: 1.5rem;">' + product.image + '</div>';
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        fontSize: '1.5rem'
                                                    }}>
                                                        {product.image}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div style={{
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    color: '#2c3e2d',
                                                    marginBottom: '0.2rem'
                                                }}>
                                                    {product.name}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.8rem',
                                                    color: '#7a8a77'
                                                }}>
                                                    ID: {product.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{
                                        padding: '1.5rem',
                                        fontSize: '0.9rem',
                                        color: '#5a6c57'
                                    }}>
                                        {product.category}
                                    </td>
                                    <td style={{
                                        padding: '1.5rem',
                                        fontSize: '1.1rem',
                                        fontWeight: '700',
                                        color: '#2c3e2d'
                                    }}>
                                        {product.price}€
                                    </td>
                                    <td style={{
                                        padding: '1.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        color: product.stock <= 5 ? '#ed8936' : '#48bb78'
                                    }}>
                                        {product.stock}
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
                                            background: getStatusColor(product.status)
                                        }}>
                                            {product.status === 'Disponible' && '✅'}
                                            {product.status === 'Stock faible' && '⚠️'}
                                            {product.status === 'Rupture de stock' && '❌'}
                                            {product.status === 'Sur commande' && '📋'}
                                            {product.status}
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
                                                onClick={() => setShowProductDetails(showProductDetails === index ? null : index)}
                                                style={{
                                                    padding: '0.5rem',
                                                    background: 'none',
                                                    border: '2px solid #a8c4a0',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.3s ease',
                                                    color: '#a8c4a0'
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
                                                onClick={() => handleEditProduct(product.id)}
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
                                                onClick={() => handleDeleteProduct(product.id)}
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

                {/* Product Details */}
                {showProductDetails !== null && (
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
                            marginBottom: '1.5rem'
                        }}>
                            📋 Détails de {products[showProductDetails].name}
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                                    Image du produit
                                </p>
                                {products[showProductDetails].imageUrl ? (
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        border: '3px solid #e8f5e8',
                                        background: '#f8f9fa'
                                    }}>
                                        <img 
                                            src={products[showProductDetails].imageUrl} 
                                            alt={products[showProductDetails].name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '12px',
                                        border: '3px solid #e8f5e8',
                                        background: '#f8f9fa',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '3rem'
                                    }}>
                                        {products[showProductDetails].image}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p style={{
                                    fontSize: '0.8rem',
                                    color: '#7a8a77',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem'
                                }}>
                                    Description
                                </p>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#2c3e2d',
                                    lineHeight: '1.5'
                                }}>
                                    {products[showProductDetails].description}
                                </p>
                            </div>
                            <div>
                                <p style={{
                                    fontSize: '0.8rem',
                                    color: '#7a8a77',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem'
                                }}>
                                    Matériaux
                                </p>
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '0.5rem'
                                }}>
                                    {products[showProductDetails].materials.map((material, mIndex) => (
                                        <span key={mIndex} style={{
                                            background: 'rgba(168, 196, 160, 0.2)',
                                            color: '#2c3e2d',
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '15px',
                                            fontSize: '0.8rem',
                                            fontWeight: '500'
                                        }}>
                                            {material}
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
                                    Dimensions
                                </p>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#2c3e2d',
                                    fontWeight: '500'
                                }}>
                                    📏 {products[showProductDetails].dimensions}
                                </p>
                            </div>
                            <div>
                                <p style={{
                                    fontSize: '0.8rem',
                                    color: '#7a8a77',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem'
                                }}>
                                    Poids
                                </p>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#2c3e2d',
                                    fontWeight: '500'
                                }}>
                                    ⚖️ {products[showProductDetails].weight}
                                </p>
                            </div>
                            <div>
                                <p style={{
                                    fontSize: '0.8rem',
                                    color: '#7a8a77',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.5rem'
                                }}>
                                    Date d'ajout
                                </p>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#2c3e2d',
                                    fontWeight: '500'
                                }}>
                                    📅 {products[showProductDetails].dateAdded}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
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
                            max-height: 1000px;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Gestionadmin;