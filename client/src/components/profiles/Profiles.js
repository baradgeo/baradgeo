import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../redux/actions/profile';

import {
  Paper,
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const classes = useStyles();
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Paper className={classes.root} elevation={2}>
            <Grid container spacing={2}>
              <Grid item md={3} sm={1} xs={1}></Grid>
              <Grid item md={6} sm={10} xs={10}>
                <Typography variant='h4' align='center'>
                  Peoples at Baradgeo
                </Typography>
                <br />
                <Fragment>
                  {profiles.length > 0 ? (
                    profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)
                  ) : (
                    <h4>No Profiles found..</h4>
                  )}
                </Fragment>
                <Divider />
              </Grid>
              <Grid item md={3} sm={1} xs={1}></Grid>
            </Grid>
          </Paper>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
