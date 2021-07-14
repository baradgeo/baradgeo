import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/actions/profile';

import {
  makeStyles,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  tableHead: {
    color: theme.palette.secondary.main,
  },
}));

const Experience = ({ experience, deleteExperience }) => {
  const classes = useStyles();
  const experiences = experience.map((exp) => (
    <TableRow key={exp._id}>
      <TableCell>{exp.company}</TableCell>
      <TableCell>{exp.title}</TableCell>
      <TableCell>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
      </TableCell>
      <TableCell>
        <Button onClick={() => deleteExperience(exp._id)} variant='contained' color='secondary'>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));
  return (
    <Fragment>
      <Typography variant='h4' align='center'>
        Experience Credentials
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Company</TableCell>
              <TableCell className={classes.tableHead}>Title</TableCell>
              <TableCell className={classes.tableHead}>Years</TableCell>
              <TableCell className={classes.tableHead}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{experiences}</TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
