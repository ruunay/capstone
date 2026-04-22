INSERT IGNORE INTO users (username, email, password, role) VALUES
(
    'admin',
    'admin@held.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
    'ADMIN'
);

INSERT IGNORE INTO prompts (question) VALUES
('What made you feel this way today?'),
('What is one thing you are grateful for right now?'),
('What would you tell a friend who felt the same way?'),
('What do you need most in this moment?'),
('How does your body feel when you experience this emotion?');
