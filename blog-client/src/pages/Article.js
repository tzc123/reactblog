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
      title: '',
      content: '',
      browse: 0,
      category: '',
      created_at: '0000-00-00',
      catelog: []
    }
  }
  componentDidMount() {
    getArticle(this.props.match.params.id)
      .then(article => {
        article && this.setState({
          ...article
        })
      })
    
  }
  shouldComponentUpdate(props, state) {
    return this.state.title != state.title
  }
  render() {
    const { state: { title, content, browse, category, created_at, catelog } } = this
    return (
      <main className="article">
        <article>
          <ArticleHeader {...{title, browse, category, created_at}}/>
          <ArticleContent content={content}/>
          <ArticleFooter />
        </article>
        <aside>
          <div>
            <Catelog catelog={catelog} />
          </div>
        </aside>
      </main>
    )
  }
}