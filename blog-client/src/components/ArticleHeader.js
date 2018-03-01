import { computed } from 'mobx'
export default class ArticleHeader extends React.Component {
  @computed get created_at() {
    return new Date(this.props.created_at)
      .toLocaleDateString()
      .replace(/\//g,'-')
  }
  static defaultProps = {
    title: '',
    browse: 0,
    category: 'null',
    created_at: '0000-00-00'
  }
  render() {
    const { props: { title, browse, category }, created_at } = this
    return (
      <header className="article-header">
        <h1>
          {title}
        </h1>
        <div className="meta">
          <img className="browse" src={require("../images/browse.png")} alt="" />
          <span>{browse}</span>
          <img className="category" src={require("../images/category.png")} alt="" />          
          <span>{category}</span>
          <img className="time" src={require("../images/time.png")} alt="" />          
          <span>{created_at}</span>
        </div>
      </header>
      
    )
  }
}
