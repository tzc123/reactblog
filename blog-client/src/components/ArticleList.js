import ArticleItem from './ArticleItem.js'
import '../styles/articlelist.css'
import { inject, observer } from 'mobx-react'

@inject('home')
@observer
class ArticleList extends React.Component {
  
  render() {
    const { articles, active, animated } = this.props.home
    let articleItemComponent
    if (articles.length == 0) {
      articleItemComponent = <h1 className="loading">加载中...</h1>
    } else if (active == 0) {
      const date = {}
      articleItemComponent = []
      articles.forEach((article, index) => {
        const created_at = new Date(article.created_at)
        const year = created_at.getFullYear()
        const month = created_at.getMonth() + 1
        if (date[`${year}-${month}`]) {
          articleItemComponent.push(
            <ArticleItem {...article} index={index} key={index} />
          )
        } else {
          articleItemComponent.push(
            <div key={index + 0.5} className="date">{`${year}-${month}`}</div>
          )
          articleItemComponent.push(
            <ArticleItem {...article} index={index} key={index} />
          )
          date[`${year}-${month}`] = true
        }
      })
    } else {
      articleItemComponent = articles.map(
        (article, index) => (
          <ArticleItem {...article} index={index} key={index} />
        ) 
      )
    }
    
    return (
      <ul className={'article-list' + (animated ? ' animated' : '')}>
        {articleItemComponent}
      </ul>
    )
  }
}

export default ArticleList