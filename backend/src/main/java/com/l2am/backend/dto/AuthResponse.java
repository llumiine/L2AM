package com.l2am.backend.dto;

import com.l2am.backend.entity.Utilisateur;

public class AuthResponse {
    private String token;
    private Utilisateur utilisateur;

    public AuthResponse(String token, Utilisateur utilisateur) {
        this.token = token;
        this.utilisateur = utilisateur;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}
