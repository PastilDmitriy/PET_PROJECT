import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../Projects.models'
import { items } from '../Projects.mocks'
import { IFilterData } from '../components/Filter.models'

export interface IProjectsState {
  initialTableData: Item[]
  tableData: Item[]
  filtersData: IFilterData | null
  searchValue: string
}

const initialState: IProjectsState = {
  initialTableData: [],
  tableData: [],
  filtersData: null,
  searchValue: ''
}

export const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getTableData: state => {
      state.tableData = items
      state.initialTableData = items
    },
    setFilters: (state, action: PayloadAction<IFilterData | null>) => {
      const filtersData = action.payload
      state.filtersData = action.payload

      if (!filtersData) {
        state.tableData = state.initialTableData
      } else {
        Object.values(filtersData).forEach(({ criteria, value }) => {
          state.tableData = state.initialTableData.filter(item => {
            const isCriteriaExist = !!criteria
            if (isCriteriaExist && value.includes(item[criteria].label))
              return true
          })
        })
        state.searchValue = ''
      }
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload
      if (!searchValue && !state.filtersData) {
        state.tableData = state.initialTableData
      } else {
        state.tableData = state.tableData.filter(item => {
          const projectNameValue = item.projectName.label.toLowerCase()
          const clientValue = item.client.label.toLowerCase()
          const searchTerm = searchValue.toLowerCase()

          return (
            projectNameValue.includes(searchTerm) ||
            clientValue.includes(searchTerm)
          )
        })
      }
      state.searchValue = searchValue
    }
  }
})

export const { getTableData, setFilters, setSearchValue } =
  ProjectsSlice.actions

export default ProjectsSlice.reducer
