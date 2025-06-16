package com.l2am.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "commenter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(CommenterKey.class)
public class Commenter {

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_Utilisateur")
    private Utilisateur utilisateur;

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_Produit")
    private Produit produit;

    private String commentaire;
    private Integer note;
}
