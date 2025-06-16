package com.l2am.backend.repository;

import com.l2am.backend.model.Commenter;
import com.l2am.backend.model.CommenterKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CommenterRepository extends JpaRepository<Commenter, CommenterKey> {
    
    // CHANGEZ int en Long ici aussi !
    @Query("SELECT c FROM Commenter c WHERE c.utilisateur.id = :idUtilisateur AND c.produit.id = :idProduit")
    Optional<Commenter> findByIdUtilisateurAndIdProduit(@Param("idUtilisateur") Long idUtilisateur, 
                                                         @Param("idProduit") Long idProduit);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Commenter c WHERE c.utilisateur.id = :idUtilisateur AND c.produit.id = :idProduit")
    void deleteByIdUtilisateurAndIdProduit(@Param("idUtilisateur") Long idUtilisateur, 
                                           @Param("idProduit") Long idProduit);
}