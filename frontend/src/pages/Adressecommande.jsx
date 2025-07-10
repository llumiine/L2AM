import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdresseCommande = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("Adresse et Commande");
    const [adresse, setAdresse] = useState("");
    const [ville, setVille] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [userData, setUserData] = useState(null);
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentaire, setCommentaire] = useState("");
    const [note, setNote] = useState("");
    const [showAllCommandes, setShowAllCommandes] = useState(false);


    // Charger les données utilisateur et commandes
    useEffect(() => {
        const loadUserDataAndCommandes = async () => {
            try {
                // Charger l'utilisateur connecté
                const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
                setUserData(currentUser);
                setAdresse(currentUser.adresse || "");
                setVille(currentUser.ville || "");
                setCodePostal(currentUser.codePostal || "");

                // Charger les commandes du backend pour cet utilisateur
                if (currentUser.id) {
                    const token = localStorage.getItem("token");
                    const res = await fetch(`http://localhost:9090/api/commandes`, {
                        headers: {
                            "Authorization": token ? `Bearer ${token}` : undefined,
                            "Content-Type": "application/json"
                        }
                    });
                    if (!res.ok) throw new Error("Erreur lors du chargement des commandes");
                    const allCommandes = await res.json();
                    // Filtrer les commandes de l'utilisateur connecté
                    const userCommandes = allCommandes.filter(cmd => cmd.idUtilisateur === currentUser.id);
                    setCommandes(userCommandes);
                } else {
                    setCommandes([]);
                }
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error("Erreur lors du chargement des commandes:", err);
            }
        };
        loadUserDataAndCommandes();
    }, []);    const handleMenuClick = (item) => {
        setActiveMenu(item.name);
        switch (item.name) {
            case "Détails":
            case "Adresse et Commande":
                navigate("/pageclient");
                break;
            case "Déconnexion":
                // Gérer la déconnexion ici si nécessaire
                break;
            default:
                break;
        }
    };    const menuItems = [
        { name: "Détails", active: false, icon: "📝" },
        { name: "Adresse et Commande", active: true, icon: "📦" },
        { name: "Déconnexion", active: false, icon: "🚪" },
    ];
    const envoyerCommentaire = async () => {
    if (!commentaire || !note) {
        alert("Merci de remplir le commentaire et la note !");
        return;
    }

    try {
        const res = await fetch("http://localhost:9090/api/commentaires", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUtilisateur: userData.id,
                idProduit: 1, // ou un vrai ID si tu l’as
                commentaire: commentaire,
                note: Number(note)
            })
        });

        if (!res.ok) throw new Error("Échec de l'envoi");

        alert("Commentaire envoyé !");
        setCommentaire("");
        setNote("");
    } catch (err) {
        console.error(err);
        alert("Erreur lors de l'envoi du commentaire.");
    }
};

    const handleAdresseSubmit = (e) => {
        e.preventDefault();
        if (!adresse.trim() || !ville.trim() || !codePostal.trim()) {
            alert("Veuillez remplir tous les champs de l'adresse");
            return;
        }

        try {
            // Mettre à jour l'utilisateur actuel
            const currentUser = JSON.parse(
                localStorage.getItem("currentUser") || "{}"
            );
            const updatedUser = {
                ...currentUser,
                adresse: adresse.trim(),
                ville: ville.trim(),
                codePostal: codePostal.trim(),
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));

            // Mettre à jour dans la liste des utilisateurs
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const updatedUsers = users.map((user) =>
                user.email === currentUser.email
                    ? {
                        ...user,
                        adresse: adresse.trim(),
                        ville: ville.trim(),
                        codePostal: codePostal.trim(),
                    }
                    : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            // Mettre à jour l'état local
            setUserData(updatedUser);
            alert("Adresse mise à jour avec succès !");
            setShowAddressForm(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            alert("Erreur lors de la mise à jour de l'adresse");
        }
    };

    const voirCommande = (commandeId) => {
        const commande = commandes.find((cmd) => cmd.idCommande === commandeId);
        if (commande) {
            const details = `
Détails de la commande ${commandeId}:
- Utilisateur: ${commande.idUtilisateur}
- Produit: ${commande.idProduit}
- Quantité: ${commande.quantite}
- Prix unitaire: ${commande.prixAchat}€
- Facture: ${commande.idFacture || 'N/A'}
            `;
            alert(details);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const getStatusColor = (status) => {
        if (!status || typeof status !== 'string') {
            return "linear-gradient(135deg, #a0aec0, #718096)";
        }
        switch (status.toLowerCase()) {
            case "livrée":
            case "livree":
                return "linear-gradient(135deg, #48bb78, #38a169)";
            case "en cours":
                return "linear-gradient(135deg, #ed8936, #dd6b20)";
            case "expédiée":
            case "expediee":
                return "linear-gradient(135deg, #4299e1, #3182ce)";
            case "annulée":
            case "annulee":
                return "linear-gradient(135deg, #f56565, #e53e3e)";
            default:
                return "linear-gradient(135deg, #a0aec0, #718096)";
        }
    };

    const getStatusIcon = (status) => {
        if (!status || typeof status !== 'string') {
            return "⏳";
        }
        switch (status.toLowerCase()) {
            case "livrée":
            case "livree":
                return "✅";
            case "en cours":
                return "🚚";
            case "expédiée":
            case "expediee":
                return "📦";
            case "annulée":
            case "annulee":
                return "❌";
            default:
                return "⏳";
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f8f9fa",
                }}
            >
                <div
                    style={{
                        fontSize: "1.5rem",
                        color: "#a8c4a0",
                        fontWeight: "600",
                    }}
                >
                    Chargement...
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                fontFamily: "system-ui, -apple-system, sans-serif",
                backgroundColor: "#f8f9fa",
            }}
        >
            {/* Sidebar */}
            <div
                style={{
                    width: "320px",
                    background: "linear-gradient(135deg, #a8c4a0, #8fb085)",
                    color: "white",
                    padding: "2rem",
                    boxShadow: "4px 0 20px rgba(168, 196, 160, 0.3)",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "3rem",
                    }}
                >
                    <div
                        style={{
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
                        }}
                    >
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
                    <h3
                        style={{
                            fontSize: "1.4rem",
                            fontWeight: "700",
                            color: "white",
                            marginBottom: "0.5rem",
                        }}
                    >
                        {userData?.nom && userData?.prenom
                            ? `${userData.prenom} ${userData.nom}`
                            : userData?.email || "Utilisateur"}
                    </h3>
                    <p
                        style={{
                            color: "rgba(255, 255, 255, 0.8)",
                            fontSize: "0.9rem",
                        }}
                    >
                        {userData?.role === "admin" ? "Administrateur" : "Client"}
                    </p>
                </div>

                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.8rem",
                    }}
                >
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

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    padding: "3rem",
                    maxWidth: "1000px",
                }}
            >
                <div
                    style={{
                        marginBottom: "3rem",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            color: "#2c3e2d",
                            textAlign: "center",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Mon Compte
                    </h1>
                    <p
                        style={{
                            textAlign: "center",
                            color: "#7a8a77",
                            fontSize: "1.1rem",
                        }}
                    >
                        Gérez vos informations et commandes
                    </p>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3rem",
                    }}
                >
                    {/* Section Adresse */}
                    <div
                        style={{
                            background: "white",
                            borderRadius: "20px",
                            padding: "2.5rem",
                            boxShadow: "0 8px 30px rgba(168, 196, 160, 0.15)",
                            border: "1px solid #e8f5e8",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "1.8rem",
                                    fontWeight: "700",
                                    color: "#2c3e2d",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.8rem",
                                }}
                            >
                                🏠 Adresse de livraison
                            </h2>
                            <button
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                style={{
                                    background: "linear-gradient(135deg, #a8c4a0, #8fb085)",
                                    color: "white",
                                    border: "none",
                                    padding: "0.8rem 1.5rem",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    boxShadow: "0 4px 12px rgba(168, 196, 160, 0.3)",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform = "translateY(-2px)";
                                    e.target.style.boxShadow =
                                        "0 6px 18px rgba(168, 196, 160, 0.4)";
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = "translateY(0)";
                                    e.target.style.boxShadow =
                                        "0 4px 12px rgba(168, 196, 160, 0.3)";
                                }}
                            >
                                {showAddressForm ? "🔼 Masquer" : "✏️ Modifier"}
                            </button>
                        </div>

                        <div
                            style={{
                                background: "#f8fdf8",
                                padding: "1.5rem",
                                borderRadius: "12px",
                                borderLeft: "4px solid #a8c4a0",
                                marginBottom: showAddressForm ? "2rem" : "0",
                            }}
                        >
                            {" "}
                            <p
                                style={{
                                    color: "#5a6c57",
                                    fontSize: "1rem",
                                    lineHeight: "1.6",
                                }}
                            >
                                <strong>Adresse actuelle :</strong>
                                <br />
                                {userData?.adresse ||
                                    userData?.ville ||
                                    userData?.codePostal ? (
                                    <>
                                        {userData.adresse && (
                                            <>
                                                {userData.adresse}
                                                <br />
                                            </>
                                        )}
                                        {(userData.codePostal || userData.ville) && (
                                            <>
                                                {userData.codePostal} {userData.ville}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    "Aucune adresse enregistrée"
                                )}
                            </p>
                        </div>

                        {showAddressForm && (
                            <form
                                onSubmit={handleAdresseSubmit}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    animation: "slideDown 0.3s ease-out forwards",
                                }}
                            >
                                <textarea
                                    value={adresse}
                                    onChange={(e) => setAdresse(e.target.value)}
                                    placeholder="Entrez votre adresse (numéro et rue)..."
                                    style={{
                                        width: "100%",
                                        padding: "1rem",
                                        borderRadius: "12px",
                                        border: "2px solid #e8f5e8",
                                        fontSize: "1rem",
                                        resize: "vertical",
                                        minHeight: "60px",
                                        transition: "border-color 0.3s ease",
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = "#a8c4a0")}
                                    onBlur={(e) => (e.target.style.borderColor = "#e8f5e8")}
                                />
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <input
                                        type="text"
                                        value={codePostal}
                                        onChange={(e) => setCodePostal(e.target.value)}
                                        placeholder="Code postal"
                                        style={{
                                            flex: "1",
                                            padding: "1rem",
                                            borderRadius: "12px",
                                            border: "2px solid #e8f5e8",
                                            fontSize: "1rem",
                                            transition: "border-color 0.3s ease",
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = "#a8c4a0")}
                                        onBlur={(e) => (e.target.style.borderColor = "#e8f5e8")}
                                    />
                                    <input
                                        type="text"
                                        value={ville}
                                        onChange={(e) => setVille(e.target.value)}
                                        placeholder="Ville"
                                        style={{
                                            flex: "2",
                                            padding: "1rem",
                                            borderRadius: "12px",
                                            border: "2px solid #e8f5e8",
                                            fontSize: "1rem",
                                            transition: "border-color 0.3s ease",
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = "#a8c4a0")}
                                        onBlur={(e) => (e.target.style.borderColor = "#e8f5e8")}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        background: "linear-gradient(135deg, #a8c4a0, #8fb085)",
                                        color: "white",
                                        border: "none",
                                        padding: "1rem 2rem",
                                        borderRadius: "12px",
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        marginTop: "1rem",
                                        alignSelf: "flex-start",
                                        boxShadow: "0 4px 15px rgba(168, 196, 160, 0.3)",
                                        transition: "all 0.3s ease",
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = "translateY(-2px)";
                                        e.target.style.boxShadow =
                                            "0 6px 20px rgba(168, 196, 160, 0.4)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = "translateY(0)";
                                        e.target.style.boxShadow =
                                            "0 4px 15px rgba(168, 196, 160, 0.3)";
                                    }}
                                >
                                    💾 Sauvegarder l'adresse
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Section Commandes */}
                    <div
                        style={{
                            background: "white",
                            borderRadius: "20px",
                            padding: "2.5rem",
                            boxShadow: "0 8px 30px rgba(168, 196, 160, 0.15)",
                            border: "1px solid #e8f5e8",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "1.8rem",
                                fontWeight: "700",
                                color: "#2c3e2d",
                                marginBottom: "2rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.8rem",
                            }}
                        >
                            📦 Mes Commandes ({commandes.length})
                        </h2>

                        {commandes.length === 0 ? (
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "3rem",
                                    color: "#7a8a77",
                                }}
                            >
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
                                <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                                    Aucune commande pour le moment
                                </p>
                                <p>Vos commandes apparaîtront ici une fois effectuées</p>
                            </div>
                        ) : (
                            <>
                                {/* Commande la plus récente */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1.5rem",
                                    }}
                                >
                                    {(() => {
                                        const sorted = [...commandes].sort((a, b) => new Date(b.date) - new Date(a.date));
                                        const recent = sorted[0];
                                        return (
                                            <div
                                                key={recent.id || recent.idCommande}
                                                style={{
                                                    background: "#f8fdf8",
                                                    border: "2px solid #e8f5e8",
                                                    borderRadius: "16px",
                                                    padding: "2rem",
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.borderColor = "#a8c4a0";
                                                    e.currentTarget.style.transform = "translateY(-2px)";
                                                    e.currentTarget.style.boxShadow =
                                                        "0 8px 25px rgba(168, 196, 160, 0.2)";
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.borderColor = "#e8f5e8";
                                                    e.currentTarget.style.transform = "translateY(0)";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                {/* ... même contenu qu'avant pour une commande ... */}
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#2c3e2d", marginBottom: "0.8rem" }}>
                                                            COMMANDE #{recent.id || recent.idCommande}
                                                        </h3>
                                                        <div style={{ fontSize: "0.95rem", color: "#7a8a77", marginBottom: "0.5rem" }}>
                                                            <span><b>Facture :</b> {recent.idFacture || 'N/A'}</span> &nbsp;|
                                                            <span><b>Statut :</b> {recent.status || 'N/A'}</span> &nbsp;|
                                                            <span><b>ID utilisateur :</b> {recent.idUtilisateur}</span>
                                                        </div>
                                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                                                            <div>
                                                                <span style={{ fontSize: "0.85rem", color: "#7a8a77", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                                    📅 Date
                                                                </span>
                                                                <p style={{ fontSize: "1rem", color: "#2c3e2d", fontWeight: "600", marginTop: "0.3rem" }}>
                                                                    {formatDate(recent.date)}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <span style={{ fontSize: "0.85rem", color: "#7a8a77", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                                    💰 Total
                                                                </span>
                                                                <p style={{ fontSize: "1.2rem", color: "#2c3e2d", fontWeight: "700", marginTop: "0.3rem" }}>
                                                                    {recent.total}€
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <span style={{ fontSize: "0.85rem", color: "#7a8a77", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                                    📍 Livraison
                                                                </span>
                                                                <p style={{ fontSize: "1rem", color: "#5a6c57", marginTop: "0.3rem" }}>
                                                                    {recent.adresse || "Adresse non renseignée"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div style={{ marginBottom: "1rem" }}>
                                                            <span style={{ fontSize: "0.85rem", color: "#7a8a77", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                                🛍️ Produits
                                                            </span>
                                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                                                                {Array.isArray(recent.produits) && recent.produits.length > 0 ? (
                                                                    recent.produits.map((produit, pIndex) => (
                                                                        <span key={pIndex} style={{ background: "rgba(168, 196, 160, 0.2)", color: "#2c3e2d", padding: "0.3rem 0.8rem", borderRadius: "15px", fontSize: "0.85rem", fontWeight: "500" }}>
                                                                            {typeof produit === 'string' ? produit : produit.nom || JSON.stringify(produit)}
                                                                        </span>
                                                                    ))
                                                                ) : (
                                                                    <span style={{ color: '#b0b0b0' }}>Aucun produit</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {Array.isArray(recent.lignes) && recent.lignes.length > 0 && (
                                                            <div style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
                                                                <b>Détail des produits :</b>
                                                                <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                                                                    {recent.lignes.map((ligne, lidx) => (
                                                                        <li key={lidx}>
                                                                            {ligne.nomProduit || ligne.produit?.nom || 'Produit'} x{ligne.quantite} à {ligne.prixAchat}€
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
                                                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "600", color: "white", background: getStatusColor(recent.status) }}>
                                                            {getStatusIcon(recent.status)}
                                                            {recent.status}
                                                        </span>
                                                        <button
                                                            onClick={() => voirCommande(recent.id)}
                                                            style={{ background: "linear-gradient(135deg, #a8c4a0, #8fb085)", color: "white", border: "none", padding: "0.8rem 1.5rem", borderRadius: "10px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "600", boxShadow: "0 4px 12px rgba(168, 196, 160, 0.3)", transition: "all 0.3s ease", minWidth: "100px" }}
                                                            onMouseOver={(e) => {
                                                                e.target.style.transform = "translateY(-2px)";
                                                                e.target.style.boxShadow = "0 6px 18px rgba(168, 196, 160, 0.4)";
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.target.style.transform = "translateY(0)";
                                                                e.target.style.boxShadow = "0 4px 12px rgba(168, 196, 160, 0.3)";
                                                            }}
                                                        >
                                                            👁️ Voir détails
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                                {/* Bouton voir plus */}
                                {commandes.length > 1 && !showAllCommandes && (
                                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                        <button
                                            onClick={() => setShowAllCommandes(true)}
                                            style={{
                                                background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.8rem 2rem',
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                boxShadow: '0 4px 12px rgba(168, 196, 160, 0.3)',
                                                transition: 'all 0.3s ease',
                                            }}
                                        >
                                            Voir plus de commandes
                                        </button>
                                    </div>
                                )}
                                {/* Affichage des autres commandes si demandé */}
                                {showAllCommandes && (
                                    <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {(() => {
                                            const sorted = [...commandes].sort((a, b) => new Date(b.date) - new Date(a.date));
                                            return sorted.slice(1).map((commande) => (
                                                <div
                                                    key={commande.id || commande.idCommande}
                                                    style={{
                                                        background: "#f8fdf8",
                                                        border: "2px solid #e8f5e8",
                                                        borderRadius: "16px",
                                                        padding: "2rem",
                                                        transition: "all 0.3s ease",
                                                        cursor: "pointer",
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.currentTarget.style.borderColor = "#a8c4a0";
                                                        e.currentTarget.style.transform = "translateY(-2px)";
                                                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(168, 196, 160, 0.2)";
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.currentTarget.style.borderColor = "#e8f5e8";
                                                        e.currentTarget.style.transform = "translateY(0)";
                                                        e.currentTarget.style.boxShadow = "none";
                                                    }}
                                                >
                                                    {/* ... même contenu qu'avant pour une commande ... */}
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                                                        <div style={{ flex: 1 }}>
                                                            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#2c3e2d", marginBottom: "0.8rem" }}>
                                                                COMMANDE #{commande.id || commande.idCommande}
                                                            </h3>
                                                            <div style={{ fontSize: "0.95rem", color: "#7a8a77", marginBottom: "0.5rem" }}>
                                                                <span><b>Facture :</b> {commande.idFacture || 'N/A'}</span> &nbsp;|
                                                                <span><b>Statut :</b> {commande.status || 'N/A'}</span> &nbsp;|
                                                                <span><b>ID utilisateur :</b> {commande.idUtilisateur}</span>
                                                            </div>
                                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                                                                <div>
                                                                    <span style={{ fontSize: "0.85rem", color: "#7a8a77", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                                        📅 Date
                                                                    </span>
                                                                    <p style={{ fontSize: "1rem", color: "#2c3e2d", fontWeight: "600", marginTop: "0.3rem" }}>
                                                                        {formatDate(commande.date)}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <span style={{ fontSize: "0.85rem", color: "#7a8a77", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                                        💰 Total
                                                                    </span>
                                                                    <p style={{ fontSize: "1.2rem", color: "#2c3e2d", fontWeight: "700", marginTop: "0.3rem" }}>
                                                                        {commande.total}€
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <span style={{ fontSize: "0.85rem", color: "#7a8a77", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                                        📍 Livraison
                                                                    </span>
                                                                    <p style={{ fontSize: "1rem", color: "#5a6c57", marginTop: "0.3rem" }}>
                                                                        {commande.adresse || "Adresse non renseignée"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div style={{ marginBottom: "1rem" }}>
                                                                <span style={{ fontSize: "0.85rem", color: "#7a8a77", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                                                    🛍️ Produits
                                                                </span>
                                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                                                                    {Array.isArray(commande.produits) && commande.produits.length > 0 ? (
                                                                        commande.produits.map((produit, pIndex) => (
                                                                            <span key={pIndex} style={{ background: "rgba(168, 196, 160, 0.2)", color: "#2c3e2d", padding: "0.3rem 0.8rem", borderRadius: "15px", fontSize: "0.85rem", fontWeight: "500" }}>
                                                                                {typeof produit === 'string' ? produit : produit.nom || JSON.stringify(produit)}
                                                                            </span>
                                                                        ))
                                                                    ) : (
                                                                        <span style={{ color: '#b0b0b0' }}>Aucun produit</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {Array.isArray(commande.lignes) && commande.lignes.length > 0 && (
                                                                <div style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
                                                                    <b>Détail des produits :</b>
                                                                    <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                                                                        {commande.lignes.map((ligne, lidx) => (
                                                                            <li key={lidx}>
                                                                                {ligne.nomProduit || ligne.produit?.nom || 'Produit'} x{ligne.quantite} à {ligne.prixAchat}€
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
                                                            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "600", color: "white", background: getStatusColor(commande.status) }}>
                                                                {getStatusIcon(commande.status)}
                                                                {commande.status}
                                                            </span>
                                                            <button
                                                                onClick={() => voirCommande(commande.id)}
                                                                style={{ background: "linear-gradient(135deg, #a8c4a0, #8fb085)", color: "white", border: "none", padding: "0.8rem 1.5rem", borderRadius: "10px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "600", boxShadow: "0 4px 12px rgba(168, 196, 160, 0.3)", transition: "all 0.3s ease", minWidth: "100px" }}
                                                                onMouseOver={(e) => {
                                                                    e.target.style.transform = "translateY(-2px)";
                                                                    e.target.style.boxShadow = "0 6px 18px rgba(168, 196, 160, 0.4)";
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.target.style.transform = "translateY(0)";
                                                                    e.target.style.boxShadow = "0 4px 12px rgba(168, 196, 160, 0.3)";
                                                                }}
                                                            >
                                                                👁️ Voir détails
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                )}
                            </>
                        )}

                        {/* Footer de section */}
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "2rem",
                                padding: "1.5rem",
                                background: "#f8fdf8",
                                borderRadius: "12px",
                                border: "1px solid #e8f5e8",
                            }}
                        >
                            
                            {/* Formulaire de commentaire client */}
<div
    style={{
        marginTop: "3rem",
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(168, 196, 160, 0.1)",
        border: "1px solid #e8f5e8"
    }}
>
    <h2 style={{ fontSize: "1.6rem", color: "#2c3e2d", marginBottom: "1rem" }}>
        ✍️ Laisser un commentaire
    </h2>

    <textarea
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Votre avis sur le site ou les produits..."
        rows={4}
        style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            marginBottom: "1rem"
        }}
    />

    <select
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            marginBottom: "1rem"
        }}
    >
        <option value="">Note</option>
        {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} ⭐</option>
        ))}
    </select>

    <br />

    <button
        onClick={envoyerCommentaire}
        style={{
            background: "linear-gradient(135deg, #a8c4a0, #8fb085)",
            color: "white",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600"
        }}
    >
        📨 Envoyer
    </button>
</div>

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
