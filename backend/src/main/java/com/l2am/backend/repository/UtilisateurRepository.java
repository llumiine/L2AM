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
    
 
    Optional<Utilisateur> findByEmail(String email);
    
    
    Optional<Utilisateur> findByUsername(String username);
 
    boolean existsByEmail(String email);
    
   
    boolean existsByUsername(String username);
    
   
    List<Utilisateur> findByRole(Integer role);
   
    List<Utilisateur> findByVille(String ville);
    
   
    @Query("SELECT u FROM Utilisateur u WHERE LOWER(u.nom) LIKE LOWER(CONCAT('%', :motCle, '%')) OR LOWER(u.prenom) LIKE LOWER(CONCAT('%', :motCle, '%'))")
    List<Utilisateur> rechercherParNomOuPrenom(@Param("motCle") String motCle);
    
  
    @Query("SELECT COUNT(u) FROM Utilisateur u WHERE u.role = 2")
    Long compterClients();
}