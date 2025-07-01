package com.l2am.backend.service.mongo;

import com.l2am.backend.entity.mongo.CommentaireMongo;
import com.l2am.backend.repository.mongo.CommentaireMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentaireMongoService {

    @Autowired
    private CommentaireMongoRepository commentaireMongoRepository;

    public List<CommentaireMongo> getAllCommentaires() {
        return commentaireMongoRepository.findAll();
    }

    public Optional<CommentaireMongo> getCommentaireById(String id) {
        return commentaireMongoRepository.findById(id);
    }

    public CommentaireMongo createCommentaire(CommentaireMongo commentaire) {
        return commentaireMongoRepository.save(commentaire);
    }

    public void deleteCommentaire(String id) {
        commentaireMongoRepository.deleteById(id);
    }

    public CommentaireMongo updateCommentaire(String id, CommentaireMongo updatedCommentaire) {
        return commentaireMongoRepository.findById(id).map(c -> {
            return commentaireMongoRepository.save(c);
        }).orElseGet(() -> {
            updatedCommentaire.setId(id);
            return commentaireMongoRepository.save(updatedCommentaire);
        });
    }
}
