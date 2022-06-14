import React from 'react';
import { render, screen } from '@testing-library/react';

import DataTable from '@components/DataTable';

describe('Test DataTable', () => {
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
    },
  ];

  test('Testing autoHeight prop', () => {
    render(<DataTable rows={rows} columns={columns} autoHeight />);
    expect(screen.getByRole('grid')).toHaveClass('MuiDataGrid-autoHeight');
  });

  test('Testing french prop', () => {
    render(<DataTable rows={rows} columns={columns} french />);
    expect(screen.getByText('Lignes par page :')).toHaveClass(
      'MuiTablePagination-selectLabel css-pdct74-MuiTablePagination-selectLabel'
    );
  });

  test('Testing pageSize prop', async () => {
    render(<DataTable rows={rows} columns={columns} pageSize={5} autoHeight />);
    expect(screen.getAllByRole('row')).toHaveLength(6);
  });
});
