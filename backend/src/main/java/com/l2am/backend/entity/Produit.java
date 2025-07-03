package com.l2am.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "produit")
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produit")
    private Long id;

    @Column(name = "nom", length = 100, nullable = false)
    private String nom;

    @Column(name = "prix", precision = 10, scale = 2, nullable = false)
    private BigDecimal prix;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "couleur", length = 50)
    private String couleur;

    @Column(name = "taille", length = 100)
    private String taille;

    @Column(name = "image", length = 100)
    private String image;

    // Changé LAZY → EAGER pour éviter les problèmes de sérialisation JSON
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_type_oeuvre", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TypeOeuvre typeOeuvre;

    public Produit() {}

    public Produit(String nom, BigDecimal prix, Integer stock, TypeOeuvre typeOeuvre) {
        this.nom = nom;
        this.prix = prix;
        this.stock = stock;
        this.typeOeuvre = typeOeuvre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public BigDecimal getPrix() {
        return prix;
    }

    public void setPrix(BigDecimal prix) {
        this.prix = prix;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCouleur() {
        return couleur;
    }

    public void setCouleur(String couleur) {
        this.couleur = couleur;
    }

    public String getTaille() {
        return taille;
    }

    public void setTaille(String taille) {
        this.taille = taille;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public TypeOeuvre getTypeOeuvre() {
        return typeOeuvre;
    }

    public void setTypeOeuvre(TypeOeuvre typeOeuvre) {
        this.typeOeuvre = typeOeuvre;
    }

    // 🎯 AJOUT CRUCIAL : Cette méthode expose l'ID du type directement en JSON
    @JsonProperty("idTypeOeuvre")
    public Long getIdTypeOeuvre() {
        return typeOeuvre != null ? typeOeuvre.getIdType() : null;
    }

    // 🎁 BONUS : Expose aussi le libellé du type pour l'affichage
    @JsonProperty("typeLibelle")
    public String getTypeLibelle() {
        return typeOeuvre != null ? typeOeuvre.getLibelle() : null;
    }
}