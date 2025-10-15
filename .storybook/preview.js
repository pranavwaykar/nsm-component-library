import '@flaticon/flaticon-uicons/css/all/all.css';
import '@flaticon/flaticon-uicons/css/brands/all.css';
// Removed remote icon CSS due to CORS in Storybook. Icons are provided via Flaticon or inline SVG.
/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;