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
    
    List<Facture> findByVille(String ville);
    
    List<Facture> findByCodePostal(String codePostal);
    
    List<Facture> findByTotal(BigDecimal total);
    
    List<Facture> findByTotalBetween(BigDecimal min, BigDecimal max);
    
    List<Facture> findByDatePaiement(Date datePaiement);
    
    @Query("SELECT SUM(f.total) FROM Facture f")
    BigDecimal calculerChiffreAffaires();
    
    @Query("SELECT COUNT(f) FROM Facture f")
    Long compterFactures();
    
    List<Facture> findTop5ByOrderByTotalDesc();
}