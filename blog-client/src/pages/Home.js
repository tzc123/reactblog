import { observer, inject } from "mobx-react"
import { observable, action } from "mobx"
import ArticleList from '../components/ArticleList'
import ArticleItem from '../components/ArticleItem'
import Roller from '../components/Roller'
import Game from '../components/Game'
import { getArticleList } from '../api'
import queryString from '../utils/queryString'
import '../styles/home.css'
import '../styles/hopscotch.min.css'

const isNode = typeof window === 'undefined'

@inject('home')
@observer class Home extends React.Component {
  @observable currentPage = 1
  @observable total = 0
  @observable articles = []

  componentDidMount() {
    scrollTo(0, 0)
  }
  componentWillReceiveProps(props) {
    const { location: { search } } = props
    const { category } = queryString(search)
    this.props.home.loadDate(category)
  }
  render() {
    const { articles, currentPage, total } = this.props.home
    return articles.length != 0
    ? (
      <main className="home">
        <Roller currentPage={currentPage} total={total}/>
        <ArticleList>
          {
            articles.map(
              (article, index) => (
                <ArticleItem {...{...article, index}} key={index} />
              ) 
            )
          }
        </ArticleList>
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
    : <main className="home">
        <h1>加载中...</h1>
      </main>
  }
}

export default Home
