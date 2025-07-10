package com.l2am.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "facture")
public class Facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_facture")
    private Long idFacture;
    
    @Column(name = "date_paiement")
    @Temporal(TemporalType.TIMESTAMP)
    private Date datePaiement;
    
    @Column(name = "total", precision = 10, scale = 2)
    private BigDecimal total;
    
    @Column(name = "sous_total", length = 50)
    private String sousTotal;
    
    @Column(name = "livraison", precision = 10, scale = 2)
    private BigDecimal livraison;
    
    @Column(name = "adresse", length = 50)
    private String adresse;
    
    @Column(name = "ville", length = 50)
    private String ville;
    
    @Column(name = "code_postal", length = 50)
    private String codePostal;
    
    public Facture() {}
    public Facture(Date datePaiement, BigDecimal total) {
        this.datePaiement = datePaiement;
        this.total = total;
    }
    public Long getIdFacture() { return idFacture; }
    public void setIdFacture(Long idFacture) { this.idFacture = idFacture; }
    
    public Date getDatePaiement() { return datePaiement; }
    public void setDatePaiement(Date datePaiement) { this.datePaiement = datePaiement; }
    
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
    
    public String getSousTotal() { return sousTotal; }
    public void setSousTotal(String sousTotal) { this.sousTotal = sousTotal; }
    
    public BigDecimal getLivraison() { return livraison; }
    public void setLivraison(BigDecimal livraison) { this.livraison = livraison; }
    
    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }
    
    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }
    
    public String getCodePostal() { return codePostal; }
    public void setCodePostal(String codePostal) { this.codePostal = codePostal; }
}