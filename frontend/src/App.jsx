import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import ProductPage from "./pages/ProductPage";
import Propos from "./pages/Propos";
import Contact from "./pages/Contact";
import Panier from "./pages/Panier";
import Paiement from "./pages/Paiement";
import PageClient from "./pages/Pageclient";
import AdresseCommande from "./pages/Adressecommande";
import PaiementConfirmer from "./pages/Paiementconfirmer";
import Admin from "./pages/Admin";
import { CartProvider } from './context/CartContext';
import Gestionadmin from "./pages/Gestionadmin";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";


function Layout() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<Propos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductPage />} />

        
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
        <Route path="/paiement" element={
          <UserRoute>
            <Paiement />
          </UserRoute>
        } />
        <Route path="/paiementconfirmer" element={
          <UserRoute>
            <PaiementConfirmer />
          </UserRoute>
        } />

        
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
