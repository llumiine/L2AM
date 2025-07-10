package com.l2am.backend.service;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;
import com.l2am.backend.entity.Produit;


@SpringBootTest
public class ProduitServiceTest {

    @Autowired
    private ProduitService produitService;

    @Test
    public void testListerTous_retourneListeNonVide() {
        List<Produit> produits = produitService.listerTous();

        assertNotNull(produits, "La liste ne doit pas être null");
        assertFalse(produits.isEmpty(), "La liste ne doit pas être vide");
    }
}
