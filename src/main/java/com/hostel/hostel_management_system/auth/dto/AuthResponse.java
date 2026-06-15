package com.hostel.hostel_management_system.auth.dto;

import com.hostel.hostel_management_system.auth.enums.UserRole;

public class AuthResponse {

    private String token;
    private Long userId;
    private String fullName;
    private String email;
    private UserRole role;
    private Long residentId;

    public AuthResponse(
            String token,
            Long userId,
            String fullName,
            String email,
            UserRole role,
            Long residentId) {
        this.token = token;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.residentId = residentId;
    }

    public String getToken() {
        return token;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public UserRole getRole() {
        return role;
    }

    public Long getResidentId() {
        return residentId;
    }
}