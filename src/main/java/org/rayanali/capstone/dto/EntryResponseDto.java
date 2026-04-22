package org.rayanali.capstone.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntryResponseDto {

    private Long id;

    private String responseText;

    private Long entryId;

    private Long promptId;

    private LocalDateTime createdAt;
}