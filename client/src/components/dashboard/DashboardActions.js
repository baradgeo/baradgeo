import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  makeStyles,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
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

const DashboardActions = ({ user }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {user && user.role === 'Admin' && (
        <Fragment>
          <Typography variant='h5' align='center'>
            Admin Dash board is here
          </Typography>
        </Fragment>
      )}
      {user && (user.role === 'User' || user.role === 'Admin') && (
        <Fragment>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
              align='center'>
              <Typography className={classes.heading}>User Actions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container align='center' spacing={2}>
                <Grid item md={4} sm={4} xs={12}>
                  <Button variant='contained' color='primary'>
                    <Link to='/profiles' className={classes.link}>
                      View All People
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Fragment>
      )}

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          align='center'>
          <Typography className={classes.heading}>Profile Actions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container align='center' spacing={2}>
            <Grid item md={4} sm={4} xs={12}>
              <Button variant='contained' color='primary'>
                <Link to='/edit-profile' className={classes.link}>
                  Edit Profile
                </Link>
              </Button>
            </Grid>
            <Grid item md={4} sm={4} xs={12}>
              <Button variant='contained' color='primary'>
                <Link to='/add-experience' className={classes.link}>
                  Add Experience
                </Link>
              </Button>
            </Grid>
            <Grid item md={4} sm={4} xs={12}>
              <Button variant='contained' color='primary'>
                <Link to='/add-education' className={classes.link}>
                  Add Education
                </Link>
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

DashboardActions.propTypes = {
  user: PropTypes.object.isRequired,
};

export default DashboardActions;
