package com.l2am.backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/images")
public class ImageController {

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path imagePath = Paths.get(System.getProperty("user.dir"), "images", filename);
            Resource resource = new UrlResource(imagePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                String contentType = Files.probeContentType(imagePath);
                if (contentType == null) contentType = "application/octet-stream";
                
                return ResponseEntity.ok()
                                     .contentType(MediaType.parseMediaType(contentType))
                                     .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // Endpoint pour vérifier quelles images sont disponibles
    @GetMapping
    public ResponseEntity<String> listImages() {
        try {
            Path imagesDir = Paths.get("images");
            System.out.println("📁 Dossier images : " + imagesDir.toAbsolutePath());
            
            if (!Files.exists(imagesDir)) {
                return ResponseEntity.ok("❌ Le dossier 'images' n'existe pas à : " + imagesDir.toAbsolutePath());
            }
            
            StringBuilder result = new StringBuilder("📁 Images disponibles :\n");
            Files.list(imagesDir)
                 .filter(Files::isRegularFile)
                 .forEach(file -> result.append("✅ ").append(file.getFileName()).append("\n"));
            
            if (result.length() == "📁 Images disponibles :\n".length()) {
                result.append("❌ Aucune image trouvée dans le dossier");
            }
            
            return ResponseEntity.ok(result.toString());
            
        } catch (IOException e) {
            return ResponseEntity.ok("❌ Erreur : " + e.getMessage());
        }
    }
}