package com.l2am.backend.controller.mongo;

import com.l2am.backend.entity.mongo.CommentaireMongo;
import com.l2am.backend.service.mongo.CommentaireMongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.l2am.backend.dto.CommentaireAvecUtilisateurDto;
import com.l2am.backend.service.UtilisateurService;
import com.l2am.backend.entity.Utilisateur;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/commentaires")
@CrossOrigin("*")
public class CommentaireMongoController {

    @Autowired
    private CommentaireMongoService commentaireMongoService;

    @GetMapping
    public List<CommentaireMongo> getAllCommentaires() {
        return commentaireMongoService.getAllCommentaires();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentaireMongo> getCommentaireById(@PathVariable String id) {
        Optional<CommentaireMongo> commentaire = commentaireMongoService.getCommentaireById(id);
        return commentaire.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CommentaireMongo> createCommentaire(@RequestBody CommentaireMongo commentaire) {
        CommentaireMongo created = commentaireMongoService.createCommentaire(commentaire);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentaireMongo> updateCommentaire(@PathVariable String id, @RequestBody CommentaireMongo commentaire) {
        CommentaireMongo updated = commentaireMongoService.updateCommentaire(id, commentaire);
        return ResponseEntity.ok(updated);
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
    @Autowired
private UtilisateurService utilisateurService;
@GetMapping("/test-utilisateur/{id}")
public ResponseEntity<String> testUtilisateur(@PathVariable Long id) {
    System.out.println("=== TEST UTILISATEUR ID: " + id + " ===");
    
    if (utilisateurService == null) {
        return ResponseEntity.ok("ERREUR: utilisateurService est NULL");
    }
    
    try {
        Optional<Utilisateur> user = utilisateurService.trouverParId(id);
        if (user.isPresent()) {
            Utilisateur u = user.get();
            String result = "Utilisateur trouvé: " + u.getNom() + " " + u.getPrenom() + " (ID: " + u.getId() + ")";
            System.out.println(result);
            return ResponseEntity.ok(result);
        } else {
            String result = "Aucun utilisateur trouvé pour l'ID: " + id;
            System.out.println(result);
            return ResponseEntity.ok(result);
        }
    } catch (Exception e) {
        String error = "Erreur: " + e.getMessage();
        System.err.println(error);
        e.printStackTrace();
        return ResponseEntity.ok(error);
    }
}
@GetMapping("/avec-utilisateur")
public ResponseEntity<List<CommentaireAvecUtilisateurDto>> getCommentairesAvecUtilisateur() {
    System.out.println("=== DEBUT DEBUG getCommentairesAvecUtilisateur ===");
    
    List<CommentaireMongo> commentaires = commentaireMongoService.getAllCommentaires();
    System.out.println("Nombre de commentaires trouvés: " + commentaires.size());

    List<CommentaireAvecUtilisateurDto> dtos = commentaires.stream().map(commentaire -> {
        System.out.println("\n--- Traitement commentaire ID: " + commentaire.getId() + " ---");
        System.out.println("ID Utilisateur: " + commentaire.getIdUtilisateur());
        
        try {
            Optional<Utilisateur> optionalUser = utilisateurService.trouverParId(commentaire.getIdUtilisateur());
            System.out.println("Recherche utilisateur - Optional présent: " + optionalUser.isPresent());
            
            Utilisateur u = optionalUser.orElse(null);
            if (u != null) {
                System.out.println("Utilisateur trouvé: " + u.getNom() + " " + u.getPrenom());
            } else {
                System.out.println("Aucun utilisateur trouvé pour l'ID: " + commentaire.getIdUtilisateur());
            }
            
            String nom = (u != null) ? u.getNom() : "Utilisateur introuvable";
            String prenom = (u != null) ? u.getPrenom() : "";
            
            System.out.println("Nom final: '" + nom + "', Prenom final: '" + prenom + "'");
            
            CommentaireAvecUtilisateurDto dto = new CommentaireAvecUtilisateurDto(
                commentaire.getId(),
                commentaire.getIdUtilisateur(),
                commentaire.getIdProduit(),
                commentaire.getCommentaire(),
                commentaire.getNote(),
                commentaire.getDateCreation(),
                nom,
                prenom
            );
            
            System.out.println("DTO créé - Nom: " + dto.getNomUtilisateur() + ", Prenom: " + dto.getPrenomUtilisateur());
            return dto;
            
        } catch (Exception e) {
            System.err.println("ERREUR lors de la recherche utilisateur: " + e.getMessage());
            e.printStackTrace();
            return new CommentaireAvecUtilisateurDto(
                commentaire.getId(),
                commentaire.getIdUtilisateur(),
                commentaire.getIdProduit(),
                commentaire.getCommentaire(),
                commentaire.getNote(),
                commentaire.getDateCreation(),
                "Erreur",
                "Erreur"
            );
        }
    }).toList();

    System.out.println("\n=== FIN DEBUG - Nombre de DTOs créés: " + dtos.size() + " ===");
    return ResponseEntity.ok(dtos);
}

}
