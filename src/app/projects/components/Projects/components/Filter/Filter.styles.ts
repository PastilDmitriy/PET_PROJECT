import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  popoverContentWrapper: {
    width: '700px',
    padding: '12px',
  },
  buttonGroup: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  controlPopoverBtns: {
    display: 'flex',
    gap: '6px',
  },
  selectsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '6px',
  },
  filterCriterionSelectWrapper: {
    width: '45%',
  },
  filterValueSelectWrapper: {
    width: '50%',
  },
  filterValueSelect: {
    width: '100%',
  },
  deleteIconStyles: {
    cursor: 'pointer',
    marginTop: '16px',
    color: 'red',
  },
  titleWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
