package org.rayanali.capstone.controller;

import jakarta.validation.Valid;
import org.rayanali.capstone.dto.AuthRequest;
import org.rayanali.capstone.dto.AuthResponse;
import org.rayanali.capstone.dto.RegisterRequest;
import org.rayanali.capstone.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}



//security/
//  JwtUtil.java
//  JwtAuthenticationFilter.java
//  SecurityConfig.java
//
//dto/
//  AuthRequest.java
//  AuthResponse.java
//  RegisterRequest.java
//
//service/
//  AuthService.java
//
//controller/
//  AuthController.java
//```
//
//Your two public endpoints are:
//```
//POST /api/auth/register
//POST /api/auth/login
//```
//
//Everything else requires a JWT token in the header. Ready to move on to the React frontend?