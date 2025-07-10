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
    @Column(name = "id_type_oeuvre")
    private Long idType;

  
    
    @Column(name = "libelle")
    private String libelle;

} 