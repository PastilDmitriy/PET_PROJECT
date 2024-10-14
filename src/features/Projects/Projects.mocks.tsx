import { TableColumnDefinition, createTableColumn } from '@fluentui/react-components';
import { Item } from './Projects.models';

export const items: Item[] = [
  {
    projectName: { label: 'Customer Satisfaction Analysis' },
    client: { label: 'Bright Future Inc.' },
    industry: { label: 'Transportation' },
    status: { label: 'In Progress' },
    startDate: { label: 'Jun 15, 2024', timestamp: 1718409600 },
    endDate: { label: 'Nov 29, 2024', timestamp: 1732838400 },
  },
  {
    projectName: { label: 'SaaS Platform Implementation' },
    client: { label: 'Peak Tech' },
    industry: { label: 'Public Sector' },
    status: { label: 'Completed' },
    startDate: { label: 'Aug 17, 2023', timestamp: 1692230400 },
    endDate: { label: 'Sep 08, 2024', timestamp: 1725753600 },
  },
  {
    projectName: { label: 'Warehouse Automation' },
    client: { label: 'InnoWave Systems' },
    industry: { label: 'Finance' },
    status: { label: 'Pending' },
    startDate: { label: 'May 10, 2024', timestamp: 1715299200 },
    endDate: { label: 'Dec 29, 2024', timestamp: 1735430400 },
  },
  {
    projectName: { label: 'Zero Trust Security Framework' },
    client: { label: 'Green Energy Ltd' },
    industry: { label: 'Manufacturing' },
    status: { label: 'In Progress' },
    startDate: { label: 'Sep 15, 2023', timestamp: 1694736000 },
    endDate: { label: 'Oct 11, 2024', timestamp: 1728604800 },
  },
  {
    projectName: { label: 'Energy Consumption Optimization' },
    client: { label: 'InnoWave Systems' },
    industry: { label: 'Public Sector' },
    status: { label: 'Pending' },
    startDate: { label: 'Apr 09, 2024', timestamp: 1712620800 },
    endDate: { label: 'Nov 24, 2024', timestamp: 1732406400 },
  },
  {
    projectName: { label: 'HR Policy Update' },
    client: { label: 'Peak Tech' },
    industry: { label: 'Manufacturing' },
    status: { label: 'In Progress' },
    startDate: { label: 'Oct 08, 2024', timestamp: 1728345600 },
    endDate: { label: 'Nov 11, 2024', timestamp: 1731283200 },
  },
  {
    projectName: { label: 'Smart Manufacturing Initiative' },
    client: { label: 'Bright Future Inc.' },
    industry: { label: 'Retail' },
    status: { label: 'Pending' },
    startDate: { label: 'May 19, 2024', timestamp: 1716076800 },
    endDate: { label: 'Jun 26, 2024', timestamp: 1719360000 },
  },
  {
    projectName: { label: 'Strategic Alliance Formation' },
    client: { label: 'Velocity Software' },
    industry: { label: 'Retail' },
    status: { label: 'Pending' },
    startDate: { label: 'Nov 10, 2023', timestamp: 1699574400 },
    endDate: { label: 'Jul 15, 2024', timestamp: 1721001600 },
  },
  {
    projectName: { label: 'On-Time Delivery Rate' },
    client: { label: 'Green Energy Ltd' },
    industry: { label: 'Retail' },
    status: { label: 'Pending' },
    startDate: { label: 'Aug 11, 2023', timestamp: 1691712000 },
    endDate: { label: 'Feb 19, 2024', timestamp: 1708300800 },
  },
  {
    projectName: { label: 'Disaster Recovery Plan' },
    client: { label: 'Global Enterprises' },
    industry: { label: 'Transportation' },
    status: { label: 'On Hold' },
    startDate: { label: 'Oct 06, 2023', timestamp: 1696550400 },
    endDate: { label: 'Mar 08, 2024', timestamp: 1709856000 },
  },
];

export const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'projectName',
    compare: (a, b) => a.projectName.label.localeCompare(b.projectName.label),
  }),
  createTableColumn<Item>({
    columnId: 'client',
    compare: (a, b) => a.client.label.localeCompare(b.client.label),
  }),
  createTableColumn<Item>({
    columnId: 'industry',
    compare: (a, b) => a.industry.label.localeCompare(b.industry.label),
  }),
  createTableColumn<Item>({
    columnId: 'status',
    compare: (a, b) => a.status.label.localeCompare(b.status.label),
  }),
  createTableColumn<Item>({
    columnId: 'startDate',
    compare: (a, b) => a.startDate.timestamp - b.startDate.timestamp,
  }),
  createTableColumn<Item>({
    columnId: 'endDate',
    compare: (a, b) => a.endDate.timestamp - b.endDate.timestamp,
  }),
];
