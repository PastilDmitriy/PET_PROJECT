import { TableColumnDefinition, TableColumnId } from '@fluentui/react-components';
import React from 'react';

export type FileCell = {
  label: string;
};

export type ProgressBar = {
  label: React.ReactElement;
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
  progressBar?: ProgressBar;
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
