import React, { Component } from 'react';

class RankDetail extends Component {
  render () {
    return (
      <div className="rank-detail">
        <div className="rank-detail__hd">
          <div className="detail-media">
            <div className="detail-media__hd">
              <img src="" alt="" />
            </div>
            <div className="detail-media__bd">
              <h2 className="detail-media__title">

              </h2>
              <p className="detail-media__title">

              </p>
              <p className="detail-media__title">

              </p>
            </div>
          </div>

          <div className="btn-area">
            <a href="javascript:;" className="btn">播放全部</a>
          </div>
        </div>
        <div className="rank-detail__bd">
          <h2 className="song-list__title">

          </h2>
          <ul className="song-list">
            <li className="song-item">
              <div className="song-item__hd">

              </div>
              <div className="song-item__bd">
                <h3 className="song-item__title">

                </h3>
                <p className="song-item__desc">

                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RankDetail;