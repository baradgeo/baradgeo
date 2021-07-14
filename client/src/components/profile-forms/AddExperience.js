import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../redux/actions/profile';
import { Fragment, useState } from 'react';

import {
  Paper,
  makeStyles,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Checkbox,
  FormControlLabel,
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

const AddExperience = ({ addExperience, history }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <Paper className={classes.root} elevation={2}>
        <Grid container spacing={2}>
          <Grid item md={3} sm={1} xs={1}></Grid>
          <Grid item md={6} sm={10} xs={10}>
            <Typography variant='h4' align='center'>
              Add An Experience
            </Typography>

            <Typography variant='subtitle1' align='center'>
              Add any developer/programming positions that you have had in the past
            </Typography>
            <Typography variant='caption' align='center'>
              * = required field
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addExperience(formData, history);
              }}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    placeholder='* Job Title'
                    name='title'
                    value={title}
                    onChange={(e) => onChange(e)}
                    required
                    id='title'
                    label='Job Title'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    placeholder='* Company'
                    name='company'
                    value={company}
                    onChange={(e) => onChange(e)}
                    required
                    id='company'
                    label='Company'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    placeholder='Location'
                    name='location'
                    value={location}
                    onChange={(e) => onChange(e)}
                    id='location'
                    label='Location'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='date'
                    id='from-date'
                    label='From-Date'
                    format='MM/dd/yyyy'
                    value={from}
                    name='from'
                    onChange={(e) => onChange(e)}
                    required
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        type='checkbox'
                        name='current'
                        checked={current}
                        value={current}
                        onChange={(e) => {
                          setFormData({ ...formData, current: !current });
                          toggleDisabled(!toDateDisabled);
                        }}
                        color='secondary'
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    }
                    label='Current Job?'
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='date'
                    id='to-date'
                    label='to-Date'
                    format='MM/dd/yyyy'
                    value={to}
                    name='to'
                    onChange={(e) => onChange(e)}
                    disabled={toDateDisabled ? 'disabled' : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    id='description'
                    label='Job Description'
                    name='description'
                    multiline
                    rows={5}
                    placeholder='Job Description'
                    value={description}
                    onChange={(e) => onChange(e)}
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <Grid container align='center' spacing={2}>
                    <Grid item md={6} sm={6} xs={6}>
                      <Button
                        type='submit'
                        value='Submit'
                        variant='contained'
                        color='primary'
                        align='left'>
                        Submit
                      </Button>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6}>
                      <Button variant='contained' color='secondary' align='right'>
                        <Link to='/dashboard' className={classes.link}>
                          Go Back
                        </Link>
                      </Button>
                    </Grid>
                  </Grid>{' '}
                </Grid>
              </Grid>
            </form>
            <br />
            <Divider />
          </Grid>
          <Grid item md={3} sm={1} xs={1}></Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
