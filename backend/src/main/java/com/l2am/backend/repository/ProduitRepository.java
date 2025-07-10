package com.l2am.backend.repository;

import com.l2am.backend.entity.Produit;
import com.l2am.backend.entity.TypeOeuvre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    
    List<Produit> findByTypeOeuvre(TypeOeuvre typeOeuvre);
    List<Produit> findByNomContainingIgnoreCase(String nom);
    List<Produit> findByStockGreaterThan(Integer stock);
    List<Produit> findByPrixBetween(BigDecimal prixMin, BigDecimal prixMax);
    
    @Query("SELECT p FROM Produit p WHERE p.nom LIKE %:terme% OR p.description LIKE %:terme%")
    List<Produit> rechercheGlobale(@Param("terme") String terme);
    
    @Query("SELECT COUNT(p) FROM Produit p WHERE p.stock > 0")
    Long compterProduitsEnStock();
}


