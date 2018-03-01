import { computed } from 'mobx';
import { Link } from "react-router-dom";

export default class ArticleItem extends React.Component {
  @computed get created_at() {
    return new Date(this.props.created_at)
      .toLocaleDateString()
      .replace(/\//g,'-')
  }

  render() {
    const { props: { title, browse, _id, index, description, category }, created_at} = this;
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
          <img className="browse" src={require("../images/browse.png")}/>
          <span>{browse}</span>
          <img className="category" src={require("../images/category.png")}/>          
          <span>{category}</span>
          <img className="time" src={require("../images/time.png")}/>          
          <span>{created_at}</span>
        </div>
        {/* <img className={`pic ${this.state.loading ? 'hidden' : ''}`} src={pic} ref="pic"/> */}
        {/* <img className={`loading ${this.state.loading ? '' : 'hidden'}`} src={loading} /> */}
      </li>
    );
  }
}
