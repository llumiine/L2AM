package com.l2am.backend.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommenterKey implements Serializable {
    private Long utilisateur;
    private Long produit;
}
