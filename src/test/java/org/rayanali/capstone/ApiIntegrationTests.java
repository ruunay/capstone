package org.rayanali.capstone;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.rayanali.capstone.entity.Prompt;
import org.rayanali.capstone.entity.User;
import org.rayanali.capstone.repository.PromptRepository;
import org.rayanali.capstone.repository.UserRepository;
import org.rayanali.capstone.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
class ApiIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PromptRepository promptRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    void registerReturns201WithValidBody() throws Exception {
        String unique = UUID.randomUUID().toString().substring(0, 8);
        Map<String, String> requestBody = Map.of(
                "username", "user_" + unique,
                "email", "user_" + unique + "@held.test",
                "password", "password123"
        );

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.email").value(requestBody.get("email")))
                .andExpect(jsonPath("$.username").value(requestBody.get("username")))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void loginReturns200WithValidCredentials() throws Exception {
        String unique = UUID.randomUUID().toString().substring(0, 8);
        String email = "login_" + unique + "@held.test";
        String password = "password123";

        userRepository.save(User.builder()
                .username("login_" + unique)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role("USER")
                .build());

        Map<String, String> requestBody = Map.of(
                "email", email,
                "password", password
        );

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.email").value(email))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    void loginReturns401WithWrongPassword() throws Exception {
        String unique = UUID.randomUUID().toString().substring(0, 8);
        String email = "wrong_" + unique + "@held.test";

        userRepository.save(User.builder()
                .username("wrong_" + unique)
                .email(email)
                .password(passwordEncoder.encode("password123"))
                .role("USER")
                .build());

        Map<String, String> requestBody = Map.of(
                "email", email,
                "password", "incorrect-password"
        );

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestBody)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid password"));
    }

    @Test
    void getJournalEntriesByUserReturns401WithoutToken() throws Exception {
        mockMvc.perform(get("/api/journal-entries/user/{id}", 1L))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void getPromptsReturns200WithValidToken() throws Exception {
        String unique = UUID.randomUUID().toString().substring(0, 8);

        User user = userRepository.save(User.builder()
                .username("prompt_" + unique)
                .email("prompt_" + unique + "@held.test")
                .password(passwordEncoder.encode("password123"))
                .role("USER")
                .build());

        Prompt prompt = promptRepository.save(Prompt.builder()
                .question("What are you proud of today?")
                .build());

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        mockMvc.perform(get("/api/prompts")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].question", hasItem(prompt.getQuestion())));
    }
}
