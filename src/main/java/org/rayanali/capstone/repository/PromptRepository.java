package org.rayanali.capstone.repository;

import org.rayanali.capstone.entity.Prompt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PromptRepository extends JpaRepository<Prompt, Long> {

    List<Prompt> findByQuestionContainingIgnoreCase(String keyword);
}