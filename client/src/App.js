import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { Provider } from 'react-redux';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Route exact path='/' component={Landing} />

      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>

    </div>
  </Router>
);

export default App;
