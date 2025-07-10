package com.l2am.backend.controller.mongo;

import com.l2am.backend.entity.mongo.CommentaireMongo;
import com.l2am.backend.entity.Utilisateur;
import com.l2am.backend.service.mongo.CommentaireMongoService;
import com.l2am.backend.service.UtilisateurService;
import com.l2am.backend.dto.CommentaireAvecUtilisateurDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/commentaires")
@CrossOrigin("*")
public class CommentaireMongoController {

    private final CommentaireMongoService commentaireMongoService;
    private final UtilisateurService utilisateurService;

    @Autowired
    public CommentaireMongoController(CommentaireMongoService commentaireMongoService, 
                                    UtilisateurService utilisateurService) {
        this.commentaireMongoService = commentaireMongoService;
        this.utilisateurService = utilisateurService;
    }

    @GetMapping
    public List<CommentaireMongo> getAllCommentaires() {
        return commentaireMongoService.getAllCommentaires();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentaireMongo> getCommentaireById(@PathVariable String id) {
        return commentaireMongoService.getCommentaireById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CommentaireMongo> createCommentaire(@RequestBody CommentaireMongo commentaire) {
        return ResponseEntity.ok(commentaireMongoService.createCommentaire(commentaire));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentaireMongo> updateCommentaire(@PathVariable String id, 
                                                            @RequestBody CommentaireMongo commentaire) {
        return ResponseEntity.ok(commentaireMongoService.updateCommentaire(id, commentaire));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommentaire(@PathVariable String id) {
        commentaireMongoService.deleteCommentaire(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/utilisateur/{idUtilisateur}")
    public List<CommentaireMongo> getCommentairesByUtilisateur(@PathVariable Long idUtilisateur) {
        return commentaireMongoService.getCommentairesByUtilisateur(idUtilisateur);
    }

    @GetMapping("/produit/{idProduit}")
    public List<CommentaireMongo> getCommentairesByProduit(@PathVariable Long idProduit) {
        return commentaireMongoService.getCommentairesByProduit(idProduit);
    }

    @GetMapping("/note/{note}")
    public List<CommentaireMongo> getCommentairesByNote(@PathVariable Integer note) {
        return commentaireMongoService.getCommentairesByNote(note);
    }

    @GetMapping("/note/superieure/{note}")
    public List<CommentaireMongo> getCommentairesByNoteSup(@PathVariable Integer note) {
        return commentaireMongoService.getCommentairesByNoteSuperieure(note);
    }

    @GetMapping("/search")
    public List<CommentaireMongo> searchCommentaires(@RequestParam String q) {
        return commentaireMongoService.rechercherDansCommentaire(q);
    }

    @GetMapping("/produit/{idProduit}/count")
    public Long countCommentairesByProduit(@PathVariable Long idProduit) {
        return commentaireMongoService.countCommentairesByProduit(idProduit);
    }

    @GetMapping("/avec-utilisateur")
    public ResponseEntity<List<CommentaireAvecUtilisateurDto>> getCommentairesAvecUtilisateur() {
        List<CommentaireMongo> commentaires = commentaireMongoService.getAllCommentaires();
        List<CommentaireAvecUtilisateurDto> dtos = commentaires.stream()
            .map(this::convertToDto)
            .toList();
        return ResponseEntity.ok(dtos);
    }

    private CommentaireAvecUtilisateurDto convertToDto(CommentaireMongo commentaire) {
        try {
            Optional<Utilisateur> optionalUser = utilisateurService.trouverParId(commentaire.getIdUtilisateur());
            String nom = optionalUser.map(Utilisateur::getNom).orElse("Utilisateur introuvable");
            String prenom = optionalUser.map(Utilisateur::getPrenom).orElse("");

            CommentaireAvecUtilisateurDto dto = new CommentaireAvecUtilisateurDto();
            dto.setId(commentaire.getId());
            dto.setIdUtilisateur(commentaire.getIdUtilisateur());
            dto.setIdProduit(commentaire.getIdProduit());
            dto.setCommentaire(commentaire.getCommentaire());
            dto.setNote(commentaire.getNote());
            dto.setDateCreation(commentaire.getDateCreation());
            dto.setNomUtilisateur(nom);
            dto.setPrenomUtilisateur(prenom);
            
            return dto;

        } catch (Exception e) {
            CommentaireAvecUtilisateurDto dto = new CommentaireAvecUtilisateurDto();
            dto.setId(commentaire.getId());
            dto.setIdUtilisateur(commentaire.getIdUtilisateur());
            dto.setIdProduit(commentaire.getIdProduit());
            dto.setCommentaire(commentaire.getCommentaire());
            dto.setNote(commentaire.getNote());
            dto.setDateCreation(commentaire.getDateCreation());
            dto.setNomUtilisateur("Erreur");
            dto.setPrenomUtilisateur("Erreur");
            
            return dto;
        }
    }
}
