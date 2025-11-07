import React, { useEffect, useMemo, useRef, useState } from 'react';
import { addons, useStorybookState } from '@storybook/manager-api';
import { UPDATE_STORY_ARGS } from '@storybook/core-events';

export const PropSearchTool = () => {
  const [query, setQuery] = useState('');
  const debounced = useDebounced(query, 120);

  useEffect(() => {
    // Attempt to find the Controls panel content
    const panelRoot = document.querySelector('[data-testid=\"addon-controls\"]') || document.querySelector('#panel-tab-content');
    if (!panelRoot) return;
    const rows = panelRoot.querySelectorAll('[role=\"row\"],[data-name]');
    rows.forEach((row) => {
      const text = row.textContent || '';
      const match = debounced.trim() === '' || text.toLowerCase().includes(debounced.toLowerCase());
      row.style.display = match ? '' : 'none';
    });
  }, [debounced]);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <input
        aria-label=\"Search props\"
        placeholder=\"Search props...\"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: 180,
          height: 26,
          border: '1px solid #d1d5db',
          borderRadius: 6,
          padding: '2px 8px',
          background: 'var(--sb-background, #fff)',
        }}
      />
    </div>
  );
};

export const CustomArgsPanel = () => {
  const state = useStorybookState();
  const storyId = state?.storyId;
  const channel = addons.getChannel();
  const [keyName, setKeyName] = useState('');
  const [rawValue, setRawValue] = useState('');
  const [pairs, setPairs] = useState([]);

  function parseValue(input) {
    if (input === 'true') return true;
    if (input === 'false') return false;
    if (input === 'null') return null;
    if (input === '' || input === undefined) return '';
    // try number
    if (!Number.isNaN(Number(input)) && input.trim() !== '') return Number(input);
    // try JSON
    try { return JSON.parse(input); } catch (e) { /* ignore */ }
    return input;
  }

  function addProp() {
    if (!storyId || !keyName) return;
    const value = parseValue(rawValue);
    channel.emit(UPDATE_STORY_ARGS, { storyId, updatedArgs: { [keyName]: value } });
    setPairs((prev) => [...prev, { key: keyName, value: rawValue }]);
    setKeyName('');
    setRawValue('');
  }

  function removeProp(key) {
    if (!storyId || !key) return;
    channel.emit(UPDATE_STORY_ARGS, { storyId, updatedArgs: { [key]: undefined } });
    setPairs((prev) => prev.filter((p) => p.key !== key));
  }

  return (
    <div style={{ padding: 12, display: 'grid', gap: 10 }}>
      <div style={{ display: 'grid', gap: 6 }}>
        <label style={{ fontSize: 12, color: '#374151' }}>Add custom prop</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 6 }}>
          <input placeholder=\"prop name (e.g., data-qa)\" value={keyName} onChange={(e) => setKeyName(e.target.value)} style={inputStyle} />
          <input placeholder='value (e.g., \"orders-table\" or 1 or true)' value={rawValue} onChange={(e) => setRawValue(e.target.value)} style={inputStyle} />
          <button onClick={addProp} style={btnStyle}>Add</button>
        </div>
      </div>
      {pairs.length > 0 ? (
        <div>
          <div style={{ fontSize: 12, color: '#374151', marginBottom: 6 }}>Added props</div>
          <div style={{ display: 'grid', gap: 4 }}>
            {pairs.map((p) => (
              <div key={p.key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 6, alignItems: 'center' }}>
                <code style={codeStyle}>{p.key}</code>
                <code style={codeStyle}>{p.value}</code>
                <button onClick={() => removeProp(p.key)} style={btnStyle}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

function useDebounced(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const inputStyle = {
  height: 28,
  border: '1px solid #d1d5db',
  borderRadius: 6,
  padding: '4px 8px',
};

const btnStyle = {
  height: 28,
  border: '1px solid #d1d5db',
  borderRadius: 6,
  background: '#fff',
  cursor: 'pointer',
};

const codeStyle = {
  display: 'inline-block',
  background: '#f3f4f6',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 12,
};


