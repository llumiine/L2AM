package com.l2am.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "utilisateur")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Utilisateur")
    private Long id;

    private String prenom;
    private String nom;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String mdp;

    private String username;
    private String pp;
    private String role;
    private String adresse;
    private String ville;

    @Column(name = "code_postal")
    private String codePostal;
}
