package org.rayanali.capstone.service;

import org.rayanali.capstone.entity.Prompt;
import org.rayanali.capstone.exception.ResourceNotFoundException;
import org.rayanali.capstone.repository.PromptRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class PromptService {

    private final PromptRepository promptRepository;

    public PromptService(PromptRepository promptRepository) {
        this.promptRepository = promptRepository;
    }

    public Prompt createPrompt(Prompt prompt) {
        return promptRepository.save(prompt);
    }

    @Transactional(readOnly = true)
    public List<Prompt> getAllPrompts() {
        return promptRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Prompt getPromptById(Long id) {
        return promptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prompt not found with id: " + id));
    }

    public void deletePrompt(Long id) {
        Prompt prompt = getPromptById(id);
        promptRepository.delete(prompt);
    }
}