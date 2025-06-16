package com.l2am.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "produit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Produit")
    private Long id;

    private String nom;
    private Double prix;
    private Integer stock;
    private String description;
    private String couleur;
    private String taille;

    @ManyToOne
    @JoinColumn(name = "type_oeuvre")
    private TypeOeuvre typeOeuvre;
}
