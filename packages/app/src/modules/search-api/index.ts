import { ApiBlueprint, createFrontendPlugin } from '@backstage/frontend-plugin-api';
import { discoveryApiRef, fetchApiRef } from '@backstage/core-plugin-api';
import { searchApiRef, MockSearchApi } from '@backstage/plugin-search-react';

export const searchApi = ApiBlueprint.make({
  name: 'query-service',
  params: defineParams =>
    defineParams({
      api: searchApiRef,
      deps: { discoveryApi: discoveryApiRef, fetchApi: fetchApiRef },
      factory: () => new MockSearchApi(),
    }),
});

export const searchApiPlugin = createFrontendPlugin({
  pluginId: 'search',
  extensions: [searchApi],
});
