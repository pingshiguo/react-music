class Swiper {
  constructor (options) {
    this._default = {
      container: '.swiper',
      item: '.swiper-slide',
      direction: 'horizontal',
      activeClass: 'swiper-slide_active',
      threshold: 50,
      duration: 300
    };
    this._options = Object.assign(this._default, options);
    this._start = {};
    this._move = {};
    this._end = {};
    this._prev = 0;
    this._current = 0;
    this._offset = 0;
    this._goto = -1;
    this._eventHandlers = {};

    this.$container = document.querySelector(this._options.container);
    this.$items = this.$container.querySelectorAll(this._options.item);

    this.count = this.$items.length;

    this._width = this.$container.clientWidth;
    this._height = this.$container.clientHeight;

    this._init();
    this._bind();
  }

  _init () {
    let width = this._width;
    let height = this._height;

    let w = width * this.count;
    let h = height;

    if (this._options.direction === 'vertical') {
      w = width;
      h = height * this.count;
    }

    Object.assign(this.$container.style, {
      width: `${w}px`,
      height: `${h}px`
    });

    for (let $item of this.$items) {
      Object.assign($item.style, {
        width: `${width}px`,
        height: `${height}px`
      });
    }

    this._activate(0);
  }

  _bind () {
    this.$container.addEventListener('touchstart', e => {
      this._start.x = e.changedTouches[0].pageX;
      this._start.y = e.changedTouches[0].pageY;

      Object.assign(this.$container.style, {
        transition: 'none'
      });
    }, false);

    this.$container.addEventListener('touchmove', e => {
      this._move.x = e.changedTouches[0].pageX;
      this._move.y = e.changedTouches[0].pageY;

      let distance = this._move.x - this._start.x;
      let transform = `translate3d(${distance - this._offset}px, 0, 0)`;

      if (this._options.direction === 'vertical') {
        distance = this._move.y - this._start.y;
        transform = `translate3d(0, ${distance - this._offset}px, 0)`;
      }

      Object.assign(this.$container.style, {
        webkitTransform: transform,
        transform
      });

      e.preventDefault();
    });

    this.$container.addEventListener('touchend', e => {
      this._end.x = e.changedTouches[0].pageX;
      this._end.y = e.changedTouches[0].pageY;

      let distance = this._end.x - this._start.x;
      if (this._options.direction === 'vertical') {
        distance = this._end.y - this._start.y;
      }

      this._prev = this._current;
      if (distance > this._options.threshold) {
        this._current = this._current === 0 ? 0 : --this._current;
        e.preventDefault();
      } else if (distance < -this._options.threshold) {
        this._current = this._current < (this.count - 1) ? ++this._current : this._current;
        e.preventDefault();
      }

      this._show(this._current);
    }, false);
  }

  _show (index) {
    this._offset = index * this._width;
    let transform = `translate3d(-${this._offset}px, 0, 0)`;

    if (this._options.direction === 'vertical') {
      this._offset = index * this._height;
      transform = `translate3d(0, -${this._offset}px, 0)`;
    }

    let duration = `${this._options.duration}ms`;

    Object.assign(this.$container.style, {
      transition: duration,
      webkitTransform: transform,
      transform
    });

    window.clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      if (this._current !== this._prev || this._timeout !== null || this._goto > -1) {
        this._activate(this._current);

        let callback = this._eventHandlers.swiped || noop;
        callback.apply(this, [this._prev, this._current]);

        this._goto = -1;
        this._timeout = null;
      }
    }, this._options.duration);
  }

  _activate (index) {
    let {activeClass} = this._options;

    for (let $item of this.$items) {
      $item.classList.remove(activeClass);
    }

    this.$items[index].classList.add(activeClass);
  }

  go (index) {
    if (index < 0 || index > this.count - 1 || index === this._current) {
      return;
    }

    if (index === 0) {
      this._current = 0;
      this._prev = 0;
    } else {
      this._current = index;
      this._prev = index - 1;
    }

    this._goto = index;
    this._show(this._current);

    return this;
  }

  prev () {
    if (this._current === 0) {
      return;
    }

    this._prev = this._current;
    this._show(--this._current);

    return this;
  }

  next () {
    if (this._current >= this.count - 1) {
      return;
    }

    this._prev = this._current;
    this._show(++this._current);

    return this;
  }

  on (event, callback) {
    if (this._eventHandlers[event]) {
      throw new Error(`event ${event} is already register.`);
    }

    if (typeof callback !== 'function') {
      throw new Error('parameter callback must be a function');
    }

    this._eventHandlers[event] = callback;

    return this;
  }
}

function noop () {

}

export default Swiper;
