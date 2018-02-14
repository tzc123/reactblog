import React from 'react'

export default class ArticleContent extends React.Component {
  render() {
    return (
      <div className="article-content markdown-body" dangerouslySetInnerHTML={{__html: this.props.content}}>
      </div>
    )
  }
}