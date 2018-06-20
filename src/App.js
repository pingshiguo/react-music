import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
  NavLink
} from 'react-router-dom';
import AppHeader from './components/AppHeader';
import { Tabs, Tab } from '@material-ui/core';
import Recommend from './components/Recommend';
import Ranking from './components/Ranking';
import Search from './components/Search';

class App extends Component {
  render () {
    const recommendLink = <NavLink to="/recommend">Recommend</NavLink>;
    const rankingLink = <NavLink to="/ranking">Ranking</NavLink>;
    const searchLink = <NavLink to="/search">Search</NavLink>;

    return (
      <Router>
        <div>
          <AppHeader>
            <Tabs value="0" centered>
              <Tab label={recommendLink} />
              <Tab label={rankingLink} />
              <Tab label={searchLink} />
            </Tabs>
          </AppHeader>


          <Switch>
            <Route path="/recommend" component={Recommend} />
            <Redirect from="/" to="/recommend" />

            <Route path="/ranking" component={Ranking} />
            <Route path="/search" component={Search} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
