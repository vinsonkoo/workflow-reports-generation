// 2. Material React Table Implementation
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Box, Button, Chip, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { FeatureRequest, sampleTableData } from './sampleTableData';

const CustomMaterialReactTable = () => {
  const columns: MRT_ColumnDef<FeatureRequest>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 90,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 200,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      size: 400,
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      size: 120,
      Cell: ({ cell }) => (
        <Chip 
          label={cell.getValue()}
          color={
            cell.getValue() === 'High' ? 'error' : 
            cell.getValue() === 'Medium' ? 'warning' : 
            'default'
          }
          size="small"
        />
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 130,
      Cell: ({ cell }) => (
        <Chip 
          label={cell.getValue()}
          color={
            cell.getValue() === 'Completed' ? 'success' :
            cell.getValue() === 'In Progress' ? 'warning' :
            'default'
          }
          size="small"
        />
      ),
    },
    {
      accessorKey: 'votes',
      header: 'Votes',
      size: 110,
    },
    {
      accessorKey: 'submittedDate',
      header: 'Submitted Date',
      size: 150,
      Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
    },
  ];

  // Handle CSV Export
  const handleExportRows = (rows: any[]) => {
    if (rows.length === 0) {
      console.warn('No rows to export');
      return;
    }

    try {
      const csvData = rows.map((row) => {
        const rowData = row.original;
        return {
          ID: rowData.id,
          Name: rowData.name,
          Description: rowData.description,
          Priority: rowData.priority,
          Status: rowData.status,
          Votes: rowData.votes,
          "Submitted Date": new Date(rowData.submittedDate).toLocaleDateString(),
        };
      });

      // Convert to CSV
      const headers = Object.keys(csvData[0]);
      const csvContent = [
        headers.join(','), // Header row
        ...csvData.map(row => 
          headers.map(header => 
            `"${String(row[header]).replace(/"/g, '""')}"`
          ).join(',')
        )
      ].join('\n');

      // Create download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'feature_requests.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the URL object
      
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h1">Material React Table Example</Typography>
      <MaterialReactTable
        columns={columns}
        data={sampleTableData}
        enableRowSelection
        enableColumnFilters
        enableDensityToggle
        enableFullScreenToggle
        enableColumnResizing
        enableColumnOrdering
        enableGlobalFilter
        enablePagination
        enableSorting
        initialState={{
          density: 'compact',
          pagination: { pageSize: 5, pageIndex: 0 },
          sorting: [{ id: 'submittedDate', desc: true }],
        }}
        renderTopToolbarCustomActions={({ table }) => {
          const handleExportData = () => {
            const selectedRows = table.getSelectedRowModel().rows;
            const rowsToExport = selectedRows.length > 0 ? selectedRows : table.getPrePaginationRowModel().rows;
            handleExportRows(rowsToExport);
          };

          return (
            <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
              <Button
                color="primary"
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export {table.getSelectedRowModel().rows.length > 0 ? 'Selected' : 'All'} to CSV
              </Button>
            </Box>
          );
        }}
      />
    </div>
  );
};
export default CustomMaterialReactTable