import React, { Component } from 'react';

import { get } from '../common/js/axios';
import { ERR_OK } from '../api/config';

class Search extends Component {
  render () {
    return (
      <div>
        <div className="search-bar-wrapper">
          <div className="flex search-bar">
            <form className="flex__item flex search-bar__form">
              <i className="icon icon-search" />
              <input
                type="search"
                className="flex__item search-bar__input"
                placeholder="搜索歌曲、歌单、专辑"
                required
              />
              <i className="icon icon-clear" />
            </form>
            <a
              href="javascript:;"
              className="search-bar__cancel-btn"
            >取消</a>
          </div>
        </div>

        <div className="search-result">
          <h2 className="search-result__title">热门搜索</h2>
          <div className="search-result__tags">
            <span className="tag tag_active">{}</span>
            <span className="tag">{}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;