package org.rayanali.capstone.service;

import org.rayanali.capstone.dto.AuthRequest;
import org.rayanali.capstone.dto.AuthResponse;
import org.rayanali.capstone.dto.RegisterRequest;
import org.rayanali.capstone.entity.User;
import org.rayanali.capstone.exception.DuplicateResourceException;
import org.rayanali.capstone.exception.InvalidCredentialsException;
import org.rayanali.capstone.exception.ResourceNotFoundException;
import org.rayanali.capstone.repository.UserRepository;
import org.rayanali.capstone.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email is already registered");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username is already taken");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        User saved = userRepository.save(user);

        String token = jwtUtil.generateToken(saved.getEmail(), saved.getRole());
        return new AuthResponse(
                saved.getId(),
                token,
                saved.getEmail(),
                saved.getRole(),
                saved.getUsername()
        );
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "No account found with email: " + request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new AuthResponse(
                user.getId(),
                token,
                user.getEmail(),
                user.getRole(),
                user.getUsername()
        );
    }
}
