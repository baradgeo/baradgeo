import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import DashboardPage from './DashboardPage';

import { Paper, makeStyles, Grid, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const Dashboard = ({ auth: { user, isAuthenticated, loading } }) => {
  const classes = useStyles();

  const approvedPart = (
    <Fragment>
      <DashboardPage />
    </Fragment>
  );

  const notapprovedPart = (
    <Fragment>
      <Typography variant='h5' align='center'>
        Your Account is pending for approval.
      </Typography>
    </Fragment>
  );
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Paper className={classes.root} elevation={1}>
        <Typography variant='h5' align='center'>
          Welcome {user && user.name} (Role: {user && user.role})
        </Typography>

        {!loading && isAuthenticated && (
          <Fragment>{user && user.isApproved ? approvedPart : notapprovedPart}</Fragment>
        )}
        <br />
        <Divider />
        <br />
        <Grid container spacing={2}></Grid>
      </Paper>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Dashboard);
