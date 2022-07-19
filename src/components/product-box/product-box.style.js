import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
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
    fontWeight: 600,
  },
  imgFluid: {
    maxWidth: '90px',
    maxHeight: '90px',
    objectFit: 'cover',
  },
  wrapChooseColor: {
    marginTop: '8px',
    '& .boxChooseColor + .boxChooseColor': {
      marginLeft: '14px',
    },
    '& .boxChooseColor': {
      display: 'inline-flex',
    },
  },
  wrapCircleBox: {
    width: '23px',
    height: '23px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBox: {
    width: '18px',
    height: '18px',
    borderRadius: 999,
    backgroundColor: '#00ffce',
    border: '1px solid #a1a1a1',
  },
  productPrice: {
    margin: '8px 0 10px',
    fontWeight: 600,
  },
}));
