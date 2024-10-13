import { makeStyles } from '@fluentui/react-components'

export const useStyles = makeStyles({
  popoverContentWrapper: {
    width: '700px',
    padding: '12px'
  },
  buttonGroup: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px'
  },
  controlPopoverBtns: {
    display: 'flex',
    gap: '6px'
  },
  selectsWrapper: {
    display: 'flex',
    alignItems: 'baseline'
  },
  filterCretirionSelectWrapper: {
    width: '45%'
  },
  filterValueSelectWrapper: {
    width: '55%'
  },
  filterValueSelect: {
    width: '100%'
  }
})
