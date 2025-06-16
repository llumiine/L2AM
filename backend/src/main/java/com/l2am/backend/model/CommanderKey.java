package com.l2am.backend.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommanderKey implements Serializable {
    private Long utilisateur;
    private Long produit;
    private Long facture;
}
