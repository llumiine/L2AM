package com.l2am.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Désactive complètement CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()   // Autorise toutes les requêtes
            )
            .httpBasic(httpBasic -> httpBasic.disable())  // Désactive l'authentification de base
            .formLogin(form -> form.disable())  // Désactive le formulaire de connexion
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        
        return http.build();
    }
}