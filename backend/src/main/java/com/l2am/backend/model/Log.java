package com.l2am.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

import java.time.LocalDateTime;

@Document(collection = "logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Log {
    
    @Id
    private String id;
    
    private String message;
    private String level;
    private LocalDateTime date;
}