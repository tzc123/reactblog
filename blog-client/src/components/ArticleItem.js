import React from "react";
import { Link } from "react-router-dom";

export default class ArticleItem extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    this.refs.pic.onload = () => {
      this.setState({
        loading: false
      })
    }
  }
  render() {
    const { props: { title, views, pic, time, index, handleClick } } = this;
    return (
      <li>
        <div className="title">
          <span>
            <Link className="article-list__link" to="/article">
              {title}
              <div className="underline">
                <div className="mask" />
              </div>
            </Link>
          </span>
        </div>
        <div className="desc">这是一段描述</div>
        <div className="footer">
          <img className="views" src={require("../images/views.png")} alt="" />
          <span>{views}</span>
          <span className="time">{time}</span>
        </div>
        <img ref="pic" onClick={handleClick} className={`pic ${this.state.loading ? 'hidden' : ''}`} src={pic} alt="" />
        <img className={`loading ${this.state.loading ? '' : 'hidden'}`} src={require("../images/loading.gif")} />
      </li>
    );
  }
}
