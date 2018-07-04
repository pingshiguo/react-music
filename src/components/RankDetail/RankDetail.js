import React, { Component } from 'react';

import './RankDetail.css';

import { getRankDetail } from '../../api';
import { ERR_OK } from '../../api/config';

class RankDetail extends Component {
  constructor (props) {
    super(props);

    this.state = {
      rankInfo: [],
      songList: [],
      cur_song_num: 0,
      day_of_year: '',
      update_time: ''
    };
  }

  componentDidMount () {
    const {match} = this.props;

    getRankDetail(match.params.rankId)
      .then(res => {
        if (res.code === ERR_OK) {
          let {
            topinfo,
            songlist,
            cur_song_num,
            day_of_year,
            update_time
          } = res;

          this.setState({
            rankInfo: topinfo,
            songList: songlist,
            cur_song_num,
            day_of_year,
            update_time
          });
        }
      });
  }

  render () {
    let {
      rankInfo,
      songList,
      cur_song_num,
      day_of_year,
      update_time
    } = this.state;

    return (
      <div className="rank-detail">
        <div className="rank-detail__hd">
          <img
            className="box-bg"
            src={rankInfo.pic_album}
            alt="" />
          <div className="box">
            <div className="flex flex--middle detail-media">
              <div className="detail-media__hd">
                <img
                  className="detail-media__thumb"
                  src={rankInfo.pic_album}
                  alt="" />
              </div>
              <div className="flex__item detail-media__bd">
                <h2 className="detail-media__title">
                  {rankInfo.ListName}
                </h2>
                <p className="detail-media__desc">
                  {`第${day_of_year}天`}
                </p>
                <p className="detail-media__desc">
                  {`${update_time} 更新`}
                </p>
              </div>
            </div>

            <div className="flex flex--middle flex--center detail-btn-area">
              <a
                href="javascript:;"
                className="btn btn__primary"
              >
                随机播放全部
              </a>
            </div>
          </div>
        </div>

        <div className="rank-detail__bd">
          <h2 className="flex flex--middle song-list__title">
            {`排行榜 共${cur_song_num}首`}
          </h2>
          <ul className="song-list">
            {songList.map((item, index) => (
              <li
                key={index}
                className="flex song-item"
              >
                <div className="flex flex--middle flex--center song-item__hd">
                  <span className="song-item__decimal">{index + 1}</span>
                </div>
                <div className="flex__item song-item__bd">
                  <h3 className="song-item__title">
                    {item.data.songname}
                  </h3>
                  <p className="song-item__desc">
                    {item.data.singer.map((item, index) => (
                      <span
                        key={index}
                        className="song__singer"
                      >
                        {item.name}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default RankDetail;