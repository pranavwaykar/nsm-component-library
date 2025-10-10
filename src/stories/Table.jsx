import React from 'react';
import PropTypes from 'prop-types';
import './table.scss';

export const Table = ({ columns = [], data = [] }) => {
  return (
    <div className="sb-table">
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key || c.accessor}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((c) => (
                <td key={c.key || c.accessor}>{row[c.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({ header: PropTypes.string, accessor: PropTypes.string })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};


