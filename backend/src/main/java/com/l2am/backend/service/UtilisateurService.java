package com.l2am.backend.service;

import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService implements UserDetailsService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    /**
     * Créer un nouvel utilisateur avec rôle USER par défaut
     * NOTE: Le mot de passe doit déjà être encodé avant d'appeler cette méthode
     */
    @Transactional
    public Utilisateur creerUtilisateur(Utilisateur utilisateur) {
        try {
            System.out.println("=== SERVICE: Début création utilisateur ===");
            System.out.println("Email : " + utilisateur.getEmail());
            System.out.println("Username : " + utilisateur.getUsernameField()); // ✅ Utilisez getUsernameField()
            System.out.println("Mot de passe hashé reçu : " + utilisateur.getMdp());

            if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
                throw new RuntimeException("Email déjà utilisé");
            }

            if (utilisateurRepository.existsByUsername(utilisateur.getUsernameField())) {
                throw new RuntimeException("Username déjà utilisé");
            }

            utilisateur.setRole(0); // 0 = ROLE_USER
            // ✅ PAS d'encodage ici - déjà fait dans le contrôleur
            
            System.out.println("Sauvegarde en cours...");
            Utilisateur saved = utilisateurRepository.save(utilisateur);
            System.out.println("✓ Utilisateur sauvegardé avec ID : " + saved.getId());
            
            // Force le flush pour s'assurer que la sauvegarde se fait
            utilisateurRepository.flush();
            System.out.println("✓ Flush exécuté");
            
            return saved;
            
        } catch (Exception e) {
            System.out.println("❌ ERREUR dans creerUtilisateur : " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * Trouver un utilisateur par email
     */
    public Optional<Utilisateur> trouverParEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    /**
     * Trouver un utilisateur par ID
     */
    public Optional<Utilisateur> trouverParId(Long id) {
        return utilisateurRepository.findById(id);
    }

    /**
     * Lister tous les utilisateurs
     */
    public List<Utilisateur> listerTous() {
        return utilisateurRepository.findAll();
    }

    /**
     * Lister les utilisateurs par rôle (0 = USER, 1 = ADMIN)
     */
    public List<Utilisateur> listerParRole(Integer role) {
        return utilisateurRepository.findByRole(role);
    }

    /**
     * Mettre à jour un utilisateur
     */
    public Utilisateur mettreAJour(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    /**
     * Supprimer un utilisateur
     */
    public void supprimer(Long id) {
        utilisateurRepository.deleteById(id);
    }

    /**
     * Rechercher par nom ou prénom
     */
    public List<Utilisateur> rechercherParNom(String terme) {
        return utilisateurRepository.rechercherParNomOuPrenom(terme);
    }

    /**
     * Compter les utilisateurs avec rôle USER
     */
    public Long compterClients() {
        return utilisateurRepository.compterClients();
    }

    /**
     * Vérifier si un utilisateur existe
     */
    public boolean existe(Long id) {
        return utilisateurRepository.existsById(id);
    }

    /**
     * Authentification : Spring Security
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return utilisateurRepository.findByEmail(email)
            .map(user -> {
                String roleName = (user.getRole() == 1) ? "ROLE_ADMIN" : "ROLE_USER";
                return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getMdp(),
                    Collections.singletonList(new SimpleGrantedAuthority(roleName))
                );
            })
            .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email : " + email));
    }
}