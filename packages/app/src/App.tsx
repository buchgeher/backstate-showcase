import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import apiDocsPlugin from '@backstage/plugin-api-docs/alpha';
import techdocsPlugin from '@backstage/plugin-techdocs/alpha';
import notificationsPlugin from '@backstage/plugin-notifications/alpha';
import { navModule } from './modules/nav';
import { homeModule } from './modules/home';

export default createApp({
  features: [
    catalogPlugin,
    apiDocsPlugin,
    techdocsPlugin,
    notificationsPlugin,
    navModule,
    homeModule,
  ],
});
