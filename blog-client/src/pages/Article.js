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
    if (top < activeLine) {
      const distance = activeLine - top
      if (distance < minDistance) {
        minDistance = distance
        newActive = index
      }
    }
  })
  this.setState({ active: newActive })
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
  }
  loadData() {
    getArticle(this.props.match.params.id)
      .then(article => {
        article && this.setState({
          ...article,
        }, state => {
          this.headings = document.querySelectorAll('.heading')
          this.tops = [].map.call(
            this.headings, 
            heading => heading.offsetTop
          )
          window.addEventListener('scroll', this.handleScroll,  {
            capture: false,
            passive: false,
            once: false
          });
          [].map.call(
            document.querySelectorAll('.markdown-body img'),
            img => {
              img.addEventListener('load', () => {
                this.tops = [].map.call(
                  this.headings, 
                  heading => heading.offsetTop
                )
              })
            }
          )
        })
      })
  }
  componentWillMount() {
    this.loadData()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  shouldComponentUpdate(props, state) {
    return this.state.title != state.title || this.state.active != state.active
  }
  handleCatelogClick(index, e) {
    e.preventDefault()
    this.animate(index, 60)
  }
  animate(index, speed) {
    const top = this.tops[index] + 20
    const activeLine = window.scrollY || window.pageYOffset
    const distance = top - activeLine
    const times = Math.floor(Math.abs(distance / speed))
    const end = distance % speed
    let i = 1
    function handle() {
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