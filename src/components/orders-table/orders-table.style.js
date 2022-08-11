import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px',
  },

  filterWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '30px',
    marginBottom: '20px',
  },

  filterSearchWrap: {
    flex: '1',
  },

  filterSearch: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    maxWidth: '600px',
    padding: '2px 4px',
    border: '1px solid rgba(0, 0, 0, 0.23)',

    '&.MuiPaper-root': {
      boxShadow: 'none',
    },

    '& .MuiInputBase-input': {
      color: '#000',
      padding: '0',
      fontSize: '0.9rem',
    },
  },

  filterSelectWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterSelect: {
    '& .MuiInputBase-root': {
      minWidth: '200px',
      maxHeight: '50px',
    },
    '& .MuiSelect-select': {
      padding: '14px',
    },
  },

  settingBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
    margin: '20px',
  },

  settingStatusBtn: {
    minWidth: '200px',
    paddingBottom: '60px',
  },
}));
