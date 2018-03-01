import { observer } from "mobx-react"
import { observable } from "mobx"
import ArticleList from '../components/ArticleList'
import Roller from '../components/Roller'
import Game from '../components/Game'
import { getArticleList } from '../api'
import queryString from '../utils/queryString'
import '../styles/home.css'
import '../styles/hopscotch.min.css'

const isNode = typeof window === 'undefined'

@observer class Home extends React.Component {
  @observable currentPage = 1
  @observable total = 0
  @observable articles = []

  componentDidMount() {
    scrollTo(0, 0)
    const { props: { location: { search } } } = this
    const { category } = queryString(search)
    this.loadData(category)
  }
  componentWillReceiveProps(props) {
    const { location: { search } } = props
    const { category } = queryString(search)
    this.loadData(category)
  }
  loadData(category) {
    const { currentPage } = this
    getArticleList(category, currentPage)
      .then(articles => {
        this.articles = articles
        this.total = articles.length
      })
  }
  render() {
    const { currentPage, total, articles } = this
    return articles.length != 0
    ? (
      <main className="home">
        <Roller currentPage={currentPage} total={total}/>
        <ArticleList {...{currentPage, articles}}/>
        <aside>
          {
            isNode 
            ? <Game />
            : window.innerWidth > 768
              ? <Game/>
              : ''
          }
        </aside>
      </main>
    )
    : ''
  }
}

export default Home
