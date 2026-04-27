package org.rayanali.capstone.controller;

import jakarta.validation.Valid;
import org.rayanali.capstone.dto.PasswordResetConfirm;
import org.rayanali.capstone.dto.PasswordResetRequest;
import org.rayanali.capstone.service.PasswordResetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(
            @Valid @RequestBody PasswordResetRequest request) {
        String token = passwordResetService.generateResetToken(request.getEmail());
        return ResponseEntity.ok(Map.of(
                "message", "Password reset token generated successfully",
                "token", token,
                "note", "In production this token would be sent to your email"
        ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(
            @Valid @RequestBody PasswordResetConfirm request) {
        passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok(Map.of(
                "message", "Password reset successfully. You can now log in with your new password."
        ));
    }
}
