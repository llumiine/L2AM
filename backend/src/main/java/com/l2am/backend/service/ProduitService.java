package com.l2am.backend.service;

import com.l2am.backend.entity.Produit;
import com.l2am.backend.entity.TypeOeuvre;
import com.l2am.backend.repository.ProduitRepository;
import com.l2am.backend.repository.TypeOeuvreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private TypeOeuvreRepository typeOeuvreRepository;
 
    public Produit creerProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Optional<Produit> trouverParId(Long id) {
        return produitRepository.findById(id);
    }

    public List<Produit> listerTous() {
        return produitRepository.findAll();
    }
public TypeOeuvre findTypeOeuvreByLibelle(String libelle) {
    return typeOeuvreRepository.findByLibelle(libelle);
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
            if (produit.getStock() != null && produit.getStock() >= quantite) {
                produit.setStock(produit.getStock() - quantite);
                produitRepository.save(produit);
                return true;
            }
        }
        return false;
    }

    public List<Produit> getProduitsFiltres(List<Long> types, Double maxPrice, List<String> sizes) {
        try {
            List<Produit> produits = produitRepository.findAll();
            if ((types == null || types.isEmpty()) && maxPrice == null && (sizes == null || sizes.isEmpty())) {
                return produits;
            }
            BigDecimal maxPriceBigDecimal = maxPrice != null ? BigDecimal.valueOf(maxPrice) : null;
            return produits.stream()
                    .filter(p -> types == null || types.isEmpty() || 
                            (p.getTypeOeuvre() != null && types.contains(p.getTypeOeuvre().getIdType())))
                    .filter(p -> maxPriceBigDecimal == null || 
                            (p.getPrix() != null && p.getPrix().compareTo(maxPriceBigDecimal) <= 0))
                    .filter(p -> sizes == null || sizes.isEmpty() || 
                            (p.getTaille() != null && sizes.contains(p.getTaille())))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Erreur dans getProduitsFiltres: " + e.getMessage());
            e.printStackTrace();
            return produitRepository.findAll();
        }
    }

    public List<TypeOeuvre> getAllTypesOeuvre() {
        try {
            return typeOeuvreRepository.findAll();
        } catch (Exception e) {
            System.err.println("Erreur dans getAllTypesOeuvre: " + e.getMessage());
            e.printStackTrace();
            return List.of();
        }
    }

    public Double getPrixMaximum() {
        try {
            return produitRepository.findAll().stream()
                    .filter(p -> p.getPrix() != null)
                    .map(Produit::getPrix)
                    .max(BigDecimal::compareTo)
                    .map(BigDecimal::doubleValue)
                    .orElse(0.0);
        } catch (Exception e) {
            System.err.println("Erreur dans getPrixMaximum: " + e.getMessage());
            e.printStackTrace();
            return 0.0;
        }
    }

    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    public TypeOeuvre getTypeOeuvreById(Long id) {
        return typeOeuvreRepository.findById(id).orElse(null);
    }
}