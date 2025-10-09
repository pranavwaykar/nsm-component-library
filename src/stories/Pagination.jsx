import React from 'react';
import PropTypes from 'prop-types';
import './shared/tokens.css';
import './Pagination/pagination.scss';

export const Pagination = ({
  page,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  disabled = false,
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

  return (
    <nav className="sb-pagination" role="navigation" aria-label="Pagination">
      <div className="sb-pagination__sizes">
        <label>
          <span className="sb-pagination__label">Rows per page:</span>
          <select
            className="sb-pagination__select"
            value={String(pageSize)}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            disabled={disabled}
            aria-label="Rows per page"
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
        >«</button>
        <button
          type="button"
          className="sb-pagination__btn"
          onClick={() => goto(currentPage - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
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
        >›</button>
        <button
          type="button"
          className="sb-pagination__btn"
          onClick={() => goto(totalPages)}
          disabled={!canNext}
          aria-label="Last page"
        >»</button>
      </div>

      <div className="sb-pagination__status" aria-live="polite">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
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


