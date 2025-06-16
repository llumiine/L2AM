package com.l2am.backend.repository;

import com.l2am.backend.model.Log;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LogRepository extends MongoRepository<Log, String> {
}
@Document(collection = "logs")
public class Log {
    @Id private String id;
    // autres champs...
}
