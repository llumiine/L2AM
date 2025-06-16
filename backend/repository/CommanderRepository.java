package com.l2am.backend.repository;

import com.l2am.backend.model.Commander;
import com.l2am.backend.model.CommanderKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommanderRepository extends JpaRepository<Commander, CommanderKey> {
}
