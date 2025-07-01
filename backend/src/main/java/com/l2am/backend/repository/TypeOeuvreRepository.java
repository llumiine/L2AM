package com.l2am.backend.repository;

import com.l2am.backend.entity.TypeOeuvre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface TypeOeuvreRepository extends JpaRepository<TypeOeuvre, Long> {
    
    /**
     * Trouver un type d'œuvre par libellé
     */
    Optional<TypeOeuvre> findByLibelle(String libelle);
    
    /**
     * Vérifier si un libellé existe déjà
     */
    boolean existsByLibelle(String libelle);
    
    /**
     * Chercher par libellé (contient le terme)
     */
    List<TypeOeuvre> findByLibelleContainingIgnoreCase(String terme);
    
    /**
     * Compter le nombre de types d'œuvres
     */
    @Query("SELECT COUNT(t) FROM TypeOeuvre t")
    Long compterTypesOeuvres();
    
    /**
     * Trouver tous les types triés par libellé
     */
    List<TypeOeuvre> findAllByOrderByLibelleAsc();
}