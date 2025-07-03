import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();  // Utilisation du hook useCart

  // Vérifier l'authentification au chargement ET à chaque changement de route
  useEffect(() => {
    checkAuthStatus();
  }, [location]); // Ajout de location comme dépendance

  // Écouter les changements dans localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    // Écouter les changements de localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier périodiquement (toutes les secondes)
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erreur parsing user data:', error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);
    
    // Forcer une vérification immédiate
    setTimeout(checkAuthStatus, 100);
    
    navigate('/');
  };

  const handleAccountClick = () => {
    navigate('/pageclient');
    setShowUserMenu(false);
  };

  // Fermer le menu utilisateur si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="L2AM Logo" className="navbar-logo-img" />
          </Link>
        </div>

        {/* Navigation links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/shop" className="nav-link">Boutique</Link>
          <Link to="/about" className="nav-link">À propos</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {!isLoggedIn && <Link to="/register" className="nav-link">Inscription</Link>}
        </div>

        {/* Actions (always visible) */}
        <div className="navbar-actions">
          {!isLoggedIn ? (
            <button className="navbar-btn" onClick={handleLogin}>Connexion</button>
          ) : (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Empêcher la propagation du clic
                  setShowUserMenu(!showUserMenu);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                {/* Avatar ou icône utilisateur */}
                <div style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #a8c4a0, #8fb085)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  {user?.nom ? user.nom.charAt(0).toUpperCase() : '👤'}
                </div>
              </button>

              {/* Menu déroulant utilisateur */}
              {showUserMenu && (
                <div 
                  onClick={(e) => e.stopPropagation()} // Empêcher la fermeture du menu
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e8f5e8',
                    minWidth: '200px',
                    zIndex: 1000,
                    marginTop: '8px'
                  }}
                >
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #f0f0f0',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    Bonjour, {user?.nom || 'Utilisateur'} !
                  </div>
                  
                  <button
                    onClick={handleAccountClick}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    👤 Mon compte
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#e74c3c',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderTop: '1px solid #f0f0f0'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    🚪 Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
          
          <input type="text" placeholder="Rechercher" className="navbar-input" />
          
          <Link to="/panier" className="navbar-cart" style={{ position: 'relative' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="19" cy="21" r="1.5" />
              <path d="M2 2h2l3.6 9.59a2 2 0 0 0 2 1.41h7.72a2 2 0 0 0 2-1.41L22 6H6" />
            </svg>
            {/* Badge compteur panier temporaire */}
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: '#e74c3c',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}>
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={`hamburger-button ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/shop" className="nav-link">Boutique</Link>
          <Link to="/about" className="nav-link">À propos</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="nav-link">Inscription</Link>
              <Link to="/login" className="nav-link">Connexion</Link>
            </>
          ) : (
            <>
              <Link to="/pageclient" className="nav-link">👤 Mon compte</Link>
              <button 
                onClick={handleLogout}
                className="nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#e74c3c',
                  width: '100%',
                  textAlign: 'left'
                }}
              >
                🚪 Déconnexion
              </button>
            </>
          )}
          
          <Link to="/panier" className="nav-link">
            Panier {cartCount > 0 && `(${cartCount})`}
          </Link>
        </div>
      </div>
    </nav>
  );
}