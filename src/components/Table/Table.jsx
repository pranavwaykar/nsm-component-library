import React, { useMemo, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../stories/theme.tokens.scss';
import './table.scss';

function defaultFilter(rows, query, columns) {
  if (!query) return rows;
  const q = String(query).toLowerCase();
  return rows.filter((row) =>
    columns.some((col) => String(row[col.accessor] ?? '').toLowerCase().includes(q))
  );
}

export const Table = forwardRef(({
  columns,
  data,
  initialSort,
  expandable = true,
  rowActions,
  responsive = true,
  renderSubRow,
  page = 1,
  pageSize = 10,
  totalPages,
  onPageChange,
  as,
  ...rest
}, ref) => {
  const [sortBy, setSortBy] = useState(initialSort?.by || null);
  const [sortDir, setSortDir] = useState(initialSort?.dir || 'asc');
  const [expanded, setExpanded] = useState({});

  const sorted = useMemo(() => {
    const base = data;
    if (!sortBy) return base;
    const sortedCopy = [...base].sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];
      if (av == null && bv == null) return 0;
      if (av == null) return -1;
      if (bv == null) return 1;
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    });
    return sortDir === 'asc' ? sortedCopy : sortedCopy.reverse();
  }, [data, sortBy, sortDir, columns]);

  const startIdx = (page - 1) * pageSize;
  const pageRows = sorted.slice(startIdx, startIdx + pageSize);

  function toggleSort(accessor) {
    if (sortBy !== accessor) {
      setSortBy(accessor);
      setSortDir('asc');
      return;
    }
    if (sortDir === 'asc') {
      setSortDir('desc');
      return;
    }
    setSortBy(null);
    setSortDir('asc');
  }

  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const Root = as || 'div';
  return (
    <Root ref={ref} className={responsive ? 'sb-table__wrap' : undefined} {...rest}>
      <table className="sb-table">
        <thead>
          <tr>
            {expandable && <th aria-label="expander" />}
            {columns.map((col) => {
              const isActive = sortBy === col.accessor;
              const dir = isActive ? sortDir : 'neutral';
              return (
                <th key={col.accessor}>
                  <button type="button" className={`sb-table__thbtn ${isActive ? 'is-active' : ''}`} onClick={() => toggleSort(col.accessor)}>
                    <span>{col.header}</span>
                    <span className={`sb-sort-icon ${dir}`} aria-hidden>
                      <svg viewBox="0 0 24 24" width="12" height="12"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </button>
                </th>
              );
            })}
            {rowActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row, idx) => {
            const rowId = row.id ?? startIdx + idx;
            const isOpen = !!expanded[rowId];
            return (
              <React.Fragment key={rowId}>
                <tr className={isOpen ? 'is-open' : undefined}>
                  {expandable && (
                    <td className="sb-table__expander">
                      <button type="button" className={`sb-table__iconbtn ${isOpen ? 'is-open' : ''}`} aria-label={isOpen ? 'Collapse row' : 'Expand row'} onClick={() => toggleExpand(rowId)}>
                        <svg className={`sb-table__chev ${isOpen ? 'is-open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.accessor} data-col={col.accessor}>
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="sb-table__actions">
                      <button className="sb-btn sb-btn--primary storybook-button--small" onClick={() => rowActions(row, 'edit')}>Edit</button>{' '}
                      <button className="sb-btn storybook-button--secondary storybook-button--small" onClick={() => rowActions(row, 'delete')}>Delete</button>
                    </td>
                  )}
                </tr>
                {expandable && isOpen && renderSubRow && (
                  <tr className="sb-table__subrow">
                    <td colSpan={(columns?.length || 0) + (rowActions ? 2 : 1)}>
                      {renderSubRow(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {typeof totalPages === 'number' && totalPages > 1 ? (
        <div className="sb-table__pagination">
          <button className="sb-table__pagebtn" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>Prev</button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} className={`sb-table__pagebtn ${page === i + 1 ? 'is-active' : ''}`} onClick={() => onPageChange?.(i + 1)}>{i + 1}</button>
          ))}
          <button className="sb-table__pagebtn" disabled={page >= totalPages} onClick={() => onPageChange?.(page + 1)}>Next</button>
        </div>
      ) : null}
    </Root>
  );
});

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({ header: PropTypes.string.isRequired, accessor: PropTypes.string.isRequired, render: PropTypes.func })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialSort: PropTypes.shape({ by: PropTypes.string, dir: PropTypes.oneOf(['asc', 'desc']) }),
  filterable: PropTypes.bool,
  expandable: PropTypes.bool,
  rowActions: PropTypes.func,
  responsive: PropTypes.bool,
  renderSubRow: PropTypes.func,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  as: PropTypes.elementType,
};


