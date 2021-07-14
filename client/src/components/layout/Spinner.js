import React, { Fragment } from 'react';
import { Paper, makeStyles, Grid, CircularProgress, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper className={classes.root} elevation={2}>
        <Grid justify='center' align='center'>
          <LinearProgress color='primary' />
          <CircularProgress color='secondary' />
          <CircularProgress color='primary' />
          <LinearProgress color='primary' />
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Spinner;
