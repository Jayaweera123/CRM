package net.test.CRM_backend.dto;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    public AuthResponse(String token) {
        this.accessToken = token;
    }
}
