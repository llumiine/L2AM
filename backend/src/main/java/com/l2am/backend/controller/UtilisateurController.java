package com.l2am.backend.controller;

import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        return ResponseEntity.ok(utilisateurService.listerTous());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        Optional<Utilisateur> utilisateur = utilisateurService.trouverParId(id);
        return utilisateur.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Utilisateur> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        Utilisateur created = utilisateurService.creerUtilisateur(utilisateur);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        utilisateur.setId(id);
        Utilisateur updated = utilisateurService.mettreAJour(utilisateur);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.supprimer(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Accessible uniquement aux admins
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin/clients")
    public ResponseEntity<List<Utilisateur>> listerClients() {
        return ResponseEntity.ok(utilisateurService.listerParRole(0)); // 0 = user
    }

    // ✅ Récupérer l'utilisateur connecté (pour savoir si c'est un admin côté React)
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Utilisateur> getCurrentUtilisateur(Authentication authentication) {
        String email = authentication.getName(); // ou getPrincipal() selon config
        Optional<Utilisateur> utilisateur = utilisateurService.trouverParEmail(email);
        return utilisateur.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }
}
