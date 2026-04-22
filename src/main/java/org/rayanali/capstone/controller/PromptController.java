package org.rayanali.capstone.controller;

import jakarta.validation.Valid;
import org.rayanali.capstone.dto.PromptDto;
import org.rayanali.capstone.entity.Prompt;
import org.rayanali.capstone.service.PromptService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/prompts")
public class PromptController {

    private final PromptService promptService;

    public PromptController(PromptService promptService) {
        this.promptService = promptService;
    }

    @GetMapping
    public ResponseEntity<List<PromptDto>> getAllPrompts() {
        List<PromptDto> prompts = promptService.getAllPrompts()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(prompts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PromptDto> getPromptById(@PathVariable Long id) {
        return ResponseEntity.ok(convertToDTO(promptService.getPromptById(id)));
    }

    @PostMapping
    public ResponseEntity<PromptDto> createPrompt(@Valid @RequestBody PromptDto promptDto) {
        Prompt prompt = convertToEntity(promptDto);
        Prompt saved = promptService.createPrompt(prompt);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrompt(@PathVariable Long id) {
        promptService.deletePrompt(id);
        return ResponseEntity.noContent().build();
    }

    private PromptDto convertToDTO(Prompt prompt) {
        PromptDto dto = new PromptDto();
        dto.setId(prompt.getId());
        dto.setQuestion(prompt.getQuestion());
        dto.setCreatedAt(prompt.getCreatedAt());
        return dto;
    }

    private Prompt convertToEntity(PromptDto dto) {
        Prompt prompt = new Prompt();
        prompt.setQuestion(dto.getQuestion());
        return prompt;
    }
}