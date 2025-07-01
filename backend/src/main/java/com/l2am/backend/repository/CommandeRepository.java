package com.l2am.backend.repository;

import com.l2am.backend.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    
    /**
     * Trouver commandes par utilisateur
     */
    List<Commande> findByIdUtilisateur(Long idUtilisateur);
    
    /**
     * Trouver commandes par produit
     */
    List<Commande> findByIdProduit(Long idProduit);
    
    /**
     * Trouver commandes par facture
     */
    List<Commande> findByIdFacture(Long idFacture);
    
    /**
     * Trouver commandes par quantité
     */
    List<Commande> findByQuantite(Integer quantite);
    
    /**
     * Trouver commandes par prix d'achat
     */
    List<Commande> findByPrixAchat(BigDecimal prixAchat);
    
    /**
     * Compter le nombre total de commandes
     */
    @Query("SELECT COUNT(c) FROM Commande c")
    Long compterCommandes();
    
    /**
     * Calculer le montant total des commandes
     */
    @Query("SELECT SUM(c.prixAchat * c.quantite) FROM Commande c")
    BigDecimal calculerMontantTotalCommandes();
    
    /**
     * Trouver les produits les plus commandés
     */
    @Query("SELECT c.idProduit, SUM(c.quantite) as total FROM Commande c GROUP BY c.idProduit ORDER BY total DESC")
    List<Object[]> findProduitsLesPlusCommandes();
}