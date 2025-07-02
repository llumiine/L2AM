package com.l2am.backend.service;

import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService implements UserDetailsService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Créer un nouvel utilisateur avec rôle USER par défaut
     */
    public Utilisateur creerUtilisateur(Utilisateur utilisateur) {
        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        if (utilisateurRepository.existsByUsername(utilisateur.getUsername())) {
            throw new RuntimeException("Username déjà utilisé");
        }

        utilisateur.setRole(0); // 0 = ROLE_USER
        utilisateur.setMdp(passwordEncoder.encode(utilisateur.getMdp()));
        return utilisateurRepository.save(utilisateur);
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
