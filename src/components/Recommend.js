import React, { Component } from 'react';
import Swiper from '../common/js/swiper';

import { getRecommend } from '../api';
import { ERR_OK } from '../api/config';

class Recommend extends Component {
  constructor (props) {
    super(props);

    this.state = {
      radioList: [],
      slider: [],
      songList: [],
      isImageLoad: false
    };
  }

  componentDidMount () {
    getRecommend()
      .then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data);

          this.setState({
            radioList: [...res.data.radioList],
            slider: [...res.data.slider],
            songList: [...res.data.songList]
          });
        }
      });
  }

  handleImageLoad = () => {
    if (!this.state.isImageLoad) {
      this.setState({
        isImageLoad: true
      });

      this.swiper = new Swiper();
      console.log(this.swiper);
    }
  };

  render () {
    const swiperItems = this.state.slider.map(item => (
      <div
        key={item.id}
        className="swiper-slide"
      >
        <a
          href={item.linkUrl}
          className="link"
        >
          <img
            src={item.picUrl}
            className="image"
            onLoad={this.handleImageLoad}
            alt=""
          />
        </a>
      </div>
    ));

    return (
      <div>
        <div className="swiper-wrapper">
          <div className="swiper">
            {swiperItems}
          </div>
        </div>

        <div className="grids-wrapper">
          <h2 className="grids__title">电台</h2>
          <div className="grids">
            {this.state.radioList.map((item, index) => (
              <div
                key={index}
                className="grid-wrapper"
              >
                <div
                  className="grid">
                  <div className="grid__thumb">
                    <img src={item.picUrl} alt={item.Ftitle} />
                    <i className="icon icon-play" />
                  </div>
                  <p
                    className="grid__title grid__title_two-row"
                  >
                    {item.Ftitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grids-wrapper">
          <h2 className="grids__title">热门歌单</h2>
          <div className="grids">
            {this.state.songList.map(item => (
              <div
                key={item.id}
                className="grid-wrapper"
              >
                <div className="grid">
                  <div className="grid__thumb">
                    <img src={item.picUrl} alt={item.songListDesc} />
                    <span className="listen-count">
                      <i className="icon icon-listen" />
                      {(item.accessnum / 1000).toFixed(1) + '万'}
                    </span>
                    <i className="icon icon-play" />
                  </div>
                  <p
                    className="grid__title"
                  >
                    {item.songListDesc}
                  </p>
                  <p className="grid__desc">{item.songListAuthor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }
}

export default Recommend;