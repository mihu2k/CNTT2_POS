import { CircularProgress } from '@mui/material';
import { useStyles } from './loading.style';
import { usePromiseTracker } from 'react-promise-tracker';
// import cx from 'classnames';

export default function Loading({ style = {} }) {
  const classes = useStyles();
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      {promiseInProgress ? (
        <div className={classes.screenCenter} style={style}>
          <CircularProgress />
        </div>
      ) : null}
    </>
  );
}
