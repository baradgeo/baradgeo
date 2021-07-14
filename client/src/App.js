import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Routes from './components/routing/Routes';

import { CssBaseline, Container, ThemeProvider } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Utilities
import setAuthToken from './utils/setAuthToken';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

let darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#e65100',
    },
  },
});
darkTheme = responsiveFontSizes(darkTheme);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <Container maxWidth='xl'>
            <CssBaseline />
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
            <Footer />
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
