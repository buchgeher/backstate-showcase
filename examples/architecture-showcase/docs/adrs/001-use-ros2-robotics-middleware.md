# ADR-001: Adoption of ROS 2 as Robotics Core Middleware

## Status
**Accepted** (Maturity: Adopt)

## Context
The autonomous delivery robot system requires low-latency, publish-subscribe inter-process communication on the edge hardware (NVIDIA Jetson) to connect sensor drivers (LiDAR, stereo cameras, IMU) with perception models and motor controllers.
The previous system used proprietary monolithic IPC loops, making it difficult to integrate third-party navigation packages and scale development across independent sub-teams.

## Decision
We adopt **ROS 2 (Robot Operating System 2 - Jazzy / Iron)** as the standard edge middleware. 
- All sensor drivers, perception nodes, and local path planners will be implemented as modular ROS 2 nodes.
- DDS (Data Distribution Service) serves as the underlying transport layer.
- Communication between safety-critical nodes uses C++20, while AI perception pipelines utilize Python.

## Consequences
### Positive:
- Direct access to the vast open-source robotics ecosystem (Nav2, SLAM Toolbox, sensor drivers).
- Clean architectural separation of concerns through node composition and lifecycle nodes.
- Standardized tooling for bag recording and playback (Foxglove Studio, `ros2 bag`).

### Negative / Trade-offs:
- DDS discovery overhead across wireless edge-to-cloud bridges requires dedicated gateway routing (see ADR-002).
- Node startup memory footprint is higher than proprietary micro-frameworks.
