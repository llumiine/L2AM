package com.l2am.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "commander")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@IdClass(CommanderKey.class)
public class Commander {

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_Utilisateur")
    private Utilisateur utilisateur;

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_Produit")
    private Produit produit;

    @Id
    @ManyToOne
    @JoinColumn(name = "Id_Facture")
    private Facture facture;

    private Integer quantite;

    @Column(name = "prix_achat")
    private Double prixAchat;
}
