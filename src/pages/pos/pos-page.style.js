import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    width: '100%',
    minHeight: '60px',
  },
  searchWrap: {
    marginLeft: '20px',
  },
  searchInput: {
    minWidth: '321px',
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '20px',
  },
  containerRow: {
    display: 'flex',
    margin: '20px',
    maxHeight: '600px',
    overflowY: 'scroll',
  },

  productWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',

    '&:hover': {
      border: '1px solid #1976d2',
    },
  },

  productName: {
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',

    'text-overflow': 'ellipsis',

    overflow: 'hidden',
    textAlign: 'center',
  },
  imgFluid: {
    maxWidth: '90px',
    maxHeight: '90px',
    objectFit: 'cover',
  },
  invoiceWrapper: {
    maxHeight: '600px',
  },
  invoice: {
    marginTop: '20px',
    height: '100%',
    overflowY: 'scroll',
    '& table.MuiTable-root.css-1pclhgl-MuiTable-root': {
      minWidth: '100%',
    },
  },

  invoiceFooter: {
    display: 'flex',
    width: '100%',
  },

  invoicePaymentBtn: {
    width: '100%',
    '&.MuiButtonBase-root': {
      padding: '15px 0',
      borderRadius: '0',
    },
  },

  invoicePaymentText: {
    width: '100%',
    textAlign: 'center',
    padding: '20px 0',
  },

  recieptPaper: {
    margin: '50px',
  },

  actionsBtns: {
    margin: '0 20px 20px 20px',
  },

  // css for reciept
  recieptPaperHeader: {},
  customerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  recieptPaperFooter: {
    display: 'block',
    textAlign: 'center',
    margin: '36px 0',
  },
}));
