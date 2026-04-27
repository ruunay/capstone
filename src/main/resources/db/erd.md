# Capstone Database ERD

This Mermaid ERD matches the current SQL schema in `schema.sql`.

```mermaid
erDiagram
    users {
        BIGINT id PK
        VARCHAR username UK
        VARCHAR email UK
        VARCHAR password
        VARCHAR role
        TIMESTAMP created_at
    }

    journal_entries {
        BIGINT id PK
        VARCHAR title
        TEXT content
        VARCHAR mood_type
        INT mood_intensity
        TIMESTAMP created_at
        TIMESTAMP updated_at
        BIGINT user_id FK
    }

    prompts {
        BIGINT id PK
        TEXT question
        TIMESTAMP created_at
    }

    entry_responses {
        BIGINT id PK
        TEXT response_text
        BIGINT entry_id FK
        BIGINT prompt_id FK
        TIMESTAMP created_at
    }

    users ||--o{ journal_entries : has
    journal_entries ||--o{ entry_responses : has
    prompts ||--o{ entry_responses : used_by
```

## Key Mapping

- `users.id` is the primary key for `users`.
- `journal_entries.id` is the primary key for `journal_entries`.
- `prompts.id` is the primary key for `prompts`.
- `entry_responses.id` is the primary key for `entry_responses`.
- `journal_entries.user_id` is a foreign key to `users.id`.
- `entry_responses.entry_id` is a foreign key to `journal_entries.id`.
- `entry_responses.prompt_id` is a foreign key to `prompts.id`.

## Indexes

- `idx_journal_entries_user_id` on `journal_entries(user_id)`
- `idx_journal_entries_mood_type` on `journal_entries(mood_type)`
- `idx_entry_responses_entry_id` on `entry_responses(entry_id)`
- `idx_entry_responses_prompt_id` on `entry_responses(prompt_id)`
