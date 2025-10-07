import React, { useCallback } from 'react';
import { addons, types, useStorybookApi, useStorybookState } from 'storybook/internal/manager-api';
import { IconButton } from 'storybook/internal/components';
import { create } from 'storybook/internal/theming';

const EXPAND_ADDON_ID = 'toolbar-expand-all';
const EXPAND_TOOL_ID = `${EXPAND_ADDON_ID}/tool`;

function SidebarExpandTool() {
  const api = useStorybookApi();
  useStorybookState();

  const getToggles = useCallback(() => {
    const container = document.querySelector('#storybook-explorer-tree') || document.body;
    return Array.from(container.querySelectorAll('button[aria-expanded]'));
  }, []);

  const anyCollapsed = useCallback(() => {
    return getToggles().some((b) => b.getAttribute('aria-expanded') === 'false');
  }, [getToggles]);

  const expandAll = useCallback(async () => {
    for (let i = 0; i < 6; i++) {
      const buttons = getToggles();
      let changed = 0;
      buttons.forEach((btn) => {
        if (btn.getAttribute('aria-expanded') === 'false') {
          btn.click();
          changed++;
        }
      });
      if (!changed) break;
      await new Promise((r) => setTimeout(r, 50));
    }
  }, [getToggles]);

  const collapseAll = useCallback(() => {
    getToggles().forEach((btn) => {
      if (btn.getAttribute('aria-expanded') === 'true') btn.click();
    });
  }, [getToggles]);

  const handleClick = useCallback(() => {
    if (anyCollapsed()) expandAll(); else collapseAll();
    api.setOptions({});
  }, [anyCollapsed, expandAll, collapseAll, api]);

  return (
    <IconButton title={'Expand/Collapse all stories'} onClick={handleClick}>
      {'Expand/Collapse'}
    </IconButton>
  );
}

addons.register(EXPAND_ADDON_ID, () => {
  addons.add(EXPAND_TOOL_ID, {
    title: 'Expand/Collapse',
    type: types.TOOL,
    match: ({ viewMode }) => !!viewMode,
    render: () => <SidebarExpandTool />,
  });
});

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'NSM COMPONENT LIBRARY',
    brandUrl: 'https://github.com/pranavwaykar/nsm-component-library'
  })
});


