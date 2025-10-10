import React from 'react';
import PropTypes from 'prop-types';
import './pagination.scss';

export const Pagination = ({
  page = 1,
  total = 10,
  onChange = () => {},
}) => {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= total;
  return (
    <div className="sb-pagination">
      <button className="sb-pagination__btn" disabled={prevDisabled} onClick={() => onChange(page - 1)}>
        Prev
      </button>
      <span className="sb-pagination__page">{page} / {total}</span>
      <button className="sb-pagination__btn" disabled={nextDisabled} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  total: PropTypes.number,
  onChange: PropTypes.func,
};


