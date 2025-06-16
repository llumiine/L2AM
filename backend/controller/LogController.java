package com.l2am.backend.controller;

import com.l2am.backend.model.Log;
import com.l2am.backend.repository.LogRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogController {

    private final LogRepository logRepository;

    public LogController(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @PostMapping
    public Log createLog(@RequestBody Log log) {
        log.setDate(LocalDateTime.now());
        return logRepository.save(log);
    }

    @GetMapping
    public List<Log> getAllLogs() {
        return logRepository.findAll();
    }
}
