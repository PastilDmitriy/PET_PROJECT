import { v4 as getId } from 'uuid';
import { Button, Dropdown, Option, OptionOnSelectData, Popover, PopoverSurface, PopoverTrigger, Select, SelectionEvents, SelectOnChangeData } from '@fluentui/react-components';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setFilters } from '../../store/Projects.store';
import { IFilterData, IFilterProps } from '../Filter.models';
import { useStyles } from './Filter.styles';
import { DeleteFilled } from '@fluentui/react-icons';
import lodash from 'lodash';
import { isObjectEmpty } from '../../Projects.utilites';

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
        criteria: '',
        value: [],
      },
    };
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true);
  const [selectedFilterCriteria, setSelectedFilterCriteria] = useState<string[]>([]);
  const [filterData, setFilterData] = useState<IFilterData>(filtersData ?? getDefaultFilterValue());

  const setSelectedFiltersCriteria = (updatedFilterCriteria: IFilterData) => {
    const selectedCriteria = Object.values(updatedFilterCriteria).map(({ criteria }) => criteria);

    setSelectedFilterCriteria(selectedCriteria);
  };

  const onHandleFilterCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData, filterId: string) => {
    const updatedFilterCriteria = {
      ...filterData,
      [filterId]: {
        criteria: data.value as 'projectName' | 'client',
        value: [],
      },
    };

    setSelectedFiltersCriteria(updatedFilterCriteria);
    setIsSaveButtonDisabled(true);
    setFilterData(updatedFilterCriteria);
  };

  const handleSelectFiltersOption = (e: SelectionEvents, data: OptionOnSelectData, filterId: string) => {
    const updatedFilterData = {
      ...filterData,
      [filterId]: {
        ...filterData[filterId],
        value: data.selectedOptions,
      },
    };

    const hasEmptyValues = Object.values(updatedFilterData).some(({ value }) => !value.length);

    setFilterData(updatedFilterData);
    setIsSaveButtonDisabled(!!hasEmptyValues);
  };

  const handleAddFilter = () => {
    const updatedFilterData = {
      ...filterData,
      ...getDefaultFilterValue(),
    };
    setIsSaveButtonDisabled(true);
    setFilterData(updatedFilterData);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleResetFilters = () => {
    dispatch(setFilters(null));
    setFilterData(getDefaultFilterValue());
    setSelectedFilterCriteria([]);
  };

  const saveFilters = () => {
    dispatch(setFilters(filterData));
    handleClosePopover();
  };

  const handleDeleteCriterion = (filterId: string) => {
    let updatedFilterData = lodash.cloneDeep(filterData);

    delete updatedFilterData[filterId];

    if (isObjectEmpty(updatedFilterData)) {
      updatedFilterData = {
        ...getDefaultFilterValue(),
      };
    }
    setSelectedFiltersCriteria(updatedFilterData);
    setFilterData(updatedFilterData);
  };

  const isAddFiltersBtnDisabled = Object.keys(filterData).length === filterOptions.length;

  return (
    <Popover withArrow positioning="below-start" open={isPopoverOpen}>
      <PopoverTrigger>
        <Button appearance="primary" onClick={() => setIsPopoverOpen(true)}>
          Filter
        </Button>
      </PopoverTrigger>

      <PopoverSurface>
        <div className={styles.popoverContentWrapper}>
          <div className={styles.titleWrapper}>
            <h3>Filter(s)</h3>
            <Button appearance="primary" onClick={handleResetFilters}>
              Reset Filter(s)
            </Button>
          </div>

          {Object.keys(filterData).map(filterId => (
            <div className={styles.selectsWrapper} key={filterId}>
              <div className={styles.filterCriterionSelectWrapper}>
                <label htmlFor={filterId}>Filter by:</label>
                <Select id={filterId} value={filterData[filterId].criteria} onChange={(e, data) => onHandleFilterCriteriaChange(e, data, filterId)}>
                  <option value="" unselectable="on" disabled>
                    Select value
                  </option>
                  {filterOptions.map(({ label, value }) => (
                    <option key={value} value={value} disabled={selectedFilterCriteria.includes(value)}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>
              {!!filterData[filterId].criteria && (
                <div className={styles.filterValueSelectWrapper}>
                  <label htmlFor={`${filterId}-${filterData[filterId].criteria}`}>Select Option</label>
                  <Dropdown
                    multiselect
                    id={`${filterId}-${filterData[filterId].criteria}`}
                    selectedOptions={filterData[filterId].value}
                    value={filterData[filterId].value as unknown as readonly string[] & string}
                    onOptionSelect={(e, data) => handleSelectFiltersOption(e, data, filterId)}
                    className={styles.filterValueSelect}
                  >
                    {filterOptionItems[filterData[filterId].criteria].map(label => (
                      <Option key={label} value={label}>
                        {label}
                      </Option>
                    ))}
                  </Dropdown>
                </div>
              )}
              <DeleteFilled onClick={() => handleDeleteCriterion(filterId)} fontSize={24} className={styles.deleteIconStyles} />
            </div>
          ))}
          <div className={styles.buttonGroup}>
            <Button appearance="primary" onClick={handleAddFilter} disabled={isAddFiltersBtnDisabled}>
              Add Filter
            </Button>
            <div className={styles.controlPopoverBtns}>
              <Button
                onClick={() => {
                  handleResetFilters();
                  handleClosePopover();
                }}
              >
                Cancel
              </Button>
              <Button appearance="primary" onClick={saveFilters} disabled={isSaveButtonDisabled}>
                Apply Filter(s)
              </Button>
            </div>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  );
};
