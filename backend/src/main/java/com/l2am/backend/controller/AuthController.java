package com.l2am.backend.controller;

import com.l2am.backend.dto.AuthResponse;
import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.service.JwtService;
import com.l2am.backend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@RequestBody Utilisateur utilisateur) {
        try {
            if (utilisateurService.trouverParEmail(utilisateur.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email déjà utilisé");
            }

            utilisateur.setMdp(passwordEncoder.encode(utilisateur.getMdp()));

            Utilisateur created = utilisateurService.creerUtilisateur(utilisateur);

            String token = jwtService.generateToken(created);

            return ResponseEntity.ok(new AuthResponse(token, created));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'inscription");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String mdp = credentials.get("mdp");
        if (email == null || mdp == null) {
            return ResponseEntity.status(400).body("Email et mot de passe requis");
        }
        try {
            Optional<Utilisateur> userOpt = utilisateurService.trouverParEmail(email);
            if (userOpt.isPresent()) {
                Utilisateur user = userOpt.get();
                if (passwordEncoder.matches(mdp, user.getMdp())) {
                    String token = jwtService.generateToken(user);
                    return ResponseEntity.ok(new AuthResponse(token, user));
                }
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur serveur");
        }
        return ResponseEntity.status(401).body("Identifiants invalides");
    }
}