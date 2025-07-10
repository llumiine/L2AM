package com.l2am.backend.service;

import com.l2am.backend.entity.Commande;
import com.l2am.backend.repository.CommandeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    public Optional<Commande> getCommandeById(Long id) {
        return commandeRepository.findById(id);
    }

    public Commande createCommande(Commande commande) {
        return commandeRepository.save(commande);
    }

    public void deleteCommande(Long id) {
        commandeRepository.deleteById(id);
    }

    public Commande updateCommande(Long id, Commande updatedCommande) {
        return commandeRepository.findById(id).map(c -> {
            c.setIdUtilisateur(updatedCommande.getIdUtilisateur());
            c.setIdProduit(updatedCommande.getIdProduit());
            c.setIdFacture(updatedCommande.getIdFacture());
            c.setQuantite(updatedCommande.getQuantite());
            c.setPrixAchat(updatedCommande.getPrixAchat());
            return commandeRepository.save(c);
        }).orElseGet(() -> {
            updatedCommande.setIdCommande(id);
            return commandeRepository.save(updatedCommande);
        });
    }
}
