package org.rayanali.capstone.repository;

import org.rayanali.capstone.entity.JournalEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {

    List<JournalEntry> findByUserId(Long userId);

    Page<JournalEntry> findByUserId(Long userId, Pageable pageable);

    List<JournalEntry> findByMoodType(String moodType);

    List<JournalEntry> findByUserIdAndMoodType(Long userId, String moodType);
}