// Global Storybook parameters
// Prefix copied code blocks with a CDN stylesheet link so users get the same styling

/** @type { import('@storybook/react').Preview } */
export const parameters = {
  docs: {
    source: {
      transform: (src /* string */, ctx) => {
        const cdnCss = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cmp-library@latest/dist/styles.css" />';
        return `${cdnCss}\n${src}`;
      },
    },
  },
};

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