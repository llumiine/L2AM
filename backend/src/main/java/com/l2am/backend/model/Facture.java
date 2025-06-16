package com.l2am.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "facture")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Facture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Facture")
    private Long id;

    @Column(name = "date_paiement")
    private LocalDateTime datePaiement;

    private Double total;
    @Column(name = "sous_total")
    private Double sousTotal;
    private Double livraison;
    private String adresse;
    private String ville;

    @Column(name = "code_postal")
    private Integer codePostal;
}
