import React from 'react';

export default class ArticleHeader extends React.Component {
  render() {
    const { props: { title, browse, category, created_at } } = this
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
          <span>{(new Date(created_at).toLocaleDateString().replace(/\//g,'-'))}</span>
        </div>
      </header>
      
    )
  }
}

ArticleHeader.defaultProps = {
  title: '',
  browse: '0',
  category: 'null',
  created_at: '0000-00-00'
}