package com.l2am.backend.security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/test")
public class TestSecuredController {

    @GetMapping("/secure-endpoint")
    @PreAuthorize("isAuthenticated()")  
    public ResponseEntity<String> getSecureData() {
        return ResponseEntity.ok("Accès autorisé !");
    }
}
