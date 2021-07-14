import React from 'react';

import { Paper, makeStyles, Grid } from '@material-ui/core';
import Image from '../../images/logo/medium.png';
const useStyles = makeStyles((theme) => ({
  center: {
    height: '50%',
    width: '50%',
  },
  root: {
    minHeight: '100vh',
    backgroundColor: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

}));
const Landing = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={2}>
      <Grid justify='center' align='center'>
        <img src={Image} alt='Baradgeo logo' className={classes.center} />
        
      </Grid>
    </Paper>
  );
};

export default Landing;
