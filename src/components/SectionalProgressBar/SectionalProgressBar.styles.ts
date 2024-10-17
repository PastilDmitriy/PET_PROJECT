import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  sectionalProgressBar: {
    maxWidth: '108px',
    width: '100%',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  progressBarSection: {
    flex: 1,
    height: '8px',
    marginRight: '2px',
    transition: '.2s',
    cursor: 'pointer',
    '&:last-child': {
      borderRadius: '0 2px 2px 0',
    },
    '&:first-child': {
      borderRadius: '2px 0 0 2px',
    },
    '&:hover': {
      flex: 1.4,
      height: '10px',
      transition: '.2s',
      borderRadius: 0,
    },
  },
  notStarted: {
    backgroundColor: '#E6E7EB',
  },
  inProgress: {
    backgroundColor: '#7A7A7A',
  },
  completed: {
    backgroundColor: '#000',
  },
});
