import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gestionadmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // États existants
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showProductDetails, setShowProductDetails] = useState(null);
    const [newProduct, setNewProduct] = useState({
        nom: '',
        categorie: '',
        prix: '',
        stock: 0,
        description: '',
        dimensions: '',
        image: '',
        taille: '',
        couleur: '',
        typeLibelle: ''
    });

    const [categories, setCategories] = useState([]);


    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:9090/api/produits');
            const produitsAvecStatut = response.data.map(produit => ({
                ...produit,
                status: getProductStatus(produit.stock)
            }));
            setProducts(produitsAvecStatut);
        } catch (err) {
            setError("Erreur lors du chargement des produits");
            console.error("Erreur:", err);
        } finally {
            setLoading(false);
        }
    };

    const getProductStatus = (stock) => {
        if (stock === 0) return 'Rupture de stock';
        if (stock <= 5) return 'Stock faible';
        return 'Disponible';
    };

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:9090/api/types", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Réponse API types :", response.data);
            setCategories(response.data);
        } catch (err) {
            console.error("Erreur lors du chargement des types d'oeuvre:", err);
        }
    };

    const handleAddProduct = async () => {
        try {
            let formData;
            if (newProduct.file) {
                formData = new FormData();
                formData.append('file', newProduct.file);
                formData.append('nom', newProduct.nom);
                formData.append('categorie', newProduct.categorie);
                formData.append('prix', parseFloat(newProduct.prix));
                formData.append('stock', parseInt(newProduct.stock));
                formData.append('description', newProduct.description);
                formData.append('dimensions', newProduct.dimensions);
                formData.append('typeLibelle', newProduct.typeLibelle);
                const token = localStorage.getItem("token");
                await axios.post('http://localhost:9090/api/produits', formData, {
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                const productData = {
                    nom: newProduct.nom,
                    categorie: newProduct.categorie,
                    prix: parseFloat(newProduct.prix),
                    stock: parseInt(newProduct.stock),
                    description: newProduct.description,
                    imageUrl: newProduct.imageUrl,
                    dimensions: newProduct.dimensions,
                    poids: newProduct.poids,
                    typeLibelle: newProduct.typeLibelle
                };
                await axios.post('http://localhost:9090/api/produits', productData);
            }
            fetchProducts();
            setShowAddForm(false);
            resetForm();
            alert('✅ Produit ajouté avec succès !');
        } catch (err) {
            // Ajout du log détaillé
            console.error("Erreur lors de l'ajout du produit (détail complet):", err);
            if (err.response) {
                console.error("Réponse backend:", err.response.data);
            }
            alert("❌ Erreur lors de l'ajout du produit");
        }
    };

    const handleUpdateProduct = async () => {
        try {
            const productData = {
                id: editingProduct,
                nom: newProduct.nom,
                categorie: newProduct.categorie,
                prix: parseFloat(newProduct.prix),
                stock: parseInt(newProduct.stock),
                description: newProduct.description,
                image: newProduct.imageUrl,
                dimensions: newProduct.dimensions,
                poids: newProduct.poids,
                couleur: newProduct.couleur,
                taille: newProduct.taille,
                // C'est ici la clé !
                typeOeuvre: {
                    idType: newProduct.idTypeOeuvre // <-- il faut un id numérique ici !
                }
            };

            await axios.put(`http://localhost:9090/api/produits/${editingProduct}`, productData);
            fetchProducts();
            setShowAddForm(false);
            setEditingProduct(null);
            resetForm();
        } catch (err) {
            console.error("Erreur lors de la mise à jour:", err);
            if (err.response) {
                console.error("Réponse backend:", err.response.data);
            }
            alert("Erreur lors de la mise à jour du produit");
        }
    };

    // Suppression d'un produit
    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await axios.delete(`http://localhost:9090/api/produits/${productId}`);
                fetchProducts();
            } catch (err) {
                console.error("Erreur lors de la suppression:", err);
                alert("Erreur lors de la suppression du produit");
            }
        }
    };

    // Statistiques
    const totalProducts = products.length;
    const availableProducts = products.filter(p => p.stock > 5).length;
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Disponible': return '#48bb78';
            case 'Stock faible': return '#ed8936';
            case 'Rupture de stock': return '#f56565';
            case 'Sur commande': return '#4299e1';
            default: return '#a0aec0';
        }
    };

    const resetForm = () => {
        setNewProduct({
            nom: '',
            categorie: '',
            prix: '',
            stock: 0,
            description: '',
            dimensions: '',
            poids: '',  // Changé de weight
            imageUrl: '',
            typeLibelle: '' // Ajouté pour le type de produit
        });
        setEditingProduct(null);
        setShowAddForm(false);
    };

    // Affichage du chargement
    if (loading) {
        return <div className="loading">Chargement des produits...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const handleEditProduct = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setEditingProduct(productId);
            setShowAddForm(true);
            setNewProduct({
                nom: product.nom || '',
                categorie: product.categorie || '',
                prix: product.prix || '',
                stock: product.stock || 0,
                description: product.description || '',
                dimensions: product.dimensions || '',
                poids: product.poids || '',
                imageUrl: product.imageUrl 
                    ? (product.imageUrl.startsWith('http') 
                        ? product.imageUrl 
                        : `http://localhost:9090/images/${product.imageUrl}`)
                    : (product.image 
                        ? (product.image.startsWith('http') 
                            ? product.image 
                            : `http://localhost:9090/images/${product.image}`) 
                        : ''),
                typeLibelle: product.typeLibelle || '',
                file: null 
            });
        }
    };

    // Nouvelle fonction de fallback inspirée de ProductGrid
    // (Supprimée car doublon plus bas)

    // Améliore getImageUrl pour gérer image ET imageUrl
    const getImageUrl = (product) => {
        if (!product) return null;
        if (product.imageUrl && product.imageUrl.startsWith('http')) return product.imageUrl;
        if (product.imageUrl) return `http://localhost:9090/images/${product.imageUrl}`;
        if (product.image && product.image.startsWith('http')) return product.image;
        if (product.image) return `http://localhost:9090/images/${product.image}`;
        return null;
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
                                value={newProduct.nom}
                                onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })}
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

                        {/* Supprimé le champ Catégorie */}

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
                                value={newProduct.prix}
                                onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
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
                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
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
                                onChange={(e) => setNewProduct({ ...newProduct, dimensions: e.target.value })}
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
                                Type de produit
                            </label>
                            <select
                                value={newProduct.typeLibelle}
                                onChange={e => setNewProduct({ ...newProduct, typeLibelle: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    border: '2px solid #e8f5e8',
                                    borderRadius: '10px',
                                    fontSize: '1rem',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="">Sélectionner un type</option>
                                {categories.map(type => (
                                    <option key={type.id_type_oeuvre} value={type.libelle}>
                                        {type.libelle}
                                    </option>
                                ))}
                            </select>
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
                            📸 Image du produit (URL ou fichier)
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
                                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        border: '2px solid #e8f5e8',
                                        borderRadius: '10px',
                                        fontSize: '1rem'
                                    }}
                                    placeholder="https://exemple.com/mon-image.jpg"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setNewProduct({ ...newProduct, file });
                                            // Pour l'aperçu immédiat
                                            setNewProduct(prev => ({
                                                ...prev,
                                                imageUrl: URL.createObjectURL(file)
                                            }));
                                        }
                                    }}
                                    style={{ marginTop: '0.5rem' }}
                                />
                                <p style={{
                                    fontSize: '0.75rem',
                                    color: '#7a8a77',
                                    marginTop: '0.3rem'
                                }}>
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
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
                                    Image
                                </th>
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
                                <tr key={product.id}>
                                    <td>
                                        {console.log("product.imageUrl:", product.imageUrl, "product:", product)}
                                        <img
                                            src={getImageUrl(product)}
                                            alt={product.nom}
                                            onError={e => { e.target.style.display = 'none'; }}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #e8f5e8' }}
                                        />
                                    </td>
                                    <td>
                                        <div>
                                            <div>{product.nom}</div>
                                            <div>ID: {product.id}</div>
                                        </div>
                                    </td>
                                    <td>{product.categorie}</td>
                                    <td>{product.prix}€</td>
                                    <td style={{
                                        color: product.stock <= 5 ? '#ed8936' : '#48bb78'
                                    }}>
                                        {product.stock}
                                    </td>
                                    <td>
                                        <span style={{
                                            background: getStatusColor(product.status)
                                        }}>
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
                                                    e.target.style.color = 'white'; // <-- Correction ici
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
                            📋 Détails de {products[showProductDetails].nom}
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            <div>
                                <p style={{ gap: '1.5rem' }}>
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
                                        <div style={{
                                            width: '150px',
                                            height: '150px',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            border: '3px solid #e8f5e8',
                                            background: '#f8f9fa'
                                        }}>
                                            <img
                                                src={getImageUrl(products[showProductDetails])}
                                                alt={products[showProductDetails].nom}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
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
                                            Dimensions
                                        </p>
                                        <p>
                                            📏 {products[showProductDetails].dimensions}
                                        </p>
                                    </div>
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