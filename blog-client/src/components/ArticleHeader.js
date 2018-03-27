import { inject } from 'mobx-react'

@inject('article')
class ArticleHeader extends React.Component {

  render() {
    const { article: { title, browse, category }, created_at } = this.props.article
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

export default ArticleHeader
