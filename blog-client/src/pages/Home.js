import React from 'react'
import { getArticleList } from '../api'
import ArticleList from '../components/ArticleList'
import Roller from '../components/Roller'
import Game from '../components/Game'
import queryString from '../utils/queryString'
import statistics from '../utils/statistics'
import '../styles/home.css'
import '../styles/hopscotch.min.css'


export default class Home extends React.Component {
  constructor(event) {
    super()
    this.event = event
    this.state = {
      currentPage: 1,
      total: 0,
      articles: []
    }
  }
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
    const { state: { currentPage } } = this
    getArticleList(category, currentPage)
      .then(articles => {
        this.setState({
          articles: articles.map(article => ({ ...article, pic: 'http://122.152.205.25:1235/images/bg.jpeg' })),
          total: articles.length
        })
      })
  }
  render() {
    const { state: {currentPage, total, articles} } = this
    return articles.length != 0
    ? (
      <main className="home">
        <Roller currentPage={currentPage} total={total}/>
        <ArticleList {...{currentPage, articles}}/>
        <aside>
          {
            window.innerWidth > 768
            ? <Game/>
            : ''
          }
        </aside>
      </main>
    )
    : ''
  }
}
