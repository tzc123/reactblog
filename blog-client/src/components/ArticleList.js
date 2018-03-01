import ArticleItem from './ArticleItem.js'
import '../styles/articlelist.css'

export default ({children}) => {
  return (
    <ul className="article-list">{children}</ul>
  )
}