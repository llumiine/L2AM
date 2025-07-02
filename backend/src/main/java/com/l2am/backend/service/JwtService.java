package com.l2am.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import com.l2am.backend.entity.Utilisateur;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    
    private static final long EXPIRATION_TIME = 864_000_000; // 10 jours
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String generateToken(Utilisateur utilisateur) {
        return Jwts.builder()
                .setSubject(utilisateur.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
