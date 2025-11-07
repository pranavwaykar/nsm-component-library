import React, { useEffect } from 'react';

export const argTypes = {
  customUserdefinedProp: { control: 'text' },
};

export const args = {
  customUserdefinedProp: '',
};

function ensureControlsSearch() {
  try {
    const parentDoc = window.parent && window.parent.document ? window.parent.document : document;
    const panel = parentDoc.querySelector('[data-testid="addon-controls"]');
    if (!panel) return;
    let host = panel.querySelector('#cmp-controls-search-host');
    if (!host) {
      host = parentDoc.createElement('div');
      host.id = 'cmp-controls-search-host';
      host.style.cssText = 'display:flex; justify-content:flex-end; padding:6px 8px; position:sticky; top:0; background:var(--sb-background, #fff); z-index:1;';
      panel.prepend(host);
      const input = parentDoc.createElement('input');
      input.type = 'search';
      input.placeholder = 'Search props...';
      input.style.cssText = 'width:220px; height:28px; border:1px solid #d1d5db; border-radius:6px; padding:4px 8px;';
      host.appendChild(input);
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
  } catch (_) {}
}

export const decorators = [
  (Story) => {
    useEffect(() => {
      const id = setTimeout(() => ensureControlsSearch(), 0);
      return () => clearTimeout(id);
    });
    return <Story />;
  },
];


