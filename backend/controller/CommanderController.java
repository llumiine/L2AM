package com.l2am.backend.controller;

import com.l2am.backend.model.Commander;
import com.l2am.backend.repository.CommanderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public Commander getCommande(@PathVariable int idUtilisateur, @PathVariable int idProduit, @PathVariable int idFacture) {
        return commanderRepository.findByIds(idUtilisateur, idProduit, idFacture);
    }

    @PutMapping("/{idUtilisateur}/{idProduit}/{idFacture}")
    public Commander updateCommande(@PathVariable int idUtilisateur, @PathVariable int idProduit, @PathVariable int idFacture, @RequestBody Commander commande) {
        Commander existing = commanderRepository.findByIds(idUtilisateur, idProduit, idFacture);
        existing.setQuantite(commande.getQuantite());
        existing.setPrixAchat(commande.getPrixAchat());
        return commanderRepository.save(existing);
    }

    @DeleteMapping("/{idUtilisateur}/{idProduit}/{idFacture}")
    public void deleteCommande(@PathVariable int idUtilisateur, @PathVariable int idProduit, @PathVariable int idFacture) {
        commanderRepository.deleteByIds(idUtilisateur, idProduit, idFacture);
    }
}
