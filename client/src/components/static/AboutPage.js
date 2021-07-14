import React from 'react';
import { Fragment } from 'react';

import { Paper, makeStyles, Grid, Typography, Divider } from '@material-ui/core';
import Image from '../../images/about/about.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: `url(${Image})`,
  },
  paragraph: {
    backgroundColor: ' rgb(0, 0, 0, 0.3)',
  },
}));

const AboutPage = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Paper className={classes.root} elevation={2}>
        <Grid container spacing={0}>
          <Grid item md={2} sm={1} xs={1}></Grid>
          <Grid item md={8} sm={10} xs={10}>
            <Typography variant='h3' align='center'>
              About Us
            </Typography>
            <Divider />
            <Typography variant='subtitle1' align='center'>
              Barad Geo Soft Solutions was founded in 2018 with a single mission: to be the most
              successful, creative and ground-breaking consulting agency in Bhopal, Madhya Pradesh,
              India . We approach each of our clients with fresh eyes to develop customized, unique
              strategies. Though we’ve grown since our founding, we’re still the same agency at
              heart. Let us help make your dreams a reality. Are you ready to set your brand or
              business on the path to success through digitization? Give us a call today and see
              what we can do for you.
            </Typography>
            <Divider />
          </Grid>
          <Grid item md={2} sm={1} xs={1}></Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default AboutPage;
