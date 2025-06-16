package com.l2am.backend.repository;

import com.l2am.backend.model.Commander;
import com.l2am.backend.model.CommanderKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CommanderRepository extends JpaRepository<Commander, CommanderKey> {
    
    // CHANGEZ int en Long ici aussi !
    @Query("SELECT c FROM Commander c WHERE c.utilisateur.id = :idUtilisateur AND c.produit.id = :idProduit AND c.facture.id = :idFacture")
    Optional<Commander> findByIds(@Param("idUtilisateur") Long idUtilisateur, 
                                  @Param("idProduit") Long idProduit, 
                                  @Param("idFacture") Long idFacture);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Commander c WHERE c.utilisateur.id = :idUtilisateur AND c.produit.id = :idProduit AND c.facture.id = :idFacture")
    void deleteByIds(@Param("idUtilisateur") Long idUtilisateur, 
                     @Param("idProduit") Long idProduit, 
                     @Param("idFacture") Long idFacture);
}