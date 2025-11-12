import React, { useMemo, useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './table.scss';
import { expandStyleProps } from '../../utils/styleSystem';

function defaultFilter(rows, query, columns) {
  if (!query) return rows;
  const q = String(query).toLowerCase();
  return rows.filter((row) =>
    columns.some((col) => String(row[col.accessor] ?? '').toLowerCase().includes(q))
  );
}

export const Table = forwardRef(({ 
  // core
  columns,
  data,
  rowKey = 'id',
  // UX
  loading = false,
  emptyMessage = 'No data',
  sortable = true,
  filterable = false,
  pagination, // { page, pageSize, total, onPageChange }
  selectable = false,
  onRowSelect,
  onRowClick,
  onSortChange,
  onFilterChange,
  editable = false,
  onEdit,
  showFooter = false,
  // visuals
  variant = 'surface', // 'simple'|'bordered'|'striped'|'hover' mapped to flags below
  size = 'md', // 'sm'|'md'|'lg'
  colorScheme = 'neutral',
  rowHeight,
  virtualized = false, // accepted, not implemented with windowing
  maxHeight,
  stickyHeader = true,
  stickyFooter = false,
  showColumnControls = false,
  onColumnsChange,
  // styling tokens & selected style props
  radius,
  elevation,
  shadow,
  disabled = false,
  headerBgColor,
  rowBgColor,
  rowAltBgColor,
  rowHoverBgColor,
  subrowBgColor,
  menuBgColor,
  mutedTextColor,
  headerPaddingX,
  headerPaddingY,
  cellPaddingX,
  cellPaddingY,
  headerFontSize,
  cellFontSize,
  style,
  bg,
  bgColor,
  color: textColor,
  borderColor,
  // column augmentation
  extraColumns = [],
  extraColumnsPlacement = 'end', // 'start' | 'end' | number via per-item at/index
  // toolbar injection
  toolbarRight,
  // expansion & row menu
  expandedContent,
  rowMenu,
  onRowMenu,
  optionsMenu,
  // existing features
  initialSort,
  expandable = false,
  renderExpandedRow,
  renderSubRow,
  rowActions,
  responsive = true,
  showIndex = false,
  // pagination legacy props (kept for back-compat)
  page = 1,
  pageSize = 10,
  totalPages,
  onPageChange,
  // polymorphic
  as,
  className,
  id,
  role,
  ...rest
}, ref) => {
  const mergedColumns = useMemo(() => {
    let base = Array.isArray(columns) ? [...columns] : [];
    const extras = Array.isArray(extraColumns) ? extraColumns.filter(Boolean) : [];
    for (const ec of extras) {
      const at = (ec && (ec.at ?? ec.index)) ?? extraColumnsPlacement;
      if (at === 'start') base = [ec, ...base];
      else if (at === 'end') base = [...base, ec];
      else if (typeof at === 'number' && at >= 0 && at <= base.length) base = [...base.slice(0, at), ec, ...base.slice(at)];
      else base = [...base, ec];
    }
    return base;
  }, [columns, extraColumns, extraColumnsPlacement]);
  const [sortBy, setSortBy] = useState(initialSort?.by || null);
  const [sortDir, setSortDir] = useState(initialSort?.dir || 'asc');
  const [expanded, setExpanded] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [visibleCols, setVisibleCols] = useState(() => mergedColumns.map((c) => ({ ...c, hidden: c.hidden === true ? true : false })));
  useEffect(() => {
    setVisibleCols(mergedColumns.map((c) => ({ ...c, hidden: c.hidden === true ? true : false })));
  }, [mergedColumns]);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    function onDocDown() { setOpenMenuId(null); }
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, []);

  const resolvedPage = pagination?.page ?? page;
  const resolvedPageSize = pagination?.pageSize ?? pageSize;
  const computedTotalPages = pagination?.total ? Math.max(1, Math.ceil((pagination.total || 0) / (pagination.pageSize || resolvedPageSize || 1))) : totalPages;

  const filtered = useMemo(() => {
    const base = Array.isArray(data) ? data : [];
    if (!filterable) return base;
    const cols = visibleCols.filter((c) => !c.hidden);
    const out = defaultFilter(base, globalFilter, cols);
    return out;
  }, [data, globalFilter, filterable, visibleCols]);

  const sorted = useMemo(() => {
    const base = filtered;
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
  }, [filtered, sortBy, sortDir]);

  const startIdx = (resolvedPage - 1) * resolvedPageSize;
  const pageRows = sorted.slice(startIdx, startIdx + resolvedPageSize);

  function toggleSort(accessor) {
    if (!sortable) return;
    let nextBy = sortBy;
    let nextDir = sortDir;
    if (sortBy !== accessor) {
      nextBy = accessor; nextDir = 'asc';
    } else if (sortDir === 'asc') {
      nextDir = 'desc';
    } else {
      nextBy = null; nextDir = 'asc';
    }
    setSortBy(nextBy);
    setSortDir(nextDir);
    onSortChange?.(nextBy, nextDir);
  }

  function toggleExpand(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function getRowId(row, fallbackIndex) {
    if (typeof rowKey === 'function') return rowKey(row);
    if (typeof rowKey === 'string' && row[rowKey] != null) return row[rowKey];
    return row.id ?? fallbackIndex;
  }

  function isSelected(id) { return selectedIds.has(id); }
  function toggleSelect(id) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelectedIds(next);
    onRowSelect?.(pageRows.filter((r, idx) => next.has(getRowId(r, startIdx + idx))));
  }
  function toggleSelectAll() {
    const allSelected = pageRows.every((r, idx) => isSelected(getRowId(r, startIdx + idx)));
    const next = new Set(selectedIds);
    if (allSelected) {
      pageRows.forEach((r, idx) => next.delete(getRowId(r, startIdx + idx)));
    } else {
      pageRows.forEach((r, idx) => next.add(getRowId(r, startIdx + idx)));
    }
    setSelectedIds(next);
    onRowSelect?.(pageRows.filter((r, idx) => next.has(getRowId(r, startIdx + idx))));
  }

  const Root = as || 'div';
  const tableStyle = rowHeight ? { '--sb-row-h': `${rowHeight}px` } : undefined;
  const useStriped = variant === 'striped';
  const useBordered = variant === 'bordered';
  const useHover = variant === 'hover';

  const rootStyle = { ...expandStyleProps({ ...rest, color: textColor, bg, bgColor, borderColor }), ...(style || {}) };
  if (typeof radius === 'number') rootStyle.borderRadius = radius;
  if (typeof radius === 'string') rootStyle.borderRadius = `var(--sb-radius-${radius})`;
  // move shadow to table element, not root
  const tableShadow = (() => {
    if (shadow) {
      const map = { none: '0', sm: '1', md: '3', lg: '5' };
      const key = map[String(shadow)] || null;
      return key ? `var(--sb-shadow-${key})` : undefined;
    }
    if (typeof elevation === 'number') return `var(--sb-shadow-${Math.max(0, Math.min(5, elevation))})`;
    return undefined;
  })();
  const resolvedBg = bg ?? bgColor ?? rootStyle.background;
  if (resolvedBg) rootStyle['--sb-table-bg'] = resolvedBg;
  const resolvedFg = textColor ?? rootStyle.color;
  if (resolvedFg) rootStyle['--sb-table-fg'] = resolvedFg;
  if (borderColor) rootStyle['--sb-table-border'] = borderColor;
  if (headerBgColor) rootStyle['--sb-table-head-bg'] = headerBgColor;
  if (rowBgColor) rootStyle['--sb-table-row-bg'] = rowBgColor;
  if (rowAltBgColor) rootStyle['--sb-table-row-alt-bg'] = rowAltBgColor;
  if (rowHoverBgColor) rootStyle['--sb-table-row-hover-bg'] = rowHoverBgColor;
  if (subrowBgColor) rootStyle['--sb-table-subrow-bg'] = subrowBgColor;
  if (menuBgColor) rootStyle['--sb-table-menu-bg'] = menuBgColor;
  if (mutedTextColor) rootStyle['--sb-table-muted'] = mutedTextColor;
  if (headerPaddingX) rootStyle['--sb-th-px'] = headerPaddingX;
  if (headerPaddingY) rootStyle['--sb-th-py'] = headerPaddingY;
  if (cellPaddingX) rootStyle['--sb-td-px'] = cellPaddingX;
  if (cellPaddingY) rootStyle['--sb-td-py'] = cellPaddingY;
  if (headerFontSize) rootStyle['--sb-th-fs'] = headerFontSize;
  if (cellFontSize) rootStyle['--sb-td-fs'] = cellFontSize;

  const hasOptionsMenu = (() => {
    if (typeof optionsMenu === 'boolean') return optionsMenu;
    return !!(rowActions || (Array.isArray(rowMenu) && rowMenu.length > 0));
  })();

  return (
    <Root ref={ref} className={`${responsive ? 'sb-table__wrap' : ''} ${loading ? '' : ''} ${disabled ? 'is-disabled' : ''} ${className || ''}`.trim()} id={id} role={role} style={{ ...(maxHeight ? { maxHeight, overflow: 'auto' } : {}), ...rootStyle }} {...rest}>
      {(filterable || showColumnControls || toolbarRight) ? (
        <div className="sb-table__toolbar">
          <div className="sb-table__toolbar-left">
            {filterable ? (
              <input
                className="sb-table__search"
                placeholder="Filter..."
                value={globalFilter}
                onChange={(e) => { setGlobalFilter(e.target.value); onFilterChange?.({ global: e.target.value }); }}
              />
            ) : null}
            {showColumnControls ? (
              <details>
                <summary>Columns</summary>
                <div>
                  {visibleCols.map((c, idx) => (
                    <label key={c.accessor} style={{ display: 'block', fontSize: '12px', marginTop: 6 }}>
                      <input
                        type="checkbox"
                        checked={!c.hidden}
                        onChange={(e) => {
                          const updated = visibleCols.map((col, i) => i === idx ? { ...col, hidden: !e.target.checked } : col);
                          setVisibleCols(updated);
                          onColumnsChange?.(updated);
                        }}
                      />{' '}{c.header}
                    </label>
                  ))}
                </div>
              </details>
            ) : null}
          </div>
          {toolbarRight ? (
            <div className="sb-table__toolbar-right">
              {toolbarRight}
            </div>
          ) : null}
        </div>
      ) : null}
      <table className={`sb-table sb-table--${variant} sb-table--${size} sb-table--scheme-${colorScheme} ${useStriped ? 'is-striped' : ''} ${useBordered ? 'is-bordered' : ''} ${useHover ? 'is-hoverable' : ''}`} style={{ ...tableStyle, ...(tableShadow ? { boxShadow: tableShadow } : {}) }}>
        <thead className={stickyHeader ? 'is-sticky' : undefined}>
          <tr>
            {selectable && (
              <th className="sb-table__selcol">
                <input type="checkbox" aria-label="Select all" onChange={toggleSelectAll} checked={pageRows.length > 0 && pageRows.every((r, idx) => isSelected(getRowId(r, startIdx + idx)))} />
              </th>
            )}
            {expandable && <th aria-label="expander" />}
            {showIndex && <th>#</th>}
            {visibleCols.filter((c) => !c.hidden).map((col) => {
              const isActive = sortBy === col.accessor;
              const dir = isActive ? sortDir : 'neutral';
              return (
                <th key={col.accessor} style={{ ...(col.style || {}), ...(col.width ? { width: col.width } : {}) , fontWeight: col.isBold ? 600 : undefined }}>
                  <button type="button" className={`sb-table__thbtn ${isActive ? 'is-active' : ''}`} onClick={() => toggleSort(col.accessor)} disabled={!sortable}>
                    <span>{col.header}</span>
                    <span className={`sb-sort-icon ${dir}`} aria-hidden>
                      <svg viewBox="0 0 24 24" width="16" height="16"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </button>
                </th>
              );
            })}
            {hasOptionsMenu && <th className="sb-table__opthd" aria-label="options" />}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <tr key={`sk-${i}`}>
                <td colSpan={(visibleCols.filter((c) => !c.hidden).length) + (expandable ? 1 : 0) + (selectable ? 1 : 0) + ((rowActions || (Array.isArray(rowMenu) && rowMenu.length > 0)) ? 1 : 0) + (showIndex ? 1 : 0)}>
                  <div style={{ height: 36, background: '#f3f4f6', borderRadius: 6, opacity: .6 }} />
                </td>
              </tr>
            ))
          ) : null}
          {!loading && pageRows.length === 0 ? (
            <tr>
              <td colSpan={(visibleCols.filter((c) => !c.hidden).length) + (expandable ? 1 : 0) + (selectable ? 1 : 0) + (hasOptionsMenu ? 1 : 0) + (showIndex ? 1 : 0)} style={{ textAlign: 'center', color: '#64748b' }}>
                {typeof emptyMessage === 'string' ? emptyMessage : emptyMessage}
              </td>
            </tr>
          ) : null}
          {pageRows.map((row, idx) => {
            const rowId = getRowId(row, startIdx + idx);
            const isOpen = !!expanded[rowId];
            return (
              <React.Fragment key={rowId}>
                <tr className={isOpen ? 'is-open' : undefined} onClick={(e) => { if (e.target.closest('button,input,select,textarea,[data-menu]')) return; onRowClick?.(row, startIdx + idx); }}>
                  {selectable && (
                    <td className="sb-table__selcol">
                      <input type="checkbox" aria-label="Select row" checked={isSelected(rowId)} onChange={() => toggleSelect(rowId)} onClick={(e) => e.stopPropagation()} />
                    </td>
                  )}
                  {expandable && (
                    <td className="sb-table__expander">
                      <button type="button" className={`sb-table__iconbtn ${isOpen ? 'is-open' : ''}`} aria-label={isOpen ? 'Collapse row' : 'Expand row'} onClick={() => toggleExpand(rowId)}>
                        <svg className={`sb-table__chev ${isOpen ? 'is-open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </td>
                  )}
                  {showIndex && <td className="sb-table__index">{startIdx + idx + 1}</td>}
                  {visibleCols.filter((c) => !c.hidden).map((col) => (
                    <td key={col.accessor} data-col={col.accessor} style={col.style}>
                      {editable || col.editable ? (
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => onEdit?.(row, col.accessor, e.target.textContent)}
                        >{col.render ? col.render(row[col.accessor], row) : String(row[col.accessor] ?? '')}</span>
                      ) : (
                        col.render ? col.render(row[col.accessor], row) : row[col.accessor]
                      )}
                    </td>
                  ))}
                  {hasOptionsMenu && (
                    <td className="sb-table__options" data-menu onClick={(e) => e.stopPropagation()}>
                      <button type="button" className="sb-table__optbtn" aria-haspopup="menu" aria-expanded={openMenuId === rowId} onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === rowId ? null : rowId); }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
                        </svg>
                      </button>
                      {openMenuId === rowId ? (
                        <div className="sb-table__menu" role="menu">
                          {(
                            (Array.isArray(rowMenu) && rowMenu.length > 0)
                              ? rowMenu
                              : (rowActions ? [{ label: 'Edit', value: 'edit' }, { label: 'Delete', value: 'delete' }] : [])
                          ).map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              role="menuitem"
                              onClick={() => {
                                setOpenMenuId(null);
                                if (typeof opt.onClick === 'function') opt.onClick(row);
                                else if (typeof onRowMenu === 'function') onRowMenu(row, opt.value);
                                else if (typeof rowActions === 'function' && opt.value) rowActions(row, opt.value);
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </td>
                  )}
                </tr>
                {expandable && isOpen && (
                  (() => {
                    const renderer = renderExpandedRow || renderSubRow || expandedContent;
                    if (!renderer) return null;
                    const content = typeof renderer === 'function' ? renderer(row) : renderer;
                    const span = (visibleCols.filter((c) => !c.hidden).length)
                      + (expandable ? 1 : 0)
                      + (selectable ? 1 : 0)
                      + (hasOptionsMenu ? 1 : 0)
                      + (showIndex ? 1 : 0);
                    return (
                      <tr className="sb-table__subrow">
                        <td colSpan={span}>
                          {content}
                        </td>
                      </tr>
                    );
                  })()
                )}
              </React.Fragment>
            );
          })}
        </tbody>
        {showFooter ? (
          <tfoot className={stickyFooter ? 'is-sticky' : undefined}>
            <tr>
              <td colSpan={(visibleCols.filter((c) => !c.hidden).length) + (expandable ? 1 : 0) + (selectable ? 1 : 0) + ((rowActions || (Array.isArray(rowMenu) && rowMenu.length > 0)) ? 1 : 0) + (showIndex ? 1 : 0)}>
                Rows: {sorted.length}
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
      {typeof (computedTotalPages ?? totalPages) === 'number' && (computedTotalPages ?? totalPages) > 1 ? (
        <div className="sb-table__pagination">
          <button className="sb-table__pagebtn" disabled={resolvedPage <= 1} onClick={() => (pagination?.onPageChange || onPageChange)?.(resolvedPage - 1)}>Prev</button>
          {Array.from({ length: (computedTotalPages ?? totalPages) }).map((_, i) => (
            <button key={i} className={`sb-table__pagebtn ${resolvedPage === i + 1 ? 'is-active' : ''}`} onClick={() => (pagination?.onPageChange || onPageChange)?.(i + 1)}>{i + 1}</button>
          ))}
          <button className="sb-table__pagebtn" disabled={resolvedPage >= (computedTotalPages ?? totalPages)} onClick={() => (pagination?.onPageChange || onPageChange)?.(resolvedPage + 1)}>Next</button>
        </div>
      ) : null}
    </Root>
  );
});

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({ header: PropTypes.string.isRequired, accessor: PropTypes.string.isRequired, render: PropTypes.func })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  extraColumns: PropTypes.arrayOf(PropTypes.shape({ header: PropTypes.string.isRequired, accessor: PropTypes.string.isRequired, render: PropTypes.func, at: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['start','end'])]) })),
  extraColumnsPlacement: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['start','end'])]),
  toolbarRight: PropTypes.node,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  loading: PropTypes.bool,
  emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  pagination: PropTypes.shape({ page: PropTypes.number, pageSize: PropTypes.number, total: PropTypes.number, onPageChange: PropTypes.func }),
  selectable: PropTypes.bool,
  onRowSelect: PropTypes.func,
  onRowClick: PropTypes.func,
  onSortChange: PropTypes.func,
  onFilterChange: PropTypes.func,
  editable: PropTypes.bool,
  onEdit: PropTypes.func,
  showFooter: PropTypes.bool,
  colorScheme: PropTypes.string,
  rowHeight: PropTypes.number,
  virtualized: PropTypes.bool,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stickyFooter: PropTypes.bool,
  showColumnControls: PropTypes.bool,
  onColumnsChange: PropTypes.func,
  initialSort: PropTypes.shape({ by: PropTypes.string, dir: PropTypes.oneOf(['asc', 'desc']) }),
  expandable: PropTypes.bool,
  renderExpandedRow: PropTypes.func,
  rowActions: PropTypes.func,
  responsive: PropTypes.bool,
  renderSubRow: PropTypes.func,
  optionsMenu: PropTypes.bool,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  as: PropTypes.elementType,
  className: PropTypes.string,
  id: PropTypes.string,
  role: PropTypes.string,
};


