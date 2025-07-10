package com.l2am.backend.service;

import com.l2am.backend.entity.Facture;
import com.l2am.backend.repository.FactureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FactureService {

    @Autowired
    private FactureRepository factureRepository;

    public List<Facture> getAllFactures() {
        return factureRepository.findAll();
    }

    public Optional<Facture> getFactureById(Long id) {
        return factureRepository.findById(id);
    }

    public Facture createFacture(Facture facture) {
        return factureRepository.save(facture);
    }

    public void deleteFacture(Long id) {
        factureRepository.deleteById(id);
    }

    public Facture updateFacture(Long id, Facture updatedFacture) {
        return factureRepository.findById(id).map(f -> {
            f.setDatePaiement(updatedFacture.getDatePaiement());
            f.setAdresse(updatedFacture.getAdresse());
            f.setVille(updatedFacture.getVille());
            f.setLivraison(updatedFacture.getLivraison());
            f.setSousTotal(updatedFacture.getSousTotal());
            f.setTotal(updatedFacture.getTotal());
            return factureRepository.save(f);
        }).orElseGet(() -> {
            updatedFacture.setIdFacture(id);
            return factureRepository.save(updatedFacture);
        });
    }
}
