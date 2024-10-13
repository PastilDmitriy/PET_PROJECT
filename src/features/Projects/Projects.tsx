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
  InputOnChangeData
} from "@fluentui/react-components";
import React, { useMemo, useState } from 'react';
import { useStyles } from "./Project.styles";
import { columns, items } from "./Projects.mocks";

export const Projects = () => {
  const styles = useStyles();

  const [sortState, setSortState] = useState<{
    sortDirection: "ascending" | "descending";
    sortColumn: TableColumnId | undefined;
  }>({
    sortDirection: "ascending" as const,
    sortColumn: "projectName",
  });
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (inputData: InputOnChangeData) => {
    setSearchValue(inputData.value);
  };

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ]
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  const filteredTableData = useMemo(() => {
    if (!searchValue) return rows;

    const filteredData = rows.filter(({ item }) => {
      const projectNameValue = item.projectName.label.toLowerCase();
      const clientValue = item.client.label.toLowerCase();
      const searchTerm = searchValue.toLowerCase();

      return projectNameValue.includes(searchTerm) || clientValue.includes(searchTerm);
    });
    return filteredData;
  }, [rows, searchValue]);

  const highlightText = (text: string, searchValue: string): React.ReactNode => {
    if (!searchValue) return text;

    const regex = new RegExp(`(${searchValue})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} style={{ backgroundColor: '#f3f3f3' }}>{part}</mark> : part
    );
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.headerWrapper}>
        <div>
          <h3>Projects: ({filteredTableData.length})</h3>
        </div>
        <div>
          <Input
            className={styles.inputStyles}
            value={searchValue}
            onChange={(event, data) => handleSearch(data)}
            placeholder="Search projects by name or client"
          />
        </div>
      </div>

      <Table
        sortable
        className={styles.tableStyles}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell {...headerSortProps("projectName")}>Project Name</TableHeaderCell>
            <TableHeaderCell {...headerSortProps("client")}>Client</TableHeaderCell>
            <TableHeaderCell {...headerSortProps("industry")}>Industry</TableHeaderCell>
            <TableHeaderCell {...headerSortProps("status")}>Status</TableHeaderCell>
            <TableHeaderCell {...headerSortProps("startDate")}>Start Date</TableHeaderCell>
            <TableHeaderCell {...headerSortProps("endDate")}>End Date</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} style={{ textAlign: "center" }}>
                No projects or clients found, please update search cretirea
              </TableCell>
            </TableRow>
          ) : (
            filteredTableData.map(({ item }) => (
              <TableRow key={item.projectName.label}>
                <TableCell>
                  <TableCellLayout>
                    {highlightText(item.projectName.label, searchValue)}
                  </TableCellLayout>
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