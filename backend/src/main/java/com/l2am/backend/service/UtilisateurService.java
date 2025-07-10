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


    @Transactional
    public Utilisateur creerUtilisateur(Utilisateur utilisateur) {
        try {
            System.out.println("=== SERVICE: Début création utilisateur ===");
            System.out.println("Email : " + utilisateur.getEmail());
            System.out.println("Username : " + utilisateur.getUsernameField()); 
            System.out.println("Mot de passe hashé reçu : " + utilisateur.getMdp());

            if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
                throw new RuntimeException("Email déjà utilisé");
            }

            if (utilisateurRepository.existsByUsername(utilisateur.getUsernameField())) {
                throw new RuntimeException("Username déjà utilisé");
            }

            utilisateur.setRole(0); 
            
            System.out.println("Sauvegarde en cours...");
            Utilisateur saved = utilisateurRepository.save(utilisateur);
            System.out.println("✓ Utilisateur sauvegardé avec ID : " + saved.getId());
            
            utilisateurRepository.flush();
            System.out.println("✓ Flush exécuté");
            
            return saved;
            
        } catch (Exception e) {
            System.out.println("❌ ERREUR dans creerUtilisateur : " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }


    public Optional<Utilisateur> trouverParEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    public Optional<Utilisateur> trouverParId(Long id) {
        return utilisateurRepository.findById(id);
    }

    public List<Utilisateur> listerTous() {
        return utilisateurRepository.findAll();
    }

    public List<Utilisateur> listerParRole(Integer role) {
        return utilisateurRepository.findByRole(role);
    }

    public Utilisateur mettreAJour(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

  
    public void supprimer(Long id) {
        utilisateurRepository.deleteById(id);
    }

   
    public List<Utilisateur> rechercherParNom(String terme) {
        return utilisateurRepository.rechercherParNomOuPrenom(terme);
    }

   
    public Long compterClients() {
        return utilisateurRepository.compterClients();
    }

    public boolean existe(Long id) {
        return utilisateurRepository.existsById(id);
    }


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