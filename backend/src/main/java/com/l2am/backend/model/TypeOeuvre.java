package com.l2am.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "type_oeuvre")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TypeOeuvre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Type_Oeuvre")
    private Long id;

    private String libelle;
}
