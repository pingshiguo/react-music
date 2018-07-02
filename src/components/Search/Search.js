import React, { Component } from 'react';

import './Search.css';

import { getKeyword } from '../../api/index';
import { ERR_OK } from '../../api/config';

class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isFocus: false,
      keyword: '',
      specialKey: '',
      specialUrl: '',
      keywordList: [],
      randomKeyword: []
    };
  }

  componentDidMount () {
    getKeyword()
      .then(res => {
        if (res.code === ERR_OK) {
          this.setState({
            specialKey: res.data.special_key,
            specialUrl: res.data.special_url,
            keywordList: [...res.data.hotkey]
          });

          this.setRandomKeyword(6);
        }
      });
  }

  handleFocus = () => {
    this.setState({
      isFocus: true
    });
  };

  handleCancel = () => {
    this.setState({
      isFocus: false
    });
  };

  handleChange = event => {
    this.setState({
      keyword: event.target.value
    });
  };

  handleClear = event => {
    this.setState({
      keyword: ''
    });
  };

  handleSubmit = event => {
    const keyword = this.state.keyword.trim();

    if (keyword.length === 0) {
      event.preventDefault();
    }

  };

  setRandomKeyword = len => {
    let keywordList = this.state.keywordList;
    let randomKeyword = [];

    for (let i = 0; i < len; i++) {
      let index = Math.floor(Math.random() * keywordList.length);
      let keyword = keywordList[index];

      if (!randomKeyword.includes(keyword)) {
        randomKeyword.push(keyword);
      }
    }

    this.setState({
      randomKeyword: [...randomKeyword]
    });
  };

  render () {
    const {
      isFocus,
      keyword,
      specialKey,
      specialUrl,
      randomKeyword
    } = this.state;

    return (
      <div>
        <div className="search-bar-wrapper">
          <div className="flex search-bar">
            <form
              className="flex__item flex search-bar__form"
              onSubmit={this.handleSubmit}
            >
              <i className="icon icon-search" />
              <input
                type="search"
                className="flex__item search-bar__input"
                value={this.state.keyword}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                placeholder="搜索歌曲、歌单、专辑"
                required
              />
              {keyword.length > 0 &&
              <i
                className="icon icon-clear"
                onClick={this.handleClear}
              />
              }
            </form>
            {isFocus &&
            <a
              className="search-bar__cancel-btn"
              onClick={this.handleCancel}
            >
              取消
            </a>
            }
          </div>
        </div>

        {keyword.length === 0 &&
        <div className="search-result">
          <h2 className="search-result__title">热门搜索</h2>
          <div className="search-result__tags">
            {specialKey && specialUrl &&
            <a
              href={specialUrl}
              className="tag tag_hot"
            >
              {specialKey}
            </a>
            }

            {
              randomKeyword.map(item =>
                <a
                  key={item.n}
                  className="tag"
                >
                  {item.k}
                </a>
              )
            }
          </div>

          <div className="search-result__box">

          </div>
        </div>
        }


      </div>
    );
  }
}

export default Search;