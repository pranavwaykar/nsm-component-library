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
  as,
  className,
  role = 'navigation',
  style,
  hidden,
  ...rest
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize || 1));
  const currentPage = Math.min(Math.max(1, page), totalPages);

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
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') mergedStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const selectStyle = {
    color: pagerSelectTextColor,
    background: pagerSelectBgColor,
    borderColor: pagerSelectBorderColor,
  };
  const labelStyle = { color: pagerLabelColor };
  const statusStyle = { color: pagerStatusTextColor };
  const btnStyle = {
    color: pagerButtonTextColor,
    background: pagerButtonBgColor,
    borderColor: pagerButtonBorderColor,
  };
  const activeBtnStyle = {
    color: pagerActiveButtonTextColor,
    background: pagerActiveButtonBgColor,
    borderColor: pagerActiveButtonBorderColor,
  };
  return (
    <Root className={`sb-pagination ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''} ${className || ''}`.trim()} role={role} aria-label="Pagination" style={mergedStyle} {...rest}>
      <div className="sb-pagination__sizes">
        <label>
          <span className="sb-pagination__label" style={labelStyle}>Rows per page:</span>
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
        </label>
      </div>

      <div className="sb-pagination__controls">
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

        <ul className="sb-pagination__list">
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


