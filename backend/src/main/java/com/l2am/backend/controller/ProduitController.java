package com.l2am.backend.controller;

import com.l2am.backend.model.Produit;
import com.l2am.backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @GetMapping
    public List<Produit> getAll() {
        return produitRepository.findAll();
    }

    @GetMapping("/{id}")
    public Produit getById(@PathVariable Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Produit create(@RequestBody Produit produit) {
        return produitRepository.save(produit);
    }

    @PutMapping("/{id}")
    public Produit update(@PathVariable Long id, @RequestBody Produit produit) {
        produit.setId(id);
        return produitRepository.save(produit);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        produitRepository.deleteById(id);
    }
}
