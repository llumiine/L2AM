package com.l2am.backend.repository;

import com.l2am.backend.model.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FactureRepository extends JpaRepository<Facture, Long> {
}
