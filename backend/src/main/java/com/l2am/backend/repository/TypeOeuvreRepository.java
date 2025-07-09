package com.l2am.backend.repository;

import com.l2am.backend.entity.TypeOeuvre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeOeuvreRepository extends JpaRepository<TypeOeuvre, Long> {
    TypeOeuvre findByLibelle(String libelle);
}