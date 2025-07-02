package com.l2am.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "type_oeuvre")
@Data
@NoArgsConstructor
public class TypeOeuvre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type_oeuvre")  // ← CORRECTION: Votre vraie colonne s'appelle "id_type_oeuvre"
    private Long idType;

    @Column(name = "nom")
    private String nom;
    
    @Column(name = "libelle")  // ← AJOUT: Votre table a aussi une colonne "libelle"
    private String libelle;

    // Getters et setters sont générés par Lombok avec @Data
    
    // Constructeur avec paramètres utile
    public TypeOeuvre(String nom, String libelle) {
        this.nom = nom;
        this.libelle = libelle;
    }
}