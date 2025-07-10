package com.l2am.backend.security;

import com.l2am.backend.BackendApplication;
import com.l2am.backend.service.JwtService;
import io.jsonwebtoken.security.SignatureException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = BackendApplication.class)
@AutoConfigureMockMvc
public class AuthSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    private final String VALID_JWT_TOKEN =
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0OEBnbWFpbC5jb20iLCJpYXQiOjE3NTE4MjI1NDAsImV4cCI6MTc1MTkwODk0MH0.8rhRurkMCHmHkmXODT1YaXTKYkqDkCaWMuHh6uVx25M";
    private final String INVALID_JWT_TOKEN =
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAwMDAwfQ.WRONG_SIGNATURE_123456";

    @Test
    public void accessSecuredEndpoint_withValidToken_shouldBeAllowed() throws Exception {
        mockMvc.perform(get("/api/test/secure-endpoint")
                .header("Authorization", VALID_JWT_TOKEN)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void accessSecuredEndpoint_withoutToken_shouldBeUnauthorized() throws Exception {
        mockMvc.perform(get("/api/test/secure-endpoint")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void accessSecuredEndpoint_withInvalidToken_shouldThrowSignatureException() {
        assertThrows(SignatureException.class, () -> {
            mockMvc.perform(get("/api/test/secure-endpoint")
                    .header("Authorization", INVALID_JWT_TOKEN)
                    .accept(MediaType.APPLICATION_JSON));
        });
    }

    @Test
    public void accessSecuredEndpoint_withExpiredToken_shouldBeUnauthorized() throws Exception {
        String expiredToken = "Bearer " + jwtService.generateTokenWithExpiration(-3600); // 1 heure dans le passé

        mockMvc.perform(get("/api/test/secure-endpoint")
                .header("Authorization", expiredToken)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}
