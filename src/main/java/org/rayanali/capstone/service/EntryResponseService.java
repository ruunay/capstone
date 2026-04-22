package org.rayanali.capstone.service;

import org.rayanali.capstone.entity.EntryResponse;
import org.rayanali.capstone.entity.JournalEntry;
import org.rayanali.capstone.entity.Prompt;
import org.rayanali.capstone.exception.ResourceNotFoundException;
import org.rayanali.capstone.repository.EntryResponseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class EntryResponseService {

    private final EntryResponseRepository entryResponseRepository;
    private final JournalEntryService journalEntryService;
    private final PromptService promptService;

    public EntryResponseService(EntryResponseRepository entryResponseRepository,
                                JournalEntryService journalEntryService,
                                PromptService promptService) {
        this.entryResponseRepository = entryResponseRepository;
        this.journalEntryService = journalEntryService;
        this.promptService = promptService;
    }

    public EntryResponse createResponse(Long entryId, Long promptId, String responseText) {
        JournalEntry entry = journalEntryService.getEntryById(entryId);
        Prompt prompt = promptService.getPromptById(promptId);

        EntryResponse response = new EntryResponse();
        response.setResponseText(responseText);
        response.setEntry(entry);
        response.setPrompt(prompt);

        return entryResponseRepository.save(response);
    }

    @Transactional(readOnly = true)
    public List<EntryResponse> getAllResponses() {
        return entryResponseRepository.findAll();
    }

    @Transactional(readOnly = true)
    public EntryResponse getResponseById(Long id) {
        return entryResponseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Response not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<EntryResponse> getResponsesByEntry(Long entryId) {
        return entryResponseRepository.findByEntryId(entryId);
    }

    public EntryResponse updateResponse(Long id, String newResponseText) {
        EntryResponse existing = getResponseById(id);
        existing.setResponseText(newResponseText);
        return entryResponseRepository.save(existing);
    }

    public void deleteResponse(Long id) {
        EntryResponse response = getResponseById(id);
        entryResponseRepository.delete(response);
    }
}