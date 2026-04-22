package org.rayanali.capstone.repository;

import org.rayanali.capstone.entity.EntryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EntryResponseRepository extends JpaRepository<EntryResponse, Long> {

    List<EntryResponse> findByEntryId(Long entryId);

    List<EntryResponse> findByPromptId(Long promptId);

    boolean existsByEntryIdAndPromptId(Long entryId, Long promptId);
}