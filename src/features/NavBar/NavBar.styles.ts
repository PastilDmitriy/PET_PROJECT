import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  linksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  linkContentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  linkStyles: {
    textDecoration: 'none',
    width: '200px',
    borderRadius: '6px',
    color: 'black',
    margin: '2px',
    padding: '10px',
    ':hover': {
      backgroundColor: '#e0e0e0',
    },
  },
});
