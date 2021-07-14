import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography, useScrollTrigger, Fab, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import TocIcon from '@material-ui/icons/Toc';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.main,
    color: 'inherit',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  upButton: {
    position: 'fixed',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  speedDialAction: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    const anchor = document.querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.upButton}>
        {children}
      </div>
    </Zoom>
  );
}

const actions = [
  { icon: <FacebookIcon />, name: 'facebook', url: 'https://www.facebook.com/baradgeo' },
  {
    icon: <WhatsAppIcon />,
    name: 'whatsapp',
    url: 'https://api.whatsapp.com/send?phone=919437368701',
  },
  { icon: <EmailIcon />, name: 'email', url: 'mailto:admin@baradgeo.com' },
  { icon: <LinkedInIcon />, name: 'linkedin', url: 'http://linkedin.com/company/baradgeo' },
  { icon: <TwitterIcon />, name: 'twitter', url: 'http://www.twitter.com/baradgeosoft' },
];

const Footer = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Fragment>
      <Grid container spacing={0} className={classes.root}>
        <Grid item md={8} sm={8} xs={12}>
          <Typography variant='overline'>
            Copyright &copy; 2018 - {new Date().getFullYear()} All rights reserved | This Website is
            made by{' '}
            <Link to='/' className={classes.link}>
              Baradgeo
            </Link>
          </Typography>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <Link to='http://www.twitter.com/baradgeosoft' className={classes.link}>
            <TwitterIcon />
          </Link>
          <Link to='http://linkedin.com/company/baradgeo' className={classes.link}>
            <LinkedInIcon />
          </Link>
          <Link to='https://www.facebook.com/baradgeo' className={classes.link}>
            <FacebookIcon />
          </Link>
          <Link to='mailto:admin@baradgeo.com' className={classes.link}>
            <EmailIcon />
          </Link>
          <Link to='https://api.whatsapp.com/send?phone=919437368701' className={classes.link}>
            <WhatsAppIcon />
          </Link>
        </Grid>
      </Grid>

      <ScrollTop>
        <Fab color='primary' size='large' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <SpeedDial
        ariaLabel='SpeedDial'
        className={classes.speedDial}
        hidden={hidden}
        icon={<TocIcon openIcon={<CloseIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        size='large'
        open={open}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            size='large'
            tooltipTitle={action.name}
            onClick={() => openInNewTab(action.url)}
            className={classes.speedDialAction}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default Footer;
