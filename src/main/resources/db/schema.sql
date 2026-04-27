CREATE DATABASE IF NOT EXISTS capstone_db;
USE capstone_db;

CREATE TABLE IF NOT EXISTS users (
 id         BIGINT AUTO_INCREMENT PRIMARY KEY,
username   VARCHAR(50)  NOT NULL UNIQUE,
email      VARCHAR(100) NOT NULL UNIQUE,
password   VARCHAR(255) NOT NULL,
role       VARCHAR(20)  DEFAULT 'USER',
created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS journal_entries (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
title  VARCHAR(100),
content TEXT NOT NULL,
mood_type VARCHAR(50) NOT NULL,
mood_intensity INT CHECK (mood_intensity BETWEEN 1 AND 10),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP,
user_id BIGINT NOT NULL,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS prompts (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
question   TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS entry_responses (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
response_text TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
entry_id BIGINT NOT NULL,
prompt_id BIGINT NOT NULL,
FOREIGN KEY (entry_id)  REFERENCES journal_entries(id) ON DELETE CASCADE,
FOREIGN KEY (prompt_id) REFERENCES prompts(id)         ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id
ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_mood_type
ON journal_entries(mood_type);
CREATE INDEX IF NOT EXISTS idx_entry_responses_entry_id
ON entry_responses(entry_id);
CREATE INDEX IF NOT EXISTS idx_entry_responses_prompt_id
ON entry_responses(prompt_id);
