package com.l2am.backend.repository;

import com.l2am.backend.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    
    List<Commande> findByIdUtilisateur(Long idUtilisateur);
    
    List<Commande> findByIdProduit(Long idProduit);
    
    List<Commande> findByIdFacture(Long idFacture);
    
    List<Commande> findByQuantite(Integer quantite);
    
    List<Commande> findByPrixAchat(BigDecimal prixAchat);
    
    @Query("SELECT COUNT(c) FROM Commande c")
    Long compterCommandes();
    
    @Query("SELECT SUM(c.prixAchat * c.quantite) FROM Commande c")
    BigDecimal calculerMontantTotalCommandes();
    
    @Query("SELECT c.idProduit, SUM(c.quantite) as total FROM Commande c GROUP BY c.idProduit ORDER BY total DESC")
    List<Object[]> findProduitsLesPlusCommandes();
}