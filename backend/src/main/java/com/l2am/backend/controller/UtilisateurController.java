package com.l2am.backend.controller;

import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private PasswordEncoder passwordEncoder;

  

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

    // ✅ NOUVEAU: Endpoint pour changer le mot de passe
    @PostMapping("/changer-mot-de-passe")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> changerMotDePasse(@RequestBody ChangePasswordRequest request, 
                                                    Authentication authentication) {
        try {
            // Récupérer l'utilisateur connecté
            String email = authentication.getName();
            Optional<Utilisateur> optionalUser = utilisateurService.trouverParEmail(email);
            
            if (optionalUser.isEmpty()) {
                return ResponseEntity.badRequest().body("Utilisateur non trouvé");
            }
            
            Utilisateur utilisateur = optionalUser.get();
            
            // Vérifier l'ancien mot de passe
            if (!passwordEncoder.matches(request.getAncienMotDePasse(), utilisateur.getMdp())) {
                return ResponseEntity.badRequest().body("L'ancien mot de passe est incorrect");
            }
            
            // Valider le nouveau mot de passe
            if (request.getNouveauMotDePasse() == null || request.getNouveauMotDePasse().length() < 8) {
                return ResponseEntity.badRequest().body("Le nouveau mot de passe doit contenir au moins 8 caractères");
            }
            
            // Vérifier que le nouveau mot de passe est différent de l'ancien
            if (passwordEncoder.matches(request.getNouveauMotDePasse(), utilisateur.getMdp())) {
                return ResponseEntity.badRequest().body("Le nouveau mot de passe doit être différent de l'ancien");
            }
            
            // Encoder et sauvegarder le nouveau mot de passe
            utilisateur.setMdp(passwordEncoder.encode(request.getNouveauMotDePasse()));
            utilisateurService.mettreAJour(utilisateur);
            
            return ResponseEntity.ok("Mot de passe modifié avec succès");
            
        } catch (Exception e) {
            System.err.println("Erreur lors du changement de mot de passe: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Erreur lors du changement de mot de passe: " + e.getMessage());
        }
    }

    // ✅ Classe DTO pour la demande de changement de mot de passe
    public static class ChangePasswordRequest {
        private String ancienMotDePasse;
        private String nouveauMotDePasse;
        
        // Constructeurs
        public ChangePasswordRequest() {}
        
        public ChangePasswordRequest(String ancienMotDePasse, String nouveauMotDePasse) {
            this.ancienMotDePasse = ancienMotDePasse;
            this.nouveauMotDePasse = nouveauMotDePasse;
        }
        
        // Getters et Setters
        public String getAncienMotDePasse() {
            return ancienMotDePasse;
        }
        
        public void setAncienMotDePasse(String ancienMotDePasse) {
            this.ancienMotDePasse = ancienMotDePasse;
        }
        
        public String getNouveauMotDePasse() {
            return nouveauMotDePasse;
        }
        
        public void setNouveauMotDePasse(String nouveauMotDePasse) {
            this.nouveauMotDePasse = nouveauMotDePasse;
        }
    }
}