package org.rayanali.capstone.service;

import org.rayanali.capstone.entity.JournalEntry;
import org.rayanali.capstone.entity.User;
import org.rayanali.capstone.exception.ResourceNotFoundException;
import org.rayanali.capstone.repository.JournalEntryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class JournalEntryService {

    private final JournalEntryRepository journalEntryRepository;
    private final UserService userService;

    public JournalEntryService(JournalEntryRepository journalEntryRepository,
                               UserService userService) {
        this.journalEntryRepository = journalEntryRepository;
        this.userService = userService;
    }

    public JournalEntry createEntry(Long userId, JournalEntry entry) {
        User user = userService.getUserById(userId);
        entry.setUser(user);
        return journalEntryRepository.save(entry);
    }

    @Transactional(readOnly = true)
    public List<JournalEntry> getAllEntries() {
        return journalEntryRepository.findAll();
    }

    @Transactional(readOnly = true)
    public JournalEntry getEntryById(Long id) {
        return journalEntryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entry not found with id: " + id));
    }

    @Transactional(readOnly = true)
    public List<JournalEntry> getEntriesByUser(Long userId) {
        return journalEntryRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public Page<JournalEntry> getEntriesByUserPaginated(Long userId, Pageable pageable) {
        return journalEntryRepository.findByUserId(userId, pageable);
    }

    @Transactional(readOnly = true)
    public List<JournalEntry> getEntriesByMood(String moodType) {
        return journalEntryRepository.findByMoodType(moodType);
    }

    @Transactional(readOnly = true)
    public List<JournalEntry> getEntriesByUserAndMood(Long userId, String moodType) {
        return journalEntryRepository.findByUserIdAndMoodType(userId, moodType);
    }

    public JournalEntry updateEntry(Long id, JournalEntry updatedEntry) {
        JournalEntry existing = getEntryById(id);
        existing.setTitle(updatedEntry.getTitle());
        existing.setContent(updatedEntry.getContent());
        existing.setMoodType(updatedEntry.getMoodType());
        existing.setMoodIntensity(updatedEntry.getMoodIntensity());
        return journalEntryRepository.save(existing);
    }

    public void deleteEntry(Long id) {
        JournalEntry entry = getEntryById(id);
        journalEntryRepository.delete(entry);
    }
}