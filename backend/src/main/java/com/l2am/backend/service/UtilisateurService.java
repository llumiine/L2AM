package com.l2am.backend.service;

import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {
    
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    
    /**
     * Créer un nouvel utilisateur
     */
    public Utilisateur creerUtilisateur(Utilisateur utilisateur) {
        // Vérifier si l'email existe déjà
        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }
        
        // Vérifier si le username existe déjà
        if (utilisateurRepository.existsByUsername(utilisateur.getUsername())) {
            throw new RuntimeException("Username déjà utilisé");
        }
        
        return utilisateurRepository.save(utilisateur);
    }
    
    /**
     * Trouver utilisateur par email (pour connexion)
     */
    public Optional<Utilisateur> trouverParEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }
    
    /**
     * Trouver utilisateur par ID
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
     * Lister utilisateurs par rôle (0 = client, 1 = admin)
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
     * Compter le nombre de clients
     */
    public Long compterClients() {
        return utilisateurRepository.compterClients();
    }
    
    /**
     * Rechercher utilisateurs par nom ou prénom
     */
    public List<Utilisateur> rechercherParNom(String terme) {
        return utilisateurRepository.rechercherParNomOuPrenom(terme);
    }
    
    /**
     * Vérifier si un utilisateur existe
     */
    public boolean existe(Long id) {
        return utilisateurRepository.existsById(id);
    }
}