import React, { forwardRef } from 'react';
import '../App.css';

const SliderWrapper = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="slider-wrapper"
    >
      {props.children}
    </div>
  );
});

export default SliderWrapper;