package com.l2am.backend.controller;

import com.l2am.backend.model.Commenter;
import com.l2am.backend.repository.CommenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/commentaires")
public class CommenterController {

    @Autowired
    private CommenterRepository commenterRepository;

    @GetMapping
    public List<Commenter> getAllCommentaires() {
        return commenterRepository.findAll();
    }

    @PostMapping
    public Commenter addCommentaire(@RequestBody Commenter commentaire) {
        return commenterRepository.save(commentaire);
    }

    @GetMapping("/{idUtilisateur}/{idProduit}")
    public ResponseEntity<Commenter> getCommentaire(@PathVariable Long idUtilisateur, @PathVariable Long idProduit) {
        Optional<Commenter> commenter = commenterRepository.findByIdUtilisateurAndIdProduit(idUtilisateur, idProduit);
        return commenter.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{idUtilisateur}/{idProduit}")
    public ResponseEntity<Commenter> updateCommentaire(@PathVariable Long idUtilisateur, @PathVariable Long idProduit, @RequestBody Commenter commentaire) {
        Optional<Commenter> existingOpt = commenterRepository.findByIdUtilisateurAndIdProduit(idUtilisateur, idProduit);
        if (existingOpt.isPresent()) {
            Commenter existing = existingOpt.get();
            existing.setCommentaire(commentaire.getCommentaire());
            existing.setNote(commentaire.getNote());
            return ResponseEntity.ok(commenterRepository.save(existing));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{idUtilisateur}/{idProduit}")
    public ResponseEntity<Void> deleteCommentaire(@PathVariable Long idUtilisateur, @PathVariable Long idProduit) {
        commenterRepository.deleteByIdUtilisateurAndIdProduit(idUtilisateur, idProduit);
        return ResponseEntity.noContent().build();
    }
}