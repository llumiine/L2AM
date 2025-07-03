package com.l2am.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Servir les images depuis le dossier /images/ du projet
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./images/")
                .setCachePeriod(3600); // Cache 1 heure
        
        // Alternative : servir depuis un dossier uploads
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:./uploads/")
                .setCachePeriod(3600);
        
        // Alternative : servir depuis les resources
        registry.addResourceHandler("/static/images/**")
                .addResourceLocations("classpath:/static/images/")
                .setCachePeriod(3600);
    }
}