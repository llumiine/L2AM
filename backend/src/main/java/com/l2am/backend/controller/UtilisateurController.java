package com.l2am.backend.controller;

import com.l2am.backend.model.Utilisateur;
import com.l2am.backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin
public class UtilisateurController {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping
    public List<Utilisateur> getAll() {
        return utilisateurRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Utilisateur> getById(@PathVariable Long id) {
        return utilisateurRepository.findById(id);
    }

    @PostMapping
    public Utilisateur create(@RequestBody Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    @PutMapping("/{id}")
    public Utilisateur update(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        utilisateur.setId(id);
        return utilisateurRepository.save(utilisateur);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        utilisateurRepository.deleteById(id);
    }
}
