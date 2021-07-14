import React from 'react';

import {
  Paper,
  makeStyles,
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Nakshkaar from '../../images/portfolio/nakshkaar.JPG';
import Visheshlab from '../../images/portfolio/visheshlab.JPG';
import Shecindia from '../../images/portfolio/shecindia.JPG';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  portfolioMedia: {
    maxWidth: '100vh',
  },
}));

const PortfolioPage = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant='h2' align='center'>
        Your Best Works
      </Typography>
      <Divider />
      <br />
      <br />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography className={classes.heading}>Nakshkaar</Typography>
          <Typography className={classes.secondaryHeading}>
            Tech Stack: Linux, Apache, Mysql, PHP
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container align='center'>
            <Grid item md={12} sm={12}>
              <img src={Nakshkaar} alt='Nakshkaar' className={classes.portfolioMedia} />
            </Grid>

            <Grid item md={6} sm={12}>
              <Typography>
                Nakshkaar Engineers & Consultants Pvt. Ltd. is a growing multidisciplinary
                consultancy service provider in the domain of Civil Infrastructure, beginning, the
                company has grown steadily over the years and has successfully rendered customized
                professional services in various fields.
              </Typography>
            </Grid>
            <Grid item md={6} sm={12}>
              <Button variant='contained' color='primary'>
                <a
                  href='http://nakshkaar.com/index.php'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={classes.link}>
                  Visit Nakshkaar Official Website
                </a>
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography className={classes.heading}>Visheshlab</Typography>
          <Typography className={classes.secondaryHeading}>Tech Stack: Wordpress</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container align='center'>
            <Grid item md={12} sm={12}>
              <img src={Visheshlab} alt='Nakshkaar' className={classes.portfolioMedia} />
            </Grid>

            <Grid item md={6} sm={12}>
              <Typography>
                Vishesh Lab Pvt . Ltd ,is a NABL accredited lab established in 2016 with the
                principle aim of providing civil material testing and geotechnical services to the
                growing construction and infrastructure industry of India. We are focused on
                consultation, supervision, research and testing in civil engineering work,
                especially in geotechnical engineering, foundation engineering, NDT testing ,Slope
                Stability and Geophysical .
              </Typography>
            </Grid>
            <Grid item md={6} sm={12}>
              <Button variant='contained' color='primary'>
                <a
                  href='https://www.visheshlab.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={classes.link}>
                  Visit Vishesh Lab Official Website
                </a>
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography className={classes.heading}>SHEC</Typography>
          <Typography className={classes.secondaryHeading}>
            Tech Stack: Linux, Apache, Mysql, PHP
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container align='center'>
            <Grid item md={12} sm={12}>
              <img src={Shecindia} alt='Nakshkaar' className={classes.portfolioMedia} />
            </Grid>

            <Grid item md={6} sm={12}>
              <Typography>
                "Since 2017, SHEC has been a cornerstone in the engineering solution, involved in
                both commitment and development. We are very proud to lead the path directing
                towards a more powerful future with innovative ideas, value engineering,
                eco-friendly technology and work transparency. We’ve worked on dozens of projects
                aimed at providing innovative engineering solutions and road safety services."
              </Typography>
            </Grid>
            <Grid item md={6} sm={12}>
              <Button variant='contained' color='primary'>
                <a
                  href='https://www.shecindia.com/index.php'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={classes.link}>
                  Visit SHEC Official Website
                </a>
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <br />
      <Divider />
      <br />
    </Paper>
  );
};

export default PortfolioPage;
