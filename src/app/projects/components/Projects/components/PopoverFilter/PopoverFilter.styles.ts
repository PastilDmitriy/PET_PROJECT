import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  activeFilters: {
    color: 'blue',
  },
  checkboxesWrapper: {
    maxHeight: '300px',
    overflowY: 'auto',
    marginTop: '30px',
    height: 'auto',
    boxSizing: 'border-box', // Ensures padding/margin is included in the height
  },
  filterTrigger: {
    paddingTop: '4px',
  },
});
