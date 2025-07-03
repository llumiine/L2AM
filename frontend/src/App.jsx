import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import ProductPage from "./pages/ProductPage";
import Propos from "./pages/Propos"; // Vérifiez que l'import est présent
import Contact from "./pages/Contact"; // Ajoutez cet import
import Panier from "./pages/Panier"; // Ajoutez cet import
import Paiement from "./pages/Paiement"; // Ajoutez cet import
import PageClient from "./pages/Pageclient";
import AdresseCommande from "./pages/Adressecommande";
import PaiementConfirmer from "./pages/Paiementconfirmer";
import Admin from "./pages/Admin";
import { CartProvider } from './context/CartContext'; // IMPORTANT : Ajoutez cette ligne

import Gestionadmin from "./pages/Gestionadmin";


function Layout() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<Propos />} /> {/* Vérifiez que cette route existe */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/panier" element={<Panier />} /> {/* Ajoutez cette route */}
        <Route path="/paiement" element={<Paiement />} /> {/* Ajoutez cette route */}
<Route path="/Pageclient" element={<PageClient />} /> 
<Route path="/client" element={<PageClient />} />
       <Route path="/adresse-commande" element={<AdresseCommande />} />
        <Route path="/paiement-confirmer" element={<PaiementConfirmer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/Gestion-admin" element={<Gestionadmin />} />
        <Route path="/product/:id" element={<ProductPage />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
