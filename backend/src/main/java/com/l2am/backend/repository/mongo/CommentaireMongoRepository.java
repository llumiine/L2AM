package com.l2am.backend.repository.mongo;

import com.l2am.backend.entity.mongo.CommentaireMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentaireMongoRepository extends MongoRepository<CommentaireMongo, String> {
      List<CommentaireMongo> findByIdUtilisateur(Long idUtilisateur);
    
    List<CommentaireMongo> findByIdProduit(Long idProduit);
    
    List<CommentaireMongo> findByNote(Integer note);
    
    List<CommentaireMongo> findByNoteGreaterThan(Integer note);
    
    Long countByIdProduit(Long idProduit);
    @Query("{'commentaire': {$regex: ?0, $options: 'i'}}")
    List<CommentaireMongo> rechercherDansCommentaire(String terme);
}