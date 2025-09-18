import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

const headCells = [
  { id: 'name', numeric: false, label: 'Nombre', colSpan:1 },
  { id: 'code', numeric: false, label: 'Código', colSpan:1 }
];

export default function EnhancedTableHead({ sortParameter, sortType, handleSortTable }) {
  const handleSort = (id) => () => {
    handleSortTable(id);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            id={headCell.id}
            colSpan={headCell.colSpan}
            sortDirection={sortParameter === headCell.id ? sortType : false}
            align='center'>
            {headCell.id === 'details' ? (
              headCell.label
            ) : (
              <TableSortLabel
                direction={sortParameter === headCell.id ? sortType : 'asc'}
                onClick={handleSort(headCell.id)}>
                {headCell.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  sortParameter: PropTypes.string,
  sortType: PropTypes.string,
  handleSortTable: PropTypes.func
};
