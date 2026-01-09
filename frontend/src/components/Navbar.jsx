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
  const { cartCount, clearCart } = useCart();

  useEffect(() => {
    checkAuthStatus();
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
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
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setUser(user);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearCart(); // Vide le panier à la déconnexion
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);
    setIsMenuOpen(false);
    setTimeout(checkAuthStatus, 100);
    navigate('/');
  };

  const handleAccountClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Redirection selon le rôle
      if (user.role === 1) {
        navigate('/gestionadmin');
      } else {
        navigate('/pageclient');
      }
    } else {
      navigate('/login');
    }
    setShowUserMenu(false); // Fermer le menu déroulant
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      if (user.role === 1) {
        alert("Les administrateurs n'ont pas accès au panier");
        return;
      }
      navigate('/panier');
    } else {
      navigate('/login');
    }
  };

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
        
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="L2AM Logo" className="navbar-logo-img" />
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/shop" className="nav-link">Boutique</Link>
          <Link to="/about" className="nav-link">À propos</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="navbar-actions">
          <input type="text" placeholder="Rechercher..." className="navbar-input" />
          
          {/* Panier */}
          <Link to="#" onClick={handleCartClick} className="navbar-cart">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <div className="auth-buttons">
              <button className="navbar-btn secondary" onClick={handleRegister}>
                Inscription
              </button>
              <button className="navbar-btn primary" onClick={handleLogin}>
                Connexion
              </button>
            </div>
          ) : (
            <div className="user-menu-container">
              <button 
                className="user-avatar"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                }}
              >
                <div className="avatar-circle">
                  {user?.nom ? user.nom.charAt(0).toUpperCase() : '👤'}
                </div>
                <span className="user-name">
                  {user?.nom || 'Utilisateur'}
                </span>
                <svg 
                  className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}
                  width="16" 
                  height="16" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>

              {showUserMenu && (
                <div 
                  className="user-dropdown"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dropdown-header">
                    Bonjour, {user?.nom || 'Utilisateur'} !
                  </div>
                  
                  <button className="dropdown-item" onClick={handleAccountClick}>
                    <span className="dropdown-icon">👤</span>
                    Mon compte
                  </button>
                  
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <span className="dropdown-icon">🚪</span>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

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

        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>          <div className="mobile-header">
            <h3>Menu</h3>
          </div>

          <div className="mobile-nav">
            <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              🏠 Accueil
            </Link>
            <Link to="/shop" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              🛍️ Boutique
            </Link>
            <Link to="/about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              ℹ️ À propos
            </Link>
            <Link to="/contact" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              📞 Contact
            </Link>
          </div>

          <div className="mobile-divider"></div>

          <div className="mobile-search">
            <input type="text" placeholder="Rechercher..." className="mobile-search-input" />
          </div>

          <div className="mobile-divider"></div>

          {!isLoggedIn ? (
            <div className="mobile-auth">
              <button className="mobile-btn secondary" onClick={handleRegister}>
                📝 Inscription
              </button>
              <button className="mobile-btn primary" onClick={handleLogin}>
                🔑 Connexion
              </button>
            </div>
          ) : (
            <div className="mobile-user">
              <div className="mobile-user-info">
                <div className="mobile-avatar">
                  {user?.nom ? user.nom.charAt(0).toUpperCase() : '👤'}
                </div>
                <span>Connecté en tant que {user?.nom}</span>
              </div>
              <button className="mobile-link" onClick={handleAccountClick}>
                👤 Mon compte
              </button>
              <button className="mobile-link logout" onClick={handleLogout}>
                🚪 Déconnexion
              </button>
            </div>
          )}

          <div className="mobile-divider"></div>

          <Link to="#" onClick={handleCartClick} className="mobile-cart">
            <span>🛒 Panier</span>
            {cartCount > 0 && (
              <span className="mobile-cart-badge">{cartCount}</span>
            )}
          </Link>
        </div>

        {isMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>
    </nav>
  );
}