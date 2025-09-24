import { addons } from '@storybook/manager-api';
import { create, themes } from '@storybook/theming';

addons.setConfig({
  theme: create({
    ...themes.light,
    brandTitle: 'cmp-library',
    brandUrl: 'https://github.com/pranavwaykar/nsm-component-library',
    brandImage: '/vite.svg'
  })
});


