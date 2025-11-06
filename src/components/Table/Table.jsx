import React, { useMemo, useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './table.scss';

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
  // styling tokens & style-system shorthands
  radius,
  elevation,
  shadow,
  style,
  // spacing
  m, mx, my, mt, mr, mb, ml,
  p, px, py, pt, pr, pb, pl,
  // sizing
  w, h, minW, maxW, minH, maxH,
  // layout/display
  display, boxSizing, overflow, overflowX, overflowY,
  // flexbox
  flex, flexDir, flexWrap, justify, align, alignSelf, alignContent, gap, rowGap, columnGap, flexGrow, flexShrink, flexBasis, order,
  // grid
  gridCols, gridRows, gridAreas, gridCol, gridRow, gridAutoFlow, gridAutoCols, gridAutoRows, placeItems, placeContent,
  // position
  position, top, right, bottom, left, inset, zIndex,
  // typography
  fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, fontStyle, textAlign, textTransform, textDecoration, textOverflow, whiteSpace, wordBreak, overflowWrap,
  // color/background
  color: textColor, opacity, bg, bgColor, bgImage, bgGradient, bgClip, bgPos, bgSize, bgRepeat, bgAttachment, mixBlendMode,
  // borders
  border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderWidth, borderStyle, rounded, borderRadius, outline, outlineOffset,
  // effects
  boxShadow, filter, backdropFilter, backdropBlur,
  // transforms
  transform, transformOrigin, translateX, translateY, scale, rotate, skew,
  // interaction visuals
  cursor, pointerEvents, userSelect, touchAction,
  // media/objects
  objectFit, objectPosition, aspectRatio,
  // visibility/containment
  visibility, isolation, contain, contentVisibility,
  // scroll
  scrollBehavior, scrollSnapType, scrollSnapAlign,
  scrollMargin, scrollMarginTop, scrollMarginRight, scrollMarginBottom, scrollMarginLeft,
  scrollPadding, scrollPaddingTop, scrollPaddingRight, scrollPaddingBottom, scrollPaddingLeft,
  // existing features
  initialSort,
  expandable = false,
  renderExpandedRow,
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
  const [sortBy, setSortBy] = useState(initialSort?.by || null);
  const [sortDir, setSortDir] = useState(initialSort?.dir || 'asc');
  const [expanded, setExpanded] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [visibleCols, setVisibleCols] = useState(() => columns.map((c) => ({ ...c, hidden: c.hidden === true ? true : false })));
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

  function expandShorthand() {
    const s = {};
    const set = (k, v) => { if (v !== undefined) s[k] = v; };
    // spacing
    set('margin', m); set('marginTop', mt ?? my); set('marginRight', mr ?? mx); set('marginBottom', mb ?? my); set('marginLeft', ml ?? mx);
    set('padding', p); set('paddingTop', pt ?? py); set('paddingRight', pr ?? px); set('paddingBottom', pb ?? py); set('paddingLeft', pl ?? px);
    // sizing
    set('width', w); set('height', h); set('minWidth', minW); set('maxWidth', maxW); set('minHeight', minH); set('maxHeight', maxH);
    // layout
    set('display', display); set('boxSizing', boxSizing); set('overflow', overflow); set('overflowX', overflowX); set('overflowY', overflowY);
    // flexbox
    set('flex', flex); set('flexDirection', flexDir); set('flexWrap', flexWrap);
    set('justifyContent', justify); set('alignItems', align); set('alignSelf', alignSelf); set('alignContent', alignContent);
    set('gap', gap); set('rowGap', rowGap); set('columnGap', columnGap);
    set('flexGrow', flexGrow); set('flexShrink', flexShrink); set('flexBasis', flexBasis); set('order', order);
    // grid
    if (typeof gridCols === 'number') set('gridTemplateColumns', `repeat(${gridCols}, minmax(0,1fr))`); else set('gridTemplateColumns', gridCols);
    if (typeof gridRows === 'number') set('gridTemplateRows', `repeat(${gridRows}, auto)`); else set('gridTemplateRows', gridRows);
    set('gridTemplateAreas', gridAreas);
    set('gridColumn', gridCol); set('gridRow', gridRow);
    set('gridAutoFlow', gridAutoFlow); set('gridAutoColumns', gridAutoCols); set('gridAutoRows', gridAutoRows);
    set('placeItems', placeItems); set('placeContent', placeContent);
    // position
    set('position', position); set('top', top); set('right', right); set('bottom', bottom); set('left', left); set('inset', inset); set('zIndex', zIndex);
    // typography
    set('fontFamily', fontFamily); set('fontSize', fontSize); set('fontWeight', fontWeight); set('lineHeight', lineHeight);
    set('letterSpacing', letterSpacing); set('fontStyle', fontStyle); set('textAlign', textAlign); set('textTransform', textTransform);
    set('textDecoration', textDecoration); set('textOverflow', textOverflow); set('whiteSpace', whiteSpace); set('wordBreak', wordBreak); set('overflowWrap', overflowWrap);
    // color/background
    set('color', textColor); set('opacity', opacity); set('background', bg ?? bgColor);
    set('backgroundImage', bgImage ?? bgGradient); set('backgroundClip', bgClip);
    set('backgroundPosition', bgPos); set('backgroundSize', bgSize); set('backgroundRepeat', bgRepeat); set('backgroundAttachment', bgAttachment);
    set('mixBlendMode', mixBlendMode);
    // borders
    set('border', border); set('borderTop', borderTop); set('borderRight', borderRight); set('borderBottom', borderBottom); set('borderLeft', borderLeft);
    set('borderColor', borderColor); set('borderWidth', borderWidth); set('borderStyle', borderStyle);
    set('borderRadius', borderRadius ?? rounded);
    set('outline', outline); set('outlineOffset', outlineOffset);
    // effects
    set('boxShadow', boxShadow); set('filter', filter); set('backdropFilter', backdropFilter);
    if (backdropBlur !== undefined) set('backdropFilter', `blur(${backdropBlur})`);
    // transforms
    set('transform', transform); set('transformOrigin', transformOrigin);
    if (translateX !== undefined || translateY !== undefined || scale !== undefined || rotate !== undefined || skew !== undefined) {
      const parts = [];
      if (translateX !== undefined) parts.push(`translateX(${translateX})`);
      if (translateY !== undefined) parts.push(`translateY(${translateY})`);
      if (scale !== undefined) parts.push(`scale(${scale})`);
      if (rotate !== undefined) parts.push(`rotate(${rotate})`);
      if (skew !== undefined) parts.push(`skew(${skew})`);
      s.transform = [s.transform, parts.join(' ')].filter(Boolean).join(' ');
    }
    // interaction visuals
    set('cursor', cursor); set('pointerEvents', pointerEvents); set('userSelect', userSelect); set('touchAction', touchAction);
    // media/objects
    set('objectFit', objectFit); set('objectPosition', objectPosition); set('aspectRatio', aspectRatio);
    // visibility/containment
    set('visibility', visibility); set('isolation', isolation); set('contain', contain); set('contentVisibility', contentVisibility);
    // scroll
    set('scrollBehavior', scrollBehavior); set('scrollSnapType', scrollSnapType); set('scrollSnapAlign', scrollSnapAlign);
    set('scrollMargin', scrollMargin); set('scrollMarginTop', scrollMarginTop); set('scrollMarginRight', scrollMarginRight); set('scrollMarginBottom', scrollMarginBottom); set('scrollMarginLeft', scrollMarginLeft);
    set('scrollPadding', scrollPadding); set('scrollPaddingTop', scrollPaddingTop); set('scrollPaddingRight', scrollPaddingRight); set('scrollPaddingBottom', scrollPaddingBottom); set('scrollPaddingLeft', scrollPaddingLeft);
    return s;
  }

  const rootStyle = { ...expandShorthand(), ...(style || {}) };
  if (typeof radius === 'number') rootStyle.borderRadius = radius;
  if (typeof radius === 'string') rootStyle.borderRadius = `var(--sb-radius-${radius})`;
  if (typeof elevation === 'number') rootStyle.boxShadow = `var(--sb-shadow-${Math.max(0, Math.min(5, elevation))})`;
  if (shadow) {
    const map = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = map[String(shadow)] || null;
    if (key) rootStyle.boxShadow = `var(--sb-shadow-${key})`;
  }
  if (bgColor) rootStyle['--sb-table-bg'] = bgColor;
  if (borderColor) rootStyle['--sb-table-border'] = borderColor;

  return (
    <Root ref={ref} className={`${responsive ? 'sb-table__wrap' : ''} ${className || ''}`.trim()} id={id} role={role} style={{ ...(maxHeight ? { maxHeight, overflow: 'auto' } : {}), ...rootStyle }} {...rest}>
      {(filterable || showColumnControls) ? (
        <div className="sb-table__toolbar">
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
      ) : null}
      <table className={`sb-table sb-table--${variant} sb-table--${size} sb-table--scheme-${colorScheme} ${useStriped ? 'is-striped' : ''} ${useBordered ? 'is-bordered' : ''} ${useHover ? 'is-hoverable' : ''}`} style={tableStyle}>
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
                <th key={col.accessor}>
                  <button type="button" className={`sb-table__thbtn ${isActive ? 'is-active' : ''}`} onClick={() => toggleSort(col.accessor)} disabled={!sortable}>
                    <span>{col.header}</span>
                    <span className={`sb-sort-icon ${dir}`} aria-hidden>
                      <svg viewBox="0 0 24 24" width="16" height="16"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </button>
                </th>
              );
            })}
            {rowActions && <th className="sb-table__opthd" aria-label="options" />}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <tr key={`sk-${i}`}>
                <td colSpan={(visibleCols.filter((c) => !c.hidden).length) + (expandable ? 1 : 0) + (selectable ? 1 : 0) + (rowActions ? 1 : 0) + (showIndex ? 1 : 0)}>
                  <div style={{ height: 36, background: '#f3f4f6', borderRadius: 6, opacity: .6 }} />
                </td>
              </tr>
            ))
          ) : null}
          {!loading && pageRows.length === 0 ? (
            <tr>
              <td colSpan={(visibleCols.filter((c) => !c.hidden).length) + (expandable ? 1 : 0) + (selectable ? 1 : 0) + (rowActions ? 1 : 0) + (showIndex ? 1 : 0)} style={{ textAlign: 'center', color: '#64748b' }}>
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
                    <td key={col.accessor} data-col={col.accessor}>
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
                  {rowActions && (
                    <td className="sb-table__options" data-menu onClick={(e) => e.stopPropagation()}>
                      <button type="button" className="sb-table__optbtn" aria-haspopup="menu" aria-expanded={openMenuId === rowId} onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === rowId ? null : rowId); }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
                        </svg>
                      </button>
                      {openMenuId === rowId ? (
                        <div className="sb-table__menu" role="menu">
                          <button type="button" role="menuitem" onClick={() => { setOpenMenuId(null); rowActions(row, 'edit'); }}>Edit</button>
                          <button type="button" role="menuitem" onClick={() => { setOpenMenuId(null); rowActions(row, 'delete'); }}>Delete</button>
                        </div>
                      ) : null}
                    </td>
                  )}
                </tr>
                {expandable && isOpen && (renderExpandedRow || renderSubRow) && (
                  <tr className="sb-table__subrow">
                    <td colSpan={(columns?.length || 0) + (rowActions ? 2 : 1)}>
                      {(renderExpandedRow || renderSubRow)(row)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
        {showFooter ? (
          <tfoot className={stickyFooter ? 'is-sticky' : undefined}>
            <tr>
              <td colSpan={(visibleCols.filter((c) => !c.hidden).length) + (expandable ? 1 : 0) + (selectable ? 1 : 0) + (rowActions ? 1 : 0) + (showIndex ? 1 : 0)}>
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
  page: PropTypes.number,
  pageSize: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
  as: PropTypes.elementType,
  className: PropTypes.string,
  id: PropTypes.string,
  role: PropTypes.string,
};


