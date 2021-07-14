import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../redux/actions/profile';
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

const AddEducation = ({ addEducation, history }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <Paper className={classes.root} elevation={2}>
        <Grid container spacing={2}>
          <Grid item md={3} sm={1} xs={1}></Grid>
          <Grid item md={6} sm={10} xs={10}>
            <Typography variant='h4' align='center'>
              Add Your Education
            </Typography>

            <Typography variant='subtitle1' align='center'>
              Any school, bootcamp, etc that you have attended
            </Typography>
            <Typography variant='caption' align='center'>
              * = required field
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addEducation(formData, history);
              }}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    name='school'
                    value={school}
                    onChange={(e) => onChange(e)}
                    required
                    id='school'
                    label='School or Bootcamp'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    name='degree'
                    value={degree}
                    onChange={(e) => onChange(e)}
                    required
                    id='degree'
                    label='Degree or Certificate'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    name='fieldofstudy'
                    value={fieldofstudy}
                    onChange={(e) => onChange(e)}
                    id='fieldofstudy'
                    label='Field of Study'
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
                    label='Current School?'
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
                    label='Program Description'
                    name='description'
                    multiline
                    rows={5}
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
