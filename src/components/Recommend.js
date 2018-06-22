import React, { Component } from 'react';
import Slider from '../base/Slider';

import { get } from '../common/js/axios';
import { ERR_OK } from '../api/config';

class Recommend extends Component {
  constructor (props) {
    super(props);

    this.state = {
      radioList: [],
      slider: [],
      songList: []
    };
  }

  componentDidMount () {
    let url = 'http://localhost:8000/api/getRecommend';

    let params = {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1
    };

    get(url, {
      params
    }).then(res => {
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

  render () {
    return (
      <div>
        <Slider slider={this.state.slider} />
      </div>
    );
  }
}

export default Recommend;