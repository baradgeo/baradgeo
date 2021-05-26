import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import Material UI Component
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Toolbar, Typography, IconButton, Badge } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
  brand: {
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontSize: '0.8rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Toolbar>
        <IconButton color='inherit'>
          <MenuIcon />
        </IconButton>

        <Typography variant='h6' className={classes.brand}>
          Barad Geo Soft Solution
        </Typography>

        <IconButton color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color='inherit'>
          <AccountBoxIcon />
        </IconButton>
      </Toolbar>
    </Fragment>
  );
};

export default Navbar;
