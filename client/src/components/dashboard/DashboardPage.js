import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../redux/actions/profile';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import { makeStyles, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const DashboardPage = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  const classes = useStyles();
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <DashboardActions user={user} />
          <Experience experience={profile.experiences} />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <Typography variant='h5' align='center'>
            You have not yet setup a profile, please add some info
          </Typography>
          <Button variant='contained' color='primary'>
            <Link to='/create-profile' className={classes.link}>
              Create Profile
            </Link>
          </Button>
        </Fragment>
      )}
    </Fragment>
  );
};

DashboardPage.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(DashboardPage);
