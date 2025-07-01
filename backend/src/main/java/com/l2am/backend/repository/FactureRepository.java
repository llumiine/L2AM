package com.l2am.backend.repository;

import com.l2am.backend.entity.Facture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {
    
    /**
     * Trouver factures par ville de livraison
     */
    List<Facture> findByVille(String ville);
    
    /**
     * Trouver factures par code postal
     */
    List<Facture> findByCodePostal(String codePostal);
    
    /**
     * Trouver factures par montant total
     */
    List<Facture> findByTotal(BigDecimal total);
    
    /**
     * Trouver factures par gamme de montant
     */
    List<Facture> findByTotalBetween(BigDecimal min, BigDecimal max);
    
    /**
     * Trouver factures par date de paiement
     */
    List<Facture> findByDatePaiement(Date datePaiement);
    
    /**
     * Calculer le chiffre d'affaires total
     */
    @Query("SELECT SUM(f.total) FROM Facture f")
    BigDecimal calculerChiffreAffaires();
    
    /**
     * Compter le nombre de factures
     */
    @Query("SELECT COUNT(f) FROM Facture f")
    Long compterFactures();
    
    /**
     * Trouver les 5 plus grosses factures
     */
    List<Facture> findTop5ByOrderByTotalDesc();
}