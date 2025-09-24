import { addons } from 'storybook/internal/manager-api';
import { create } from 'storybook/internal/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'NSM COMPONENT LIBRARY',
    brandUrl: 'https://github.com/pranavwaykar/nsm-component-library'
  })
});


