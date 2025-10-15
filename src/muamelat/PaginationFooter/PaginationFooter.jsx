import React from 'react';
import './PaginationFooter.scss';

const PaginationFooter = ({
  pageLimit = 10,
  onPageLimitChange = () => {},
  totalPages = 0,
  activePage = 1,
  onPageChange = () => {},
  noLimit = false,
}) => {
  const options = [10, 20, 30];
  return (
    <div className="pagination-footer-comp">
      {noLimit ? <div /> : (
        <select
          style={{ width: 150 }}
          value={pageLimit}
          onChange={(e) => onPageLimitChange(Number(e.target.value))}
        >
          {options.map((v) => (
            <option key={v} value={v}>{v} per page</option>
          ))}
        </select>
      )}

      <div>
        <button
          disabled={activePage <= 1}
          onClick={() => onPageChange(activePage - 1)}
        >Prev</button>
        <span style={{ margin: '0 8px' }}>{activePage} / {Math.max(totalPages, 1)}</span>
        <button
          disabled={activePage >= totalPages}
          onClick={() => onPageChange(activePage + 1)}
        >Next</button>
      </div>
    </div>
  );
};

export default PaginationFooter;


