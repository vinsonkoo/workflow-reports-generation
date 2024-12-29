// Sample data with TypeScript interface
export interface FeatureRequest {
  id: number;
  name: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  votes: number;
  submittedDate: string;
}

export const sampleTableData: FeatureRequest[] = [
  {
    id: 1,
    name: "Salesforce Integration",
    description: "Add ability to sync customer data with Salesforce CRM",
    priority: "High",
    status: "In Progress",
    votes: 245,
    submittedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Dark Mode Support",
    description: "Implement system-wide dark mode theme with user preference saving",
    priority: "Medium",
    status: "Pending",
    votes: 189,
    submittedDate: "2024-01-20"
  },
  {
    id: 3,
    name: "Bulk Import/Export",
    description: "Allow users to bulk import and export data via CSV files",
    priority: "High",
    status: "Pending",
    votes: 167,
    submittedDate: "2024-02-01"
  },
  {
    id: 4,
    name: "Mobile App Support",
    description: "Create native mobile applications for iOS and Android",
    priority: "High",
    status: "In Progress",
    votes: 342,
    submittedDate: "2024-01-10"
  },
  {
    id: 5,
    name: "API Rate Limiting",
    description: "Implement configurable rate limiting for API endpoints",
    priority: "Medium",
    status: "Completed",
    votes: 89,
    submittedDate: "2024-02-05"
  },
  {
    id: 6,
    name: "Custom Dashboard Widgets",
    description: "Allow users to create and customize their dashboard widgets",
    priority: "Medium",
    status: "In Progress",
    votes: 156,
    submittedDate: "2024-02-10"
  },
  {
    id: 7,
    name: "Single Sign-On (SSO)",
    description: "Add support for SAML and OAuth2 based SSO solutions",
    priority: "High",
    status: "Pending",
    votes: 278,
    submittedDate: "2024-01-25"
  },
  {
    id: 8,
    name: "Audit Logging",
    description: "Implement detailed audit logs for all system actions",
    priority: "Medium",
    status: "Completed",
    votes: 134,
    submittedDate: "2024-01-30"
  },
  {
    id: 9,
    name: "Email Templates",
    description: "Add customizable email templates with variable support",
    priority: "Low",
    status: "In Progress",
    votes: 98,
    submittedDate: "2024-02-15"
  },
  {
    id: 10,
    name: "Two-Factor Authentication",
    description: "Implement 2FA support with app and SMS options",
    priority: "High",
    status: "Completed",
    votes: 312,
    submittedDate: "2024-01-05"
  }
];

// Example usage with different libraries:

// 1. MUI DataGrid
export const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 400 },
  { field: 'priority', headerName: 'Priority', width: 120 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'votes', headerName: 'Votes', width: 110, type: 'number' },
  // { field: 'votes', headerName: 'Votes', width: 110, type: 'singleSelect' },
  { field: 'submittedDate', headerName: 'Submitted Date', width: 150, type: 'date' }
];

// 2. Material React Table
export const materialReactColumns = [
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
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 130,
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
  },
];

// 3. TanStack Table Column Definitions
export const tanstackColumns = [
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
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'votes',
    header: 'Votes',
  },
  {
    accessorKey: 'submittedDate',
    header: 'Submitted Date',
  },
];