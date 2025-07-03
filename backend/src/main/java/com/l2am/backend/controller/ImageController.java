package com.l2am.backend.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ImageController {

    @GetMapping("/images/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
        try {
            // Chemin vers le dossier images à la racine du projet
            Path imagePath = Paths.get("images/" + filename);
            
            System.out.println("🔍 Recherche de l'image : " + imagePath.toAbsolutePath());
            
            if (!Files.exists(imagePath)) {
                System.out.println("❌ Image non trouvée : " + imagePath.toAbsolutePath());
                return ResponseEntity.notFound().build();
            }

            byte[] imageBytes = Files.readAllBytes(imagePath);
            
            // Déterminer le type de contenu
            String contentType = "image/jpeg"; // Par défaut
            String fileName = filename.toLowerCase();
            if (fileName.endsWith(".png")) {
                contentType = "image/png";
            } else if (fileName.endsWith(".gif")) {
                contentType = "image/gif";
            } else if (fileName.endsWith(".webp")) {
                contentType = "image/webp";
            }

            System.out.println("✅ Image trouvée et servie : " + filename);
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(imageBytes);
                    
        } catch (IOException e) {
            System.out.println("❌ Erreur lors de la lecture de l'image : " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    // Endpoint pour vérifier quelles images sont disponibles
    @GetMapping("/images")
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