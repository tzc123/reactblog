import React from 'react'
import ArticleContent from '../components/ArticleContent'
import ArticleHeader from '../components/ArticleHeader'
import ArticleFooter from '../components/ArticleFooter'
import '../styles/article.css'
import 'github-markdown-css'
import { getArticle } from '../api'

export default class Article extends React.Component {
  constructor() {
    super()
    this.state = {
      article: ''
    }
  }
  componentDidMount() {
    getArticle(this.props.match.params.id)
      .then(article => {
        console.log(article)
        if (article) {
          this.setState({
            article
          })
        }
      })
  }
  render() {
    const { state: { article: { content } } } = this
    return (
      <main className="article">
        <article>
          <ArticleHeader />
          <ArticleContent content={content}/>
          <ArticleFooter />
        </article>
        <aside>
          <div style={{width: '200px', height: '200px'}}></div>
        </aside>
      </main>
    )
  }
}