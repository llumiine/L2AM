package com.l2am.backend.repository;

import com.l2am.backend.model.Commenter;
import com.l2am.backend.model.CommenterKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommenterRepository extends JpaRepository<Commenter, CommenterKey> {
}
