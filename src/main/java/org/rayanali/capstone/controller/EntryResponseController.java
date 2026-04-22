package org.rayanali.capstone.controller;

import jakarta.validation.Valid;
import org.rayanali.capstone.dto.EntryResponseDto;
import org.rayanali.capstone.entity.EntryResponse;
import org.rayanali.capstone.service.EntryResponseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/responses")
public class EntryResponseController {

    private final EntryResponseService entryResponseService;

    public EntryResponseController(EntryResponseService entryResponseService) {
        this.entryResponseService = entryResponseService;
    }

    @GetMapping
    public ResponseEntity<List<EntryResponseDto>> getAllResponses() {
        List<EntryResponseDto> responses = entryResponseService.getAllResponses()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EntryResponseDto> getResponseById(@PathVariable Long id) {
        return ResponseEntity.ok(convertToDTO(entryResponseService.getResponseById(id)));
    }

    @GetMapping("/entry/{entryId}")
    public ResponseEntity<List<EntryResponseDto>> getResponsesByEntry(@PathVariable Long entryId) {
        List<EntryResponseDto> responses = entryResponseService.getResponsesByEntry(entryId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<EntryResponseDto> createResponse(@Valid @RequestBody EntryResponseDto dto) {
        EntryResponse saved = entryResponseService.createResponse(
                dto.getEntryId(),
                dto.getPromptId(),
                dto.getResponseText()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EntryResponseDto> updateResponse(
            @PathVariable Long id,
            @RequestBody EntryResponseDto dto) {
        EntryResponse updated = entryResponseService.updateResponse(id, dto.getResponseText());
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResponse(@PathVariable Long id) {
        entryResponseService.deleteResponse(id);
        return ResponseEntity.noContent().build();
    }

    private EntryResponseDto convertToDTO(EntryResponse response) {
        EntryResponseDto dto = new EntryResponseDto();
        dto.setId(response.getId());
        dto.setResponseText(response.getResponseText());
        dto.setEntryId(response.getEntry().getId());
        dto.setPromptId(response.getPrompt().getId());
        dto.setCreatedAt(response.getCreatedAt());
        return dto;
    }
}