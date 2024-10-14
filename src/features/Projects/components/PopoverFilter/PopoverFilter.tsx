import { RootState } from '@/app/store';
import { Popover, PopoverTrigger, Button, PopoverSurface, Checkbox, CheckboxOnChangeData, Field, SearchBox, mergeClasses } from '@fluentui/react-components';
import { FilterFilled } from '@fluentui/react-icons';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../store/Projects.store';
import { useStyles } from './PopoverFilter.styles';

interface IPopoverFilterProps {
  options: string[];
  criterion: 'projectName' | 'client';
}

export const PopoverFilter: FC<IPopoverFilterProps> = ({ options, criterion }) => {
  const styles = useStyles();
  const { filtersData } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>(filtersData && filtersData[criterion].length ? filtersData[criterion] : []);

  const handleOptionChange = (option: string, data: CheckboxOnChangeData) => {
    const checked = data.checked;
    if (checked) {
      setSelectedOptions(prev => [...prev, option]);
    } else {
      setSelectedOptions(prev => prev.filter(opt => opt !== option));
    }
  };

  const saveFilters = () => {
    const filterData: Record<'projectName' | 'client', string[]> = {
      ...filtersData,
      [criterion as 'projectName' | 'client']: selectedOptions ?? [],
    };
    dispatch(setFilters(filterData));
    setIsPopoverOpen(false);
  };

  const handleCancel = () => {
    dispatch(
      setFilters({
        ...filtersData,
        [criterion]: [],
      }),
    );
    setSelectedOptions([]);
    setSearchValue('');
    setIsPopoverOpen(false);
  };

  const hasActiveFilters = mergeClasses(selectedOptions.length ? styles.activeFilters : '');

  return (
    <div
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Popover withArrow positioning="below-start" open={isPopoverOpen} onOpenChange={(event, data) => setIsPopoverOpen(data.open)}>
        <PopoverTrigger>
          <div className={styles.filterTrigger}>
            <FilterFilled
              className={hasActiveFilters}
              onClick={e => {
                e.stopPropagation();
                setIsPopoverOpen(true);
              }}
            />
          </div>
        </PopoverTrigger>

        <PopoverSurface>
          <div style={{ padding: '20px' }}>
            <Field label="Search by name">
              <SearchBox value={searchValue} onChange={(_e, data) => setSearchValue(data.value)} />
            </Field>
            <div className={styles.checkboxesWrapper}>
              {options
                .filter(value => {
                  if (!searchValue) return true;
                  if (value.toLowerCase().includes(searchValue.toLowerCase())) return true;
                })
                .map(option => (
                  <div key={option}>
                    <Checkbox checked={selectedOptions.includes(option)} onChange={(_ev, data) => handleOptionChange(option, data)} label={option} />
                  </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button onClick={handleCancel}>Reset filter(s)</Button>
              <Button appearance="primary" onClick={saveFilters} style={{ marginLeft: '10px' }}>
                Apply Filter(s)
              </Button>
            </div>
          </div>
        </PopoverSurface>
      </Popover>
    </div>
  );
};
