# ADR-003: Contract-First API Design with OpenAPI & AsyncAPI

## Status
**Accepted** (Maturity: Adopt)

## Context
Our ecosystem combines synchronous HTTP REST APIs (customer checkout, merchant dispatch) and asynchronous event streams (fleet telemetry, mission lifecycle events).
Previously, API specifications were written *after* code implementation or manually documented in Confluence, leading to breaking schema changes between mobile app clients and backend microservices.

## Decision
We mandate a **Contract-First** approach for all public and inter-service interfaces:
1. **Synchronous APIs:** Defined in **OpenAPI Specification (OAS 3.0+)** YAML files.
2. **Asynchronous Pub/Sub APIs:** Defined in **AsyncAPI 3.0** YAML files.
3. Both specifications must be versioned in Git repositories alongside their components.
4. Specifications are automatically ingested into **Spotify Backstage (Internal Developer Portal)** and rendered with interactive Swagger UI and AsyncAPI explorers.
5. Client SDKs and data validation schemas are generated directly from the specs during CI.

## Consequences
### Positive:
- **Single Source of Truth:** Code, tests, and documentation share identical data models.
- **Contract Testing:** Breaking changes are detected before pull requests merge.
- **Developer Onboarding:** Interactive Swagger UI allows instant exploration without reading implementation code.

### Negative / Trade-offs:
- Minor initial overhead to write and review API YAML definitions prior to coding.
