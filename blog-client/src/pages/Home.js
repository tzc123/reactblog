import React from 'react'
import { getArticleList } from '../api'
import ArticleList from '../components/ArticleList'
import Roller from '../components/Roller'
import Game from '../components/Game'
import '../styles/home.css'
import '../styles/hopscotch.min.css'


export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      total: 0,
      articles: []
    }
  }
  componentDidMount() {
    scrollTo(0, 0)
    this.loadData()
  }
  loadData() {
    const { state: { currentPage } } = this
    getArticleList(null, currentPage)
      .then(articles => {
        this.setState({
          articles: articles.map(article => ({ ...article, pic: 'http://122.152.205.25:1235/images/bg.jpeg' })),
          total: articles.length
        })
      })
  }
  render() {
    const { state: {currentPage, total, articles} } = this
    return (
      <main className="home">
        <Roller currentPage={currentPage} total={total}/>
        <ArticleList {...{currentPage, articles}}/>
        <aside>
          <Game/>
        </aside>
      </main>
    )
  }
}
