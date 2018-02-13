import React from 'react'
import ArticleList from '../components/ArticleList'
import Roller from '../components/Roller'
import Game from '../components/Game'
import '../styles/home.css'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      total: 5
    }
  }
  render() {
    const { state: {currentPage, total} } = this
    return (
      <main className="home">
        <Roller currentPage={currentPage} total={total}/>
        <ArticleList currentPage={currentPage}/>
        <aside>
          <Game />
        </aside>
      </main>
    )
  }
}
