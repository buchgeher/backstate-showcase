import { createFrontendPlugin, PageBlueprint } from '@backstage/frontend-plugin-api';
import { RadarPage } from './RadarPage';

export const customTechRadarPlugin = createFrontendPlugin({
  pluginId: 'tech-radar',
  extensions: [
    PageBlueprint.make({
      params: {
        path: '/tech-radar',
        loader: () => Promise.resolve(<RadarPage />),
      },
    }),
  ],
});
