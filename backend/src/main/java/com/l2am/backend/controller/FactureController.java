package com.l2am.backend.controller;

import com.l2am.backend.model.Facture;   // ✅ Correct
import com.l2am.backend.repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/factures")
@CrossOrigin(origins = "*")
public class FactureController {

    @Autowired
    private FactureRepository factureRepository;

    // 🔍 GET All
    @GetMapping
    public List<Facture> getAllFactures() {
        return factureRepository.findAll();
    }

    // 🔍 GET by ID
    @GetMapping("/{id}")
    public Optional<Facture> getFactureById(@PathVariable Long id) {
        return factureRepository.findById(id);
    }

    // ➕ POST
    @PostMapping
    public Facture createFacture(@RequestBody Facture facture) {
        return factureRepository.save(facture);
    }

    // ✏️ PUT
    @PutMapping("/{id}")
    public Facture updateFacture(@PathVariable Long id, @RequestBody Facture updatedFacture) {
        return factureRepository.findById(id).map(facture -> {
            facture.setDatePaiement(updatedFacture.getDatePaiement());
            facture.setTotal(updatedFacture.getTotal());
            facture.setSousTotal(updatedFacture.getSousTotal());
            facture.setLivraison(updatedFacture.getLivraison());
            facture.setAdresse(updatedFacture.getAdresse());
            facture.setVille(updatedFacture.getVille());
            facture.setCodePostal(updatedFacture.getCodePostal());
            return factureRepository.save(facture);
        }).orElse(null);
    }

    // ❌ DELETE
    @DeleteMapping("/{id}")
    public void deleteFacture(@PathVariable Long id) {
        factureRepository.deleteById(id);
    }
}