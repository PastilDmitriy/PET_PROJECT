import { TableColumnDefinition, TableColumnId } from '@fluentui/react-components';

export type FileCell = {
  label: string;
};

export type DateCell = {
  label: string;
  timestamp: number;
};

export type Item = {
  projectName: FileCell;
  client: FileCell;
  industry: FileCell;
  status: FileCell;
  startDate: DateCell;
  endDate: DateCell;
};

export type TGetSortedTableData = {
  sortState: {
    sortDirection: 'ascending' | 'descending';
    sortColumn: TableColumnId | undefined;
  };
  setSortState: React.Dispatch<
    React.SetStateAction<{
      sortDirection: 'ascending' | 'descending';
      sortColumn: TableColumnId | undefined;
    }>
  >;
  columns: TableColumnDefinition<Item>[];
  items: Item[];
};
