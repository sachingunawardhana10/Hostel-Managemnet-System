package com.hostel.hostel_management_system.auth.controller;

import com.hostel.hostel_management_system.auth.dto.AuthResponse;
import com.hostel.hostel_management_system.auth.dto.LoginRequest;
import com.hostel.hostel_management_system.auth.dto.ProfileResponse;
import com.hostel.hostel_management_system.auth.dto.RegisterRequest;
import com.hostel.hostel_management_system.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return service.login(request);
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(Authentication authentication) {
        return service.getProfile(authentication.getName());
    }
}