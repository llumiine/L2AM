package com.l2am.backend.controller;

import com.l2am.backend.model.Commander;
import com.l2am.backend.repository.CommanderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/commandes")
public class CommanderController {

    @Autowired
    private CommanderRepository commanderRepository;

    @GetMapping
    public List<Commander> getAllCommandes() {
        return commanderRepository.findAll();
    }

    @PostMapping
    public Commander addCommande(@RequestBody Commander commande) {
        return commanderRepository.save(commande);
    }

    @GetMapping("/{idUtilisateur}/{idProduit}/{idFacture}")
    public ResponseEntity<Commander> getCommande(@PathVariable Long idUtilisateur, @PathVariable Long idProduit, @PathVariable Long idFacture) {
        Optional<Commander> commander = commanderRepository.findByIds(idUtilisateur, idProduit, idFacture);
        return commander.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{idUtilisateur}/{idProduit}/{idFacture}")
    public ResponseEntity<Commander> updateCommande(@PathVariable Long idUtilisateur, @PathVariable Long idProduit, @PathVariable Long idFacture, @RequestBody Commander commande) {
        Optional<Commander> existingOpt = commanderRepository.findByIds(idUtilisateur, idProduit, idFacture);
        if (existingOpt.isPresent()) {
            Commander existing = existingOpt.get();
            existing.setQuantite(commande.getQuantite());
            existing.setPrixAchat(commande.getPrixAchat());
            return ResponseEntity.ok(commanderRepository.save(existing));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{idUtilisateur}/{idProduit}/{idFacture}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long idUtilisateur, @PathVariable Long idProduit, @PathVariable Long idFacture) {
        commanderRepository.deleteByIds(idUtilisateur, idProduit, idFacture);
        return ResponseEntity.noContent().build();
    }
}