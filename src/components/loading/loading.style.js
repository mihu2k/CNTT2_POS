import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  screenCenter: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .1)',
    zIndex: 1201,
  },
}));
