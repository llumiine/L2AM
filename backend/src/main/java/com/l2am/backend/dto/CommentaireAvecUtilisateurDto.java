package com.l2am.backend.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CommentaireAvecUtilisateurDto {
    private String id;
    private Long idUtilisateur;
    private Long idProduit;
    private String commentaire;
    private Integer note;
    private Date dateCreation;
    private String nomUtilisateur;
    private String prenomUtilisateur;

    public CommentaireAvecUtilisateurDto() {}

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

    @JsonProperty("nomUtilisateur")
    public String getNomUtilisateur() { return nomUtilisateur; }
    public void setNomUtilisateur(String nomUtilisateur) { this.nomUtilisateur = nomUtilisateur; }

    @JsonProperty("prenomUtilisateur")
    public String getPrenomUtilisateur() { return prenomUtilisateur; }
    public void setPrenomUtilisateur(String prenomUtilisateur) { this.prenomUtilisateur = prenomUtilisateur; }
}