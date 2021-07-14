import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alert';
import { register } from '../../redux/actions/auth';
import PropTypes from 'prop-types';

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

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'error', 5000);
    } else {
      register({ name, email, password });
    }
  };
  //Redirect if registered and logined successfully
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
              Sign Up
            </Typography>

            <Typography variant='subtitle1' align='center'>
              Create Your Account
            </Typography>
            <form onSubmit={(e) => onSubmit(e)}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    id='name'
                    label='Name'
                    color='primary'
                    type='text'
                    placeholder='Your Name'
                    name='name'
                    value={name}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </Grid>
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
                  <TextField
                    id='password'
                    label='Confirm Password'
                    color='primary'
                    required
                    type='password'
                    placeholder='Confirm Password'
                    name='password2'
                    minLength='6'
                    value={password2}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <Button type='submit' value='Register' variant='contained' color='secondary'>
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </form>
            <br />
            <Divider />
            <br />
            <Typography align='center'>
              Already have an account?{' '}
              <Link to='/login' className={classes.link}>
                Sign In
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
