import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'cmp-library',
    brandUrl: 'https://github.com/pranavwaykar/nsm-component-library',
    brandImage: '/vite.svg'
  })
});


