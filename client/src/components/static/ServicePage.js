import React from 'react';

import {
  Paper,
  makeStyles,
  Grid,
  Typography,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core';

import FullStack from '../../images/services/fullstack.jpg';
import Gisweb from '../../images/services/gisweb.png';
import Software from '../../images/services/software.jpg';
import Mobileapp from '../../images/services/mobileapp.png';
import Wordpress from '../../images/services/wordpress.jpg';
import Lidar from '../../images/services/lidar.jpg';
import Drone from '../../images/services/drone.png';
import Survey from '../../images/services/survey.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  card: {
    maxWidth: 345,
  },
  cardMedia: {
    height: 200,
  },
}));

const ServicePage = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant='h2' align='center'>
        What we Offer to our Clients
      </Typography>
      <Divider />
      <br />
      <br />
      <Grid container>
        <Grid item md={4} sm={6} xs={12}>
          {' '}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.cardMedia} image={FullStack} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Full Stack Web Development
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Full stack development: It refers to the development of both front end(client
                  side) and back end(server side) portions of web application. We provide the most
                  famous stack in the world i.e. Tha Javascript Full Stack (MERN).
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          {' '}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.cardMedia} image={Gisweb} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  GIS Full Stack Development
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  GIS Full stack development: It refers to the development front endin popular GIS
                  frameworks like Leaflet JS and back end in Geoserver and Apache server. We provide
                  the top notch developemnt in GIS mobile app and web app.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          {' '}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.cardMedia} image={Software} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Software Development
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Software development is the process of conceiving, specifying, designing,
                  programming.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          {' '}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.cardMedia} image={Mobileapp} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Mobile App Development
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  We use React Native to develop cross-platform Native mobile apps for both IOS and
                  Andriod platform.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item md={4} sm={6} xs={12}>
          {' '}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.cardMedia} image={Wordpress} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Wordpress/CMS Development
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Wordpress is a leading Content Management System Trusted by the Best 41% of the
                  web uses WordPress, from hobby blogs to the biggest news sites online. We have
                  expert wordpress developer team to full fill all your needs.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          {' '}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.cardMedia} image={Lidar} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  LiDAR
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Lidar is a surveying method that measures distance to a target by illuminating the
                  target with pulsed laser light and measuring the reflected pulses with a sensor.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          {' '}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.cardMedia} image={Drone} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Drone Survey and Data processing
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  With drone applications stretching its arms to various industries, UAV Data
                  Processing is the latest wave in the Geospatial realm.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          {' '}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.cardMedia} image={Survey} />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Land Survey
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Topographic Survey of Road, Building, Pipeline etc using Total Station, DGPS for
                  DPR and Construction projects.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ServicePage;
