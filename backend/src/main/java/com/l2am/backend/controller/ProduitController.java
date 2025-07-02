package com.l2am.backend.controller;

import com.l2am.backend.entity.Produit;
import com.l2am.backend.entity.TypeOeuvre;
import com.l2am.backend.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:3000")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @PostMapping
    public ResponseEntity<Produit> creerProduit(@RequestBody Produit produit) {
        Produit nouveauProduit = produitService.creerProduit(produit);
        return ResponseEntity.ok(nouveauProduit);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduit(@PathVariable Long id) {
        Optional<Produit> produit = produitService.trouverParId(id);
        return produit.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Produit>> getTousLesProduits() {
        return ResponseEntity.ok(produitService.listerTous());
    }

    @GetMapping("/recherche")
    public ResponseEntity<List<Produit>> rechercherParNom(@RequestParam String nom) {
        return ResponseEntity.ok(produitService.rechercherParNom(nom));
    }

    @GetMapping("/stock")
    public ResponseEntity<List<Produit>> getProduitsEnStock() {
        return ResponseEntity.ok(produitService.listerEnStock());
    }

    @GetMapping("/prix")
    public ResponseEntity<List<Produit>> getProduitsParPrix(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max) {
        return ResponseEntity.ok(produitService.listerParPrix(min, max));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit> mettreAJourProduit(@PathVariable Long id, @RequestBody Produit produit) {
        produit.setId(id);
        Produit updated = produitService.mettreAJour(produit);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerProduit(@PathVariable Long id) {
        produitService.supprimer(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count/stock")
    public ResponseEntity<Long> compterProduitsEnStock() {
        return ResponseEntity.ok(produitService.compterEnStock());
    }

    @PutMapping("/stock/{id}")
    public ResponseEntity<String> diminuerStock(@PathVariable Long id, @RequestParam Integer quantite) {
        boolean success = produitService.diminuerStock(id, quantite);
        if (success) {
            return ResponseEntity.ok("Stock mis à jour");
        } else {
            return ResponseEntity.badRequest().body("Quantité insuffisante ou produit introuvable");
        }
    }

    @GetMapping("/recherche/globale")
    public ResponseEntity<List<Produit>> rechercheGlobale(@RequestParam String q) {
        return ResponseEntity.ok(produitService.rechercheGlobale(q));
    }
}
