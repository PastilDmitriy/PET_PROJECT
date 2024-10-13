import { Button, Dropdown, Option, OptionOnSelectData, Popover, PopoverSurface, PopoverTrigger, Select, SelectionEvents, SelectOnChangeData, } from '@fluentui/react-components';
import React, { FC, useState } from 'react';
import { v4 as getId } from 'uuid';
import { useStyles } from './Filter.styles';
import { IFilterProps, IFilterData } from '../Filter.models';
import { RootState } from '@/app/store';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../store/Projects.store';

const filterOptions = [
  {
    label: 'Project Name',
    value: 'projectName',
  },
  {
    label: 'Client Name',
    value: 'client',
  },
];

export const Filter: FC<IFilterProps> = ({ filterOptionItems }) => {
  const styles = useStyles();
  const { filtersData } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  const getDefaultFilterValue = (): IFilterData => {
    const filterId = getId();

    return {
      [filterId]: {
        cretirea: '',
        value: []
      },
    };
  }

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<IFilterData>(filtersData ?? getDefaultFilterValue());

  const onHandleFilterCretireaChange = (e: React.ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData, filterId: string) => {

    const updatedFilterCriteria = {
      ...filterData,
      [filterId]: {
        cretirea: data.value as 'projectName' | 'client',
        value: []
      },
    };
    setFilterData(updatedFilterCriteria);
  };

  const handleSelectFiltersOption = (e: SelectionEvents, data: OptionOnSelectData, filterId: string) => {
    const updatedFilterData = {
      ...filterData,
      [filterId]: {
        ...filterData[filterId],
        value: data.selectedOptions
      },
    };

    setFilterData(updatedFilterData);
  }

  const handleAddFilter = () => {
    const updatedFilterData = {
      ...filterData,
      ...getDefaultFilterValue()
    };
    setFilterData(updatedFilterData);
  }

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  }

  const handleResetFilters = () => {
    dispatch(setFilters(null));
    handleClosePopover();
  }

  const saveFilters = () => {
    dispatch(setFilters(filterData));
    handleClosePopover();
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
          {Object.keys(filterData).map((filterId) => (
            <div className={styles.selectsWrapper} key={filterId}>
              <div className={styles.filterCretirionSelectWrapper}>
                <label htmlFor={filterId}>Filter by:</label>
                <Select
                  id={filterId}
                  defaultValue=''
                  onChange={(e, data) => onHandleFilterCretireaChange(e, data, filterId)}
                >
                  <option value='' unselectable='on' disabled>Select value</option>
                  {filterOptions.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>
              {!!filterData[filterId].cretirea && (
                <div className={styles.filterValueSelectWrapper}>
                  <label htmlFor={`${filterId}-${filterData[filterId].cretirea}`}>Select Option</label>
                  <Dropdown
                    multiselect
                    id={`${filterId}-${filterData[filterId].cretirea}`}
                    onOptionSelect={(e, data) => handleSelectFiltersOption(e, data, filterId)}
                    className={styles.filterValueSelect}
                  >
                    {filterOptionItems[filterData[filterId].cretirea].map((label) => (
                      <Option key={label} value={label}>
                        {label}
                      </Option>
                    ))}
                  </Dropdown>
                </div>
              )}
            </div>
          ))}
          <div className={styles.buttonGroup}>
            <Button
              appearance="primary"
              onClick={handleAddFilter}
            >
              Add Filter
            </Button>
            <div className={styles.controlPopoverBtns}>
              <Button
                onClick={handleResetFilters}
              >
                Cancel
              </Button>
              <Button
                appearance="primary"
                onClick={saveFilters}
              >
                Apply Filter(s)
              </Button>
            </div>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  );
};
