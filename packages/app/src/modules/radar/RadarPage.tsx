
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  ItemCardGrid,
} from '@backstage/core-components';
import { Card, CardContent, Typography, Chip, Grid, Divider } from '@material-ui/core';

interface RadarEntry {
  name: string;
  ring: 'Adopt' | 'Trial' | 'Assess' | 'Hold';
  quadrant: string;
  description: string;
}

const radarEntries: RadarEntry[] = [
  // Techniques
  {
    name: 'Event-Driven Architecture',
    ring: 'Adopt',
    quadrant: 'Techniques',
    description: 'Asynchronous event decoupling edge robot clients from cloud dispatch.',
  },
  {
    name: 'Lightweight ADRs',
    ring: 'Adopt',
    quadrant: 'Techniques',
    description: 'Version-controlled architecture decision records in Git.',
  },
  {
    name: 'Canary Deployments',
    ring: 'Trial',
    quadrant: 'Techniques',
    description: 'Progressive firmware rollout deploying to a 5% sub-fleet first.',
  },
  {
    name: 'Monolithic Firmware',
    ring: 'Hold',
    quadrant: 'Techniques',
    description: 'Legacy monolithic firmware pattern replaced by modular ROS 2 nodes.',
  },

  // Platforms
  {
    name: 'ROS 2',
    ring: 'Adopt',
    quadrant: 'Platforms',
    description: 'Core robotics middleware for sensing, navigation, and actuator control.',
  },
  {
    name: 'Kafka',
    ring: 'Adopt',
    quadrant: 'Platforms',
    description: 'Event streaming platform for fleet-wide telemetry and mission events.',
  },
  {
    name: 'Zenoh',
    ring: 'Trial',
    quadrant: 'Platforms',
    description: 'Zero-overhead data protocol for efficient robot-to-cloud communication.',
  },

  // Tools
  {
    name: 'Docker',
    ring: 'Adopt',
    quadrant: 'Tools',
    description: 'Standard container runtime for reproducible edge and cloud microservices.',
  },
  {
    name: 'Structurizr / C4',
    ring: 'Adopt',
    quadrant: 'Tools',
    description: 'Diagrams as Code tooling to express C4 architecture models in VCS.',
  },
  {
    name: 'Foxglove Studio',
    ring: 'Trial',
    quadrant: 'Tools',
    description: 'Robotics telemetry diagnostics studio for inspecting live and recorded ROS 2 topics.',
  },

  // Languages & Frameworks
  {
    name: 'Python',
    ring: 'Adopt',
    quadrant: 'Languages & Frameworks',
    description: 'Primary language for AI perception, route planning models, and data pipelines.',
  },
  {
    name: 'C++20',
    ring: 'Adopt',
    quadrant: 'Languages & Frameworks',
    description: 'Primary language for high-performance low-level motor control and sensor drivers.',
  },
  {
    name: 'FastAPI',
    ring: 'Adopt',
    quadrant: 'Languages & Frameworks',
    description: 'High-performance async Python framework for merchant and customer REST APIs.',
  },
  {
    name: 'Rust',
    ring: 'Trial',
    quadrant: 'Languages & Frameworks',
    description: 'Memory-safe systems programming language evaluated for safety-critical edge nodes.',
  },
];

const ringColors: Record<string, string> = {
  Adopt: '#4caf50',
  Trial: '#2196f3',
  Assess: '#ff9800',
  Hold: '#f44336',
};

export const RadarPage = () => {
  const quadrants = ['Techniques', 'Platforms', 'Tools', 'Languages & Frameworks'];

  return (
    <Page themeId="tool">
      <Header
        title="Technology Radar"
        subtitle="Strategic technology guidance & portfolio for the Autonomous Delivery Robot System"
      >
        <HeaderLabel label="Owner" value="Architecture Guild" />
        <HeaderLabel label="Cycle" value="2026.1" />
      </Header>
      <Content>
        <ContentHeader title="Technology Quadrants & Maturity Rings" />
        <Grid container spacing={3}>
          {quadrants.map(quadrant => {
            const items = radarEntries.filter(e => e.quadrant === quadrant);
            return (
              <Grid item xs={12} md={6} key={quadrant}>
                <Card variant="outlined" style={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 700 }}>
                      {quadrant}
                    </Typography>
                    <Divider style={{ marginBottom: 16 }} />
                    <ItemCardGrid>
                      {items.map(item => (
                        <Card key={item.name} variant="elevation" style={{ padding: 12 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                              {item.name}
                            </Typography>
                            <Chip
                              size="small"
                              label={item.ring}
                              style={{
                                backgroundColor: ringColors[item.ring],
                                color: '#fff',
                                fontWeight: 600,
                              }}
                            />
                          </div>
                          <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
                            {item.description}
                          </Typography>
                        </Card>
                      ))}
                    </ItemCardGrid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Content>
    </Page>
  );
};
