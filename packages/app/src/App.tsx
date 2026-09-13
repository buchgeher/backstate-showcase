import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import apiDocsPlugin from '@backstage/plugin-api-docs/alpha';
import techdocsPlugin from '@backstage/plugin-techdocs/alpha';
import { techRadarPlugin, TechRadarPage } from '@backstage/plugin-tech-radar';
import { convertLegacyPlugin, convertLegacyPageExtension } from '@backstage/core-compat-api';
import { navModule } from './modules/nav';
import { homeModule } from './modules/home';

const RadarPageComponent = () => (
  <TechRadarPage width={1400} height={800} />
);

const convertedTechRadarPlugin = convertLegacyPlugin(techRadarPlugin, {
  extensions: [
    convertLegacyPageExtension(RadarPageComponent, {
      path: '/tech-radar',
    }),
  ],
});

export default createApp({
  features: [
    catalogPlugin,
    apiDocsPlugin,
    techdocsPlugin,
    convertedTechRadarPlugin,
    navModule,
    homeModule,
  ],
});
