import React from 'react';
import { Fragment } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Image from '../../images/logo/medium.png'; // Import using relative path

const Landing = () => {
  return (
    <Fragment>
      <Container fixed>
        <img src={Image} />
      </Container>
    </Fragment>
  );
};

export default Landing;
