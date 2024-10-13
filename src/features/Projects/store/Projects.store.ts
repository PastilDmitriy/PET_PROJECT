import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../Projects.models';
import { items } from '../Projects.mocks';
import { IFilterData } from '../components/Filter.models';

export interface IProjectsState {
  initalTableData: Item[],
  tableData: Item[],
  filtersData: IFilterData | null,
  searchValue: string,
}

const initialState: IProjectsState = {
  initalTableData: [],
  tableData: [],
  filtersData: null,
  searchValue: '',
};

export const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getTableData: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tableData = items;
      state.initalTableData = items;
    },
    setFilters: (state, action: PayloadAction<IFilterData | null>) => {
      const filtersData = action.payload;
      state.filtersData = action.payload;

      if (!filtersData) {
        state.tableData = state.initalTableData;
      } else {
        Object.values(filtersData).forEach(({ cretirea, value }) => {
          state.tableData = state.initalTableData.filter((item) => {
            const isCretireaExist = !!cretirea
            if (isCretireaExist && value.includes(item[cretirea].label)) return true
          })
        })
        state.searchValue = '';
      }
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload;
      if (!searchValue && !state.filtersData) {
        state.tableData = state.initalTableData
      } else {
        state.tableData = state.tableData.filter((item) => {
          const projectNameValue = item.projectName.label.toLowerCase();
          const clientValue = item.client.label.toLowerCase();
          const searchTerm = searchValue.toLowerCase();

          return projectNameValue.includes(searchTerm) || clientValue.includes(searchTerm);
        });
      }
      state.searchValue = searchValue;
    },
  },
})

export const { getTableData, setFilters, setSearchValue } = ProjectsSlice.actions;

export default ProjectsSlice.reducer;
