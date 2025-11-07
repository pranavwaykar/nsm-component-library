import React, { useCallback } from 'react';
import { addons, types, useStorybookApi, useStorybookState } from 'storybook/internal/manager-api';
import { IconButton } from 'storybook/internal/components';
import { create } from 'storybook/internal/theming';


const EXPAND_ADDON_ID = 'toolbar-expand-all';
const EXPAND_TOOL_ID = `${EXPAND_ADDON_ID}/tool`;
const SET_CURRENT_STORY = 'setCurrentStory';

function SidebarExpandTool() {
  const api = useStorybookApi();
  useStorybookState();

  const query = (sel, root = document) => Array.from((root || document).querySelectorAll(sel));
  const getTree = () => document.querySelector('#storybook-explorer-tree') || document.body;
  const getToggles = useCallback(() => query('button[aria-expanded]', getTree()), []);

  const anyCollapsed = useCallback(() => getToggles().some((b) => b.getAttribute('aria-expanded') === 'false'), [getToggles]);

  const expandAll = useCallback(async () => {
    let pass = 0;
    while (pass++ < 6) {
      const collapsed = getToggles().filter((b) => b.getAttribute('aria-expanded') === 'false');
      if (!collapsed.length) break;
      for (const b of collapsed) b.click();
      await new Promise((r) => setTimeout(r, 32));
    }
  }, [getToggles]);

  const collapseAll = useCallback((skip = new Set()) => {
    const open = getToggles().filter((b) => b.getAttribute('aria-expanded') === 'true');
    open.forEach((btn) => { if (!skip.has(btn)) btn.click(); });
  }, [getToggles]);

  const handleClick = useCallback(async () => {
    const urlState = (api.getUrlState && api.getUrlState()) || {};
    const currentId = urlState.storyId || (api.getCurrentStoryData && api.getCurrentStoryData()?.id);
    const currentSearch = window.location.search;
    const savedUrl = window.location.pathname + window.location.search + window.location.hash;
    const activeLink = getTree().querySelector('a[aria-current="page"], a[aria-selected="true"], [data-selected="true"], a[data-item-id][data-selected="true"]');
    const activeHref = activeLink?.getAttribute('href');
    const skipSet = new Set();
    if (activeLink) {

      let el = activeLink.parentElement;
      while (el && el.id !== 'storybook-explorer-tree') {
        const toggle = el.querySelector(':scope > button[aria-expanded]');
        if (toggle) skipSet.add(toggle);
        el = el.parentElement;
      }
    }

    const targetUrl = currentSearch + (window.location.hash || '');
    let block = true;
    const channel = addons.getChannel();
    const preventStoryChange = ({ storyId }) => {
      if (!block) return;
      if (currentId && storyId !== currentId) {
        try {
          if (urlState.viewMode) api.selectStory(currentId, urlState.viewMode);
          else api.selectStory(currentId);
        } catch (_) {}
      }
    };
    channel.on(SET_CURRENT_STORY, preventStoryChange);
    const guard = () => { if (block) try { history.replaceState(null, '', targetUrl); } catch (_) {} };
    const onHash = () => guard();
    const onPop = () => guard();
    window.addEventListener('hashchange', onHash, true);
    window.addEventListener('popstate', onPop, true);

    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);
    history.pushState = function(...args) { if (!block) return origPush(...args); };
    history.replaceState = function(...args) { if (!block) return origReplace(...args); };

    if (anyCollapsed()) await expandAll(); else collapseAll(skipSet);

    const restore = (attempts = 4) => {
      try {
        if (activeHref) getTree().querySelector(`a[href='${activeHref}']`)?.click();
        if (currentId && api.selectStory) {
          if (urlState.viewMode) api.selectStory(currentId, urlState.viewMode);
          else api.selectStory(currentId);
        }
        if (window.location.search !== currentSearch) try { history.replaceState(null, '', currentSearch); } catch (_) {}

        const currentFull = window.location.pathname + window.location.search + window.location.hash;
        if (currentFull !== savedUrl) {
          try { history.replaceState(null, '', savedUrl); } catch (_) { window.location.hash = savedUrl.split('#')[1] || ''; }
        }
      } catch (_) {}
      if (attempts === 1) {
        block = false;
        window.removeEventListener('hashchange', onHash, true);
        window.removeEventListener('popstate', onPop, true);
        channel.off(SET_CURRENT_STORY, preventStoryChange);
        history.pushState = origPush;
        history.replaceState = origReplace;
      }
      if (attempts > 1) setTimeout(() => restore(attempts - 1), 32);
    };
    requestAnimationFrame(() => restore());
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

// Inject a search box into the Controls panel header and filter rows
function injectControlsSearch() {
  const root = document;
  const panel = root.querySelector('[data-testid="addon-controls"]')
    || root.querySelector('#panel-tab-content')
    || root.querySelector('[id^="panel-tab-content"]')
    || root.querySelector('[role="tabpanel"] [data-addons="controls"]');
  if (!panel) return;
  if (panel.querySelector('#cmp-controls-search-host')) return;
  const host = root.createElement('div');
  host.id = 'cmp-controls-search-host';
  host.style.cssText = 'display:flex; justify-content:flex-end; position:sticky; top:0; background:var(--sb-background, #fff); padding:6px 8px; z-index:1;';
  const input = root.createElement('input');
  input.type = 'search';
  input.placeholder = 'Search props…';
  input.style.cssText = 'width:220px; height:28px; border:1px solid #d1d5db; border-radius:6px; padding:4px 8px;';
  host.appendChild(input);
  panel.prepend(host);
  const apply = () => {
    const q = (input.value || '').toLowerCase();
    const rows = panel.querySelectorAll('[role="row"],[data-name]');
    rows.forEach((row) => {
      const text = (row.textContent || '').toLowerCase();
      const match = !q || text.includes(q);
      row.style.display = match ? '' : 'none';
    });
  };
  input.addEventListener('input', apply);
}

// Observe DOM changes to (re)inject when Controls mounts
const observer = new MutationObserver(() => {
  try { injectControlsSearch(); } catch (_) {}
});
observer.observe(document.documentElement, { childList: true, subtree: true });

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'NSM COMPONENT LIBRARY',
    brandUrl: 'https://github.com/pranavwaykar/nsm-component-library'
  })
});


