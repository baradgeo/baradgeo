import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/auth';

import { Paper, makeStyles, Grid, Typography, TextField, Button, Divider } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'underline',
    color: 'inherit',
  },
}));

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Paper className={classes.root} elevation={2}>
        <Grid container spacing={2}>
          <Grid item md={4} sm={1} xs={1}></Grid>
          <Grid item md={4} sm={10} xs={10}>
            <Typography variant='h4' align='center'>
              Sign In
            </Typography>

            <Typography variant='subtitle1' align='center'>
              Sign into Your Account
            </Typography>
            <form onSubmit={(e) => onSubmit(e)}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    id='email'
                    label='Email'
                    color='primary'
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    id='password'
                    label='Password'
                    color='primary'
                    type='password'
                    placeholder='Password'
                    name='password'
                    minLength='6'
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <Button type='submit' value='Login' variant='contained' color='secondary'>
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </form>
            <br />
            <Divider />
            <br />
            <Typography align='center'>
              Don't have an account?{' '}
              <Link to='/register' className={classes.link}>
                Sign Up
              </Link>
            </Typography>
          </Grid>
          <Grid item md={4} sm={1} xs={1}></Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
