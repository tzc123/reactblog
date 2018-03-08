import { observer, inject } from "mobx-react"
import ArticleList from '../components/ArticleList'
import ArticleItem from '../components/ArticleItem'
import Roller from '../components/Roller'
import Game from '../components/Game'
import SortNav from '../components/SortNav'
import queryString from '../utils/queryString'
import '../styles/home.css'

const isNode = typeof window === 'undefined'

let initialData = isNode
  ? null
  : window.initialData
@inject('home')
@observer class Home extends React.Component {

  componentDidMount() {
    scrollTo(0, 0)
    this.props.home.loadData('')
  }
  componentWillReceiveProps(props) {
    const { location: { search } } = props
    const { category } = queryString(search)
    this.props.home.loadData(category || '')
  }
  render() {
    const { articles, currentPage, total } = this.props.home

    const gameComponent = isNode 
      ? <Game />
      : window.innerWidth > 768
        ? <Game/>
        : ''
    return articles.length != 0
    ? (
      <main className="home">
        <Roller currentPage={currentPage} total={total}/>
        <ArticleList articles={articles}/>
        <aside>
          <SortNav />
          {gameComponent}
        </aside>
      </main>
    )
    : <main className="home">
        <h1 className="loading">加载中...</h1>
      </main>
  }
}

export default Home
