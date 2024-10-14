import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  mainWrapper: {
    margin: 0,
    padding: 0,
    display: 'flex',
    height: '100vh',
    background: '#f3f3f3',
  },
  navBarWrapper: {
    height: '100%',
    width: '18vw',
  },
  contentWrapper: {
    flexGrow: 1,
    overflowY: 'auto',
    maxWidth: '82vw',
    background: 'white',
    borderRadius: '10px',
    margin: '6px',
  },
});
