import React from 'react'
import ArticleContent from '../components/ArticleContent'
import ArticleHeader from '../components/ArticleHeader'
import ArticleFooter from '../components/ArticleFooter'
import '../styles/article.css'

export default class Article extends React.Component {
  render() {
    return (
      <main>
        <article>
          <ArticleHeader />
          <ArticleContent />
          <ArticleFooter />
        </article>
        <aside>
          
        </aside>
      </main>
    )
  }
}