import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import { Menu, Search, MoreVert } from '@material-ui/icons';

const styles = {
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: '#5cba8e'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  searchButton: {
    marginRight: -12
  },
  moreButton: {
    marginRight: -12
  }
};

class AppHeader extends Component {
  render () {
    return (
      <div className={this.props.classes.root}>
        <AppBar
          position="static"
          className={this.props.classes.appBar}
        >
          <Toolbar>
            <IconButton
              className={this.props.classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <Menu />
            </IconButton>
            <Typography
              variant="title"
              className={this.props.classes.flex}
              color="inherit"
            >
              Title
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Search"
            >
              <Search />
            </IconButton>
            <IconButton
              className={this.props.classes.moreButton}
              color="inherit"
              aria-label="More"
            >
              <MoreVert />
            </IconButton>
          </Toolbar>

          {this.props.children}
        </AppBar>
      </div>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppHeader);