package org.rayanali.capstone.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromptDto {

    private Long id;

    @NotBlank(message = "Prompt question cannot be empty")
    private String question;

    private LocalDateTime createdAt;
}