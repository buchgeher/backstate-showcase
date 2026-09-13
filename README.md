# Backstage Architecture Showcase: Autonomous Delivery Robot System

Welcome to the **Backstage Developer Portal Showcase** for the **Autonomous Delivery Robot System**.

This repository demonstrates how modern software organizations unite fragmented architecture documentation into a single, unified **Internal Developer Portal (IDP)** using [Spotify Backstage](https://backstage.io).

---

## 🎯 Architecture Pillars Demonstrated

1. **📦 Software Catalog as Code (`catalog-entities.yaml`):**
   - Autonomous delivery robot fleet services & ROS 2 edge components
   - Explicit ownership tracking (`Group: architecture-guild`, `Group: fleet-routing-team`, `Group: edge-robotics-team`)
   - System boundaries and lifecycle management

2. **🔌 API Documentation (OpenAPI & AsyncAPI):**
   - **REST / Synchronous API:** `Delivery Robot Mission Control API` defined in **OpenAPI 3.0** with interactive Swagger UI exploration.
   - **Event-Driven / Pub-Sub API:** `Robot Telemetry & Sensor Stream API` defined in **AsyncAPI 3.0** (Zenoh / Kafka streams).

3. **📝 Docs-like-Code & Architecture Decision Records (ADRs):**
   - Managed via **TechDocs** directly inside the repository.
   - Includes real ADRs for our robot system:
     - **ADR-001:** Adoption of ROS 2 as Robotics Core Middleware
     - **ADR-002:** Using Zenoh for Edge-to-Cloud Telemetry Communication
     - **ADR-003:** Contract-First API Design with OpenAPI & AsyncAPI

4. **📡 Technology Radar:**
   - Visualized technology portfolio across **Techniques, Platforms, Tools, and Languages** (Adopt, Trial, Assess, Hold).

---

## 🚀 Quickstart: Running in Docker

You can clone this repository and run the entire portal locally with a single command:

```bash
# 1. Clone the repository
git clone git@github.com:buchgeher/backstate-showcase.git
cd backstate-showcase

# 2. Build and start with Docker Compose
docker compose up --build
```

Once started, open your browser at:
👉 **[http://localhost:7007](http://localhost:7007)**

---

## 🧭 Exploring the Showcase

- **Catalog:** Explore components like `robot-mission-control-service` and `robot-edge-navigation-node`.
- **APIs:** View rendered interactive specs under the **APIs** navigation item.
- **Docs & ADRs:** Read the system architecture guide and decision records under **Docs & ADRs** (TechDocs).
- **Tech Radar:** Inspect strategic technology maturity levels under **Tech Radar**.

---

## 🛠️ Project Structure

```
.
├── Dockerfile                  # Multi-stage container build
├── docker-compose.yml          # Container orchestration
├── app-config.yaml             # Backstage configuration
├── packages/
│   ├── app/                    # React frontend with TechDocs, API Explorer & Radar
│   └── backend/                # Node.js backend with catalog and proxy plugins
└── examples/
    └── architecture-showcase/
        ├── catalog-entities.yaml   # Backstage entities (Components, APIs, Systems, Groups)
        ├── apis/
        │   ├── mission-control-api.yaml       # OpenAPI 3.0 specification
        │   └── robot-telemetry-asyncapi.yaml  # AsyncAPI 3.0 specification
        └── docs/
            ├── mkdocs.yml          # TechDocs structure
            ├── index.md            # Architecture overview
            └── adrs/               # Version-controlled Architecture Decision Records
                ├── 001-use-ros2-robotics-middleware.md
                ├── 002-use-zenoh-edge-to-cloud.md
                └── 003-contract-first-api-design.md
```
