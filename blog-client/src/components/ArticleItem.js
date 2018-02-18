import React from "react";
import { Link } from "react-router-dom";
import pic from "../images/bg.jpeg"
import loading from "../images/loading.gif"

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
    const { props: { title, browse, created_at, _id, index, handleClick, description, category } } = this;
    return (
      <li className="article-item">
        <div className="title">
          <span>
            <Link className="article-list-link" to={'/article/' + _id}>
              {title}
              <div className="underline">
                <div className="mask" />
              </div>
            </Link>
          </span>
        </div>
        <div className="desc">{description}</div>
        <div className="footer">
          <img className="browse" src={require("../images/browse.png")} alt="" />
          <span>{browse}</span>
          <img className="category" src={require("../images/category.png")} alt="" />          
          <span>{category}</span>
          <img className="time" src={require("../images/time.png")} alt="" />          
          <span>{(new Date(created_at).toLocaleDateString().replace(/\//g,'-'))}</span>
        </div>
        <img ref="pic" onClick={handleClick} className={`pic ${this.state.loading ? 'hidden' : ''}`} src={pic} alt="" />
        <img className={`loading ${this.state.loading ? '' : 'hidden'}`} src={loading} />
      </li>
    );
  }
}
