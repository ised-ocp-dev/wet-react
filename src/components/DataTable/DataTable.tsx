import React from 'react';
import {
  DataGrid,
  GridValidRowModel,
  GridToolbarQuickFilter,
  GridColumns,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';
import '../../style.css';

/** Types */
export interface DataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Set of rows of type GridValidRowModel[]. */
  rows: GridValidRowModel[];
  /** Set of columns of type GridColumns. */
  columns: GridColumns<GridValidRowModel>;
  /** Sets the number of rows in one page. */
  pageSize?: number;
  /** If true, the pageSize is calculated according to the container size and the max number of rows to avoid rendering a vertical scroll bar. */
  autoPageSize?: boolean;
  /** Select the pageSize dynamically using the component UI. */
  rowsPerPageOptions?: number[];
  /** If true, the table height is dynamic and follows the number of rows in the table. */
  autoHeight?: boolean;
  /** Applies zebra-striping to the rows within the table. */
  stripped?: boolean;
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
  autoHeight = false,
  autoPageSize = false,
  stripped = false,
  ...rest
}: DataTableProps) => {
  const [pageSizeValue, setPageSizeValue] = React.useState(pageSize);
  const styles: SxProps<Theme> = {
    padding: 1,
    // '*': { fontSize: '16px' },
    '.MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
    },
    '.MuiDataGrid-columnHeader--sorted': {
      backgroundColor: '#f9f9f9',
    },
    '.MuiDataGrid-row:nth-of-type(odd)': {
      backgroundColor: stripped ? '#f9f9f9' : undefined,
    },
    '.MuiDataGrid-footerContainer': {
      display: 'flex',
      alignItems: 'center',
    },
    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
      margin: 0,
    },
  };

  if (rowsPerPageOptions) {
    return (
      <DataGrid
        sx={styles}
        autoHeight={autoHeight}
        autoPageSize={autoPageSize}
        rows={rows}
        columns={columns}
        pageSize={pageSizeValue}
        onPageSizeChange={(newPage) => setPageSizeValue(newPage)}
        rowsPerPageOptions={rowsPerPageOptions}
        components={{
          Toolbar: QuickSearchToolbar,
        }}
        disableSelectionOnClick
        {...rest}
      />
    );
  }

  return (
    <DataGrid
      sx={styles}
      autoHeight={autoHeight}
      autoPageSize={autoPageSize}
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      components={{
        Toolbar: QuickSearchToolbar,
      }}
      disableSelectionOnClick
      {...rest}
    />
  );
};

export default DataTable;
