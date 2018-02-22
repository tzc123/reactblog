import React from 'react'
import ArticleItem from './ArticleItem.js'
import '../styles/articlelist.css'
import '../images/bg.jpeg'

export default class ArticleList extends React.Component {
  constructor() {
    super()
  }
  render() {
    const { props: { articles } } = this
    return (
      <ul className="article-list">
        {
          articles.map(
            (article, index) => (
              <ArticleItem {...{...article, index}} key={index} />
            ) 
          )
        }
      </ul>
    )
  }
}

ArticleList.defaultProps = {
  articles: []
}