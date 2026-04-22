package org.rayanali.capstone.security;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@DisplayName("JwtUtil Tests")
class JwtUtilTest {

    @Autowired
    private JwtUtil jwtUtil;

    private String testEmail;
    private String testRole;

    @BeforeEach
    void setUp() {
        testEmail = "test@example.com";
        testRole = "USER";
    }

    @Test
    @DisplayName("Should generate valid token with email and role")
    void testGenerateToken() {
        // Arrange
        // setUp provides testEmail and testRole

        // Act
        String token = jwtUtil.generateToken(testEmail, testRole);

        // Assert
        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertTrue(jwtUtil.isTokenValid(token));
    }

    @Test
    @DisplayName("Should extract email from valid token")
    void testExtractEmail() {
        // Arrange
        String token = jwtUtil.generateToken(testEmail, testRole);

        // Act
        String extractedEmail = jwtUtil.extractEmail(token);

        // Assert
        assertNotNull(extractedEmail);
        assertEquals(testEmail, extractedEmail);
    }

    @Test
    @DisplayName("Should extract role from valid token")
    void testExtractRole() {
        // Arrange
        String token = jwtUtil.generateToken(testEmail, testRole);

        // Act
        String extractedRole = jwtUtil.extractRole(token);

        // Assert
        assertNotNull(extractedRole);
        assertEquals(testRole, extractedRole);
    }

    @Test
    @DisplayName("Should validate token successfully")
    void testIsTokenValid() {
        // Arrange
        String token = jwtUtil.generateToken(testEmail, testRole);

        // Act
        boolean isValid = jwtUtil.isTokenValid(token);

        // Assert
        assertTrue(isValid);
    }

    @Test
    @DisplayName("Should detect invalid token")
    void testIsTokenInvalidWithMalformedToken() {
        // Arrange
        String invalidToken = "invalid.token.here";

        // Act
        boolean isValid = jwtUtil.isTokenValid(invalidToken);

        // Assert
        assertFalse(isValid);
    }

    @Test
    @DisplayName("Should handle empty token gracefully")
    void testIsTokenInvalidWithEmptyToken() {
        // Arrange
        String emptyToken = "";

        // Act & Assert - JwtUtil throws exception for empty token
        assertThrows(IllegalArgumentException.class, () -> jwtUtil.isTokenValid(emptyToken));
    }

    @Test
    @DisplayName("Should throw exception when extracting email from invalid token")
    void testExtractEmailFromInvalidTokenThrowsException() {
        // Arrange
        String invalidToken = "invalid.token.here";

        // Act & Assert
        assertThrows(JwtException.class, () -> jwtUtil.extractEmail(invalidToken));
    }

    @Test
    @DisplayName("Should generate different tokens for different emails")
    void testGenerateTokensDifferentForDifferentEmails() {
        // Arrange
        String email1 = "user1@example.com";
        String email2 = "user2@example.com";

        // Act
        String token1 = jwtUtil.generateToken(email1, testRole);
        String token2 = jwtUtil.generateToken(email2, testRole);

        // Assert
        assertNotEquals(token1, token2);
        assertEquals(email1, jwtUtil.extractEmail(token1));
        assertEquals(email2, jwtUtil.extractEmail(token2));
    }

    @Test
    @DisplayName("Should generate different tokens for different roles")
    void testGenerateTokensDifferentForDifferentRoles() {
        // Arrange
        String role1 = "USER";
        String role2 = "ADMIN";

        // Act
        String token1 = jwtUtil.generateToken(testEmail, role1);
        String token2 = jwtUtil.generateToken(testEmail, role2);

        // Assert
        assertNotEquals(token1, token2);
        assertEquals(role1, jwtUtil.extractRole(token1));
        assertEquals(role2, jwtUtil.extractRole(token2));
    }

    @Test
    @DisplayName("Should generate token with null email (edge case)")
    void testGenerateTokenWithNullEmail() {
        // Act - JwtUtil allows null email
        String token = jwtUtil.generateToken(null, testRole);

        // Assert - Token should be valid even with null email
        assertNotNull(token);
        assertTrue(jwtUtil.isTokenValid(token));
        assertNull(jwtUtil.extractEmail(token));
    }
}
