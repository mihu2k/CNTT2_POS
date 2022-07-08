import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0',
    color: '#777',
  },

  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },

  content: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px',
  },
}));
