package com.l2am.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "logs")
public class Log {

    @Id
    private String id;

    private String message;
    private String user;
    private LocalDateTime date;

    public Log() {}

    public Log(String message, String user, LocalDateTime date) {
        this.message = message;
        this.user = user;
        this.date = date;
    }

    // Getters & setters
}
