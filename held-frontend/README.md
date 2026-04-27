# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Database ERD

This ERD reflects the backend schema defined in `src/main/resources/db/schema.sql`.

Image file: `../src/main/resources/db/erd.svg`

```mermaid
---
id: d79bba2c-fdc6-4168-a9cd-015d2640928a
---
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
