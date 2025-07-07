import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";


function Layout() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<Propos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* Routes administrateur */}
        <Route path="/admin" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />
        <Route path="/gestionadmin" element={
          <AdminRoute>
            <Gestionadmin />
          </AdminRoute>
        } />

        {/* Routes utilisateur */}
        <Route path="/pageclient" element={
          <UserRoute>
            <PageClient />
          </UserRoute>
        } />
        <Route path="/panier" element={
          <UserRoute>
            <Panier />
          </UserRoute>
        } />
        <Route path="/adresse-commande" element={
          <UserRoute>
            <AdresseCommande />
          </UserRoute>
        } />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <Layout />
      </CartProvider>
    </Router>
  );
}
