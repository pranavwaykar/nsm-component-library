import React from 'react';
import './SearchBar.scss';

const SearchBar = ({ value, onChange, placeholder = 'Search within all folders and content, or a specific folder’s content' }) => {
  const [active, setActive] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => { if (active) ref.current?.focus(); }, [active]);

  return (
    <div className={`search-comp ${active ? 'active' : ''}`}>
      <div className="sc-folder-select">
        <div className="sc-icon"><i className="icon-folder" /></div>
        <div className="sc-folder-select-content">All (selected folder)</div>
        <div className="sc-icon"><i className="icon-chevron-down" /></div>
      </div>
      <div className="sc-input">
        <div className="sc-icon" onClick={() => setActive(true)}><i className="icon-magnifying-glass" /></div>
        <div className="sc-input-content">
          {active || value ? (
            <input ref={ref} type="text" value={value} onChange={(e) => onChange?.(e.target.value)} onBlur={() => setActive(false)} />
          ) : (
            <div onClick={() => setActive(true)}>{placeholder}</div>
          )}
        </div>
        <div className="sc-icon"><i className="icon-microphone" /></div>
      </div>
    </div>
  );
};

export default SearchBar;


