import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import SliderWrapper from './SliderWrapper';
import SliderItem from './SliderItem';
import BScroll from 'better-scroll';

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    overflow: 'hidden'
  },
  link: {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
    textDecoration: 'none'
  },
  image: {
    width: '100%',
    verticalAlign: 'top'
  }
};

class Slider extends Component {
  constructor (props) {
    super(props);

    this.slider = React.createRef();
    this.sliderWrapper = React.createRef();
  }

  componentDidMount () {
    this._setSliderWidth();
    this._initSlider();
  }

  _setSliderWidth () {
    let children = this.props.children;
    let width = window.getComputedStyle(this.slider.current, null).getPropertyValue('width').replace(/px$/, '');

    let len = 0;
    for (let item of children) {
      len++;
      console.log(item);
    }
    this.sliderWrapper.current.style.width = width * len;
  }

  _initSlider () {
    return new BScroll(this.slider.current, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: true,
        threshold: .3,
        speed: 400
      },
      bounce: false,
      stopPropagation: true,
      click: true
    });
  }

  render () {
    const {classes} = this.props;

    const sliderItems = this.props.slider.map(item => {
        return (
          <SliderItem
            key={item.id}
            className={classes.sliderItem}
          >
            <a
              href={item.linkUrl}
              className={classes.link}
            >
              <img
                src={item.picUrl}
                className={classes.image}
                alt=""
              />
            </a>
          </SliderItem>
        );
      }
    );

    return (
      <div
        className={classes.root}
        ref={this.slider}
      >
        <SliderWrapper
          className={classes.sliderWrapper}
          ref={this.sliderWrapper}
        >
          {sliderItems}
        </SliderWrapper>
      </div>
    );
  }
}

export default withStyles(styles)(Slider);