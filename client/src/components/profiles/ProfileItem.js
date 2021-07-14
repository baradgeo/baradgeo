import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={avatar} title='Emplyoyee Avatar' />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            View Profile
          </Button>
        </CardActions>
      </Card>
      <div className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className='my-1'>{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check'>{skill}</i>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
