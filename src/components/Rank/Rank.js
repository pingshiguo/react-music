import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Rank.css';

import { getRank } from '../../api/index';
import { ERR_OK } from '../../api/config';

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
    const {match} = this.props;

    return (
      <div className="rank-wrapper">
        {this.state.topList.map(item => (
          <Link
            key={item.id}
            to={`${match.url}/${item.id}`}
            className="flex flex_middle rank-media"
          >
            <div className="rank-media__hd">
              <img
                src={item.picUrl}
                alt={item.topTitle}
              />
              <span className="listen-count">
                <i className="icon icon-listen" />
                {(item.listenCount / 1000).toFixed(1) + '万'}
              </span>
            </div>
            <div className="flex__item rank-media__bd">
              <h2 className="rank-media__title">{item.topTitle}</h2>
              {item.songList.map((song, index) => (
                <p
                  key={index}
                  className="rank-media__desc one-row"
                >
                  {index + 1}
                  <span className="rank-media__mate">{song.songname}</span>
                  {'- ' + song.singername}
                </p>
              ))}
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default Rank;