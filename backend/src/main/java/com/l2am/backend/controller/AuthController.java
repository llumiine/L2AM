package com.l2am.backend.controller;

import com.l2am.backend.dto.AuthResponse;
import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.service.JwtService;
import com.l2am.backend.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Port React correct
public class AuthController {

    @Autowired
    private UtilisateurService utilisateurService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Utilisateur utilisateur) {
        if (utilisateurService.trouverParEmail(utilisateur.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(null); // Email déjà utilisé
        }

        // Hachage du mot de passe
        utilisateur.setMdp(passwordEncoder.encode(utilisateur.getMdp()));

        // Création utilisateur
        Utilisateur created = utilisateurService.creerUtilisateur(utilisateur);

        // Génération token
        String token = jwtService.generateToken(created);

        // Réponse avec token + utilisateur
        return ResponseEntity.ok(new AuthResponse(token, created));
    }
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
    String email = credentials.get("email");
    String mdp = credentials.get("mdp");

    System.out.println("Utilisateur cherché : " + email);
    Optional<Utilisateur> userOpt = utilisateurService.trouverParEmail(email);
    if (userOpt.isPresent()) {
        Utilisateur user = userOpt.get();
        System.out.println("Utilisateur trouvé : " + user.getEmail());
        System.out.println("Mot de passe envoyé : '" + mdp + "'");
        System.out.println("Mot de passe hashé stocké : " + user.getMdp());

        boolean matches = passwordEncoder.matches(mdp, user.getMdp());
        System.out.println("Mot de passe correspond ? " + matches);
        if (matches) {
            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(new AuthResponse(token, user));
        }
    }
    System.out.println("Mot de passe incorrect");
    return ResponseEntity.status(401).body("Identifiants invalides");
}


}
