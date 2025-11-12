import React from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './pagination.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Pagination = ({
  page,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  disabled = false,
  shadow,
  loading = false,
  // colors
  pagerLabelColor,
  pagerSelectTextColor,
  pagerSelectBgColor,
  pagerSelectBorderColor,
  pagerButtonTextColor,
  pagerButtonBgColor,
  pagerButtonBorderColor,
  pagerActiveButtonTextColor,
  pagerActiveButtonBgColor,
  pagerActiveButtonBorderColor,
  pagerStatusTextColor,
  // custom select palette
  customSelect = true,
  pagerSelectRadius,
  pagerSelectFontSize,
  pagerSelectMenuBgColor,
  pagerSelectMenuTextColor,
  pagerSelectMenuBorderColor,
  pagerSelectOptionHoverBgColor,
  pagerSelectOptionActiveBgColor,
  pagerSelectShadow,
  pagerSelectMenuMaxHeight,
  pagerSelectZIndex,
  // dimensions
  pagerFontSize,
  pagerSelectWidth,
  pagerSelectHeight,
  pagerSelectOptionHeight,
  pagerButtonMinWidth,
  pagerButtonHeight,
  pagerControlsGap,
  pagerListGap,
  pagerStatusFontSize,
  // hover for cells
  pagerButtonHoverBgColor,
  pagerButtonHoverBorderColor,
  pagerButtonHoverTextColor,
  pagerSelectHoverBgColor,
  as,
  className,
  role = 'navigation',
  style,
  hidden,
  ...rest
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize || 1));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);
  const btnRef = React.useRef(null);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    function onDocDown(e) {
      if (!menuOpen) return;
      if (btnRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setMenuOpen(false);
    }
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [menuOpen]);

  function goto(newPage) {
    if (disabled) return;
    const clamped = Math.min(Math.max(1, newPage), totalPages);
    if (clamped !== currentPage) onPageChange?.(clamped);
  }

  const canPrev = currentPage > 1 && !disabled;
  const canNext = currentPage < totalPages && !disabled;

  const pagesToShow = [];
  const maxButtons = 5;
  const start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const end = Math.min(totalPages, start + maxButtons - 1);
  for (let i = Math.max(1, end - maxButtons + 1); i <= end; i += 1) pagesToShow.push(i);

  const Root = as || 'nav';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  let cellShadow;
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) cellShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') cellShadow = 'var(--sb-shadow-0)';
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  if (pagerFontSize) mergedStyle.fontSize = pagerFontSize;
  if (pagerButtonHoverBgColor) mergedStyle['--sb-pager-btn-hover-bg'] = pagerButtonHoverBgColor;
  if (pagerButtonHoverBorderColor) mergedStyle['--sb-pager-btn-hover-border'] = pagerButtonHoverBorderColor;
  if (pagerButtonHoverTextColor) mergedStyle['--sb-pager-btn-hover-color'] = pagerButtonHoverTextColor;
  if (pagerSelectHoverBgColor) mergedStyle['--sb-pagerselect-hover-bg'] = pagerSelectHoverBgColor;
  const selectStyle = {
    color: pagerSelectTextColor,
    background: pagerSelectBgColor,
    borderColor: pagerSelectBorderColor,
    width: pagerSelectWidth,
    height: pagerSelectHeight,
  };
  const labelStyle = { color: pagerLabelColor };
  const statusStyle = { color: pagerStatusTextColor, fontSize: pagerStatusFontSize };
  const btnStyle = {
    color: pagerButtonTextColor,
    background: pagerButtonBgColor,
    borderColor: pagerButtonBorderColor,
    minWidth: pagerButtonMinWidth,
    height: pagerButtonHeight,
    boxShadow: cellShadow,
  };
  const activeBtnStyle = {
    color: pagerActiveButtonTextColor,
    background: pagerActiveButtonBgColor,
    borderColor: pagerActiveButtonBorderColor,
    minWidth: pagerButtonMinWidth,
    height: pagerButtonHeight,
    boxShadow: cellShadow,
  };
  const customBtnStyle = {
    color: pagerSelectTextColor,
    background: pagerSelectBgColor,
    borderColor: pagerSelectBorderColor,
    width: pagerSelectWidth,
    height: pagerSelectHeight,
    borderRadius: pagerSelectRadius,
    fontSize: pagerSelectFontSize,
    boxShadow: cellShadow,
  };
  const menuStyle = {
    background: pagerSelectMenuBgColor,
    color: pagerSelectMenuTextColor,
    borderColor: pagerSelectMenuBorderColor,
    boxShadow: pagerSelectShadow,
    maxHeight: pagerSelectMenuMaxHeight,
    zIndex: pagerSelectZIndex,
    borderRadius: pagerSelectRadius,
  };
  const optionBaseStyle = {
    height: pagerSelectOptionHeight || '20px',
    minHeight: pagerSelectOptionHeight || '20px',
    fontSize: pagerSelectFontSize,
    borderRadius: pagerSelectRadius,
  };
  return (
    <Root className={`sb-pagination ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''} ${className || ''}`.trim()} role={role} aria-label="Pagination" style={mergedStyle} {...rest}>
      <div className="sb-pagination__sizes">
        <label>
          <span className="sb-pagination__label" style={labelStyle}>Rows per page:</span>
          {customSelect ? (
            <span className="sb-pagerselect">
              <button
                ref={btnRef}
                type="button"
                className="sb-pagerselect__btn"
                aria-haspopup="listbox"
                aria-expanded={menuOpen}
                disabled={disabled}
                onClick={() => { if (!disabled) { setMenuOpen(!menuOpen); setHighlightIndex(pageSizeOptions.findIndex((n) => n === pageSize)); } }}
                onKeyDown={(e) => {
                  if (disabled) return;
                  if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setMenuOpen(true);
                    setHighlightIndex((idx) => (idx >= 0 ? idx : pageSizeOptions.findIndex((n) => n === pageSize)));
                  }
                }}
                style={customBtnStyle}
              >
                <span>{pageSize}</span>
                <span className="sb-pagerselect__chev">▾</span>
              </button>
              {menuOpen ? (
                <div
                  ref={menuRef}
                  role="listbox"
                  className="sb-pagerselect__menu"
                  tabIndex={-1}
                  style={menuStyle}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') { setMenuOpen(false); return; }
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      setHighlightIndex((i) => Math.min(pageSizeOptions.length - 1, (i < 0 ? 0 : i + 1)));
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      setHighlightIndex((i) => Math.max(0, (i <= 0 ? 0 : i - 1)));
                    } else if (e.key === 'Enter') {
                      e.preventDefault();
                      const i = highlightIndex >= 0 ? highlightIndex : pageSizeOptions.findIndex((n) => n === pageSize);
                      const val = pageSizeOptions[i] ?? pageSize;
                      onPageSizeChange?.(Number(val));
                      setMenuOpen(false);
                    }
                  }}
                >
                  {pageSizeOptions.map((n, i) => {
                    const isActive = n === pageSize;
                    const isHover = highlightIndex === i;
                    const bg = isActive ? (pagerSelectOptionActiveBgColor || undefined) : isHover ? (pagerSelectOptionHoverBgColor || undefined) : undefined;
                    const color = undefined;
                    return (
                      <div
                        key={n}
                        role="option"
                        aria-selected={isActive}
                        className={`sb-pagerselect__opt ${isActive ? 'is-active' : ''}`.trim()}
                        style={{ ...optionBaseStyle, background: bg, color }}
                        onMouseEnter={() => setHighlightIndex(i)}
                        onMouseLeave={() => setHighlightIndex(-1)}
                        onClick={() => { onPageSizeChange?.(Number(n)); setMenuOpen(false); }}
                      >
                        <span style={{ width: 16, textAlign: 'center', opacity: isActive ? 1 : 0 }}>✓</span>
                        <span>{n}</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </span>
          ) : (
            <select
              className="sb-pagination__select"
              value={String(pageSize)}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              disabled={disabled}
              aria-label="Rows per page"
              style={selectStyle}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={String(n)}>{n}</option>
              ))}
            </select>
          )}
        </label>
      </div>

      <div className="sb-pagination__controls" style={pagerControlsGap ? { gap: pagerControlsGap } : undefined}>
        <button
          type="button"
          className="sb-pagination__btn"
          onClick={() => goto(1)}
          disabled={!canPrev}
          aria-label="First page"
          style={btnStyle}
        >«</button>
        <button
          type="button"
          className="sb-pagination__btn"
          onClick={() => goto(currentPage - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
          style={btnStyle}
        >‹</button>

        <ul className="sb-pagination__list" style={pagerListGap ? { gap: pagerListGap } : undefined}>
          {pagesToShow.map((p) => (
            <li key={p}>
              <button
                type="button"
                className={`sb-pagination__btn ${p === currentPage ? 'is-active' : ''}`}
                aria-current={p === currentPage ? 'page' : undefined}
                onClick={() => goto(p)}
                disabled={disabled}
                style={p === currentPage ? activeBtnStyle : btnStyle}
              >{p}</button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="sb-pagination__btn"
          onClick={() => goto(currentPage + 1)}
          disabled={!canNext}
          aria-label="Next page"
          style={btnStyle}
        >›</button>
        <button
          type="button"
          className="sb-pagination__btn"
          onClick={() => goto(totalPages)}
          disabled={!canNext}
          aria-label="Last page"
          style={btnStyle}
        >»</button>
      </div>

      <div className="sb-pagination__status" aria-live="polite" style={statusStyle}>
        Page {currentPage} of {totalPages}
      </div>
    </Root>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  disabled: PropTypes.bool,
};


