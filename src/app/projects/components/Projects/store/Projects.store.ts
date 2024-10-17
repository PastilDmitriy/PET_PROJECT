import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../Projects.models';
import { items } from '../Projects.mocks';

export interface IProjectsState {
  initialTableData: Item[];
  tableData: Item[];
  filteredTableData: Item[] | null;
  filtersData: Record<'projectName' | 'client', string[]>;
  searchValue: string;
}

const initialState: IProjectsState = {
  initialTableData: [],
  filteredTableData: null,
  tableData: [],
  filtersData: {
    projectName: [],
    client: [],
  },
  searchValue: '',
};

export const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getTableData: state => {
      state.tableData = items;
      state.initialTableData = items;
      state.filteredTableData = null;
    },

    setFilters: (state, action: PayloadAction<Record<'projectName' | 'client', string[]>>) => {
      const filtersData = action.payload;
      state.filtersData = filtersData;

      state.filteredTableData = state.initialTableData;

      if (Object.values(filtersData).flat().length) {
        let filteredData = state.initialTableData;

        Object.keys(filtersData).forEach(criteria => {
          const filterValues = filtersData[criteria as 'projectName' | 'client'];

          if (filterValues.length > 0) {
            filteredData = filteredData.filter(item => {
              const itemValue = item[criteria as 'projectName' | 'client'].label;
              return filterValues.includes(itemValue);
            });
          }
        });

        state.filteredTableData = filteredData;
        state.tableData = filteredData;
      } else {
        state.filteredTableData = null;
        state.tableData = state.initialTableData;
      }

      state.searchValue = '';
    },

    setSearchValue: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload;
      state.searchValue = searchValue;

      let dataToSearch = state.filteredTableData ?? state.initialTableData;

      if (searchValue) {
        const lowercasedSearchValue = searchValue.toLowerCase();

        state.tableData = dataToSearch.filter(item => {
          const projectNameValue = item.projectName.label.toLowerCase();
          const clientValue = item.client.label.toLowerCase();

          return projectNameValue.includes(lowercasedSearchValue) || clientValue.includes(lowercasedSearchValue);
        });
      } else {
        state.tableData = state.filteredTableData ?? state.initialTableData;
      }
    },
  },
});

export const { getTableData, setFilters, setSearchValue } = ProjectsSlice.actions;

export default ProjectsSlice.reducer;
