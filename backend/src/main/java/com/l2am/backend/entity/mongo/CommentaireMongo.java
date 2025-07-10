package com.l2am.backend.entity.mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;

@Document(collection = "commentaires")
public class CommentaireMongo {
    
    @Id
    private String id;
    
    @Field("id_utilisateur")
    private Long idUtilisateur;
    
    @Field("id_produit")
    private Long idProduit;
    
    @Field("commentaire")
    private String commentaire;
    
    @Field("note")
    private Integer note; 
    
    @Field("date_creation")
    private Date dateCreation;
    
    public CommentaireMongo() {}
    
    public CommentaireMongo(Long idUtilisateur, Long idProduit, String commentaire, Integer note) {
        this.idUtilisateur = idUtilisateur;
        this.idProduit = idProduit;
        this.commentaire = commentaire;
        this.note = note;
        this.dateCreation = new Date();
    }
    
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public Long getIdUtilisateur() { return idUtilisateur; }
    public void setIdUtilisateur(Long idUtilisateur) { this.idUtilisateur = idUtilisateur; }
    
    public Long getIdProduit() { return idProduit; }
    public void setIdProduit(Long idProduit) { this.idProduit = idProduit; }
    
    public String getCommentaire() { return commentaire; }
    public void setCommentaire(String commentaire) { this.commentaire = commentaire; }
    
    public Integer getNote() { return note; }
    public void setNote(Integer note) { this.note = note; }
    
    public Date getDateCreation() { return dateCreation; }
    public void setDateCreation(Date dateCreation) { this.dateCreation = dateCreation; }
}