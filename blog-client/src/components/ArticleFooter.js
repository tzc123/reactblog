import CommentList from './CommentList'
import CommentsArea from './CommentArea'
import { observer, inject } from 'mobx-react'


@inject('article')
@observer class ArticleFooter extends React.Component {

  render() {
    const { id, article: { comments, sticky } } = this.props
    return (
      <footer className="article-footer">
        <CommentsArea id={id} sticky={sticky}/>
        {
          comments.length > 0 
          ? <CommentList comments={comments} />
          : <li className="comment">
              <header>
                1楼:
              </header>
              <div className="content">
                虚位以待...
              </div>
              <footer></footer>
            </li>
        }
      </footer>
    )
  }
}

export default ArticleFooter