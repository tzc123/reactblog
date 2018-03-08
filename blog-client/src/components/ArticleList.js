import ArticleItem from './ArticleItem.js'
import '../styles/articlelist.css'

export default ({ articles }) => {
  return (
    <ul className="article-list">
      {
        articles.map(
          (article, index) => (
            <ArticleItem {...{...article, index}} key={index} />
          ) 
        )
      }
    </ul>
  )
}