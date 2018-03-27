import { observer, inject } from "mobx-react"
import ArticleContent from '../components/ArticleContent'
import ArticleHeader from '../components/ArticleHeader'
import ArticleFooter from '../components/ArticleFooter'
import Catelog from '../components/Catelog'
import '../styles/article.css'
import throttle from '../utils/throttle'

const isNode = typeof window === 'undefined'

const handleScroll = function () {
  const { tops, active, props: { article: { setActive } }  } = this
  if (!tops) return
  const activeLine = window.scrollY || window.pageYOffset
  let newActive = active
  let minDistance = Infinity
  tops.forEach((top, index) => {
    const distance = activeLine - top
    if (distance > 0 && distance < minDistance) {
      minDistance = distance
      newActive = index
    }
  })
  setActive(newActive)
}

function handleLoad () {
  this.tops = [].map.call(
    this.headings, 
    heading => heading.offsetTop + 80
  )
  this.handleScroll()
}

function initArticle() {
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
}

@inject('article')
@observer class Article extends React.Component {
  
  constructor() {
    super()
    this.handleScroll = throttle(handleScroll.bind(this), 50, true)
    this.handleLoad = handleLoad.bind(this)
  }

  componentDidMount() {
    const { match: { params: { id } }, article: { loadData, loadComments } } = this.props
    loadData(id)
      .then(initArticle.bind(this))
    loadComments(id)            
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    [].map.call(
      document.querySelectorAll('.markdown-body img'),
      img => img.removeEventListener('load', this.handleLoad)
    )
    this.frameId && cancelAnimationFrame(this.frameId)
    this.props.article.clear()
  }

  componentWillReceiveProps(props) {
    const { match: { params: { id } }, article: { loadData } } = props
    if (id == this.props.match.params.id) return
    loadData(id)
      .then(initArticle.bind(this))
    loadComments(id)      
  }

  handleCatelogClick(index, e) {
    e.preventDefault()
    this.animate(index, 100)
  }

  animate(index, speed) {
    this.frameId && cancelAnimationFrame(this.frameId)    
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
      this.frameId = requestAnimationFrame(handle)
      scrollBy(0, 
        distance < 0
        ? -speed
        : speed)
      i++
    }
    handle()
  }

  render() {
    const { 
      article: {
        article: { 
          title, 
          content, 
          catelog, 
          handleScroll 
        }, 
        comments,
        active, 
        top,
        sticky
      },
      match: {
        params: {
          id
        }
      }
    } = this.props
    const catelogComponent = <Catelog catelog={catelog} top={top} handleClick={this.handleCatelogClick.bind(this)} />

    return title 
    ? (
      <main className="article">
        <article>
          <ArticleHeader/>
          <ArticleContent content={content}/>
          <ArticleFooter id={id} />
        </article>
        <aside>
          <div>
            {
              isNode
              ? catelogComponent
              : window.innerWidth > 768 
                ? catelog.length > 0 
                  ? catelogComponent
                  : ''
                : ''
            }
          </div>
        </aside>
        {/* <img className="top" src={require('../images/arrow.png')}/> */}
      </main>
    ) 
    : <main className="home">
        <h1 className="loading">加载中...</h1>
      </main>
  }
}

export default Article