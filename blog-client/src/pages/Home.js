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
class Home extends React.Component {

  componentDidMount() {
    this.props.home.triggerAnimation()
    setTimeout(() => scrollTo(0, 0), 100)              
  }

  componentWillReceiveProps(props) {
    const { location: { search } } = props
    const { category } = search ? queryString(search) : {}
    this.props.home.setCategory(category || '')
  }

  render() {
    const gameComponent = isNode 
      ? <Game />
      : window.innerWidth > 768
        ? <Game/>
        : ''
        
    return (
      <main className="home">
        <Roller/>
        <ArticleList/>
        <aside>
          <SortNav/>
          {gameComponent}
        </aside>
      </main>
    )
  }
}

export default Home
