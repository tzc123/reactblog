import ArticleItem from './ArticleItem.js'
import { inject, observer } from 'mobx-react'

@inject('home')
@observer
class ArticleList extends React.Component {

  render() {
    const { articles, active, animated, fade } = this.props.home
    let articleItemComponent
    if (articles.length == 0) {
      articleItemComponent = ''
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
        (article, index) => {
          return <ArticleItem {...article} index={index} key={index} />
        }
      )
    }
    return (
      <ul className={'article-list' + (animated ? ' animated' : '') + (fade ? ' fade' : '')}>
        {articleItemComponent}
      </ul>
    )
  }
}

export default ArticleList