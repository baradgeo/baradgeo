import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Paper, makeStyles, Grid, Box } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Alert = ({ alerts }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={2}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={1} xs={1}></Grid>
        <Grid item md={4} sm={10} xs={10}>
          {alerts !== null &&
            alerts.map((alert) => (
              <Box
                key={alert.id}
                bgcolor={`${alert.alertType}.main`}
                color={`${alert.alertType}.contrastText`}>
                {alert.msg}
              </Box>
            ))}
        </Grid>
        <Grid item md={4} sm={1} xs={1}></Grid>
      </Grid>
    </Paper>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
