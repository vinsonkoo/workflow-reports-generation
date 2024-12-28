// 3. TanStack Table + MUI Implementation
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableContainer,
  Paper,
  TextField,
  Typography,
  Chip,
  Button,
  Box,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';
import { sampleData } from './sampleData';

const TanStackTable = () => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ getValue }) => (
        <Chip 
          label={getValue()}
          color={
            getValue() === 'High' ? 'error' : 
            getValue() === 'Medium' ? 'warning' : 
            'default'
          }
          size="small"
        />
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => (
        <Chip 
          label={getValue()}
          color={
            getValue() === 'Completed' ? 'success' :
            getValue() === 'In Progress' ? 'warning' :
            'default'
          }
          size="small"
        />
      ),
    },
    {
      accessorKey: 'votes',
      header: 'Votes',
    },
    {
      accessorKey: 'submittedDate',
      header: 'Submitted Date',
      cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
    },
  ];

  const table = useReactTable({
    data: sampleData,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleExportCSV = () => {
    // Get selected rows or all rows if none selected
    const selectedRows = Object.keys(rowSelection).length > 0
      ? table.getSelectedRowModel().rows
      : table.getFilteredRowModel().rows;

    // Create CSV content
    const csvData = selectedRows.map((row) => {
      const rowData = row.original;
      return {
        ID: rowData.id,
        Name: rowData.name,
        Description: rowData.description,
        Priority: rowData.priority,
        Status: rowData.status,
        Votes: rowData.votes,
        "Submitted Date": new Date(rowData.submittedDate).toLocaleDateString()
      };
    });

    // Convert to CSV string
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => 
        headers.map(header => 
          `"${String(row[header]).replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feature_requests_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h1">TanStack Table + MUI Example</Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            sx={{ m: 2, width: '100%' }}
          />
          <Button
            color="primary"
            onClick={handleExportCSV}
            startIcon={<FileDownloadIcon />}
            variant="contained"
            size='large'
            sx={{width: '380px'}}
          >
            Export {Object.keys(rowSelection).length > 0 ? 'Selected' : 'All'} to CSV
          </Button>
        </Box>
        <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                  />
                </TableCell>
                {headerGroup.headers.map(header => (
                  <TableCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    sx={{ cursor: 'pointer' }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                  />
                </TableCell>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
      </Paper>
    </div>
  );
};

export default TanStackTable