import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

const headCells = [
  { id: 'id', numeric: false, label: 'Id', colSpan:1 },
  { id: 'creationDate', numeric: false, label: 'Fecha creación', colSpan:1 },
  { id: 'sendingCompany', numeric: false, label: 'Empresa que envía', colSpan:1 },
  { id: 'receivingCompany', numeric: true, label: 'Empresa que recibe', colSpan:1 },
  { id: 'amountO', numeric: true, label: 'Monto inicial', colSpan:2 },
  { id: 'amountF', numeric: true, label: 'Monto disponible', colSpan:1 },
  { id: 'rate', numeric: true, label: 'Tarifa', colSpan:1 },
  { id: 'concept', numeric: false, label: 'Concepto', colSpan:1 },
  { id: 'imc', numeric: false, label: 'IMC', colSpan:1 }
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
