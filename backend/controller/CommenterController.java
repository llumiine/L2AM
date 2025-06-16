package com.l2am.backend.controller;

import com.l2am.backend.model.Commenter;
import com.l2am.backend.repository.CommenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Commenter getCommentaire(@PathVariable int idUtilisateur, @PathVariable int idProduit) {
        return commenterRepository.findByIdUtilisateurAndIdProduit(idUtilisateur, idProduit);
    }

    @PutMapping("/{idUtilisateur}/{idProduit}")
    public Commenter updateCommentaire(@PathVariable int idUtilisateur, @PathVariable int idProduit, @RequestBody Commenter commentaire) {
        Commenter existing = commenterRepository.findByIdUtilisateurAndIdProduit(idUtilisateur, idProduit);
        existing.setCommentaire(commentaire.getCommentaire());
        existing.setNote(commentaire.getNote());
        return commenterRepository.save(existing);
    }

    @DeleteMapping("/{idUtilisateur}/{idProduit}")
    public void deleteCommentaire(@PathVariable int idUtilisateur, @PathVariable int idProduit) {
        commenterRepository.deleteByIdUtilisateurAndIdProduit(idUtilisateur, idProduit);
    }
}
