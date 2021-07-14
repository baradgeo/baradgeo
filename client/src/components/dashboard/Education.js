import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profile';

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

const Education = ({ education, deleteEducation }) => {
  const classes = useStyles();
  const educations = education.map((edu) => (
    <TableRow key={edu._id}>
      <TableCell>{edu.school}</TableCell>
      <TableCell>{edu.degree}</TableCell>
      <TableCell>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? ' Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
      </TableCell>
      <TableCell>
        <Button onClick={() => deleteEducation(edu._id)} variant='contained' color='secondary'>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));
  return (
    <Fragment>
      <Typography variant='h4' align='center'>
        Education Credentials
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>School</TableCell>
              <TableCell className={classes.tableHead}>Degree</TableCell>
              <TableCell className={classes.tableHead}>Years</TableCell>
              <TableCell className={classes.tableHead}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{educations}</TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
