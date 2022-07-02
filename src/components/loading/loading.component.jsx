import { CircularProgress } from '@mui/material';
import { useStyles } from './loading.style';

export default function Loading() {
  const classes = useStyles()

  return (
    <div className={classes.screenCenter}>
      <CircularProgress />
    </div>
  );
}
