package com.l2am.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.service.UtilisateurService;
import com.l2am.backend.service.JwtService;
import com.l2am.backend.dto.AuthResponse;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Utilisateur utilisateur) {
        // Encoder le mot de passe avant de le sauvegarder
        utilisateur.setMdp(passwordEncoder.encode(utilisateur.getMdp()));
        Utilisateur created = utilisateurService.creerUtilisateur(utilisateur);
        String token = jwtService.generateToken(created);
        return ResponseEntity.ok(new AuthResponse(token, created));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String mdp = credentials.get("mdp");

        Optional<Utilisateur> userOpt = utilisateurService.trouverParEmail(email);
        if (userOpt.isPresent() && passwordEncoder.matches(mdp, userOpt.get().getMdp())) {
            String token = jwtService.generateToken(userOpt.get());
            return ResponseEntity.ok(new AuthResponse(token, userOpt.get()));
        } else {
            return ResponseEntity.status(401).body("Identifiants invalides");
        }
    }
}
