package org.rayanali.capstone.controller;

import jakarta.validation.Valid;
import org.rayanali.capstone.dto.JournalEntryDto;
import org.rayanali.capstone.entity.JournalEntry;
import org.rayanali.capstone.service.JournalEntryService;
import org.rayanali.capstone.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/journal-entries")
public class JournalEntryController {

    private final JournalEntryService journalEntryService;
    private final UserService userService;

    public JournalEntryController(JournalEntryService journalEntryService, UserService userService) {
        this.journalEntryService = journalEntryService;
        this.userService = userService;
    }

    private Long resolveUserId() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getUserByEmail(email).getId();
    }

    private boolean isAdmin() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

    @GetMapping
    public ResponseEntity<List<JournalEntryDto>> getAllEntries() {
        Long userId = resolveUserId();
        List<JournalEntryDto> entries = journalEntryService.getEntriesByUser(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JournalEntryDto> getEntryById(@PathVariable Long id) {
        return ResponseEntity.ok(convertToDTO(journalEntryService.getEntryById(id)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JournalEntryDto>> getEntriesByUser(@PathVariable Long userId) {
        Long tokenUserId = resolveUserId();
        List<JournalEntryDto> entries = journalEntryService.getEntriesByUser(tokenUserId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/user/{userId}/paged")
    public ResponseEntity<Page<JournalEntryDto>> getEntriesByUserPaginated(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Long tokenUserId = resolveUserId();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<JournalEntryDto> entries = journalEntryService
                .getEntriesByUserPaginated(tokenUserId, pageable)
                .map(this::convertToDTO);
        return ResponseEntity.ok(entries);
    }

    @GetMapping("/mood/{moodType}")
    public ResponseEntity<List<JournalEntryDto>> getEntriesByMood(@PathVariable String moodType) {
        List<JournalEntryDto> entries = journalEntryService.getEntriesByMood(moodType)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(entries);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<JournalEntryDto> createEntry(
            @PathVariable Long userId,
            @Valid @RequestBody JournalEntryDto journalEntryDto) {
        Long tokenUserId = resolveUserId();
        JournalEntry entry = convertToEntity(journalEntryDto);
        JournalEntry saved = journalEntryService.createEntry(tokenUserId, entry);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JournalEntryDto> updateEntry(
            @PathVariable Long id,
            @Valid @RequestBody JournalEntryDto journalEntryDto) {
        JournalEntry updated = journalEntryService.updateEntry(
                id, convertToEntity(journalEntryDto), resolveUserId(), isAdmin());
        return ResponseEntity.ok(convertToDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        journalEntryService.deleteEntry(id, resolveUserId(), isAdmin());
        return ResponseEntity.noContent().build();
    }

    private JournalEntryDto convertToDTO(JournalEntry entry) {
        JournalEntryDto dto = new JournalEntryDto();
        dto.setId(entry.getId());
        dto.setTitle(entry.getTitle());
        dto.setContent(entry.getContent());
        dto.setMoodType(entry.getMoodType());
        dto.setMoodIntensity(entry.getMoodIntensity());
        dto.setUserId(entry.getUser().getId());
        dto.setCreatedAt(entry.getCreatedAt());
        dto.setUpdatedAt(entry.getUpdatedAt());
        return dto;
    }

    private JournalEntry convertToEntity(JournalEntryDto dto) {
        JournalEntry entry = new JournalEntry();
        entry.setTitle(dto.getTitle());
        entry.setContent(dto.getContent());
        entry.setMoodType(dto.getMoodType());
        entry.setMoodIntensity(dto.getMoodIntensity());
        return entry;
    }
}