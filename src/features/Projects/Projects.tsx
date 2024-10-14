import {
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnId,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Table,
  useTableFeatures,
  useTableSort,
  Input,
  InputOnChangeData,
} from '@fluentui/react-components';
import React, { useEffect, useMemo, useState } from 'react';
import { useStyles } from './Project.styles';
import { Filter } from './components/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { Item } from './Projects.models';
import { getTableData, setSearchValue } from './store/Projects.store';
import { columns } from './Projects.mocks';

export const Projects = () => {
  const styles = useStyles();
  const { tableData, searchValue, initialTableData } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  const [sortState, setSortState] = useState<{
    sortDirection: 'ascending' | 'descending';
    sortColumn: TableColumnId | undefined;
  }>({
    sortDirection: 'ascending' as const,
    sortColumn: 'projectName',
  });

  const handleSearch = (inputData: InputOnChangeData) => {
    dispatch(setSearchValue(inputData.value));
  };

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures<Item>(
    {
      columns,
      items: tableData,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ],
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  const filteredTableData = useMemo(() => rows, [rows]);

  const highlightText = (text: string, searchValue: string): React.ReactNode => {
    if (!searchValue) return text;

    const regex = new RegExp(`(${searchValue})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className={styles.highlightedText}>
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const getFilterOptionItems = () => {
    const filterOptionItems: Record<'projectName' | 'client', string[]> = {
      projectName: [],
      client: [],
    };
    initialTableData.forEach(({ projectName, client }) => {
      filterOptionItems.projectName.push(projectName.label);
      filterOptionItems.client.push(client.label);
    });

    filterOptionItems.client = [...new Set(filterOptionItems.client)];
    filterOptionItems.projectName = [...new Set(filterOptionItems.projectName)];
    return filterOptionItems;
  };

  useEffect(() => {
    dispatch(getTableData());
  }, [dispatch]);

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.headerWrapper}>
        <div>
          <h3>Projects: ({filteredTableData.length})</h3>
        </div>
        <div>
          <Filter filterOptionItems={getFilterOptionItems()} />
          <Input className={styles.inputStyles} value={searchValue} onChange={(event, data) => handleSearch(data)} placeholder="Search projects by name or client" />
        </div>
      </div>

      <Table sortable className={styles.tableStyles}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell {...headerSortProps('projectName')}>Project Name</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('client')}>Client</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('industry')}>Industry</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('status')}>Status</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('startDate')}>Start Date</TableHeaderCell>
            <TableHeaderCell {...headerSortProps('endDate')}>End Date</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className={styles.notFoundContent}>
                No projects or clients found, please update search criteria
              </TableCell>
            </TableRow>
          ) : (
            filteredTableData.map(({ item }) => (
              <TableRow key={item.projectName.label}>
                <TableCell>
                  <TableCellLayout>{highlightText(item.projectName.label, searchValue)}</TableCellLayout>
                </TableCell>
                <TableCell>{highlightText(item.client.label, searchValue)}</TableCell>
                <TableCell>{item.industry.label}</TableCell>
                <TableCell>{item.status.label}</TableCell>
                <TableCell>{item.startDate.label}</TableCell>
                <TableCell>{item.endDate.label}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
