import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../layout/NotFound';
import AboutPage from '../static/AboutPage';
import ServicePage from '../static/ServicePage';
import PortfolioPage from '../static/PortfolioPage';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Login from '../auth/Login';
import Register from '../auth/Register';

import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';

import PrivateRoute from '../routing/PrivateRoute';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path='/about' component={AboutPage} />
        <Route exact path='/services' component={ServicePage} />
        <Route exact path='/portfolio' component={PortfolioPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />

        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />

        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />

        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
