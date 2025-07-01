package com.l2am.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "type_oeuvre")
public class TypeOeuvre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type_oeuvre")
    private Long idTypeOeuvre;
    
    @Column(name = "libelle", length = 100, nullable = false)
    private String libelle;
    
    // Constructeur vide
    public TypeOeuvre() {}
    
    // Constructeur avec libelle
    public TypeOeuvre(String libelle) {
        this.libelle = libelle;
    }
    
    // Getters et Setters
    public Long getIdTypeOeuvre() { return idTypeOeuvre; }
    public void setIdTypeOeuvre(Long idTypeOeuvre) { this.idTypeOeuvre = idTypeOeuvre; }
    
    public String getLibelle() { return libelle; }
    public void setLibelle(String libelle) { this.libelle = libelle; }
}