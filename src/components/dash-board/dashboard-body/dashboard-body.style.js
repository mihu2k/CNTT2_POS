import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },

  formField: {
    '& .css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input.css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input.css-19ygod6-MuiNativeSelect-select-MuiInputBase-input-MuiInput-input':
      {
        minWidth: '200px',
      },
  },
  dashboardBody: {
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },

  dashboardContent: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
  },

  dashboardCard: {
    minWidth: '282px',
    minHeight: '125px',
    padding: '20px',
    borderRadius: '4px',
    marginTop: '36px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
  },

  metricLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#6e6e6e',
    marginBottom: '20px',
  },

  dashboardCardTitle: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  metricValue: {
    fontSize: '1.4rem',
  },
}));
