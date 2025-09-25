import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './table.scss';

function defaultFilter(rows, query, columns) {
  if (!query) return rows;
  const q = String(query).toLowerCase();
  return rows.filter((row) =>
    columns.some((col) => String(row[col.accessor] ?? '').toLowerCase().includes(q))
  );
}

export const Table = ({
  columns,
  data,
  initialSort,
  filterable = true,
  expandable = true,
  rowActions,
  responsive = true,
  renderSubRow,
}) => {
  const [sortBy, setSortBy] = useState(initialSort?.by || null);
  const [sortDir, setSortDir] = useState(initialSort?.dir || 'asc');
  const [expanded, setExpanded] = useState({});
  const [query, setQuery] = useState('');

  const sorted = useMemo(() => {
    const filtered = defaultFilter(data, query, columns);
    if (!sortBy) return filtered;
    const sortedCopy = [...filtered].sort((a, b) => {
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
  }, [data, sortBy, sortDir, query, columns]);

  function toggleSort(accessor) {
    if (sortBy === accessor) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(accessor);
      setSortDir('asc');
    }
  }

  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className={responsive ? 'sb-table__wrap' : undefined}>
      {filterable && (
        <div className="sb-table__toolbar">
          <input
            className="sb-table__search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      <table className="sb-table">
        <thead>
          <tr>
            {expandable && <th aria-label="expander" />}
            {columns.map((col) => (
              <th key={col.accessor}>
                <button
                  type="button"
                  className="sb-table__thbtn"
                  onClick={() => toggleSort(col.accessor)}
                >
                  <span>{col.header}</span>
                  {sortBy === col.accessor && (
                    <span className="sb-table__sort" aria-hidden>
                      {sortDir === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </button>
              </th>
            ))}
            {rowActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => {
            const rowId = row.id ?? idx;
            const isOpen = !!expanded[rowId];
            return (
              <React.Fragment key={rowId}>
                <tr className={isOpen ? 'is-open' : undefined}>
                  {expandable && (
                    <td className="sb-table__expander">
                      <button
                        type="button"
                        className="sb-table__iconbtn"
                        aria-label={isOpen ? 'Collapse row' : 'Expand row'}
                        onClick={() => toggleExpand(rowId)}
                      >
                        {isOpen ? '▾' : '▸'}
                      </button>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.accessor} data-col={col.accessor}>
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="sb-table__actions">{rowActions(row)}</td>
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
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialSort: PropTypes.shape({ by: PropTypes.string, dir: PropTypes.oneOf(['asc', 'desc']) }),
  filterable: PropTypes.bool,
  expandable: PropTypes.bool,
  rowActions: PropTypes.func,
  responsive: PropTypes.bool,
  renderSubRow: PropTypes.func,
};


