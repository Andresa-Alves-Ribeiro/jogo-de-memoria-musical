# Architecture: Clean Architecture (Frontend Adaptation)

This project follows Clean Architecture with strict layer separation.

Dependency direction:

presentation → application → domain
infra → application
domain must not depend on any other layer.

---

# Naming Conventions

- UseCase classes must end with "UseCase"
- Repository interfaces must end with "Repository"
- DTOs must end with "DTO"
- Files must use kebab-case
- Components must use PascalCase
- Custom hooks must start with "use"

---

# Domain Rules

- Must contain only pure TypeScript.
- Must not import React or external libraries.
- Must not perform side effects.
- Must not access APIs, localStorage, or browser APIs.
- Must contain entities and repository interfaces only.

---

# Application Rules

- Must contain useCases.
- UseCases must be classes.
- UseCases must depend on repository interfaces.
- Must not contain React code.
- Must not perform direct API calls.
- Must orchestrate business rules only.

UseCase pattern:

export class CreateUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute(input: CreateUserDTO): Promise<User> {
    return this.repository.create(input);
  }
}

---

# Infra Rules

- Implements repository interfaces.
- Handles API, localStorage, cookies, and external services.
- May use fetch or axios.
- API responses must be mapped before reaching domain.
- Must not contain business rules.
- Must not expose raw API responses to presentation.
- Must propagate typed and meaningful errors.

---

# Presentation Rules

- Contains React components, hooks, and pages.
- Must not contain business rules.
- Must not call APIs directly.
- Must only call useCases.
- Local state must be used for UI-only concerns.
- Business state must be derived from useCases.
- Avoid unnecessary useEffect.
- Avoid deeply nested state.
- Components must be small and focused.
- A component must have a single responsibility.
- Avoid components larger than 200 lines.
- Extract complex logic into hooks.
- Hooks may orchestrate useCases but must not contain business rules.
- Side effects must be isolated.

---

# UI Consistency Rules

- Always use the shared <Loading /> component for loading states.
- Inline loading markup is FORBIDDEN.
- Loading logic must exist only in the presentation layer.
- Do not duplicate loading components.
- Error display must be handled in presentation.
- Use shared UI components when available.

---

# Type Safety

- TypeScript strict mode must be enabled.
- The use of "any" is FORBIDDEN.
- Avoid unsafe type assertions.
- Prefer explicit return types for exported functions.
- DTOs must be explicitly typed.

---

# Error Handling

- Never swallow errors.
- Errors must be typed.
- Domain must not depend on UI error formatting.
- Presentation must handle user-friendly error messages.

---

# Performance

- Avoid unnecessary re-renders.
- Memoize heavy computations when justified.
- Use React.memo only when necessary.
- Avoid premature optimization.

---

# Imports

- Use absolute imports.
- Avoid deep relative paths (../../../../).
- Do not import across features directly.
- Respect layer boundaries strictly.

---

# Anti-Patterns (FORBIDDEN)

- No business logic inside components.
- No API calls inside components.
- No business logic inside useEffect.
- No direct fetch/axios outside infra.
- No cross-layer imports.
- No duplication of business rules.
- No use of "any".

---

# Before Generating Code (Mandatory Checklist)

1. Identify the correct layer.
2. Respect dependency direction.
3. Ensure no business logic leaks into presentation.
4. Ensure strict typing.
5. Avoid anti-patterns.
6. Ensure scalability and reusability.
7. Refuse to break architecture.
