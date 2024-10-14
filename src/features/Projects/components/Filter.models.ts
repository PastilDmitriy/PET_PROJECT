export interface IFilterProps {
  filterOptionItems: {
    projectName: string[];
    client: string[];
  };
}

export interface IFilterData {
  [key: string]: {
    criteria: 'projectName' | 'client' | '';
    value: string[];
  };
}
