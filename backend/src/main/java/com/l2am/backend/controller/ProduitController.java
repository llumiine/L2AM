package com.l2am.backend.controller;

import com.l2am.backend.entity.Produit;
import com.l2am.backend.entity.TypeOeuvre;
import com.l2am.backend.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    @PostMapping(value = "/produits", consumes = {"multipart/form-data"})
    public ResponseEntity<Produit> creerProduitAvecImage(
            @RequestParam("nom") String nom,
            @RequestParam("prix") BigDecimal prix,
            @RequestParam("stock") Integer stock,
            @RequestParam("description") String description,
            @RequestParam(value = "materiaux", required = false) String materiaux,
            @RequestParam(value = "dimensions", required = false) String dimensions,
            @RequestParam(value = "typeLibelle", required = false) String typeLibelle,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        try {
            Produit produit = new Produit();
            produit.setNom(nom);
            produit.setPrix(prix);
            produit.setStock(stock);
            produit.setDescription(description);
            produit.setDimensions(dimensions);
            if (typeLibelle != null && !typeLibelle.isEmpty()) {
                TypeOeuvre typeOeuvre = produitService.findTypeOeuvreByLibelle(typeLibelle);
                if (typeOeuvre != null) {
                    produit.setTypeOeuvre(typeOeuvre);
                }
            }
            if (file != null && !file.isEmpty()) {
                String dossierImages = System.getProperty("user.dir") + "/images/";
                File dossier = new File(dossierImages);
                if (!dossier.exists()) {
                    dossier.mkdirs();
                }
                String originalFilename = file.getOriginalFilename();
                String newFilename = System.currentTimeMillis() + "_" + originalFilename;
                String cheminComplet = dossierImages + newFilename;
                file.transferTo(new File(cheminComplet));
                produit.setImage(newFilename);
            }

            Produit nouveauProduit = produitService.creerProduit(produit);
            return ResponseEntity.ok(nouveauProduit);
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/produits/{id}")
    public ResponseEntity<Produit> getProduit(@PathVariable Long id) {
        Optional<Produit> produit = produitService.trouverParId(id);
        return produit.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }    @GetMapping("/produits")
    public ResponseEntity<List<Produit>> getTousLesProduits(
            @RequestParam(required = false) List<Long> types,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) List<String> sizes
    ) {
        try {
            List<Produit> produits = produitService.getProduitsFiltres(types, maxPrice, sizes);
            return ResponseEntity.ok(produits);
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/produits/recherche")
    public ResponseEntity<List<Produit>> rechercherParNom(@RequestParam String nom) {
        return ResponseEntity.ok(produitService.rechercherParNom(nom));
    }

    @GetMapping("/produits/stock")
    public ResponseEntity<List<Produit>> getProduitsEnStock() {
        return ResponseEntity.ok(produitService.listerEnStock());
    }

    @GetMapping("/produits/prix")
    public ResponseEntity<List<Produit>> getProduitsParPrix(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max) {
        return ResponseEntity.ok(produitService.listerParPrix(min, max));
    }

    @PutMapping("/produits/{id}")
    public ResponseEntity<Produit> mettreAJourProduit(@PathVariable Long id, @RequestBody Produit produit) {
        produit.setId(id);
        Produit updated = produitService.mettreAJour(produit);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/produits/{id}")
    public ResponseEntity<Void> supprimerProduit(@PathVariable Long id) {
        produitService.supprimer(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/produits/count/stock")
    public ResponseEntity<Long> compterProduitsEnStock() {
        return ResponseEntity.ok(produitService.compterEnStock());
    }

    @PutMapping("/produits/stock/{id}")
    public ResponseEntity<String> diminuerStock(@PathVariable Long id, @RequestParam Integer quantite) {
        boolean success = produitService.diminuerStock(id, quantite);
        if (success) {
            return ResponseEntity.ok("Stock mis à jour");
        } else {
            return ResponseEntity.badRequest().body("Quantité insuffisante ou produit introuvable");
        }
    }

    @GetMapping("/produits/recherche/globale")
    public ResponseEntity<List<Produit>> rechercheGlobale(@RequestParam String q) {
        return ResponseEntity.ok(produitService.rechercheGlobale(q));
    }

    @GetMapping("/types-oeuvre")
    public ResponseEntity<List<TypeOeuvre>> getAllTypesOeuvre() {
        try {
            List<TypeOeuvre> types = produitService.getAllTypesOeuvre();
            return ResponseEntity.ok(types);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/produits/prix-max")
    public ResponseEntity<Double> getPrixMaximum() {
        try {
            Double prixMax = produitService.getPrixMaximum();
            return ResponseEntity.ok(prixMax);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
