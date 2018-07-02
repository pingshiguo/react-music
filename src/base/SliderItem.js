import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    flexShrink: 0,
    width: '100%',
    overflow: 'hidden'
  }
};

class SliderItem extends Component {
  render () {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(SliderItem);