import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  userBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '20px',
  },
  userWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
    cursor: 'pointer',
    padding: 'unset',
  },
}));
