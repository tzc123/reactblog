import React from 'react'
import ArticleContent from '../components/ArticleContent'
import ArticleHeader from '../components/ArticleHeader'
import ArticleFooter from '../components/ArticleFooter'
import Catelog from '../components/Catelog'
import '../styles/article.css'
import 'github-markdown-css'
import throttle from '../utils/throttle'
import { getArticle } from '../api'
let i = 0
function handleScroll() {
  const { tops, state: { active } } = this
  if (!tops) return
  const activeLine = window.scrollY || window.pageYOffset
  let newActive = active
  let minDistance = Infinity
  tops.forEach((top, index) => {
    const distance = activeLine - top
    if (distance > 0) {
      if (distance < minDistance) {
        minDistance = distance
        newActive = index
      }
    }
  })
  this.setState({ active: newActive })
}

function handleLoad () {
  this.tops = [].map.call(
    this.headings, 
    heading => heading.offsetTop + 80
  )
  this.handleScroll()
}

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
    this.handleScroll = throttle(handleScroll.bind(this), 100)
    this.handleLoad = handleLoad.bind(this)
  }
  loadData() {
    getArticle(this.props.match.params.id)
      .then(article => {
        article && this.setState({
          ...article,
        }, state => {
          if (window.innerWidth > 768) {
            this.headings = document.querySelectorAll('.heading')
            this.tops = [].map.call(
              this.headings, 
              heading => heading.offsetTop + 80
            )
            window.addEventListener('scroll', this.handleScroll, false);
            [].map.call(
              document.querySelectorAll('.markdown-body img'),
              img => img.addEventListener('load', this.handleLoad)
            )
          }
        })
      })
  }
  componentWillMount() {
    this.loadData()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    [].map.call(
      document.querySelectorAll('.markdown-body img'),
      img => img.removeEventListener('load', this.handleLoad)
    )
  }
  shouldComponentUpdate(props, state) {
    return this.state.title != state.title || this.state.active != state.active
  }
  handleCatelogClick(index, e) {
    e.preventDefault()
    this.animate(index, 60)
  }
  animate(index, speed) {
    const top = this.tops[index]
    const activeLine = window.scrollY || window.pageYOffset
    const distance = top - activeLine
    const times = Math.floor(Math.abs(distance / speed))
    const end = distance % speed
    let i = 1
    const handle = () => {
      if (i > times) {
        location.hash = `#heading-${index}`
        return
      }
      requestAnimationFrame(handle)
      scrollBy(0, 
        distance < 0
        ? -speed
        : speed)
      i++
    }
    handle()
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
              window.innerWidth > 768 ?
              catelog.length > 0 ? 
              <Catelog {...{...{catelog, active}}} handleClick={this.handleCatelogClick.bind(this)} /> 
              : ''
              : ''
            }
          </div>
        </aside>
      </main>
    ) : ''
  }
}