import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  NavLink
} from 'react-router-dom';
import Recommend from './components/Recommend';
import Rank from './components/Rank';
import Search from './components/Search';

import './common/css/normalize.css';
import './common/css/app.css';

class App extends Component {
  render () {
    return (
      <Router>
        <div className="page">
          <div className="page__hd">
            <h1 className="page__title">Light Music</h1>
          </div>

          <div className="flex flex_center nav">
            <NavLink
              to="/recommend"
              className="nav__item"
              activeClassName="nav__item_active"
            >推荐
            </NavLink>

            <NavLink
              to="/rank"
              className="nav__item"
              activeClassName="nav__item_active"
            >排行
            </NavLink>

            <NavLink
              to="/search"
              className="nav__item"
              activeClassName="nav__item_active"
            >搜索
            </NavLink>
          </div>

          <div className="page__bd">
            <Switch>
              <Route path="/recommend" component={Recommend} />
              <Redirect exact from="/" to="/recommend" />
            </Switch>

            <Route path="/rank" component={Rank} />
            <Route path="/search" component={Search} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
