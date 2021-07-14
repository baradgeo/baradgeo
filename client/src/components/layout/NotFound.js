import React from 'react';
import { Fragment } from 'react';

import { Paper, makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper className={classes.root} elevation={2}>
        <Grid container spacing={0}>
          <Grid item md={2} sm={1} xs={1}></Grid>
          <Grid item md={8} sm={10} xs={10}>
            <Typography variant='h4' align='center'>
              Page not found
            </Typography>

            <Typography variant='subtitle1' align='center'>
              Sorry, the page you are looking for does not exist.
            </Typography>
          </Grid>
          <Grid item md={2} sm={1} xs={1}></Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default NotFound;
