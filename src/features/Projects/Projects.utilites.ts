// import { TableColumnId, useTableFeatures, useTableSort, } from "@fluentui/react-components";
// import { TGetSortedTableData } from "./Projects.models";

// export const useSortedTableData = ({ sortState, setSortState, columns, items }: TGetSortedTableData) => {
//   const {
//     getRows,
//     sort: { getSortDirection, toggleColumnSort, sort },
//   } = useTableFeatures(
//     {
//       columns,
//       items,
//     },
//     [
//       useTableSort({
//         sortState,
//         onSortChange: (e, nextSortState) => setSortState(nextSortState),
//       }),
//     ]
//   );

//   return {
//     sortedRows: sort(getRows()),
//     getSortDirection,
//     toggleColumnSort
//   };
// }

// export const headerSortProps = (columnId: TableColumnId, tableState: TGetSortedTableData) => {
//   const { getSortDirection, toggleColumnSort } = useSortedTableData(tableState);
//   return {
//     onClick: (e: React.MouseEvent) => toggleColumnSort(e, columnId),
//     sortDirection: getSortDirection(columnId),
//   }
// };