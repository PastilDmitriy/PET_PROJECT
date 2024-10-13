import { v4 as getId } from 'uuid'
import {
  Button,
  Dropdown,
  Option,
  OptionOnSelectData,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Select,
  SelectionEvents,
  SelectOnChangeData
} from '@fluentui/react-components'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { setFilters } from '../../store/Projects.store'
import { IFilterData, IFilterProps } from '../Filter.models'
import { useStyles } from './Filter.styles'

const filterOptions = [
  {
    label: 'Project Name',
    value: 'projectName'
  },
  {
    label: 'Client Name',
    value: 'client'
  }
]

export const Filter: FC<IFilterProps> = ({ filterOptionItems }) => {
  const styles = useStyles()
  const { filtersData } = useSelector((state: RootState) => state.projects)
  const dispatch = useDispatch()

  const getDefaultFilterValue = (): IFilterData => {
    const filterId = getId()

    return {
      [filterId]: {
        criteria: '',
        value: []
      }
    }
  }

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
  const [filterData, setFilterData] = useState<IFilterData>(
    filtersData ?? getDefaultFilterValue()
  )

  const onHandleFilterCriteriaChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    data: SelectOnChangeData,
    filterId: string
  ) => {
    const updatedFilterCriteria = {
      ...filterData,
      [filterId]: {
        criteria: data.value as 'projectName' | 'client',
        value: []
      }
    }
    setFilterData(updatedFilterCriteria)
  }

  const handleSelectFiltersOption = (
    e: SelectionEvents,
    data: OptionOnSelectData,
    filterId: string
  ) => {
    const updatedFilterData = {
      ...filterData,
      [filterId]: {
        ...filterData[filterId],
        value: data.selectedOptions
      }
    }

    setFilterData(updatedFilterData)
  }

  const handleAddFilter = () => {
    const updatedFilterData = {
      ...filterData,
      ...getDefaultFilterValue()
    }
    setFilterData(updatedFilterData)
  }

  const handleClosePopover = () => {
    setIsPopoverOpen(false)
  }

  const handleResetFilters = () => {
    dispatch(setFilters(null))
    handleClosePopover()
  }

  const saveFilters = () => {
    dispatch(setFilters(filterData))
    handleClosePopover()
  }

  return (
    <Popover
      withArrow
      positioning="below-start"
      open={isPopoverOpen}
      onOpenChange={(e, data) => setIsPopoverOpen(data.open)}
    >
      <PopoverTrigger>
        <Button appearance="primary">Filter</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <div className={styles.popoverContentWrapper}>
          {Object.keys(filterData).map(filterId => (
            <div className={styles.selectsWrapper} key={filterId}>
              <div className={styles.filterCretirionSelectWrapper}>
                <label htmlFor={filterId}>Filter by:</label>
                <Select
                  id={filterId}
                  defaultValue=""
                  onChange={(e, data) =>
                    onHandleFilterCriteriaChange(e, data, filterId)
                  }
                >
                  <option value="" unselectable="on" disabled>
                    Select value
                  </option>
                  {filterOptions.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>
              {!!filterData[filterId].criteria && (
                <div className={styles.filterValueSelectWrapper}>
                  <label
                    htmlFor={`${filterId}-${filterData[filterId].criteria}`}
                  >
                    Select Option
                  </label>
                  <Dropdown
                    multiselect
                    id={`${filterId}-${filterData[filterId].criteria}`}
                    onOptionSelect={(e, data) =>
                      handleSelectFiltersOption(e, data, filterId)
                    }
                    className={styles.filterValueSelect}
                  >
                    {filterOptionItems[filterData[filterId].criteria].map(
                      label => (
                        <Option key={label} value={label}>
                          {label}
                        </Option>
                      )
                    )}
                  </Dropdown>
                </div>
              )}
            </div>
          ))}
          <div className={styles.buttonGroup}>
            <Button appearance="primary" onClick={handleAddFilter}>
              Add Filter
            </Button>
            <div className={styles.controlPopoverBtns}>
              <Button onClick={handleResetFilters}>Cancel</Button>
              <Button appearance="primary" onClick={saveFilters}>
                Apply Filter(s)
              </Button>
            </div>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  )
}
