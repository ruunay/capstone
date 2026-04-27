# Held — Digital Journaling & Emotional Wellness Platform

## Overview

Held is a full-stack digital journaling platform built for emotional wellness. Users can write mood-tracked journal entries, receive guided reflection through an intelligent chat system, explore daily affirmations with nature scenes, and connect anonymously with a community.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Java 21, Spring Boot 3.3.5, Spring Security, JWT, JPA/Hibernate, MySQL, Lombok, Maven |
| **Frontend** | React 18, Vite, React Router 6, Axios, CSS Variables, Cormorant Garamond, DM Sans |

---

## Prerequisites

- Java 21 (Amazon Corretto 21 recommended)
- Node.js 18 or higher
- MySQL 8.0 or higher
- Maven 3.8 or higher
- Git

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/held-capstone.git
cd held-capstone
```

### 2. Database Setup

Open MySQL Workbench or a terminal and run:

```sql
CREATE DATABASE IF NOT EXISTS capstone_db;
```

Then run the schema file:

```bash
source src/main/resources/db/schema.sql
```

Then run the seed data:

```bash
source src/main/resources/db/data.sql
```

### 3. Backend Configuration

Open `src/main/resources/application.properties` and update these values with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/capstone_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 4. Run the Backend

```bash
cd capstone
mvn clean install
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`.  
Verify by visiting `http://localhost:8080/api/prompts` — you should see a list of prompts (login required).

### 5. Frontend Setup

```bash
cd held-frontend
npm install
```

### 6. Frontend Configuration

Create a `.env` file in the `held-frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### 7. Run the Frontend

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`.

---

## Test Credentials

| Role | Email | Password |
|---|---|---|
| Regular User | heni@held.com | password123 |
| Admin | admin@held.com | password123 |

---

## API Endpoints

### Public (No Auth Required)

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Authenticated (USER role)

```
GET    /api/journal-entries/user/{userId}
POST   /api/journal-entries/user/{userId}
GET    /api/journal-entries/{id}
PUT    /api/journal-entries/{id}
DELETE /api/journal-entries/{id}
GET    /api/prompts
POST   /api/responses
GET    /api/responses/entry/{entryId}
```

### Admin Only (ADMIN role)

```
GET    /api/admin/users
DELETE /api/admin/users/{id}
POST   /api/prompts
DELETE /api/prompts/{id}
```

---

## Running Tests

```bash
mvn test
```

For a coverage report:

```bash
mvn verify
```

Coverage report will be generated at `target/site/jacoco/index.html`.

---

## Database Schema

**4 tables:** `users`, `journal_entries`, `prompts`, `entry_responses`

```
users ──────────────── one-to-many ──────────────── journal_entries
                                                          │
                                                    one-to-many
                                                          │
prompts ────────────── one-to-many ──────────── entry_responses
```

- `users` → many `journal_entries` (CASCADE DELETE)
- `journal_entries` → many `entry_responses` (CASCADE DELETE)
- `prompts` → many `entry_responses` (CASCADE DELETE)

---

## Project Structure

```
capstone/
├── src/main/java/org/rayanali/capstone/
│   ├── controller/       REST controllers
│   ├── service/          Business logic
│   ├── repository/       Data access layer
│   ├── entity/           JPA entities
│   ├── dto/              Data transfer objects
│   ├── security/         JWT and Spring Security
│   └── exception/        Custom exceptions
├── src/main/resources/
│   ├── db/               SQL scripts
│   └── application.properties
└── held-frontend/
    ├── src/
    │   ├── pages/        React pages
    │   ├── components/   Reusable components
    │   ├── context/      Auth context
    │   ├── services/     API calls
    │   └── styles/       CSS
    └── package.json
```

---

## User Stories

1. As a user I want to register with email and password
2. As a user I want to login securely with JWT
3. As a user I want to create journal entries with mood tracking
4. As a user I want guided reflection questions based on my mood
5. As a user I want to view and manage my past entries
6. As a user I want daily affirmations to ground myself
7. As a user I want to share anonymously with the community
8. As a user I want to reset my password if forgotten
9. As an admin I want to manage all users on the platform
10. As an admin I want to create and manage reflection prompts

---

## Security

- JWT tokens with 24-hour expiration
- BCrypt password hashing
- Role-based access control (`USER` and `ADMIN`)
- Ownership verification on all entry mutations
- CORS configured for frontend origin
- Input validation on all endpoints
- Crisis detection in guided reflection with 988 referral

---

## Known Limitations

- Vision board image upload requires membership (coming soon)
- Pinterest OAuth integration is planned for Phase 2
- Email sending for password reset not yet configured — token is returned directly in the API response for demo purposes
- AWS deployment configured but running locally for demo

---

## Architecture

React frontend communicates with the Spring Boot REST API via Axios with JWT Bearer token authentication. Spring Boot connects to MySQL via JPA/Hibernate. Spring Security validates the JWT on every protected request.

```
User Browser
     │  HTTPS
     ▼
AWS S3 (React SPA)
     │  REST / JWT
     ▼
AWS EC2 (Spring Boot API)
     │  JDBC / JPA
     ▼
AWS RDS (MySQL 8.0)
```
