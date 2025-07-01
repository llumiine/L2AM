package com.l2am.backend.service;

import com.l2am.backend.entity.Produit;
import com.l2am.backend.entity.TypeOeuvre;
import com.l2am.backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    
    @Autowired
    private ProduitRepository produitRepository;
    
    /**
     * Créer un nouveau produit
     */
    public Produit creerProduit(Produit produit) {
        return produitRepository.save(produit);
    }
    
    /**
     * Trouver produit par ID
     */
    public Optional<Produit> trouverParId(Long id) {
        return produitRepository.findById(id);
    }
    
    /**
     * Lister tous les produits
     */
    public List<Produit> listerTous() {
        return produitRepository.findAll();
    }
    
    /**
     * Lister produits par type d'œuvre
     */
    public List<Produit> listerParType(TypeOeuvre typeOeuvre) {
        return produitRepository.findByTypeOeuvre(typeOeuvre);
    }
    
    /**
     * Rechercher produits par nom
     */
    public List<Produit> rechercherParNom(String nom) {
        return produitRepository.findByNomContainingIgnoreCase(nom);
    }
    
    /**
     * Lister produits en stock
     */
    public List<Produit> listerEnStock() {
        return produitRepository.findByStockGreaterThan(0);
    }
    
    /**
     * Lister produits par gamme de prix
     */
    public List<Produit> listerParPrix(BigDecimal prixMin, BigDecimal prixMax) {
        return produitRepository.findByPrixBetween(prixMin, prixMax);
    }
    
    /**
     * Mettre à jour un produit
     */
    public Produit mettreAJour(Produit produit) {
        return produitRepository.save(produit);
    }
    
    /**
     * Supprimer un produit
     */
    public void supprimer(Long id) {
        produitRepository.deleteById(id);
    }
    
    /**
     * Recherche globale
     */
    public List<Produit> rechercheGlobale(String terme) {
        return produitRepository.rechercheGlobale(terme);
    }
    
    /**
     * Compter produits en stock
     */
    public Long compterEnStock() {
        return produitRepository.compterProduitsEnStock();
    }
    
    /**
     * Décrémenter le stock d'un produit
     */
    public boolean diminuerStock(Long idProduit, Integer quantite) {
        Optional<Produit> produitOpt = produitRepository.findById(idProduit);
        if (produitOpt.isPresent()) {
            Produit produit = produitOpt.get();
            if (produit.getStock() >= quantite) {
                produit.setStock(produit.getStock() - quantite);
                produitRepository.save(produit);
                return true;
            }
        }
        return false;
    }
}