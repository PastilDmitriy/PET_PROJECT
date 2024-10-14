import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    borderRadius: '10px',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '44px',
    padding: '24px',
  },
  inputStyles: {
    width: '300px',
    marginLeft: '6px',
  },
  tableStyles: {
    minWidth: '500px',
    height: 'fit-content',
  },
  notFoundContent: {
    textAlign: 'center',
  },
  highlightedText: {
    backgroundColor: '#f3f3f3',
  },
});
