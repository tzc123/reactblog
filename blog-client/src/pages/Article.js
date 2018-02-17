import React from 'react'
import ArticleContent from '../components/ArticleContent'
import ArticleHeader from '../components/ArticleHeader'
import ArticleFooter from '../components/ArticleFooter'
import Catelog from '../components/Catelog'
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
        if (article) {
          this.setState({
            article
          })
        }
      })
  }
  render() {
    const { state: { article: { title, content, browse, category, created_at } } } = this
    console.log(this.state)
    return (
      <main className="article">
        <article>
          <ArticleHeader {...{title, browse, category, created_at}}/>
          <ArticleContent content={content}/>
          <ArticleFooter />
        </article>
        <aside>
          <div style={{width: '200px', height: '200px'}}>
            <Catelog />
          </div>
        </aside>
      </main>
    )
  }
}