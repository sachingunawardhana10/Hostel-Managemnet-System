package com.hostel.hostel_management_system.auth.dto;

import com.hostel.hostel_management_system.auth.enums.UserRole;

public class ProfileResponse {

    private Long userId;
    private String fullName;
    private String email;
    private UserRole role;
    private Long residentId;

    public ProfileResponse(
            Long userId,
            String fullName,
            String email,
            UserRole role,
            Long residentId) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.residentId = residentId;
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