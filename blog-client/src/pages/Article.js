import React from 'react'
import ArticleContent from '../components/ArticleContent'
import ArticleHeader from '../components/ArticleHeader'
import ArticleFooter from '../components/ArticleFooter'
import Catelog from '../components/Catelog'
import initCatelog from '../utils/initCatelog'
import '../styles/article.css'
import 'github-markdown-css'
import throttle from '../utils/throttle'
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
      catelog: [],
      active: 0
    }
  }
  componentWillMount() {
    this.loadData()
  }
  loadData() {
    getArticle(this.props.match.params.id)
      .then(article => {
        article && this.setState({
          ...article,
          catelog: initCatelog(article.catelog)
        }, state => {
          this.headings = Array.from(document.querySelectorAll('.heading'))
          window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 200))
        })
      })
  }

  shouldComponentUpdate(props, state) {
    return this.state.title != state.title || this.state.active != state.active
  }
  handleScroll() {
    const { headings, state: { active } } = this
    if (!headings) return
    const activeLine = window.scrollY
    let newActive = active
    let minDistance = Infinity
    headings.forEach((heading, index) => {
      if (heading.offsetTop < activeLine) {
        const distance = activeLine - heading.offsetTop
        if (distance < minDistance) {
          minDistance = distance
          newActive = index
        }
      }
    })
    this.setState({ active: newActive })
  }
  handleCatelogClick(index, isLast, e) {
    setImmediate(() => {
      !isLast && scrollBy(0, -95)
      this.setState({
        active: index
      })
    })
  }
  render() {
    const { state: { title, content, browse, category, created_at, catelog, active }, handleScroll } = this
    return title ? (
      <main className="article">
        <article>
          <ArticleHeader {...{title, browse, category, created_at}}/>
          <ArticleContent content={content}/>
          <ArticleFooter />
        </article>
        <aside>
          <div>
            {
              catelog.length > 0 ? <Catelog {...{...{catelog, active}}} handleClick={this.handleCatelogClick.bind(this)} /> : ''
            }
          </div>
        </aside>
      </main>
    ) : ''
  }
}