import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

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
          <Link to="/about" className="nav-link">À propos</Link>
          <Link to="/shop" className="nav-link">Boutique</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Actions (always visible) */}
        <div className="navbar-actions">
          <button className="navbar-btn" onClick={handleLogin}>Connexion</button>
          <input type="text" placeholder="Rechercher" className="navbar-input" />
          <button className="navbar-cart">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="19" cy="21" r="1.5" />
              <path d="M2 2h2l3.6 9.59a2 2 0 0 0 2 1.41h7.72a2 2 0 0 0 2-1.41L22 6H6" />
            </svg>
          </button>
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
          <Link to="/about" className="nav-link">À propos</Link>
          <Link to="/shop" className="nav-link">Boutique</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
