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

    public Produit creerProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Optional<Produit> trouverParId(Long id) {
        return produitRepository.findById(id);
    }

    public List<Produit> listerTous() {
        return produitRepository.findAll();
    }

    public List<Produit> rechercherParNom(String nom) {
        return produitRepository.findByNomContainingIgnoreCase(nom);
    }

    public List<Produit> listerEnStock() {
        return produitRepository.findByStockGreaterThan(0);
    }

    public List<Produit> listerParPrix(BigDecimal prixMin, BigDecimal prixMax) {
        return produitRepository.findByPrixBetween(prixMin, prixMax);
    }

    public Produit mettreAJour(Produit produit) {
        return produitRepository.save(produit);
    }

    public void supprimer(Long id) {
        produitRepository.deleteById(id);
    }

    public List<Produit> rechercheGlobale(String terme) {
        return produitRepository.rechercheGlobale(terme);
    }

    public Long compterEnStock() {
        return produitRepository.compterProduitsEnStock();
    }

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
