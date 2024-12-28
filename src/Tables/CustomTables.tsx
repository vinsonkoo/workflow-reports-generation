import { Box } from '@mui/material'
import MUIDataGrid from './MUIDataGrid'
import CustomMaterialReactTable from './MaterialReactTable'
import CustomTanStackMUITable from './CustomTanStackMUITable'


const CustomTables = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gridRowGap: '64px'
    }}>
      <MUIDataGrid />
      <CustomMaterialReactTable />
      <CustomTanStackMUITable />
    </Box>
  )
}

export default CustomTables