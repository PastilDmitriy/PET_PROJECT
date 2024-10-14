import {
  Field,
  InputOnChangeData,
  SearchBox,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnId,
  TableHeader,
  TableHeaderCell,
  TableRow,
  useTableFeatures,
  useTableSort,
} from '@fluentui/react-components';
import React, { useEffect, useMemo, useState } from 'react';
import { useStyles } from './Project.styles';
// import { Filter } from './components/Filter';
import { RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { columns } from './Projects.mocks';
import { Item } from './Projects.models';
import { PopoverFilter } from './components/PopoverFilter';
import { getTableData, setSearchValue } from './store/Projects.store';

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
          <Field>
            <SearchBox className={styles.inputStyles} value={searchValue} onChange={(_e, data) => handleSearch(data)} placeholder="Search projects by name or client" />
          </Field>
        </div>
      </div>

      <Table sortable className={styles.tableStyles}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell {...headerSortProps('projectName')} className={styles.headerCell}>
              <div className={styles.filteredColumnWrapper}>
                <p>Project Name</p>
                <PopoverFilter options={getFilterOptionItems().projectName} criterion="projectName" />
              </div>
            </TableHeaderCell>
            <TableHeaderCell {...headerSortProps('client')} className={styles.headerCell}>
              <div className={styles.filteredColumnWrapper}>
                <p>Client</p>
                <PopoverFilter options={getFilterOptionItems().client} criterion="client" />
              </div>
            </TableHeaderCell>
            <TableHeaderCell {...headerSortProps('industry')} className={styles.headerCell}>
              Industry
            </TableHeaderCell>
            <TableHeaderCell {...headerSortProps('status')} className={styles.headerCell}>
              Status
            </TableHeaderCell>
            <TableHeaderCell {...headerSortProps('startDate')} className={styles.headerCell}>
              Start Date
            </TableHeaderCell>
            <TableHeaderCell {...headerSortProps('endDate')} className={styles.headerCell}>
              End Date
            </TableHeaderCell>
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
