package org.rayanali.capstone.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.rayanali.capstone.entity.JournalEntry;
import org.rayanali.capstone.entity.User;
import org.rayanali.capstone.exception.UnauthorizedAccessException;
import org.rayanali.capstone.repository.JournalEntryRepository;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JournalEntryServiceTest {

    @Mock
    private JournalEntryRepository journalEntryRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private JournalEntryService journalEntryService;

    private User userWithId4;
    private User userWithId2;

    @BeforeEach
    void setUp() {
        userWithId4 = new User();
        userWithId4.setId(4L);

        userWithId2 = new User();
        userWithId2.setId(2L);
    }

    @Test
    @DisplayName("createEntry saves entry associated with the correct userId from token")
    void testCreateEntry_savesWithCorrectUserId() {
        JournalEntry entry = new JournalEntry();

        when(userService.getUserById(4L)).thenReturn(userWithId4);
        when(journalEntryRepository.save(any(JournalEntry.class)))
                .thenAnswer(inv -> inv.getArgument(0));

        JournalEntry saved = journalEntryService.createEntry(4L, entry);

        assertNotNull(saved.getUser());
        assertEquals(4L, saved.getUser().getId());
        verify(journalEntryRepository).save(entry);
    }

    @Test
    @DisplayName("getEntriesByUser returns only entries belonging to the requested userId")
    void testGetEntriesByUser_returnsOnlyUserEntries() {
        JournalEntry e1 = new JournalEntry();
        e1.setUser(userWithId4);
        JournalEntry e2 = new JournalEntry();
        e2.setUser(userWithId4);

        when(journalEntryRepository.findByUserId(4L)).thenReturn(List.of(e1, e2));

        List<JournalEntry> results = journalEntryService.getEntriesByUser(4L);

        assertEquals(2, results.size());
        assertTrue(results.stream().allMatch(e -> e.getUser().getId().equals(4L)));
        verify(journalEntryRepository).findByUserId(4L);
    }

    @Test
    @DisplayName("deleteEntry throws UnauthorizedAccessException when requester does not own the entry")
    void testDeleteEntry_throwsWhenNotOwner() {
        JournalEntry entry = new JournalEntry();
        entry.setId(1L);
        entry.setUser(userWithId2);

        when(journalEntryRepository.findById(1L)).thenReturn(Optional.of(entry));

        UnauthorizedAccessException ex = assertThrows(
                UnauthorizedAccessException.class,
                () -> journalEntryService.deleteEntry(1L, 4L, false)
        );

        assertEquals("You do not have permission to modify this entry.", ex.getMessage());
        verify(journalEntryRepository, never()).delete(any());
    }

    @Test
    @DisplayName("deleteEntry succeeds without exception when requester owns the entry")
    void testDeleteEntry_succeedsWhenOwner() {
        JournalEntry entry = new JournalEntry();
        entry.setId(1L);
        entry.setUser(userWithId4);

        when(journalEntryRepository.findById(1L)).thenReturn(Optional.of(entry));

        assertDoesNotThrow(() -> journalEntryService.deleteEntry(1L, 4L, false));
        verify(journalEntryRepository).delete(entry);
    }

    @Test
    @DisplayName("updateEntry throws UnauthorizedAccessException when requester does not own the entry")
    void testUpdateEntry_throwsWhenNotOwner() {
        JournalEntry entry = new JournalEntry();
        entry.setId(1L);
        entry.setUser(userWithId2);

        JournalEntry update = new JournalEntry();

        when(journalEntryRepository.findById(1L)).thenReturn(Optional.of(entry));

        UnauthorizedAccessException ex = assertThrows(
                UnauthorizedAccessException.class,
                () -> journalEntryService.updateEntry(1L, update, 4L, false)
        );

        assertEquals("You do not have permission to modify this entry.", ex.getMessage());
        verify(journalEntryRepository, never()).save(any());
    }
}
