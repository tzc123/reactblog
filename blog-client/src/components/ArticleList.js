import ArticleItem from './ArticleItem.js'
import '../styles/articlelist.css'

export default class ArticleList extends React.Component {
  render() {
    const { props: { articles } } = this
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
}

ArticleList.defaultProps = {
  articles: []
}