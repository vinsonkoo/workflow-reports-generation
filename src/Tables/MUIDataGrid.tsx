import { 
  DataGrid, 
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
  GridRowSelectionModel
} from '@mui/x-data-grid';
import { Box, Button, Chip, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { FeatureRequest, sampleTableData } from './sampleTableData';
import { useState } from 'react';

const MUIDataGrid = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  
  const columns: GridColDef<FeatureRequest>[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 120,
      renderCell: (params: GridRenderCellParams<FeatureRequest>) => (
        <Chip 
          label={params.value} 
          color={
            params.value === 'High' ? 'error' : 
            params.value === 'Medium' ? 'warning' : 
            'default'
          }
          size="small"
        />
      )
    },
    { 
      field: 'status', 
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams<FeatureRequest>) => (
        <Chip 
          label={params.value} 
          color={
            params.value === 'Completed' ? 'success' :
            params.value === 'In Progress' ? 'warning' : 
            'default'
          }
          size="small"
        />
      )
    },
    { 
      field: 'votes', 
      headerName: 'Votes', 
      width: 110, 
      type: 'number'
    },
    { 
      field: 'submittedDate', 
      headerName: 'Submitted Date', 
      width: 150,
      type: 'date',
      valueFormatter: (params) => params
    }
  ];

  const handleExportCSV = () => {
    // If rows are selected, export only those. Otherwise, export all data
    let rowsToExport = sampleTableData;
    
    if (rowSelectionModel.length > 0) {
      // Filter the data to only include selected rows
      rowsToExport = sampleTableData.filter(row => rowSelectionModel.includes(row.id));
    }

    // Create CSV content
    const csvData = rowsToExport.map((row) => ({
      ID: row.id,
      Name: row.name,
      Description: row.description,
      Priority: row.priority,
      Status: row.status,
      Votes: row.votes,
      "Submitted Date": new Date(row.submittedDate).toLocaleDateString()
    }));

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

  // Custom toolbar with export button
  const CustomToolbar = () => {
    return (
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
        <GridToolbar />
        <Button
          color="primary"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportCSV}
          sx={{ ml: 2 }}
        >
          Export {rowSelectionModel.length > 0 ? 'Selected' : 'All'} to CSV
        </Button>
      </Box>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h1">Material UI DataGrid Example</Typography>
      <DataGrid
        rows={sampleTableData}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          sorting: { sortModel: [{ field: 'submittedDate', sort: 'desc' }] }
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: CustomToolbar,
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
    </div>
  );
};

export default MUIDataGrid;