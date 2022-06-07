import React from 'react';
import '../../style.css';
import {
  DataGrid,
  GridValidRowModel,
  GridToolbarQuickFilter,
  GridColumns,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';

/** Types */
export interface DataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  /**  */
  rows: GridValidRowModel[];
  /**  */
  columns: GridColumns<GridValidRowModel>;
  /**  */
  pageSize?: number;
  /**  */
  rowsPerPageOptions?: number[];
}

const QuickSearchToolbar = () => (
  <Box
    sx={{
      p: 0.5,
      pb: 0,
    }}
  >
    <GridToolbarQuickFilter />
  </Box>
);

const DataTable = ({
  rows,
  columns,
  pageSize,
  rowsPerPageOptions,
  ...rest
}: DataTableProps) => {
  const [pageSizeValue, setPageSizeValue] = React.useState(pageSize);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSizeValue}
        onPageSizeChange={(newPage) => setPageSizeValue(newPage)}
        rowsPerPageOptions={rowsPerPageOptions}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: QuickSearchToolbar }}
        {...rest}
      />
    </div>
  );
};

export default DataTable;
