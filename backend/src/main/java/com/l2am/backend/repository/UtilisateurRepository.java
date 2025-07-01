package com.l2am.backend.repository;

import com.l2am.backend.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    
    // Méthodes automatiques héritées de JpaRepository :
    // save(), findAll(), findById(), deleteById(), etc.
    
    // Méthodes personnalisées pour votre e-commerce :
    
    /**
     * Trouver un utilisateur par email (pour la connexion)
     */
    Optional<Utilisateur> findByEmail(String email);
    
    /**
     * Trouver un utilisateur par username
     */
    Optional<Utilisateur> findByUsername(String username);
    
    /**
     * Vérifier si un email existe déjà (pour l'inscription)
     */
    boolean existsByEmail(String email);
    
    /**
     * Vérifier si un username existe déjà
     */
    boolean existsByUsername(String username);
    
    /**
     * Trouver tous les utilisateurs par rôle (0 = client, 1 = admin)
     */
    List<Utilisateur> findByRole(Integer role);
    
    /**
     * Trouver utilisateurs par ville (pour les statistiques)
     */
    List<Utilisateur> findByVille(String ville);
    
    /**
     * Requête personnalisée : chercher par nom ou prénom
     */
    @Query("SELECT u FROM Utilisateur u WHERE u.nom LIKE %:terme% OR u.prenom LIKE %:terme%")
    List<Utilisateur> rechercherParNomOuPrenom(@Param("terme") String terme);
    
    /**
     * Compter le nombre de clients (role = 0)
     */
    @Query("SELECT COUNT(u) FROM Utilisateur u WHERE u.role = 0")
    Long compterClients();
}