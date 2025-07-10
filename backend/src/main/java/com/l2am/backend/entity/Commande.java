package com.l2am.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "commande")
public class Commande {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_commande")
    private Long idCommande;
    
    @Column(name = "id_utilisateur")
    private Long idUtilisateur;
    
    @Column(name = "id_produit")
    private Long idProduit;
    
    @Column(name = "id_facture")
    private Long idFacture;
    
    @Column(name = "quantite")
    private Integer quantite;
    
    @Column(name = "prix_achat", precision = 10, scale = 2)
    private BigDecimal prixAchat;
    
    public Commande() {}
    public Commande(Long idUtilisateur, Long idProduit, Long idFacture, Integer quantite, BigDecimal prixAchat) {
        this.idUtilisateur = idUtilisateur;
        this.idProduit = idProduit;
        this.idFacture = idFacture;
        this.quantite = quantite;
        this.prixAchat = prixAchat;
    }
    public Long getIdCommande() { return idCommande; }
    public void setIdCommande(Long idCommande) { this.idCommande = idCommande; }
    
    public Long getIdUtilisateur() { return idUtilisateur; }
    public void setIdUtilisateur(Long idUtilisateur) { this.idUtilisateur = idUtilisateur; }
    
    public Long getIdProduit() { return idProduit; }
    public void setIdProduit(Long idProduit) { this.idProduit = idProduit; }
    
    public Long getIdFacture() { return idFacture; }
    public void setIdFacture(Long idFacture) { this.idFacture = idFacture; }
    
    public Integer getQuantite() { return quantite; }
    public void setQuantite(Integer quantite) { this.quantite = quantite; }
    
    public BigDecimal getPrixAchat() { return prixAchat; }
    public void setPrixAchat(BigDecimal prixAchat) { this.prixAchat = prixAchat; }
}