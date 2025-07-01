package com.l2am.backend.repository.mongo;

import com.l2am.backend.entity.mongo.CommentaireMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentaireMongoRepository extends MongoRepository<CommentaireMongo, String> {
    
    /**
     * Trouver commentaires par utilisateur
     */
    List<CommentaireMongo> findByIdUtilisateur(Long idUtilisateur);
    
    /**
     * Trouver commentaires par produit
     */
    List<CommentaireMongo> findByIdProduit(Long idProduit);
    
    /**
     * Trouver commentaires par note
     */
    List<CommentaireMongo> findByNote(Integer note);
    
    /**
     * Trouver commentaires par note supérieure à
     */
    List<CommentaireMongo> findByNoteGreaterThan(Integer note);
    
    /**
     * Compter commentaires par produit
     */
    Long countByIdProduit(Long idProduit);
    
    /**
     * Recherche dans le texte du commentaire
     */
    @Query("{'commentaire': {$regex: ?0, $options: 'i'}}")
    List<CommentaireMongo> rechercherDansCommentaire(String terme);
}