import React, { Component } from 'react';

import { getRank } from '../api';
import { ERR_OK } from '../api/config';

class Rank extends Component {
  constructor (props) {
    super(props);

    this.state = {
      topList: []
    };
  }

  componentDidMount () {
    getRank()
      .then(res => {
        if (res.code === ERR_OK) {
          this.setState({
            topList: [...res.data.topList]
          });
        }
      });
  }

  render () {
    return (
      <div className="media-list-wrapper">
        {this.state.topList.map(item => (
          <div
            key={item.id}
            className="flex flex_middle media"
          >
            <div className="media__hd">
              <img
                src={item.picUrl}
                alt={item.topTitle}
              />
              <span className="listen-count">
                <i className="icon icon-listen" />
                {(item.listenCount / 1000).toFixed(1) + '万'}
              </span>
            </div>
            <div className="flex__item media__bd">
              <h2 className="media__title">{item.topTitle}</h2>
              {item.songList.map((song, index) => (
                <p
                  key={index}
                  className="media__desc one-row"
                >
                  {index + 1}
                  <span className="media__mate">{song.songname}</span>
                  {'- ' + song.singername}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Rank;