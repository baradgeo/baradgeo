import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';

//Import Material UI Component
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Typography,
  IconButton,
  Button,
  AppBar,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import InfoIcon from '@material-ui/icons/Info';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PermMediaIcon from '@material-ui/icons/PermMedia';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  brandName: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  textResponsive: {
    fontSize: '0.5rem',
    '@media (min-width:450px)': {
      fontSize: '1rem',
    },

    '@media (min-width:600px)': {
      fontSize: '1.2rem',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: 'inherit',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [state, setState] = useState({
    open: false,
  });
  const classes = useStyles();
  const handleToggle = () => setState({ open: !state.open });

  const authLinks = (
    <Fragment>
      <Button color='inherit'>
        <Link to='/dashboard' className={`${classes.link} ${classes.textResponsive}`}>
          Dashboard
        </Link>
      </Button>
      <Button
        color='inherit'
        onClick={logout}
        className={`${classes.link} ${classes.textResponsive}`}>
        Logout
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button color='inherit'>
        <Link to='/register' className={`${classes.link} ${classes.textResponsive}`}>
          Register
        </Link>
      </Button>
      <Button color='inherit'>
        <Link to='/login' className={`${classes.link} ${classes.textResponsive}`}>
          Login
        </Link>
      </Button>
    </Fragment>
  );

  return (
    <Fragment>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.brandName}>
            <Link to='/' className={`${classes.link} ${classes.textResponsive}`}>
              Barad Geo Soft Solution
            </Link>
          </Typography>
          {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </Toolbar>
      </AppBar>
      <Divider id='back-to-top-anchor' />
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClick={handleToggle}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to='/' className={classes.link}>
            <ListItem button key='Home'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Link to='/about' className={classes.link}>
            <ListItem button key='About'>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItem>
          </Link>
          <Link to='/services' className={classes.link}>
            <ListItem button key='Services'>
              <ListItemIcon>
                <RoomServiceIcon />
              </ListItemIcon>
              <ListItemText primary='Services' />
            </ListItem>
          </Link>
          <Link to='/portfolio' className={classes.link}>
            <ListItem button key='Portfolio'>
              <ListItemIcon>
                <PermMediaIcon />
              </ListItemIcon>
              <ListItemText primary='Portfolio' />
            </ListItem>
          </Link>
          <ListItem button key='Contact'>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary='Contact' />
          </ListItem>

          <ListItem button key='Blog'>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary='Blog' />
          </ListItem>
        </List>
        <Divider />
        <List></List>
      </Drawer>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
