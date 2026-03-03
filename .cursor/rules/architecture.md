You are working in a React + TypeScript + Vite project.

Architecture: Clean Architecture (front-end adaptation).

# Layers

## Domain
- Must contain only pure TypeScript.
- Must NOT import React or external libraries.
- Must contain entities and repository interfaces.
- Must not perform side effects.

## Application
- Must contain useCases.
- UseCases must be classes.
- UseCases must depend on repository interfaces.
- No React code allowed.

## Infra
- Implements repository interfaces.
- Handles API, localStorage, etc.
- May use fetch or axios.
- Must not contain business rules.

## Presentation
- Contains React components, hooks, and pages.
- Must not contain business rules.
- Must only call useCases.

# Dependency Rules

- presentation → application
- application → domain
- infra → application
- domain must not import from any other layer.

# Forbidden

- No business logic inside components.
- No API calls inside components.
- No business logic inside useEffect.
- No direct fetch/axios outside infra.
- No any types.
