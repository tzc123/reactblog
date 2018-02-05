import React from "react";
import { Link } from "react-router-dom";

export default class ArticleItem extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false
    }
  }
  componentDidMount() {
    const { props: { isInserted, index } } = this
    if (isInserted) {
      setImmediate(() => {
        this.setState({
          active: true
        })
      })
    } else {
      setTimeout(() => {
        this.setState({
          active: true
        })
      }, index * 500);
    }
  }
  render() {
    const { props: { title, views, pic, time, index, handleClick }, state: { active } } = this;
    return (
      <li className={active ? 'active' : ''} style={{zIndex:1000-(index+1)*100}}>
        <div className="title">
          <span>
            <Link className="article-list__link" to="/article">
              {title}
              <div className="underline">
                <div className="mask" />
              </div>
            </Link>
          </span>
          <span className="time">{time}</span>
        </div>
        <div className="desc">这是一段描述</div>
        <div className="footer">
          <img className="views" src={require("../images/views.png")} alt="" />
          <span>{views}</span>
        </div>
        <img onClick={handleClick} className="pic" src={pic} alt="" />
      </li>
    );
  }
}
