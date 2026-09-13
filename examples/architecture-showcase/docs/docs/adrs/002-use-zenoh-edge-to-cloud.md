# ADR-002: Using Zenoh for Edge-to-Cloud Telemetry Communication

## Status
**Accepted** (Maturity: Trial)

## Context
While ROS 2 and DDS excel at intra-robot communication over local Ethernet/shared-memory buses, standard DDS multicast discovery behaves poorly over unreliable 4G/5G mobile cellular networks. Robots frequently drop packets, enter urban canyons with spotty coverage, and consume excessive mobile bandwidth due to heartbeat chatter.

## Decision
We introduce **Eclipse Zenoh** as the edge-to-cloud telemetry and control bridge:
- A Zenoh ROS 2 plugin runs on each robot, mapping selected ROS 2 topics (`/telemetry`, `/battery_state`, `/alerts`) to lightweight Zenoh pub/sub keys.
- A central Zenoh router in the cloud ingests telemetric streams with sub-millisecond protocol overhead (5 bytes per message).
- Kafka connectors in the cloud ingest Zenoh data into the backend event bus.

## Consequences
### Positive:
- **Bandwidth Reduction:** 90%+ less network chatter compared to raw DDS over VPN.
- **Resilience:** Built-in caching, fragmented message handling, and automatic reconnection over flaky 5G links.
- **Zero Configuration:** No complex VPN meshes required for each robot in the field.

### Negative / Trade-offs:
- Adds an additional architectural component (Zenoh Router) in cloud infrastructure.
- Requires team training on Zenoh key-expression semantics.
