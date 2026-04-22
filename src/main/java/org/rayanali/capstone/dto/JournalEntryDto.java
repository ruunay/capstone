package org.rayanali.capstone.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JournalEntryDto {

    private Long id;

    @Size(max = 100, message = "Title cannot exceed 100 characters")
    private String title;

    @NotBlank(message = "Content cannot be empty")
    private String content;

    @NotBlank(message = "Mood type is required")
    private String moodType;

    @Min(value = 1, message = "Mood intensity must be at least 1")
    @Max(value = 10, message = "Mood intensity cannot exceed 10")
    private Integer moodIntensity;

    private Long userId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}