import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../redux/actions/profile';
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
const CreateProfile = ({ createProfile, history }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    dept: '',
    portfolio_link: '',
    address: '',
    post: '',
    skills: '',
    contact: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    dept,
    portfolio_link,
    address,
    post,
    skills,
    contact,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <Paper className={classes.root} elevation={2}>
        <Grid container spacing={2}>
          <Grid item md={3} sm={1} xs={1}></Grid>
          <Grid item md={6} sm={10} xs={10}>
            <Typography variant='h4' align='center'>
              Create Your Profile
            </Typography>

            <Typography variant='subtitle1' align='center'>
              Let's get some information to make your profile stand out
            </Typography>
            <Typography variant='caption' align='center'>
              * = required field
            </Typography>
            <form onSubmit={(e) => onSubmit(e)}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    name='dept'
                    value={dept}
                    onChange={(e) => onChange(e)}
                    required
                    id='dept'
                    label='Department'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    name='portfolio_link'
                    value={portfolio_link}
                    onChange={(e) => onChange(e)}
                    required
                    id='portfolio_link'
                    label='Link to your online portfolio'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    name='address'
                    value={address}
                    onChange={(e) => onChange(e)}
                    required
                    id='address'
                    label='Your Postal Address'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <InputLabel id='demo-simple-select-label'>Post</InputLabel>
                  <Select
                    name='post'
                    id='post'
                    value={post}
                    onChange={(e) => onChange(e)}
                    fullWidth>
                    <MenuItem value={'Assistant Engineer'}>Assistant Engineer</MenuItem>
                    <MenuItem value={'Civil Engineer'}>Civil Engineer</MenuItem>
                    <MenuItem value={'Field Engineer'}>Field Engineer</MenuItem>
                    <MenuItem value={'Junior Developer'}>Junior Developer</MenuItem>
                    <MenuItem value={'Senior Developer'}>Senior Developer</MenuItem>
                    <MenuItem value={'Manager'}>Manager</MenuItem>
                    <MenuItem value={'Student or Learning'}>Student or Learning</MenuItem>
                    <MenuItem value={'Intern'}>Intern</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
                  <Typography variant='caption' align='center'>
                    Give us an idea of where you are at in your career
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    placeholder='* Skills'
                    name='skills'
                    value={skills}
                    onChange={(e) => onChange(e)}
                    id='skills'
                    label='Skills'
                    color='primary'
                    fullWidth
                  />
                  <Typography variant='caption' align='center'>
                    Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    type='text'
                    name='contact'
                    value={contact}
                    onChange={(e) => onChange(e)}
                    required
                    id='contact'
                    label='Contact no.'
                    color='primary'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <TextField
                    id='bio'
                    label='A short bio of yourself'
                    name='bio'
                    multiline
                    rows={5}
                    value={bio}
                    onChange={(e) => onChange(e)}
                    variant='outlined'
                    fullWidth
                  />
                </Grid>
                <Grid item md={12} sm={12} xs={12} align='center'>
                  <Grid container align='center' spacing={2}>
                    <Grid item md={6} sm={6} xs={6}>
                      <Button
                        variant='contained'
                        color='primary'
                        align='left'
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}>
                        Add Social Network Links
                      </Button>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6}>
                      <Typography variant='caption' align='center'>
                        Optional
                      </Typography>
                    </Grid>
                  </Grid>{' '}
                </Grid>
                {displaySocialInputs && (
                  <Fragment>
                    <Grid container spacing={2}>
                      <Grid item md={12} sm={12} xs={12} align='center'>
                        <TextField
                          type='text'
                          name='twitter'
                          value={twitter}
                          onChange={(e) => onChange(e)}
                          id='twitter'
                          label='Link to your twitter profile'
                          color='primary'
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12} align='center'>
                        <TextField
                          type='text'
                          name='facebook'
                          value={facebook}
                          onChange={(e) => onChange(e)}
                          id='facebook'
                          label='Link to your facebook profile'
                          color='primary'
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12} align='center'>
                        <TextField
                          type='text'
                          name='youtube'
                          value={youtube}
                          onChange={(e) => onChange(e)}
                          id='youtube'
                          label='Link to your youtube profile'
                          color='primary'
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12} align='center'>
                        <TextField
                          type='text'
                          name='linkedin'
                          value={linkedin}
                          onChange={(e) => onChange(e)}
                          id='linkedin'
                          label='Link to your linkedin profile'
                          color='primary'
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={12} sm={12} xs={12} align='center'>
                        <TextField
                          type='text'
                          name='instagram'
                          value={instagram}
                          onChange={(e) => onChange(e)}
                          id='instagram'
                          label='Link to your instagram profile'
                          color='primary'
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Fragment>
                )}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
